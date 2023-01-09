
interface GameObject {
    position: { x: number, y: number },
    // height: number;
    // width: number;
    // scale: number,
    // imageSource: string,
    // framesMax: number,
    // offset: { x: number, y: number },
    // rotation?: number,
}

// 🥩🦕
export class Sprite implements GameObject {
    position: { x: number, y: number };
    velocity?: number;
    image: HTMLImageElement;
    framesMax: number;
    framesCurrent: number = 0;
    framesElapsed: number = 0;
    framesHold: number = 5;
    scale: number;
    // height: number;
    // width: number;
    offset: { x: number; y: number };

    constructor(
        position: { x: number, y: number },
        imageSource: string,
        framesMax: number,
        offset: { x: number, y: number } = { x: 0, y: 0 },
        scale: number = 1,
        // sprites: { [key: string]: HTMLImageElement } = {},
        // hitBox: { position: { x: number, y: number }, width: number, height: number } = { position: {x: 0, y: 0}, width: 0, height: 0 }
    ) {
        this.position = position;
        this.image = new Image();
        this.image.src = imageSource;
        this.framesMax = framesMax;
        this.offset = offset;
        this.scale = scale;
    }

    protected draw(ctx: CanvasRenderingContext2D):void  {
        ctx.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale
        )
    }
    animateFrames(): void {
        this.framesElapsed++
        if (this.framesElapsed % this.framesHold === 0) {
            if (this.framesCurrent < this.framesMax - 1) {
                this.framesCurrent++
            } else {
                this.framesCurrent = 0
            }
        }

    }
    update(ctx: CanvasRenderingContext2D):void {
        this.draw(ctx);
        this.animateFrames()
    }

}

// todo have destructive object if anything touches goes to dead state?




// class Sprite extends GameEntity {
//     image: HTMLImageElement;
//     constructor(
//         position: { x: number, y: number },
//         velocity: number,
//         image: HTMLImageElement) {
//         super(position, velocity);
//         this.image = image;
//     }
//
//     draw(ctx: CanvasRenderingContext2D) {
//         ctx.drawImage(this.image, this.position.x, this.position.y);
//     }
//
//     update() {
//         this.position.x += this.velocity;
//     }
// }
//
//
// export class Player extends Sprite {
//     constructor(position: { x: number, y: number }) {
//         super(position);
//     }
//
//     draw(ctx: CanvasRenderingContext2D) {
//         ctx.fillStyle = "#00f";
//         ctx.fillRect(this.position.x, this.position.y, 50, 150);
//     }
// }
