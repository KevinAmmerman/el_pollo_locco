class ChickenSmall extends MovableObject {
    width = 50;
    height = 60;
    y = 370;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ]
    IMAGE_DEAD = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';
    energy = 1;

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.x = 200 + Math.random() * 1800;
        this.speed = 0.15 + Math.random() * 0.25;
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
        this.isDead();
    }


    animate() {
        const moveInterval = setInterval(() => {
            this.moveLeft(); // lets the chicken move to the left
        }, 1000 / 60);
        const animateInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);

        if(this.enery == 0) {
            
        }
    }
}