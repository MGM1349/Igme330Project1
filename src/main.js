import * as randomWalker from "./randomWalker.js";
import * as wall from "./wall.js";
import * as utils from "./utils.js";
import * as player_class from "./player_class.js";

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
    
    player = new player_class.Player(canvasWidth/2, canvasHeight/2, 3, 1, "Marc is dumb");
    player.draw(ctx);

    numWalk = 20;
    walkers = [];    
    for(let i = 0;i < numWalk; i++){
        walkers[i] = new randomWalker.RandomWalker(utils.getRandomInt(-500, 1300), utils.getRandomInt(-300, 900), 5, 5);
    }
    walkerDraw();
    
    document.querySelector("#endTurn").onclick = function endTurn(){endedTurn = true;}    

    loop();
}

function loop(){
    requestAnimationFrame(loop);    

    if(playersTurn){
        translateDraw();        
        if (endedTurn){
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
        walkers[i].calculateNewPosition(player);
        walkers[i].draw(ctx);
    }
}

function translateDraw(){

    ctx.save();
	ctx.fillStyle = "black";
	ctx.fillRect(0,0,canvasWidth,canvasHeight);
    player.draw(ctx);
	ctx.restore();
    

    translation = utils.playerMovement();
    let distanceAway = utils.distanceAway(circleX + translation[0], circleY + translation[1], player.x, player.y);
    
    if(distanceAway >= 60){
        translation[0] = 0;
        translation[1] = 0;
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

    for(let i = 0; i < numWalk; i++){
        walkers[i].translatePos(translation);
        walkers[i].draw(ctx);
    }
}

function canvasClicked(e){
    let rect = e.target.getBoundingClientRect();
    mouseX = e.clientX - rect.x;
    mouseY = e.clientY - rect.y;
    //console.log(mouseX + ", "  + mouseY);
    shoot();
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

function shoot(){
    if (playersTurn == true){
        for (let i = 0; i < numWalk; i++){
            if (mouseX > walkers[i].position[0] - 3 && mouseX < walkers[i].position[0] + 8
            && mouseY > walkers[i].position[1] - 3 && mouseY < walkers[i].position[1] + 8){
                walkers.splice(i, 1);
                numWalk--;            
                break;
                //console.log("it worked");
            }
        }
        endedTurn = true;   
    }         
}

export{init};