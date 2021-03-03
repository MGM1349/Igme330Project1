import * as randomWalker from "./randomWalker.js";
import * as wall from "./wall.js";
import * as utils from "./utils.js";
import * as player_class from "./player_class.js";

let canvas, ctx;
let walkers;
let player;
let numWalk;
let translation = [0,0];

const canvasWidth = 800, canvasHeight = 600;



function init(){
    canvas = document.querySelector('canvas');
    canvas.width = canvasWidth;
	canvas.height = canvasHeight;
	ctx = canvas.getContext("2d");

    window.addEventListener("keydown", utils.keysDown);
    window.addEventListener("keyup", utils.keysUp);

    numWalk = 20;
    walkers = [];    
    for(let i = 0;i < numWalk; i++){
        walkers[i] = new randomWalker.RandomWalker(i*50, i*50, 5, 5);
    }

    player = new player_class.Player(canvasWidth/2, canvasHeight/2, 3, 1, "Marc is dumb");
    loop();
}

function loop(){
    requestAnimationFrame(loop);

    playerDamage();

    draw();

}

//handles all drawing to the canvas
function draw(){
    ctx.save();
	ctx.fillStyle = "black";
	ctx.fillRect(0,0,canvasWidth,canvasHeight);
	ctx.restore();

    player.draw(ctx)
    
    translation = utils.playerMovement();
    for(let i = 0; i < numWalk; i++){
        walkers[i].draw(ctx, translation);
    }
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