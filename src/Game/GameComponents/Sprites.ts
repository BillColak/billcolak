



// 🥩🦕
export interface GameObject {
    position: { x: number, y: number },
    image?: HTMLImageElement,
    width: number,
    height: number,
    // size: { width: number, height: number },
    // velocity: { x: number, y: number },
    // update: () => void,
    // render: () => void
}


export class Sprite implements GameObject {

    position: { x: number, y: number };
    image: HTMLImageElement;
    frames = { max: 1, hold: 10, val: 0, elapsed: 0 };
    height: number = 10;
    width: number = 10;
    offset: { x: number, y: number };
    scale: number;

    constructor(
        position: { x: number, y: number },
        imageSource: string,
        offset: { x: number, y: number } = { x: 0, y: 0 },
        scale: number = 1,
        frames: { max: number, hold: number } = { max: 1, hold: 10 }
    ) {
        this.position = position;
        this.image = new Image();
        this.image.src = imageSource;
        this.scale = scale;
        this.frames.max = frames.max;
        this.frames.hold = frames.hold;
        this.offset = offset;
    }

    move(x: number, y: number): void {
        this.position.x += x;
        this.position.y += y;
    }

    protected draw(ctx: CanvasRenderingContext2D):void  {
        ctx.drawImage(
            this.image,
            0,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max * this.scale,
            this.image.height * this.scale
        )
    }

    update(ctx: CanvasRenderingContext2D):void {
        this.draw(ctx);
    }

}


export interface Animation {
    [name: string | number]: string
}

// const testAnimation: Animation = {
//     'walk': 10,
//     'jump': 10,
//     'attack': 10,
//     'die': 10,
// }
//
// // loop through animation and print it out.
// for (const [key, value] of Object.entries(testAnimation)) {
//     console.log(`${key}: ${value}`);
// }




// 🐫
export class Character extends Sprite {
    height: number = 10;
    width: number = 10;
    animations: {  };
    frames = { max: 1, hold: 10, val: 0, elapsed: 0 };
    public moving: boolean;
    constructor(
        position: { x: number, y: number },
        imageSource: string,
        frames: { max: number, hold: number } = { max: 1, hold: 10 },
        animations: Animation,
        offset: { x: number, y: number } = { x: 0, y: 0 },
        scale: number = 1,
    ) {
        super(position, imageSource, offset, scale);
        this.frames.max = frames.max;
        this.frames.hold = frames.hold;
        this.image.onload = () => {
            this.width = (this.image.width / this.frames.max) * scale
            this.height = this.image.height * scale
        }
        this.animations = animations;
        this.moving = false;
    }

    setPosition(x: number, y: number) {
        this.position.x = x;
        this.position.y = y;
    }


    protected draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(
            this.image,
            this.frames.val * this.width,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max * this.scale,
            this.image.height * this.scale
        )
        if(this.moving) {
            if (this.frames.max > 1) this.frames.elapsed++;

            if (this.frames.elapsed % 10 === 0) {
                if (this.frames.val < this.frames.max - 1) this.frames.val++;
                else this.frames.val = 0;
            }
        }
    }
}


export class Boundary implements GameObject {
    static width = 48;
    static height = 48;
    width: number;
    height: number;
    position: {x: number, y: number};
    constructor(position: {x: number, y: number}) {
        this.position = position;
        this.width = 48;
        this.height = 48;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "rgba(255, 0, 0, 0.2)";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    move(x: number, y: number): void {
        this.position.x += x;
        this.position.y += y;
    }
}
