import React, {Suspense, useRef} from "react";
import BlackHole from "../components/BlackHole/BlackHole";
import {Canvas} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import useSpline from '@splinetool/r3f-spline'
import SplineLoader from "@splinetool/loader";
import Spline from "@splinetool/react-spline";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import EDLoadingScreen from "../components/LoadingScreen/EDLoadingScreen";
import {Phone} from "../components/iPhone/iPhone";

export default function Test() {

    return (
        <>
            <div className={'h-screen'}>
                <Suspense fallback={<EDLoadingScreen/>}>
                    <Canvas
                        camera={{position: [0, 0, 4], }}
                    >

                        <Phone />
                        <ambientLight intensity={1.5} />
                        {/*<OrbitControls />*/}
                    </Canvas>
                </Suspense>
            </div>

        </>

    );
}
