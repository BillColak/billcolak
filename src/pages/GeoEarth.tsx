import {
    Environment, Html,
    OrbitControls,
    Plane,
    Stars,
    useGLTF
} from "@react-three/drei";
import {Canvas, useFrame, useLoader} from "@react-three/fiber";
import {Suspense, useRef, useState} from "react";
import {Perf} from "r3f-perf";
import Halo from "../components/ISS/models/Halo";
import Lights from "../components/ISS/models/Lights";
import World from "../components/ISS/models/World";
import {TextureLoader, Vector3} from "three";
import {useControls} from "leva";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import EDLoadingScreen from "../components/LoadingScreen/EDLoadingScreen";
import AirlineRoutes from "../components/ISS/AirlineRoutes";






const skybox = {
    box1: [
        '/GlobeTextures/skybox/space-posx.jpg', // right
        '/GlobeTextures/skybox/space-negx.jpg', // left
        '/GlobeTextures/skybox/space-posy.jpg', // top
        '/GlobeTextures/skybox/space-negy.jpg', // bottom
        '/GlobeTextures/skybox/space-posz.jpg', // front
        '/GlobeTextures/skybox/space-negz.jpg', // back
    ],

}


export function MakePlane(){
    // const { position, rotation } = useControls('PlanePosition',{
    //     position:
    //         {
    //             value: { x:0,  y:1.1, z: 0 },
    //             step: 0.1
    //         },
    //
    //     rotation: {
    //         value: { x: 0,  y: 0 , z: 0 },
    //         step: 0.1
    //         },
    // })

    const trail = useLoader(TextureLoader, '/models/plane/mask.png')
    const plane = useGLTF('/models/plane/scene.glb', true).scene.children[0]
    const planeGroup = useRef<any>(null)
    const nr = () => Math.random() * 2 - 1

    //     yOff: 10.5 + Math.random() * 1.0,
    //     rot: Math.PI * 2,  // just to set a random starting point
    //     rad: Math.random() * Math.PI * 0.45 + Math.PI * 0.05,
    //     randomAxis: new Vector3(nr(), nr(), nr()).normalize(),
    //     randomAxisRot: Math.random() * Math.PI * 2,

    let yOff = 1.5 + Math.random() * 1.0
    let rot = Math.PI * 2
    let rad = Math.random() * Math.PI * 0.45 + Math.PI * 0.05
    let randomAxis = new Vector3(nr(), nr(), nr()).normalize()
    let randomAxisRot = Math.random() * Math.PI * 2

    useFrame((state, delta) => {
        rot += delta * 0.25;
        if (planeGroup.current) {
            planeGroup.current.rotateOnAxis(new Vector3(0, 1, 0), Math.sin(delta));    // y-axis rotation
            planeGroup.current.rotateOnAxis(new Vector3(0, 0, 1), Math.sin(delta));    // this decides the radius
            planeGroup.current.translateY(yOff * Math.sin(delta));
            planeGroup.current.rotateOnAxis(new Vector3(1,0,0), Math.sin(delta));
        }
    });

    return (
        <>
            <group
                ref={planeGroup}
                position={[0,1.05,0]}
                rotation={[0,0,0]}
            >
                <primitive
                    object={plane}
                    scale={0.000005}
                    castShadow
                />
                {/*<Plane*/}
                {/*    args={[1, 2]}*/}
                {/*    scale={0.1}*/}
                {/*    rotation-x={Math.PI}*/}
                {/*>*/}
                {/*    <meshPhysicalMaterial*/}
                {/*        // envMap={envMap}*/}
                {/*        // envMapIntensity={1}*/}
                {/*        roughness={0.4}*/}
                {/*        metalness={0}*/}
                {/*        transmission={1}*/}
                {/*        transparent={true}*/}
                {/*        opacity={1}*/}
                {/*        alphaMap={trail}*/}
                {/*    />*/}
                {/*</Plane>*/}
            </group>
        </>
    )
}







export default function GeoEarth() {

    return (
        <>
            <div className="w-full h-screen bg-slate-900">
                <Suspense fallback={<EDLoadingScreen/>}>
                    <Canvas camera={{position: [0, 1, 1.5]}}>
                        <Perf position={'bottom-left'} />
                        {/*<Environment background  files={skybox.box1} />*/}
                        <World />
                        <Halo color={"#4756d3"} />
                        <Lights />
                        <OrbitControls/>
                    </Canvas>
                </Suspense>
            </div>
        </>
    )
}
