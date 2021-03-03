export class Player{
    constructor(x, y, health=3, damage, name)    {
        this.x = x;
        this.y = y;
        this.health = health;
        this.damage = damage;
        this.name = name;
        this.width = 10;
        this.height = 10;
        this.alive = true;
    } 

    takeDamage(damage)    {
        this.health -= damage;
        if (this.health <= 0)
        {
            this.alive = false;
        }
    }

    draw(ctx){
        ctx.save();        
        ctx.beginPath();
        ctx.rect(this.x-this.width/2,this.y-this.height/2,this.width,this.height);
        ctx.closePath();
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.restore();
    }
}

