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
let circleX = 400;
let circleY = 300;
let bullets = [];
let walls = [];
let numWalls;

const canvasWidth = 800, canvasHeight = 600;
let timer = 0;

function init(){
    canvas = document.querySelector('canvas');
    canvas.width = canvasWidth;
	canvas.height = canvasHeight;
	ctx = canvas.getContext("2d");

    window.addEventListener("keydown", utils.keysDown);
    window.addEventListener("keyup", utils.keysUp);

    canvas.onclick = canvasClicked;

    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvasWidth,canvasHeight);
    
    player = new player_class.Player(canvasWidth/2, canvasHeight/2, 3, 1, "Marc", 10, 10);
    player.draw(ctx);

    numWalk = 100;
    walkers = [];

    numWalls = utils.getRandomInt(50,100);

    //creates random wall placements, does not allow them to be placed on top of player
    for (let i = 0; i < numWalls; i++)
    {
        walls[i] = new wall.Wall();    
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
    
    document.querySelector("#endTurn").onclick = function endTurn(){endedTurn = true;}    

    loop();
}

function loop(){
    requestAnimationFrame(loop);    

    if(playersTurn){
        translateDraw();                     
        if (endedTurn && bullets.length == 0){
            playersTurn = false;
            timer = 0;
        }
    }
    else{
        circleX = 400;
        circleY = 300;
        walkerDraw();
        playerDamage();
        endedTurn = false;
        timer++;
        //need to make this time based instead of frames
        if (timer >= 600){
            playersTurn = true;
        }
    }    
}

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
}

function translateDraw(){

    ctx.save();
	ctx.fillStyle = "black";
	ctx.fillRect(0,0,canvasWidth,canvasHeight);
    player.draw(ctx);
	ctx.restore();

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
        if(distanceAway >= 60){
            translation[0] = 0;
            translation[1] = 0;
        }
        //if collision stop the movement in the same direction
        else if(collision){
            translation[0] *= -1;
            translation[1] *= -1;
            utils.clearKeys();
        }

        circleX += translation[0];
        circleY += translation[1];

        ctx.strokeStyle = "white";
        ctx.save();
        ctx.beginPath();
        ctx.arc(circleX,circleY,60,0,Math.PI * 2, false);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();        
    }
    for(let i = 0; i < numWalk; i++){
        walkers[i].translatePos(translation);
        walkers[i].draw(ctx);
    }
    
    drawWalls();

}

function drawWalls(){
    for(let i = 0; i < numWalls; i++){
        walls[i].translatePos(translation);
        walls[i].draw(ctx);
    }
}

function canvasClicked(e){
    let rect = e.target.getBoundingClientRect();
    mouseX = e.clientX - rect.x;
    mouseY = e.clientY - rect.y;
    bullets[0] = new bullet_class.Bullet(player);
    bullets[0].shoot(mouseX, mouseY);
}


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


export{init};