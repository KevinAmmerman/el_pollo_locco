class Chicken extends MovableObject {
    y = 350;
    width = 70;
    height = 80;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    chicken_sound = new Audio('audio/chicken.mp3');
    
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 200 + Math.random() * 500; // gives out a random x position for each chicken
        this.speed = 0.15 + Math.random() * 0.25; // gives out a random speed for each chicken
        this.loadImages(this.IMAGES_WALKING); // loads the image pathes into an JSON
        this.animate(); 
    }

    
    animate()  {
        setInterval(() => {
            this.moveLeft(); // lets the chicken move to the left
        }, 1000 / 60);
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }
}