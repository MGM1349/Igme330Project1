let keys = {};

function checkCollisionWithWall(){

}

function keysDown(e){
    keys[e.keyCode] = true;
}

function keysUp(e){
    keys[e.keyCode] = false;
}

function playerMovement(){
    let translate = [0,0];
    let x = 0;
    let y = 1;

    if (keys["87"])
    {
        translate[y] = 1;        
    }
    if (keys["68"])
    {
        translate[x] = -1;
    }
    if (keys["83"])
    {
        translate[y] = -1;
    }
    if (keys["65"])
    {
        translate[x] = 1;
    }

    return translate;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function drawBackground(ctx){
    ctx.save();
	ctx.fillStyle = "black";
	ctx.fillRect(0,0,canvasWidth,canvasHeight);
    player.draw(ctx);
	ctx.restore();
}

export{checkCollisionWithWall, keysDown, keysUp, playerMovement, getRandomInt, drawBackground};