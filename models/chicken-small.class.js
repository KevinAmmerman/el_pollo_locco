class ChickenSmall extends MovableObject {
    width = 50;
    height = 60;
    y = 370;
    energy = 1;
    offset = {
        left: 5,
        right: 10,
        top: 5,
        bottom: 10
    }
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ]
    IMAGE_DEAD = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';
    chicken_sound = new Audio('audio/chicken.mp3');
    

    constructor(x) {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.x = x;
        this.speed = 0.15 + Math.random() * 1;
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
        this.isDead();
    }


    animate() {
        const moveInterval = setInterval(() => {
            if (!world.gamePaused && gameStarted && !world.isGameOver) this.moveLeft();
        }, 1000 / 60);
        const animateInterval = setInterval(() => {
            if (!world.gamePaused && !world.isGameOver) this.playAnimation(this.IMAGES_WALKING)
        }, 200);
        setStoppableInterval(() => this.enemyKill(this.energy, moveInterval, animateInterval, this.IMAGE_DEAD), 200);
    }
}