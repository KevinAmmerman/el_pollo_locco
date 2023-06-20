class Bottle extends DrawableObject {
    width = 50;
    height = 90;
    y = 340;
    offset = {
        left: 20,
        right: 8,
        top: 15,
        bottom: 8
    }

    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.x = 400 + Math.random() * 1800;
    }
}