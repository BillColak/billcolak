import React, {Suspense} from 'react';
import EDLoadingScreen from "../components/LoadingScreen/EDLoadingScreen";
import {Canvas} from "@react-three/fiber";
import * as THREE from "three";
import {OrbitControls} from "@react-three/drei";
import MichelleDancing, { MatrixMichelle } from "../components/MichelleDancing";


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
                    position: [ 0, 2, 4],
                    zoom: 1
                } }
            >
                {/*<MichelleDancing />*/}
                <MatrixMichelle />
                <OrbitControls />
                <ambientLight intensity={1.5} />
            </Canvas>
            </div>
        </Suspense>
    );
}
