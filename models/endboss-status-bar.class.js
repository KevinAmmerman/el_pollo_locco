class EndbossStatusBar extends DrawableObject {
    IMAGES_HEALTH = [
        'img/7_statusbars/2_statusbar_endboss/0.png',
        'img/7_statusbars/2_statusbar_endboss/20.png',
        'img/7_statusbars/2_statusbar_endboss/40.png',
        'img/7_statusbars/2_statusbar_endboss/60.png',
        'img/7_statusbars/2_statusbar_endboss/80.png',
        'img/7_statusbars/2_statusbar_endboss/100.png',
    ];
    x = 495;
    y = 20;
    width = 200;
    height = 50;
    percentage = 100;

    constructor() {
        super();
        this.loadImage('img/7_statusbars/3_icons/icon_health_endboss.png')
        this.loadImages(this.IMAGES_HEALTH);
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_HEALTH[this.resolvePercentage()];
        this.img = this.imageCache[path];
    }

    resolvePercentage() {
        if (this.percentage > 13) {
            return 5;
        } else if(this.percentage > 10) {
            return 4;
        } else if(this.percentage > 7) {
            return 3;
        } else if(this.percentage > 4) {
            return 2;
        } else if(this.percentage > 0) {
            return 1;
        } else {
            return 0;
        }
    }

    decreaseEnergyOfEndbossStatusBar(enemy) {
        if (enemy instanceof Endboss) {
            this.setPercentage(enemy.energy);
        } else {
            return;
        }
    }
}