import {Canvas, useLoader} from '@react-three/fiber'
// import Box from '../components/ThreeComponents/Box';
// import Sphere from "../components/ThreeComponents/Sphere";
import React, {Suspense} from "react";
// import * as THREE from "three";
import { OrbitControls} from '@react-three/drei'
// import {TextureLoader} from "three";
import EDLoadingScreen from "../components/LoadingScreen/EDLoadingScreen";
import ErrorBoundary from "../components/errorBoundary";
import {AttractorParticles} from "../components/StrangeAttractor/test/TestAttractor";

// const Box = React.lazy(() => import('../components/ThreeComponents/Box'));
// const Sphere = React.lazy(() => import('../components/ThreeComponents/Sphere'));


// TODO https://codesandbox.io/s/zxpv7 HChristmas Baubles
// https://codesandbox.io/s/mkq8e --> Map with hover highlight
// https://codesandbox.io/s/bst0cy --> monitors, another way to display projects?
// https://codesandbox.io/s/6hi1y --> domino & Rube Goldberg machine to ball cluster effect? https://codesandbox.io/s/zxpv7?file=/src/DirtyFigmaExport.js https://www.pinterest.ca/pin/152911349820845754/
// floating diamonds https://codesandbox.io/s/prb9t
// todo landing page with 3d models of projects https://codesandbox.io/s/n60qg
// todo fonts
// The entire R3F is nuts https://docs.pmnd.rs/react-three-fiber/getting-started/examples
// https://codesandbox.io/s/x8gvs   side scroll
// image gallery https://codesandbox.io/s/lx2h8   --> can do UI/UX with this also good for Escher displays
// layer materials might come in handy https://codesandbox.io/s/nvup4
// gatsby stars for Space Escher: https://codesandbox.io/s/2csbr1
// https://codesandbox.io/s/yjhzv || https://codesandbox.io/s/gsm1y --> combine this with globe + https://codesandbox.io/s/n60qg
// todo Spring library for realistic animations? https://react-spring.dev/ https://react-spring.dev/docs/advanced/config#configs even animate dom elements?
// https://codesandbox.io/s/kud9p?file=/src/Model.js:883-933 -->  what is going on with nodes in Model.js?



export default function Home() {
    return (
        <>
            <div className="h-screen">
                <ErrorBoundary>
                <Suspense fallback={<EDLoadingScreen/>}>
                    <Canvas
                        camera={ {
                        fov: 45,
                        position: [ 0, 0, 30], // use the third index to bring the camera closer.
                        zoom: 1
                    }}>
                        <AttractorParticles />
                        <OrbitControls />
                    </Canvas>
                </Suspense>
                </ErrorBoundary>
            </div>
        </>
    );
}
