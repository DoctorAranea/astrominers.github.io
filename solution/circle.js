class Circle 
{
    constructor(x, y, r, c) 
    {
        this.x = x;
        this.y = y;
        this.r = r;
        this.c = c;
    }

    draw(ctx) 
    {
        ctx.beginPath();
        ctx.strokeStyle = this.c;
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        ctx.stroke();
    }
}