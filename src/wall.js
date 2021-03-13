export class Wall{
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
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    translatePos(translation){
        this.x += translation[0];
        this.y += translation[1];
    }

}