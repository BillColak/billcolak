import {useRef} from "react";
import {Sprite} from "./GameComponents/Sprites";


function animate(){
    window.requestAnimationFrame(animate);
    // console.log("animate");
}

const image = new Image()
image.src = "../assets/GameAssets/Pellet Town.png"

export default function Game() {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const c = canvasRef.current?.getContext("2d");
    const pTown = new Sprite(
        {x:0, y:0},
        "../assets/GameAssets/Pellet Town.png",
        10,
    );


    // const enemy = new Sprite({x:10, y:10}, 100,  "blue");


    if (c) {
        c.fillStyle = "black";
        c.fillRect(0, 0, c.canvas.width, c.canvas.height);
        pTown.update(c);
        // enemy.update(c);
    }


    animate()

    return (
        <div className="v-flex">
            <canvas ref={canvasRef} id="canvas" className="scale-150">

            </canvas>
        </div>
    );
}
