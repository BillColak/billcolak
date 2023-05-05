// import {
//     Environment, Html,
//     OrbitControls,
//     Plane,
//     Stars,
//     useGLTF
// } from "@react-three/drei";
// import {Canvas, useFrame, useLoader} from "@react-three/fiber";
import React, {Suspense, useState} from "react";
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
import World from "../components/ISS/models/World";
import Lights from "../components/ISS/models/Lights";
import Halo from "../components/ISS/models/Halo";
import {OrbitControls} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";



export default function GeoEarth() {
    const [show, setShow] = useState('Day & Night Cycles');

    useControls('Projects', {
        projects: {
            options: ['Population', 'Airline Routes', 'Globe GDP', 'Earth Quakes','Day & Night Cycles'],
            value: 'Day & Night Cycles',
            onChange: (value) => {
                setShow(value);
            }
        }
    })

    return (
        <>
            <div className="h-screen">
                <Suspense fallback={<EDLoadingScreen/>}>
                    {show === 'Day & Night Cycles' && <DayNightCycles/>}
                    {show === 'Population' && <Population/>}
                    {show === 'Airline Routes' && <AirlineRoutes/>}
                    {show === 'Globe GDP' && <Gdp/>}
                    {show === 'Earth Quakes' && <EarthQuakes/>}
                </Suspense>

            </div>
        </>
    )
}

function DayNightCycles(){
    return (
        <Canvas camera={{position: [0, 1, 1.5]}}>
            <World />
            <Halo color={"#4756d3"} />
            <Lights />
            <OrbitControls/>
        </Canvas>
    )

}
