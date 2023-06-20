class DrawableObject {
    x = 120;
    y = 250;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;
    
    loadImage(path) {
        imagesToLoad++;
        this.img = new Image();
        this.img.onload = function() {
            imageLoaded++;
            let percent = (imageLoaded / imagesToLoad) * 100;
            // console.log(`${percent} loaded`);
        }
        this.img.src = path;
    }


    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof ChickenSmall || this instanceof Endboss || this instanceof ThrowableObject) {
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = "blue";
            // ctx.rect(this.x , this.y, this.width, this.height);
            // ctx.rect(this.x +this.offset.right, this.y +this.offset.top, this.width -this.offset.right, this.height -this.offset.bottom);
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top,(this.x + this.width - this.offset.right) - (this.x + this.offset.left),(this.y + this.height - this.offset.bottom) - (this.y + this.offset.top));

            ctx.stroke();
        }
    }
}