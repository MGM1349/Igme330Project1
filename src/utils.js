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
	ctx.fillRect(0,0,800,600);
	ctx.restore();
}

//checks the distance one object (x1, y1) 
//and another object (x2, y2)
function distanceAway(x1,y1,x2,y2){
    let distanceX = x1 - x2;
    let distanceY = y1 - y2;
    let distanceAway = Math.pow((Math.pow(distanceX,2) + Math.pow(distanceY,2)), .5);
    return distanceAway;
}

export{checkCollisionWithWall, keysDown, keysUp, playerMovement, getRandomInt, drawBackground, distanceAway};