class MovableObject extends DrawableObject {
    speed = .15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    collectedBottles = 0;
    collectedCoins = 0;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    // isColliding(obj) {
    //     return (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) &&
    //         (this.y + this.offsetY + this.height) >= obj.y &&
    //         (this.y + this.offsetY) <= (obj.y + obj.height);
    // }

    isCollidingOld(obj) {
        return this.x + this.width > obj.x &&
            this.y + this.height > obj.y &&
            this.x < obj.x &&
            this.y < obj.y + obj.height
    }


    hit() {
        this.energy -= 5
        this.lastHit = new Date().getTime();
    }


    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < .8;
    }


    isDead() {
        return this.energy == 0;
    }


    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 160;
        }
    }


    moveRight() {
        this.x += this.speed;
    }


    moveLeft() {
        this.x -= this.speed;
    }


    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];  // chnages the walking image in a endless loop
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    jump() {
        this.speedY = 30;
    }

    enemyKill(energy, mI, aI, image) {
        if (energy == 0) {
            clearInterval(mI);
            clearInterval(aI);
            this.loadImage(image);
        }
    }
}