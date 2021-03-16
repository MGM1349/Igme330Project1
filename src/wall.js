import * as utils from "./utils.js";

export class Wall{
    x = 0;
    y = 0;
    width = 0;
    height = 0;

    constructor(){
        this.x = utils.getRandomInt(-500, 1300);
        this.y = utils.getRandomInt(-300, 900);
        if(utils.getRandomInt(0,1) == 1){
            //utils.getRandomInt(-500, 1300), utils.getRandomInt(-300, 900), utils.getRandomInt(10, 30), utils.getRandomInt(10, 30)
            this.width = utils.getRandomInt(50,200);
            this.height = 15;
        }
        else{
            this.width = 15;
            this.height = utils.getRandomInt(50,200);
        }
    }

    draw(ctx){
        ctx.save();
        ctx.fillStyle = "white";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.restore();
    }

    translatePos(translation){
        this.x += translation[0];
        this.y += translation[1];
    }

}