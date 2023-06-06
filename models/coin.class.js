class Coin extends DrawableObject {
    width = 75;
    height = 75;

    constructor() {
        super().loadImage('img/7_statusbars/3_icons/icon_coin.png');
        this.x = -500 + Math.random() * 2300;
        this.y = 50 + Math.random() * 200;
    }
}