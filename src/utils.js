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

function randomXY(){
    
}

export{checkCollisionWithWall, keysDown, keysUp, playerMovement};