import * as utils from "./utils.js";

export class RandomWalker{
    prevX = utils.getRandomInt(-1,2);
    prevY = utils.getRandomInt(-1,2);
    x = 0;
    y = 0;
    width = 0;
    height = 0;

    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw(ctx){
        ctx.save();
        ctx.fillStyle = "green";
        ctx.fillRect(this.x-this.width/2,this.y-this.height/2,this.width,this.height);
        ctx.restore();
    }

    calculateNewPosition(player){
        let newX = 0;
        let newY = 0;

        let distanceAway = utils.distanceAway(this.x, this.y, player.x, player.y);
        if(distanceAway < 80){
            let rotation = Math.atan2(player.y - this.y, player.x - this.x);
            newX += Math.cos(rotation) * .5;
            newY += Math.sin(rotation) * .5;
        }
        else{
            let rand = utils.getRandomInt(0,11);
            if (rand > 0 && rand <= 6)
            {
                newX = this.prevX;
                newY = this.prevY;
            }
            else if(rand > 6 && rand <= 7){
                newX = 0;
                newY = 2.5;
            }
            else if(rand > 7 && rand <= 8){
                newX = 0;
                newY = -2.5;
            }
            else if(rand > 8 && rand <= 9){
                newX = -2.5;
                newY = 0;
            }
            else if(rand > 9 && rand <= 10){
                newX = 2.5;
                newY = 0;
            } 
        }

        this.prevX = newX;
        this.prevY = newY;
        this.x += newX;
        this.y += newY;

    }

    collideWithWall(){
        this.x -= this.prevX;
        this.y -= this.prevY;
    }

    hitPlayer(player){
        let halfHeight = player.height / 2;
        let halfWidth = player.width / 2;

        if(player.x + halfWidth > this.x && player.x - halfWidth < this.x + (this.width / 2) 
            && player.y + halfHeight > this.y && player.y - halfHeight < this.y + (this.height / 2)){
                return 1;
        }
        else{
            return 0;
        }
    }

    translatePos(translation){
        this.x += translation[0];
        this.y += translation[1];
    }
}