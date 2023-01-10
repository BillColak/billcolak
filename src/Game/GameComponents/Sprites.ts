



// 🥩🦕
interface GameObject {
    position: { x: number, y: number },
    image: HTMLImageElement,
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
        this.image.onload = () => {
            this.width = (this.image.width / this.frames.max) * scale
            this.height = this.image.height * scale
        }
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


interface Animation {
    [key: string|number]: HTMLImageElement
}


// 🐫
export class Character extends Sprite {
    constructor(
        position: { x: number, y: number },
        imageSource: string,
        offset: { x: number, y: number } = { x: 0, y: 0 },
        scale: number = 1,
        // velocity: { x: number, y: number },
        // frames: { max: number, hold: number },
        // Animation: Animation,
        // animate = false,
    ) {
        super(position, imageSource, offset, scale);
    }

    setPosition(x: number, y: number) {
        this.position.x = x;
        this.position.y = y;
    }

    protected draw(ctx: CanvasRenderingContext2D) {
        const crop = {
            position: {
                x: this.frames.val * (this.width / this.scale),
                y: 0
            },
            width: this.image.width / this.frames.max,
            height: this.image.height
        }

        ctx.drawImage(
            this.image,
            this.position.x,
            this.position.y,
        )
    }
}
