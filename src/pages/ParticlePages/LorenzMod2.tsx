'use client'
import {Canvas} from '@react-three/fiber'
import React, {Suspense, useState} from "react";
import {OrbitControls} from '@react-three/drei'
import {AttractorParticles} from "../../components/StrangeAttractor/test/TestAttractor";


export default function LorenzMod2() {
    const [Attractor, setAttractor] = useState("LorenzMod2");


    return (
        <div className="h-screen">
            <Suspense fallback={null}>
                <Canvas
                    camera={ {
                        fov: 45,
                        position: [ 0, 0, 50],
                        zoom: 1
                    }}>
                    <AttractorParticles attr={Attractor}/>
                    <OrbitControls />
                </Canvas>
            </Suspense>
        </div>
    );
}
