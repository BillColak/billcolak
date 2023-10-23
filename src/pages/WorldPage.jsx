import {Canvas} from "@react-three/fiber";
import World from "../components/ISS/models/World";
import Halo from "../components/ISS/models/Halo";
import Lights from "../components/ISS/models/Lights";
import {OrbitControls} from "@react-three/drei";
import React, {Suspense} from "react";
import EDLoadingScreen from "../components/LoadingScreen/EDLoadingScreen";

export default function WorldPage(){
    return (

        <div className="h-screen">
            <Suspense fallback={<EDLoadingScreen/>}>
                <Canvas camera={{position: [0, 1, 1.5]}}>
                    <World />
                    <Halo color={"#4756d3"} />
                    <Lights />
                    <OrbitControls/>
                </Canvas>
            </Suspense>
        </div>

    )

}
