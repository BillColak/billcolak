import {useEffect, useMemo, useRef} from "react";
import {Character, Sprite, GameObject, Boundary} from "./GameComponents/Sprites";
import backgroundImage from "../assets/GameAssets/Pellet Town.png";
import foregroundImage from "../assets/GameAssets/foregroundObjects.png";
import playerDown from "../assets/GameAssets/playerDown.png";
import playerUp from "../assets/GameAssets/playerUp.png";
import playerLeft from "../assets/GameAssets/playerLeft.png";
import playerRight from "../assets/GameAssets/playerRight.png";
import {collisions} from "./GameComponents/collisions";

import WarriorRunLeft from "../assets/GameAssets/Player/Run/RunLeft.png";
import WarriorRunRight from "../assets/GameAssets/Player/Run/RunRight.png";
import WarriorRunDown from "../assets/GameAssets/Player/Run/RunDown.png";
import WarriorRunUp from "../assets/GameAssets/Player/Run/RunUp.png";

import WarriorIdleLeft from "../assets/GameAssets/Player/Idle/IdleLeft.png";
import WarriorIdleRight from "../assets/GameAssets/Player/Idle/IdleRight.png";
import WarriorIdleDown from "../assets/GameAssets/Player/Idle/IdleDown.png";
import WarriorIdleUp from "../assets/GameAssets/Player/Idle/IdleUp.png";

import WarriorAttackLeft from "../assets/GameAssets/Player/SwordAttack/SwordAttackLeft.png";
import WarriorAttackRight from "../assets/GameAssets/Player/SwordAttack/SwordAttackRight.png";
import WarriorAttackDown from "../assets/GameAssets/Player/SwordAttack/SwordAttackDown.png";
import WarriorAttackUp from "../assets/GameAssets/Player/SwordAttack/SwordAttackUp.png";
import WarriorAttack360 from "../assets/GameAssets/Player/SwordAttack/SwordAttack360.png";



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

    const Player = new Character (
        {x: window.innerWidth / 2 - 192 * 3, y: window.innerHeight / 2 - 200 },
        WarriorIdleDown,
        { max: 12, hold: 10 },
        {
            up: WarriorRunUp,
            down: WarriorRunDown,
            left: WarriorRunLeft,
            right: WarriorRunRight,
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
                    Player.image.src = WarriorRunUp;
                }
                else if(keys.w.pressed && keys.d.pressed) {
                    handleCollision(-speed.normalized, speed.normalized, moving);
                    Player.image.src =  WarriorRunUp;
                }
                else if(keys.s.pressed && keys.a.pressed) {
                    handleCollision(speed.normalized, -speed.normalized, moving);
                    Player.image.src = WarriorRunDown;
                }
                else if(keys.s.pressed && keys.d.pressed) {
                    handleCollision(-speed.normalized, -speed.normalized, moving)
                    Player.image.src = WarriorRunDown;
                }

                if(keys.w.pressed) {
                    handleCollision(0, speed.normal, moving);
                    Player.image.src = WarriorRunUp;
                }
                else if(keys.a.pressed) {
                    handleCollision(speed.normal, 0, moving);
                    Player.image.src = WarriorRunLeft;
                }
                else if(keys.s.pressed) {
                    handleCollision(0, -speed.normal, moving);
                    Player.image.src = WarriorRunDown;
                }
                else if(keys.d.pressed) {
                    handleCollision(-speed.normal, 0, moving);
                    Player.image.src = WarriorRunRight;
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

    window.addEventListener('mousedown', (e) => {
    // todo need to get the direction of the attacks, maybe use angles?

        console.log(Player)
    });


    return (
            <canvas ref={canvasRef} />
    );
}



