export class Player
{
    constructor(x, y, health=3, damage, name)
    {
        this.x = x;
        this.y = y;
        this.health = health;
        this.damage = damage;
        this.name = name;
        width = 5;
        height = 5;
        alive = true;
    } 

    takeDamage(damage)
    {
        this.health -= damage;
        if (this.health <= 0)
        {
            alive = false;
        }
    }

    draw(ctx)
    {
        ctx.save();        
        ctx.beginPath();
        ctx.rect(x-width/2,y-height/2,5,5);
        ctx.closePath();
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.restore();
    }
}