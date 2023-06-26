class Chicken extends MovableObject {
    y = 350;
    width = 70;
    height = 80;
    energy = 2;
    offset = {
        left: 0,
        right: 0,
        top: 5,
        bottom: 10
    }
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGE_DEAD = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    chicken_sound = new Audio('audio/chicken.mp3');
    
    constructor(x) {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = x + Math.random() * 1800; // gives out a random x position for each chicken
        this.speed = 0.15 + Math.random() * 1; // gives out a random speed for each chicken
        this.loadImages(this.IMAGES_WALKING); // loads the image pathes into an JSON
        this.animate(); 
    }

    
    animate()  {
        const moveInterval = setInterval(() => {
            if (gameStarted) {
                this.moveLeft();
            }
        }, 1000 / 60);
        const animateInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
        setStoppableInterval(() => {
            this.enemyKill(this.energy, moveInterval, animateInterval, this.IMAGE_DEAD);
        }, 200);
    }
}