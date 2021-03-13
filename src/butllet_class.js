export class Bullet{
    constructor(player){  
        this.speed = 1;   
        this.height = 5;
        this.width = 5;
        this.x = player.x;
        this.y = player.y;
        this.rotation;
    }

    shoot(mouseX, mouseY){
        this.rotation = Math.atan2(mouseY - this.y, mouseX - this.x);        
    }

    draw(ctx){
        ctx.save();        
        ctx.beginPath();
        ctx.rect(this.x-this.width/2,this.y-this.height/2,this.width,this.height);
        ctx.closePath();
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.restore();

        this.x += Math.cos(this.rotation)*this.speed;
        this.y += Math.sin(this.rotation)*this.speed;
    }
}