class Player
{
    constructor(x, y, health, damage, name)
    {
        this.x = x;
        this.y = y;
        this.health = health;
        this.damage = damage;
        this.name = name;
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
        ctx.rect(x,y,5,5);
        ctx.closePath();
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.restore();
    }
}