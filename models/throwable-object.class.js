class ThrowableObject extends MovableObject {
    x = 100;
    y = 340;
    width = 50;
    height = 90;
    IMAGES_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_ROTATION);
        this.throw(x, y);
    }

    throw(x, y) {
        this.x = x;
        this.y = y;
        this.speedY = 25;
        this.applyGravity();
        setInterval(() => {
            this.x += 20;
            
        }, 50);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_ROTATION);
        }, 100);
    }
}