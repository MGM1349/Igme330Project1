//creates player object
export class Player{
    constructor(x, y, health=3, damage, name, width, height){
        this.x = x;
        this.y = y;
        this.health = health;
        this.damage = damage;
        this.name = name;
        this.width = width;
        this.height = height;
        this.alive = true;
        this.originalHealth = health;
    } 

    //takes in an int and subtracts it from the players health
    takeDamage(damage)    {
        this.health -= damage;
        if (this.health <= 0)
        {
            this.alive = false;
        }
    }

    //draws the player and its health bar
    draw(ctx){
        ctx.save();        
        ctx.beginPath();
        ctx.rect(this.x-this.width/2,this.y-this.height/2,this.width,this.height);
        ctx.closePath();
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.restore();

        ctx.save();
        ctx.beginPath();
        ctx.rect(0,570,800 * (this.health/this.originalHealth),30);
        ctx.closePath();
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.restore();
    }
}

