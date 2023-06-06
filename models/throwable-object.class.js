class ThrowableObject extends MovableObject {
    x = 100;
    y = 340;
    width = 50;
    height = 90;

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.throw(x, y);
    }

    throw(x, y) {
        this.x = x;
        this.y = y;
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 25;
        }, 50);
    }
}