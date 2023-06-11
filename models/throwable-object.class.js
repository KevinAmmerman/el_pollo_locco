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
    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];
    throw_animation;

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.throw(x, y);
        this.animate();
    }

    throw(x, y) {
        this.x = x;
        this.y = y;
        this.speedY = 25;
        this.applyGravity();
        this.throw_animation = setInterval(() => {
            this.x += 20;
        }, 50);
        this.rotateBottle();
    }

    animate() {
        setInterval(() => {
            this.rotateBottle();
            this.splashBottle();
        }, 100);
    }

    rotateBottle() {
        this.playAnimation(this.IMAGES_ROTATION);
    }

    splashBottle() {
        if (this.y > 320) {
            clearInterval(this.throw_animation);
            this.playAnimation(this.IMAGES_SPLASH);
        }
    }

    // splashBottle() {
    //     clearInterval(this.throw_animation);
    //     this.playAnimation(this.IMAGES_SPLASH);
    // }
}