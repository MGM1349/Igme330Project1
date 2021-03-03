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
}