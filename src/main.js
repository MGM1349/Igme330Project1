import * as randomWalker from "./randomWalker.js";
import * as wall from "./wall.js";
import * as utils from "./utils.js";
import * as player_class from "./player_class.js";

let canvas, ctx;
let walkers;
let player;
let numWalk;
let translation = [0,0];
let moved = false;
let hasShot = false;
let endedTurn = false;
let mouseX = 0;
let mouseY = 0;
let circleX = 400;
let circleY = 300;

const canvasWidth = 800, canvasHeight = 600;
let playersTurn = true;

function init(){
    canvas = document.querySelector('canvas');
    canvas.width = canvasWidth;
	canvas.height = canvasHeight;
	ctx = canvas.getContext("2d");

    window.addEventListener("keydown", utils.keysDown);
    window.addEventListener("keyup", utils.keysUp);

    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvasWidth,canvasHeight);
    
    player = new player_class.Player(canvasWidth/2, canvasHeight/2, 3, 1, "Marc is dumb");
    player.draw(ctx);

    numWalk = 20;
    walkers = [];    
    for(let i = 0;i < numWalk; i++){
        walkers[i] = new randomWalker.RandomWalker(i*50, i*50, 5, 5);
    }
    walkerDraw();

    
    document.querySelector("#endTurn").onclick = function endTurn(){endedTurn = true;}
    canvas.onclick = canvasClicked;

    loop();

}

function loop(){
    requestAnimationFrame(loop);    

    if(playersTurn){
        translateDraw();
        if (endedTurn){
            playersTurn = false;
        }
    }
    else{
        walkerDraw();
        playerDamage();
        endedTurn = false;
        moved = false;
    }    

}

function walkerDraw(){
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

}

export{init};