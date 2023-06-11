class World {
    character = new Character();
    level = level1;
    statusBar = new StatusBar();
    bottleStatusBar = new BottleStatusBar();
    coinStatusBar = new CoinStatusBar();
    throwableObject = [];
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    throwCooldown = 0;
    throwDelay = 1000;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }


    setWorld() {
        this.character.world = this;
    }


    run() {
        setInterval(() => {
            this.checkCollisionsWithEnemy();
            this.checkCollisionOfBottleWithEnemy();
            this.checkCollisionWithBottle();
            this.checkCollisionWithCoin();
            if (this.throwCooldown > 0) {
                this.throwCooldown -= 100;
            }
            this.throwBottle();
            this.bottleStatusBar.setPercentage(this.bottleStatusBar.percentage);
            // console.log(this.throwCooldown);
            // console.log(this.character.collectedBottles);
        }, 100);
    }

    throwBottle() {
        if (this.keyboard.SPACE && this.character.collectedBottles > 0 && this.throwCooldown <= 0) {
            let bottle = new ThrowableObject(this.character.x + 40, this.character.y + 100);
            this.throwableObject.push(bottle);
            this.character.collectedBottles--;
            this.bottleStatusBar.percentage--;
            this.character.throw_sound.play();
            this.throwCooldown = this.throwDelay;
        }
    }


    checkCollisionsWithEnemy() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isCollidingOld(enemy) && this.character.isAboveGround() && enemy.energy > 0 && this.character.speedY < 0) {
                enemy.energy--;
                this.character.jump();
                if (enemy.energy == 0) {
                    this.deleteEnemy(enemy);
                }
            }
            if (this.character.isCollidingOld(enemy) && !this.character.isAboveGround() && this.character.energy > 0 && enemy.energy > 0) {
                this.character.hit();
                this.character.hurt_sound.play();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    checkCollisionOfBottleWithEnemy() {
        if (this.throwableObject.length > 0) {
            this.level.enemies.forEach(enemy => {
                this.throwableObject.forEach(bottle => {
                    if (bottle.isCollidingOld(enemy) && enemy.energy > 0) {
                        enemy.energy--;
                        this.timeDelayedSound();
                        this.deleteBottle(bottle);
                        if (enemy.energy == 0) {
                            this.deleteEnemy(enemy);
                        }
                    }
                    if (!bottle.isCollidingOld(enemy) && !bottle.isAboveGround()) {
                        this.timeDelayedSound();
                        this.deleteBottle(bottle);
                    }
                });
            });
        }
    }

    timeDelayedSound() {
        this.character.breaking_glass_sound.play();
    }


    deleteBottle(bottle) {
        setTimeout(() => {
            this.throwableObject.splice(this.throwableObject.indexOf(bottle));
        }, 200);
    }


    deleteEnemy(enemy) {
        setTimeout(() => {
            this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
        }, 1000);
    }

    checkCollisionWithBottle() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isCollidingOld(bottle) && this.character.collectedBottles <= 10) {
                this.level.bottles.splice(index, 1);
                this.character.collectedBottles++;
                this.character.bottle_sound.play();
                this.bottleStatusBar.setPercentage(this.character.collectedBottles);
            }
        });
    }

    checkCollisionWithCoin() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isCollidingOld(coin)) {
                this.level.coins.splice(index, 1);
                this.character.collectedCoins++;
                this.coinStatusBar.setPercentage(this.character.collectedCoins);
            }
        });
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // clears the canvas before draw new objects.
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);
        // Space for non movable objects ------------------
        this.addToMap(this.coinStatusBar);
        this.addToMap(this.bottleStatusBar);
        this.addToMap(this.statusBar);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.throwableObject);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    addObjectsToMap(object) {
        object.forEach(o => {
            this.addToMap(o);
        });
    }


    addToMap(mo) {
        if (mo.otherDirection) {
            this.mirrowImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.mirrowImageReset(mo);
        }
    }


    mirrowImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    mirrowImageReset(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}