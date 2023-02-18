import React, {Suspense, useRef} from "react";
import BlackHole from "../components/BlackHole/BlackHole";
import {Canvas} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";

export default function Test() {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <div ref={ref} className={'h-screen'}>
            <Canvas className={'bg-black'} camera={{ fov: 12, position: [1, 1, 3] }}>
                <BlackHole/>
                <OrbitControls/>
            </Canvas>
        </div>
    );
}
