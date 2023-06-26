class World {
    character = new Character();
    level = level1;
    statusBar = new StatusBar();
    bottleStatusBar = new BottleStatusBar();
    coinStatusBar = new CoinStatusBar();
    endbossStatusBar = new EndbossStatusBar();
    throwableObject = [];
    gamePaused = false;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    throwCooldown = 0;
    throwDelay = 1500;
    gameMusic_sound = new Audio('audio/gameMusic.mp3');
    endBossFight_sound = new Audio('audio/endboss_fight.mp3');
    endbossFight = false;
    characterImmortal = false;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.run();
    }


    run() {
        setStoppableInterval(() => {
            this.checkCollisionsWithEnemy();
            this.checkCollisionOfBottleWithEnemy();
            this.checkCollisionWithCollectible(this.level.bottles, this.character, "collectedBottles", this.bottleStatusBar, this.character.bottle_sound);
            this.checkCollisionWithCollectible(this.level.coins, this.character, "collectedCoins", this.coinStatusBar, this.character.coin_sound);
            this.throwBottle();
            this.checkForEndOfGame();
            this.bottleStatusBar.setPercentage(this.bottleStatusBar.percentage);
            if (this.throwCooldown > 0) {
                this.throwCooldown -= 100;
            }
        }, 100);
    }


    throwBottle() {
        if (keyboard.D && this.character.collectedBottles > 0 && this.throwCooldown <= 0 && !this.gamePaused && gameStarted) {
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
                enemy.hit();
                this.endbossStatusBar.decreaseEnergyOfEndbossStatusBar(enemy);
                this.character.jump();
                if (enemy.energy == 0) {
                    this.deleteEnemy(enemy);
                    this.chickenSound(enemy);
                }
            }
            if (this.character.isCollidingOld(enemy) && !this.character.isAboveGround() && this.character.energy > 0 && enemy.energy > 0 && !this.characterImmortal) {
                this.character.hit(true);
                this.character.hurt_sound.play();
                this.statusBar.setPercentage(this.character.energy);
                this.setImmortalTimer();
            }
        });
    }


    checkCollisionOfBottleWithEnemy() {
        if (this.throwableObject.length > 0) {
            this.level.enemies.forEach(enemy => {
                this.throwableObject.forEach(bottle => {
                    if (bottle.isCollidingOld(enemy) && enemy.energy > 0) {
                        enemy.energy--;
                        this.breakingGlassSound();
                        this.deleteBottle(bottle);
                        enemy.hit();
                        this.endbossStatusBar.decreaseEnergyOfEndbossStatusBar(enemy);
                        if (enemy.energy == 0) {
                            this.deleteEnemy(enemy);
                            this.chickenSound(enemy);
                        }
                    } else if (!bottle.isCollidingOld(enemy) && !bottle.isAboveGround()) {
                        this.breakingGlassSound();
                        this.deleteBottle(bottle);
                    }
                });
            });
        }
    }


    checkForEndOfGame() {
        if (!this.checkIfEndboss()) {
            setTimeout(() => {
                stopGame();
                this.character.win_sound.play();
            }, 1000);
        } 
        if (this.character.energy == 0) {
            setTimeout(() => {
                stopGame();
                this.character.gameOver_sound.play();
            }, 1000);
        }
    }

    setImmortalTimer() {
        this.characterImmortal = true;
        setTimeout(() => this.characterImmortal = false, 150);
    }

    checkIfEndboss() {
        return this.level.enemies.some(enemy => enemy instanceof Endboss);
    }


    breakingGlassSound() {
        this.character.breaking_glass_sound.play();
    }


    chickenSound(enemy) {
        enemy.chicken_sound.play();
    }


    deleteBottle(bottle) {
        setTimeout(() => this.throwableObject.splice(this.throwableObject.indexOf(bottle)), 200);
    }


    deleteEnemy(enemy) {
        setTimeout(() => this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1), 2000);
    }


    checkCollisionWithCollectible(collectibles, character, countPropertyName, statusBar, sound) {
        collectibles.forEach((collectible, index) => {
            if (this.character.isCollidingOld(collectible)) {
                collectibles.splice(index, 1);
                character[countPropertyName]++;
                statusBar.setPercentage(character[countPropertyName]);
                if (sound) sound.play();
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
        this.addToMap(this.endbossStatusBar);
        this.addToMap(this.coinStatusBar);
        this.addToMap(this.bottleStatusBar);
        this.addToMap(this.statusBar);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObject);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);

        requestAnimationFrame(() => {
            this.draw();
        });
    }


    addObjectsToMap(object) {
        object.forEach(o => {
            this.addToMap(o);
        });
    }


    addToMap(mo) {
        if (mo.otherDirection) this.mirrowImage(mo);
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        if (mo.otherDirection) this.mirrowImageReset(mo);
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