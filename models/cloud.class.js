class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 250;

    constructor(x) {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.anitmate();
        this.x = x;
    }

    anitmate() {
        setStoppableInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}