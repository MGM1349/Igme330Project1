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
        let newPosition = this.calculateNewPosition();
        this.prevPosition = this.position;
        console.log(this.prevPosition);
        this.position = newPosition;
        ctx.fillRect(this.position[0], this.position[1], this.width, this.height);
    }

    calculateNewPosition(){
        let rand = Math.floor(Math.random() * 10) + 1;
        let newX = 0;
        let newY = 0;
        if(rand <= 6){
            if(this.prevPosition[0] == 0 && this.prevPosition[1] == 0){
                newX = 1;
                newY = 0;
            }
            else{
                newX = this.position[0] - this.prevPosition[0];
                newY = this.position[1] - this.prevPosition[1];
            }
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

        return [this.position[0] + newX, this.position[1] + newY];

    }

    hitPlayer(player){
        let halfHeight = player.height / 2;
        let halfWidth = player.width / 2;

        if(player.x + halfWidth < this.position[0] || player.x - halfWidth > this.position[0] + this.width
            || player.y + halfHeight < this.position[1] || player.y - halfHeight > this.position[1] + this.height){
                return 1;
        }
        else{
            return 0;
        }
    }
}