import * as randomWalker from "./randomWalker.js";
import * as wall from "./wall.js";
import * as utils from "./utils.js";
import * as player_class from "./player_class.js";
import * as bullet_class from "./butllet_class.js";

let canvas, ctx;
let walkers;
let player;
let numWalk;
let translation = [0,0];
let endedTurn = false;
let playersTurn = true;
let mouseX = 0;
let mouseY = 0;
let circleX;
let circleY;
let bullets = [];
let walls;
let numWalls;
let score = 0;
let moveRadius;
let timer = 0;

let turn;
let time;
let countdown;
let endTurnButton;
let resetButton;

let healthSlider;
let healthLabel;
let enemySlider;
let enemyLabel;
let wallSlider;
let wallLabel;
let rangeSlider;
let rangeLabel;

const canvasWidth = 800, canvasHeight = 600;

function init(){
    canvas = document.querySelector('canvas');
    canvas.width = canvasWidth;
	canvas.height = canvasHeight;
	ctx = canvas.getContext("2d");

    window.addEventListener("keydown", utils.keysDown);
    window.addEventListener("keyup", utils.keysUp);

    canvas.onclick = canvasClicked;
    
    player = new player_class.Player(canvasWidth/2, canvasHeight/2, 3, 1, "Marc", 10, 10);

    //sets up all range sliders and lebels
    healthSlider = document.querySelector("#healthSlider");
    healthLabel = document.querySelector("#healthLabel");
    
    healthSlider.oninput = e => {
        healthLabel.innerHTML = Math.round(e.target.value);
    };
        
    
    enemySlider = document.querySelector("#enemySlider");
    enemyLabel = document.querySelector("#enemyLabel");

    enemySlider.oninput = e => {
        enemyLabel.innerHTML = enemySlider.value;
    };

    wallSlider = document.querySelector("#wallSlider");
    wallLabel = document.querySelector("#wallLabel");

    wallSlider.oninput = e => {
        wallLabel.innerHTML = wallSlider.value;
    }

    rangeSlider = document.querySelector("#rangeSlider");
    rangeLabel = document.querySelector("#rangeLabel");

    rangeSlider.oninput = e => {
        rangeLabel.innerHTML = rangeSlider.value;
    }
    
    //looks for button clicked
    endTurnButton = document.querySelector("#endTurn");   
    endTurnButton.onclick = function endTurn(){endedTurn = true;}
    resetButton = document.querySelector("#reset");
    resetButton.onclick = function() {reset()};
    //query selectors for ingame info
    turn = document.querySelector("#turn");
    time = document.querySelector("#timer");
    countdown = document.querySelector("#countdown");
    countdown.innerHTML = "";
    time.innerHTML = "";

    reset();    

    loop();
}

//continually loops
function loop(){
    requestAnimationFrame(loop);    

    //game over screen
    if (player.health <= 0){
        utils.drawBackground(ctx);
        ctx.save();
        ctx.font = "60px Arial"; 
        ctx.fillStyle = "red";       
        ctx.fillText("Game Over", 230, 200);
        ctx.fillText(`Your score: ${score}`, 220, 300)
        ctx.restore();
    } 
    //during players turn it allows for the player to move and shoot once
    else if(playersTurn){
        translateDraw();     
        utils.drawEnemiesLeft(ctx, walkers.length);                     
        if (endedTurn && bullets.length == 0){
            playersTurn = false;
            timer = 0;
            turn.innerHTML = "Enemy Turn";
            time.innerHTML = "Timer: "; 
            countdown.innerHTML = "10";
            endTurnButton.style.display = "none";
        }
    }
    //enemies turn, resets circle and allows enemies to move
    else{
        circleX = 400;
        circleY = 300;
        walkerDraw();
        playerDamage();
        endedTurn = false;

        timer++;
        let count = 600 - timer;
        countdown.innerHTML = Math.ceil(count/60);
        utils.drawEnemiesLeft(ctx, walkers.length);  
        //need to make this time based instead of frames
        if (timer >= 600){
            playersTurn = true;
            turn.innerHTML = "Players Turn";
            time.innerHTML = ""; 
            countdown.innerHTML = "";
            endTurnButton.style.display = "block";
        }
    }   
    
}

//draws the walkers and walls during the walkers turn
function walkerDraw(){
    utils.drawBackground(ctx);
    player.draw(ctx);
    for(let i = 0; i < numWalk; i++){
        if(!utils.checkCollisionWithWall(walkers[i], walls, numWalls)){
            walkers[i].calculateNewPosition(player);            
        }     
        else{
            walkers[i].collideWithWall();
        }   
        walkers[i].draw(ctx);
    }

    drawWalls();
    player.draw(ctx);
}

//translates all items in the game depending on player movement
function translateDraw(){
    utils.drawBackground(ctx);

    //checks to see if a bullet has been fired
    if (bullets.length > 0){
        shoot();
    } 
    
    else{
        
        //create collision and check if the player is colliding with any walls
        let collision = false;
        collision = utils.checkCollisionWithWall(player, walls, numWalls);

        //get translation if the player pressed any keys
        //then check the distance away from the center of the move circle the player is.
        translation = utils.playerMovement();
        let distanceAway = utils.distanceAway(circleX + translation[0], circleY + translation[1], player.x, player.y);

        //if they move outside the move radius stop
        //the player movement
        if(distanceAway >= moveRadius){
            translation[0] = 0;
            translation[1] = 0;
        }
        //if collision stop the movement in the same direction
        else if(collision){
            translation[0] *= -1;
            translation[1] *= -1;
            utils.clearKeys();
        }

        //if there is less than 10 enemies the player is free to move
        if (walkers.length > 10)
        {
            //translates the bounding circle
            circleX += translation[0];
            circleY += translation[1];

            //draws bounding circle
            ctx.strokeStyle = "white";
            ctx.save();
            ctx.beginPath();
            ctx.arc(circleX,circleY,moveRadius,0,Math.PI * 2, false);
            ctx.closePath();
            ctx.stroke();
            ctx.restore();    
        }
    
    }
    //loops through all walkers, translating them, then draws them 
    for(let i = 0; i < numWalk; i++){
        walkers[i].translatePos(translation);
        walkers[i].draw(ctx);
    }
    
    //draws all walls
    drawWalls();
    player.draw(ctx);
}

//draws all walls
function drawWalls(){
    for(let i = 0; i < numWalls; i++){
        walls[i].translatePos(translation);
        walls[i].draw(ctx);
    }
}

//checks to see where the canvas has been clicked and sends the coordinates to the bullets shoot method
function canvasClicked(e){
    let rect = e.target.getBoundingClientRect();
    mouseX = e.clientX - rect.x;
    mouseY = e.clientY - rect.y;
    bullets[0] = new bullet_class.Bullet(player);
    bullets[0].shoot(mouseX, mouseY);
}

//does damage to the player if a walker collides with it
function playerDamage(){
    let damage = 0;
    for(let i = 0;i < numWalk; i++){
        if(walkers[i].hitPlayer(player) == 1){
            damage++;
            walkers.splice(i, 1);
            i--;
            numWalk--;
        }
    }
    player.takeDamage(damage);
}

//loops through checking collisions between the players bullet, enemies and walls
function shoot(){
    translation = [0,0];
    let collision;

    //loops through all bullets
    for(let i = 0; i < bullets.length; i++)
    {
        //draws bullet
        bullets[0].draw(ctx); 
        //loops through all walkers, checking for collisions and removing them from array as necessary      
        for (let h = 0; h < numWalk; h++){
            if (bullets[i].x > walkers[h].x - 3 && bullets[i].x <= walkers[h].x + 8
            && bullets[i].y > walkers[h].y - 3 && bullets[i].y <= walkers[h].y + 8){
                walkers.splice(h, 1);
                numWalk--;
                bullets.splice(i,1);       
                break;                
            }    
            //checks to see if bullet is on screen, if not it is deleted
            if (bullets[i].x < 0 || bullets[i].x > 800 || bullets[i].y < 0 || bullets[i].y > 600){
                bullets.splice(i,1);   
                break;
            }
            
        }

        //check if the bullet is colliding with any walls.
        if (bullets.length > 0){
            collision= utils.checkCollisionWithWall(bullets[i], walls, numWalls);
            if(collision){
                bullets.splice(i,1);
                break;
            }
        }
    }
    endedTurn = true;       
}

//used to create the game, depending on input variables and allows the user to reset if they change some variables
function reset(){
    timer = 610;
    circleX = 400;
    circleY = 300;

    numWalk = enemySlider.value;
    numWalls = wallSlider.value;

    moveRadius = rangeSlider.value;

    walkers = [];
    walls = [];

    //creates bounding walls
    walls[0] = new wall.Wall(-575,-375,1950,15);
    walls[1] = new wall.Wall(-575,-375,15,1350);
    walls[2] = new wall.Wall(-575,975,1965,15);
    walls[3] = new wall.Wall(1375,-375,15,1350);

    

    //creates random wall placements, does not allow them to be placed on top of player
    for (let i = 4; i < numWalls; i++)
    {
        walls[i] = new wall.Wall(0,0,0,0);    
        if (utils.checkCollisionWithWall(player, walls, walls.length)){
            walls.splice(i, 1);
            i--;
        }
    }    

    //creates random walkers, does not allow them to be placed on top of walls or players
    for(let i = 0;i < numWalk; i++){
        walkers[i] = new randomWalker.RandomWalker(utils.getRandomInt(-500, 1300), utils.getRandomInt(-300, 900), 5, 5);
        if (utils.checkCollisionWithWall(walkers[i], walls, numWalls)){
            walkers.splice(i, 1);
            i--;
        }
        if (utils.checkCollisionWithWall(player, walkers, walkers.length)){
            walkers.splice(i, 1);
            i--;
        }
    }   
    player.health = healthSlider.value;
    player.originalHealth = healthSlider.value;

    healthLabel.innerHTML = player.originalHealth;
    enemyLabel.innerHTML = numWalk;
    wallLabel.innerHTML = numWalls;
    rangeLabel.innerHTML = moveRadius;
}


export{init};