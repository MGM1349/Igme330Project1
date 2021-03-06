import * as utils from "./utils.js";

export class RandomWalker{
    prevX = utils.getRandomInt(-1,2);
    prevY = utils.getRandomInt(-1,2);
    position = [0,0];
    width = 0;
    height = 0;

    constructor(x,y,width,height){
        this.position[0] = x;
        this.position[1] = y;
        this.width = width;
        this.height = height;
    }

    draw(ctx){
        ctx.fillStyle = "green";
        ctx.fillRect(this.position[0], this.position[1], this.width, this.height);
    }

    calculateNewPosition(player, translation){
        let newX = 0;
        let newY = 0;

        let distanceAway = utils.distanceAway(this.position[0], this.position[1], player.x, player.y);
        if(distanceAway < 80){
            let rotation = Math.atan2(player.y - this.position[1], player.x - this.position[0]);
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
                newY = 1;
            }
            else if(rand > 7 && rand <= 8){
                newX = 0;
                newY = -1;
            }
            else if(rand > 8 && rand <= 9){
                newX = -1;
                newY = 0;
            }
            else if(rand > 9 && rand <= 10){
                newX = 1;
                newY = 0;
            } 
        }

        this.prevX = newX;
        this.prevY = newY;
        this.position[0] += newX;
        this.position[1] += newY;
        //return [this.position[0] + newX, this.position[1] + newY];

    }

    hitPlayer(player){
        let halfHeight = player.height / 2;
        let halfWidth = player.width / 2;

        if(player.x + halfWidth > this.position[0] && player.x - halfWidth < this.position[0] + this.width
            && player.y + halfHeight > this.position[1] && player.y - halfHeight < this.position[1] + this.height){
                return 1;
        }
        else{
            return 0;
        }
    }

    translatePos(translation){
        this.position[0] += translation[0];
        this.position[1] += translation[1];
    }
}