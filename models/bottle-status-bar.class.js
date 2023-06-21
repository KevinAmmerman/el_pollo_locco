class BottleStatusBar extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ];
    x = 20;
    y = 60;
    width = 200;
    height = 50;
    percentage = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(0);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolvePercentage()];
        this.img = this.imageCache[path];
    }

    resolvePercentage() {
        if (this.percentage >= 10) {
            return 5;
        } else if(this.percentage > 8) {
            return 4;
        } else if(this.percentage > 6) {
            return 3;
        } else if(this.percentage > 3) {
            return 2;
        } else if(this.percentage >= 1) {
            return 1;
        } else {
            return 0;
        }
    }
}