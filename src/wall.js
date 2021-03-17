import * as utils from "./utils.js";

export class Wall{
    x = 0;
    y = 0;
    width = 0;
    height = 0;

    constructor(x,y,width,height){

        //checks to make sure nothing was inputed. If 0s are inputed
        //then create random walls.
        if(x == 0 && y == 0 && width == 0 && height == 0){
            this.x = utils.getRandomInt(-500, 1300);
            this.y = utils.getRandomInt(-300, 900);
            if(utils.getRandomInt(0,1) == 1){
                this.width = utils.getRandomInt(50,200);
                this.height = 15;
            }
            else{
                this.width = 15;
                this.height = utils.getRandomInt(50,200);
            }
        }
        //otherwise set the inputed variables
        else{
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }
    }

    //draw the walls in a light gray color.
    draw(ctx){
        ctx.save();
        ctx.fillStyle = "lightgray";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.restore();
    }

    //tranlate the position of the walls when the player moves.
    translatePos(translation){
        this.x += translation[0];
        this.y += translation[1];
    }

}