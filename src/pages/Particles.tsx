import React, {Suspense} from 'react';
import EDLoadingScreen from "../components/LoadingScreen/EDLoadingScreen";
import {PulsingParticles} from "../components/Particles/FBOdemo2/PulsingParticles";
import {Canvas} from "@react-three/fiber";
import * as THREE from "three";
import {OrbitControls} from "@react-three/drei";


export default function Particles() {

    return (
        <Suspense fallback={<EDLoadingScreen/>}>
            <div className="h-screen">
            <Canvas
                dpr={[1, 2]}
                gl={{
                    alpha: true,
                    antialias: true,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    outputEncoding: THREE.sRGBEncoding,
                }}
                camera={ {
                    fov: 45,
                    near: 0.1,
                    far: 100,
                    position: [ 3, 2, 2], // use the third index to bring the camera closer.
                    zoom: 1
                } }
            >
                <PulsingParticles />
                <OrbitControls />
                <ambientLight intensity={1.5} />
            </Canvas>
            </div>
        </Suspense>
    );
}
