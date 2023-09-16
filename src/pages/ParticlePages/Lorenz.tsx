'use client'
import {Canvas} from '@react-three/fiber'
import React, {Suspense, useState} from "react";
import {OrbitControls} from '@react-three/drei'
import {AttractorParticles} from "../../components/StrangeAttractor/test/TestAttractor";
import {useControls} from "leva";


const number = Math.floor(Math.random() * 7)

export default function Lorenz() {

    const [Attractor, setAttractor] = useState("Lorenz");
    const l = ["Lorenz", "LorenzMod2", "Thomas", "Dequan", "Dradas", "Arneodo", "Aizawa"]

    useControls(  {
        attractor: {
            value: l[number],
            options: l,
            onChange: (value) => {
                setAttractor(l.indexOf(value).toString())
            }
        }
    })

    const camera_pos_z = (Attractor === "0" || Attractor === "3")? 50 : 30

    return (
        <div className="h-screen">
            <Suspense fallback={null}>
                <Canvas
                    camera={ {
                        fov: 45,
                        position: [ 0, 0, camera_pos_z],
                        zoom: 1
                    }}>
                    <AttractorParticles attr={Attractor}/>
                    <OrbitControls />
                </Canvas>
            </Suspense>
        </div>
    );
}
