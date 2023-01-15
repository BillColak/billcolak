import {useEffect, useMemo, useRef} from "react";
import {Character, Sprite, GameObject, Boundary} from "./GameComponents/Sprites";
import backgroundImage from "../assets/GameAssets/Pellet Town.png";
import foregroundImage from "../assets/GameAssets/foregroundObjects.png";
import playerDown from "../assets/GameAssets/playerDown.png";
import playerUp from "../assets/GameAssets/playerUp.png";
import playerLeft from "../assets/GameAssets/playerLeft.png";
import playerRight from "../assets/GameAssets/playerRight.png";
import {collisions} from "./GameComponents/collisions";

// https://threejs.org/examples/#webgl_interactive_voxelpainter would it be possible to do this in react-three-fiber? Simon Dev...


document.body.style.overflow = "hidden";
const offset = { x:-725, y:-650 };


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
        backgroundImage,
    );

    const foreground = new Sprite(
        {
            x: offset.x,
            y: offset.y,
        },
        foregroundImage,
    );

    const Player = new Character(
        {x: window.innerWidth / 2 - 192 * 3, y: window.innerHeight / 2 - 200 },
        playerDown,
        { max:4, hold: 10 },
        {
            up: playerUp,
            down: playerDown,
            left: playerLeft,
            right: playerRight
        },
    );

    const movables = [background, ...boundaries, foreground];

    function rectangularCollision(r1: GameObject, r2: GameObject): boolean{
        return (
            r1.position.x + r1.width >= r2.position.x &&
            r1.position.x <= r2.position.x + r2.width &&
            r1.position.y <= r2.position.y + r2.height &&
            r1.position.y + r1.height >= r2.position.y
        )
    }

    function handleCollision(x_velocity: number, y_velocity: number, state: boolean){
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if(rectangularCollision(Player, {...boundary, position: {x: boundary.position.x + x_velocity, y: boundary.position.y + y_velocity}}
            )){
                console.log("collision")
                state = false;
                break;
            }
        }
        Player.moving = state;
        if(state) movables.forEach(movable => movable.move(x_velocity, y_velocity));
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
                })

                Player.setPosition(c.canvas.width / 2 - 192 / 4 / 2, c.canvas.height / 2 - 68 / 2 )
                Player.update(c)
                foreground.update(c)


                let moving = true;
                Player.moving = false;

                if(keys.w.pressed && keys.a.pressed) {
                    handleCollision(speed.normalized, speed.normalized, moving);
                    Player.image.src = playerUp;
                }
                else if(keys.w.pressed && keys.d.pressed) {
                    handleCollision(-speed.normalized, speed.normalized, moving);
                    Player.image.src = playerUp;
                }
                else if(keys.s.pressed && keys.a.pressed) {
                    handleCollision(speed.normalized, -speed.normalized, moving);
                    Player.image.src = playerDown;
                }
                else if(keys.s.pressed && keys.d.pressed) {
                    handleCollision(-speed.normalized, -speed.normalized, moving)
                    Player.image.src = playerDown;
                }

                if(keys.w.pressed) {
                    handleCollision(0, speed.normal, moving);
                    Player.image.src = playerUp;
                }
                else if(keys.a.pressed) {
                    handleCollision(speed.normal, 0, moving);
                    Player.image.src = playerLeft;
                }
                else if(keys.s.pressed) {
                    handleCollision(0, -speed.normal, moving);
                    Player.image.src = playerDown;
                }
                else if(keys.d.pressed) {
                    handleCollision(-speed.normal, 0, moving);
                    Player.image.src = playerRight;
                }

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



