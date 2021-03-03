export class RandomWalker{
    prevPosition = [0,0];
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

        let distanceX = this.position[0] - player.x;
        let distanceY = this.position[1] - player.y;
        let distanceAway = Math.pow((Math.pow(distanceX,2) + Math.pow(distanceY,2)), .5);
        if(distanceAway < 80){
            let rotation = Math.atan2(player.y - this.position[1], player.x - this.position[0]);
            newX += Math.cos(rotation) * .5;
            newY += Math.sin(rotation) * .5;

        }
        else{
            let rand = Math.floor(Math.random() * 8) + 1;
            if(rand > 0 && rand <= 2){
                newX = 0;
                newY = 1;
            }
            else if(rand > 2 && rand <= 4){
                newX = 0;
                newY = -1;
            }
            else if(rand > 4 && rand <= 6){
                newX = -1;
                newY = 0;
            }
            else if(rand > 6 && rand <= 8){
                newX = 1;
                newY = 0;
            } 
        }

        this.prevPosition = this.position;
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