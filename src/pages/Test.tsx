import React, {Suspense, useRef} from "react";
import BlackHole from "../components/BlackHole/BlackHole";
import {Canvas} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import useSpline from '@splinetool/r3f-spline'
import SplineLoader from "@splinetool/loader";
import Spline from "@splinetool/react-spline";

export default function Test() {
    const ref = useRef<HTMLDivElement>(null);

// spline scene

    return (
        <div ref={ref} className={'h-screen bg-indigo-900'}>
            {/*<Canvas className={'bg-black'} camera={{ fov: 12, position: [1, 1, 3] }}>*/}
            {/*    <BlackHole />*/}
            {/*    <OrbitControls />*/}
            {/*</Canvas>*/}
        </div>
    );
}
