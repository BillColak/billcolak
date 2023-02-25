// import {
//     Environment, Html,
//     OrbitControls,
//     Plane,
//     Stars,
//     useGLTF
// } from "@react-three/drei";
// import {Canvas, useFrame, useLoader} from "@react-three/fiber";
import React, {Suspense, useRef, useState} from "react";
// import {Perf} from "r3f-perf";
// import Halo from "../components/ISS/models/Halo";
// import Lights from "../components/ISS/models/Lights";
// import World from "../components/ISS/models/World";
// import {TextureLoader, Vector3} from "three";
import {useControls} from "leva";
// import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import EDLoadingScreen from "../components/LoadingScreen/EDLoadingScreen";
import AirlineRoutes from "../components/ISS/AirlineRoutes";
import Population from "../components/ISS/Population";
import Gdp from "../components/ISS/GDP";
import EarthQuakes from "../components/ISS/EarthQuakes";



export default function GeoEarth() {
    const [show, setShow] = useState('Population');

    useControls('Projects', {
        projects: {
            options: ['Population', 'Airline Routes', 'Globe GDP', 'Earth Quakes'],
            value: 'Population',
            onChange: (value) => {
                setShow(value);
            }
        }
    })

    return (
        <>
            <div className="h-screen">
                <Suspense fallback={<EDLoadingScreen/>}>
                    {show === 'Population' && <Population/>}
                    {show === 'Airline Routes' && <AirlineRoutes/>}
                    {show === 'Globe GDP' && <Gdp/>}
                    {show === 'Earth Quakes' && <EarthQuakes/>}
                </Suspense>
                {/*<Suspense fallback={<EDLoadingScreen/>}>*/}
                {/*    <Canvas camera={{position: [0, 1, 1.5]}}>*/}
                {/*        <Perf position={'bottom-left'} />*/}
                {/*        /!*<Environment background  files={skybox.box1} />*!/*/}
                {/*        <World />*/}
                {/*        <Halo color={"#4756d3"} />*/}
                {/*        <Lights />*/}
                {/*        <OrbitControls/>*/}
                {/*    </Canvas>*/}
                {/*</Suspense>*/}
            </div>
        </>
    )
}
