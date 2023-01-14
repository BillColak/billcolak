import {useEffect, useMemo, useRef} from "react";
import {Character, Sprite, GameObject} from "./GameComponents/Sprites";
import PTown from "../assets/GameAssets/Pellet Town.png";
import PlayerImages from "../assets/GameAssets/_PNG/Warrior_walk_run.png";
import PlayerImages2 from "../assets/GameAssets/Player/R_Down/tile024.png";
import villager from "../assets/GameAssets/playerDown.png";
import AnimatedTree1 from "../assets/GameAssets/Animated Tree1.png";
import {collisions} from "./GameComponents/collisions";

// https://threejs.org/examples/#webgl_interactive_voxelpainter would it be possible to do this in react-three-fiber? Simon Dev...


document.body.style.overflow = "hidden";
// const offset = {x: window.innerWidth / 2 - 192 * 3, y: window.innerHeight / 2 - 200 };
const offset = { x:-725, y:-650 };


class Boundary implements GameObject {
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
        ctx.fillStyle = "red";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
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

    const speed: {normalized: number, normal: number, fast: number} =
        useMemo(() => ({normalized: 3 * 0.4 , normal: 3, fast: 6}), []);

    const background = new Sprite(
        {
            x: offset.x,
            y: offset.y,
        },
        PTown,
    );

    const Player = new Character(
        {x: window.innerWidth / 2 - 192 * 3, y: window.innerHeight / 2 - 200 },
        villager,
        {max:4, hold: 10},
    );

    const tree = new Sprite(
        {x: 100, y: 100},
        AnimatedTree1,
    )

    const testBoundary = new Boundary({x: window.innerWidth / 2 - 192 * 3, y: window.innerHeight / 2 - 200 });

    const movables = [background, ...boundaries];

    function rectangularCollision(r1: GameObject, r2: GameObject): boolean{
        return (
            r1.position.x + r1.width >= r2.position.x &&
            r1.position.x <= r2.position.x + r2.width &&
            r1.position.y <= r2.position.y + r2.height &&
            r1.position.y + r1.height >= r2.position.y
        )
    }

    useEffect(() => {
        const c = canvasRef.current?.getContext("2d");
        let animationFrameId: number

        function render() {
            if(c) {
                c.canvas.width = 1024;
                c.canvas.height = 768;

                background.update(c)
                boundaries.forEach(boundary => {
                    boundary.draw(c)
                    // if(rectangularCollision(Player, boundary)){
                    //     console.log("collision")
                    // }
                })

                // testBoundary.draw(c);
                // if(rectangularCollision(Player, testBoundary)) console.log("collision");

                Player.setPosition(c.canvas.width / 2 - 192 / 4 / 2, c.canvas.height / 2 - 68 / 2 )
                Player.update(c)

                let moving = true;

                if(keys.w.pressed && keys.a.pressed) movables.forEach(movable => movable.move(speed.normalized, speed.normalized));
                else if(keys.w.pressed && keys.d.pressed) movables.forEach(movable => movable.move(-speed.normalized, speed.normalized));
                else if(keys.s.pressed && keys.a.pressed) movables.forEach(movable => movable.move(speed.normalized, -speed.normalized));
                else if(keys.s.pressed && keys.d.pressed) movables.forEach(movable => movable.move(-speed.normalized, -speed.normalized));

                // todo
                if(keys.w.pressed){
                    for (let i = 0; i < boundaries.length; i++) {
                        const boundary = boundaries[i];
                        if(rectangularCollision(
                            Player,
                            {...boundary, position: {x: boundary.position.x, y: boundary.position.y + speed.normal}}
                        )){
                            console.log("collision")
                            moving = false;
                            break;
                        }
                    }
                    if(moving) movables.forEach(movable => movable.move(0, speed.normal));
                }

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



