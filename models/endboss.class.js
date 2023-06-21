class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 50;
    energy = 15;
    world;
    speed = 6;
    offset = {
        left: 15,
        right: 20,
        top: 80,
        bottom: 30
    }
    positionEnd = false;
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];
    chicken_sound = new Audio('audio/endboss_hurt.mp3');

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 2500;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        setTimeout(() => {
            this.animate();
        }, 5000);
    }

    animate() {
        const moveInterval = setInterval(() => {
            if ((2500 - this.world.character.x) < 800 && this.x > this.world.character.x && this.positionEnd && gameStarted) {
                this.moveLeft();
                this.otherDirection = false;
            } else if ((2500 - this.world.character.x) > 800 && this.x < 2500 && this.positionEnd && gameStarted) {
                this.moveRight();
                this.otherDirection = true;
            }
        }, 1000 / 60);
        
        setInterval(() => {
            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (!this.positionEnd) {
                this.playAnimation(this.IMAGES_ALERT);
            } else if (this.world.character.isHurt()) {
                this.playAnimation(this.IMAGES_ATTACK)
            } else if (this.energy == 0) {
                this.endBossDead(moveInterval);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
            this.startEndBoss();
            // console.log('energy Boss', this.energy)
        }, 200);
    }

    startEndBoss() {
        if ((2500 - this.world.character.x) < 700) {
            setTimeout(() => {
                this.positionEnd = true;
            }, 2500);
        }
    }

    endBossDead(mI) {
        clearInterval(mI);
        this.playAnimation(this.IMAGES_DEAD);
    }
}