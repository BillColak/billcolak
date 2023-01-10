import {useEffect, useMemo, useRef} from "react";
import {Character, Sprite} from "./GameComponents/Sprites";
import PTown from "../assets/GameAssets/Pellet Town.png";
import PlayerImages from "../assets/GameAssets/_PNG/Warrior_walk_run.png";
import PlayerImages2 from "../assets/GameAssets/Player/R_Down/tile024.png";
import AnimatedTree1 from "../assets/GameAssets/Animated Tree1.png";
import {collisions} from "./GameComponents/collisions";

document.body.style.overflow = "hidden";
// const offset = {x: window.innerWidth / 2 - 192 * 3, y: window.innerHeight / 2 - 200 };
const offset = {x:-725, y:-650};


class Boundary {
    static width = 48;
    static height = 48;
    position: {x: number, y: number};
    constructor(position: {x: number, y: number}) {
        this.position = position;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "red";
        ctx.fillRect(this.position.x, this.position.y, Boundary.width, Boundary.height);
    }

    move(x: number, y: number): void {
        this.position.x += x;
        this.position.y += y;
    }
}

const collisionMap = []
for (let i = 0; i < collisions.length; i += 70) {
    collisionMap.push(collisions.slice(i, i + 70))
}

const boundaries: Boundary[] = [];
collisionMap.forEach((row, i) =>{
    row.forEach((symbol, j) =>{
        if(symbol === 1025){
            boundaries.push(new Boundary({
                x: j * Boundary.width + offset.x,
                y: i * Boundary.height + offset.y
            }))
        }
    })
})


export default function Game() {

    const canvasRef = useRef<HTMLCanvasElement>(null);


    const keys = {
        w: {pressed: false,},
        a: {pressed: false,},
        s: {pressed: false,},
        d: {pressed: false,},
    }

    const speed = {normalized: 3 * 0.4, normal: 3, fast: 6};


    const background = new Sprite(
        {
            x: offset.x,
            y: offset.y,
        },
        PTown,
    );

    const Player = new Character(
        {x: window.innerWidth / 2 - 192 * 3, y: window.innerHeight / 2 - 200 },
        PlayerImages2,
    );

    const tree = new Sprite(
        {x: 100, y: 100},
        AnimatedTree1,
    )

    const testBoundary = new Boundary({x: window.innerWidth / 2 - 192 * 3, y: window.innerHeight / 2 - 200 });

    const movables = [background,testBoundary];

    useEffect(() => {
        const c = canvasRef.current?.getContext("2d");
        let animationFrameId: number

        function render() {
            if(c) {
                c.canvas.width = 1024;
                c.canvas.height = 768;
                background.update(c)
                // boundaries.forEach(boundary => boundary.draw(c))
                testBoundary.draw(c)
                // console.log(boundaries)
                // tree.update(c)
                Player.setPosition(c.canvas.width / 2 - 192 / 4 / 2, c.canvas.height / 2 - 68 / 2 )
                Player.update(c)

                if(keys.w.pressed && keys.a.pressed) movables.forEach(movable => movable.move(speed.normalized, speed.normalized));
                else if(keys.w.pressed && keys.d.pressed) movables.forEach(movable => movable.move(-speed.normalized, speed.normalized));
                else if(keys.s.pressed && keys.a.pressed) movables.forEach(movable => movable.move(speed.normalized, -speed.normalized));
                else if(keys.s.pressed && keys.d.pressed) movables.forEach(movable => movable.move(-speed.normalized, -speed.normalized));

                if(keys.w.pressed) movables.forEach(movable => movable.move(0, speed.normal));
                else if(keys.a.pressed) movables.forEach(movable => movable.move(speed.normal, 0));
                else if(keys.s.pressed) movables.forEach(movable => movable.move(0, -speed.normal));
                else if(keys.d.pressed) movables.forEach(movable => movable.move(-speed.normal, 0));

                // if(Player.)

                animationFrameId = window.requestAnimationFrame(render)
            }
        }
        render()

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [background, Player])

    window.addEventListener('keydown', (e) => {
        switch (e.key) {
            case "w":
                keys.w.pressed = true;
                break;
            case "a":
                keys.a.pressed = true;
                break;
            case "s":
                keys.s.pressed = true;
                break;
            case "d":
                keys.d.pressed = true;
                break;
        }
    });

    window.addEventListener('keyup', (e) => {
        switch (e.key) {
            case "w":
                keys.w.pressed = false;
                break;
            case "a":
                keys.a.pressed = false;
                break;
            case "s":
                keys.s.pressed = false;
                break;
            case "d":
                keys.d.pressed = false;
                break;
        }
    });


    return (
            <canvas ref={canvasRef} />
    );
}



