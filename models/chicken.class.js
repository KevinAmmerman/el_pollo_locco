class Chicken extends MovableObject {
    y = 350;
    width = 70;
    height = 80;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGE_DEAD = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    energy = 2;
    chicken_sound = new Audio('audio/chicken.mp3');
    
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 200 + Math.random() * 1800; // gives out a random x position for each chicken
        this.speed = 0.15 + Math.random() * 0.25; // gives out a random speed for each chicken
        this.loadImages(this.IMAGES_WALKING); // loads the image pathes into an JSON
        this.animate(); 
    }

    
    animate()  {
        const moveInterval = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        const animateInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
        setInterval(() => {
            this.enemyKill(this.energy, moveInterval, animateInterval, this.IMAGE_DEAD);
        }, 200);
    }
}