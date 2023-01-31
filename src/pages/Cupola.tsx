import {Environment, Float, OrbitControls, Plane, Stars, useAspect, useGLTF,} from "@react-three/drei";
import {Canvas, useFrame, useLoader} from "@react-three/fiber";
import * as THREE from "three";
import {Suspense, useEffect, useRef, useState} from "react";
import {useControls} from "leva";
import {Perf} from "r3f-perf";
import Earth from "../components/ISS/Earth";
import Halo from "../components/ISS/models/Halo";
import Lights from "../components/ISS/models/Lights";
import World from "../components/ISS/models/World";
import RenderOrder from "../components/ISS/models/Renderorder";
import { sRGBEncoding } from "three";


// const aspectRatio = (window.innerWidth / window.innerHeight)
// https://codesandbox.io/s/tx1pq

const hdri = {
    omega: '/GlobeTextures/hdr/omega.hdr',
    mayoris: '/GlobeTextures/hdr/alphamayoris.hdr',
    earth: '/GlobeTextures/hdr/earth.hdr',
    nebula: '/GlobeTextures/hdr/nebula.hdr',
}
const skybox = {
    box1: [
        '/GlobeTextures/skybox/space-posx.jpg', // right
        '/GlobeTextures/skybox/space-negx.jpg', // left
        '/GlobeTextures/skybox/space-posy.jpg', // top
        '/GlobeTextures/skybox/space-negy.jpg', // bottom
        '/GlobeTextures/skybox/space-posz.jpg', // front
        '/GlobeTextures/skybox/space-negz.jpg', // back
    ],
    box2: [
        '/GlobeTextures/skybox2/Left_4K_TEX.png',
        '/GlobeTextures/skybox2/Right_4K_TEX.png',
        '/GlobeTextures/skybox2/Up_4K_TEX.png',
        '/GlobeTextures/skybox2/Down_4K_TEX.png',
        '/GlobeTextures/skybox2/Front_4K_TEX.png',
        '/GlobeTextures/skybox2/Back_4K_TEX.png',
    ],
    box3: [
        '/GlobeTextures/skybox3/Left_4K_TEX.png',
        '/GlobeTextures/skybox3/Right_4K_TEX.png',
        '/GlobeTextures/skybox3/Up_4K_TEX.png',
        '/GlobeTextures/skybox3/Down_4K_TEX.png',
        '/GlobeTextures/skybox3/Front_4K_TEX.png',
        '/GlobeTextures/skybox3/Back_4K_TEX.png',
    ],
    box4: [
        '/GlobeTextures/skybox4/Left_4K_TEX.png',
        '/GlobeTextures/skybox4/Right_4K_TEX.png',
        '/GlobeTextures/skybox4/Up_4K_TEX.png',
        '/GlobeTextures/skybox4/Down_4K_TEX.png',
        '/GlobeTextures/skybox4/Front_4K_TEX.png',
        '/GlobeTextures/skybox4/Back_4K_TEX.png',
    ]
}



function PlaneComponent(){
    const texture = useLoader(THREE.TextureLoader, '/images/cupolaISS.png')
    const scale = useAspect(texture.image.width, texture.image.height, 1)

    return (
        <Plane scale={scale} >
            <meshPhongMaterial map={texture} />
        </Plane>
    )
}

function Video() {
    const { position, rotation } = useControls({
        position:
            {
                value: { x: 0.16,  y: 1.34 , z: 0.08 },
                step: 0.01
            },
        rotation: {
            value: { x: 0,  y: 0 , z: 0 },
            step: 0.01
        }
    })

    const [video] = useState(() => Object.assign(document.createElement('video'), { src: '/ISSTimelapse.mp4', crossOrigin: 'Anonymous', loop: true, muted: true }))

    useEffect(() => void video.play(), [video])
    return (
        <mesh position={[position.x, position.y, position.z]} rotation={[rotation.x, rotation.y, rotation.z]} scale={[17, 10, 1]}>
            <planeGeometry />
            <meshBasicMaterial toneMapped={false}>
                <videoTexture attach="map" args={[video]} encoding={THREE.sRGBEncoding} />
            </meshBasicMaterial>
        </mesh>
    )
}

export default function Cupola() {

    const { envMapIntensity, directionalLightPosition, directionalIntensity, ambientIntensity } =
        useControls({
        envMapIntensity: {value: 10, min: 0, max: 100, step: 1},
        directionalLightPosition:
            {
                value: { x: 10,  y: 10 , z: 50 },
                step: 1
            },
        directionalIntensity: {value: 1, min: 0, max: 100, step: 1},
        ambientIntensity: {value: 1, min: 0, max: 100, step: 1},
    })

    // const boxingGlove = useGLTF('/models/boxing-glove.glb')
    // const cleats = useGLTF('/models/adidas_predator/scene.gltf')

    return (
        <>
            <div className="w-full h-screen">
                <Canvas
                    gl={{
                        antialias: true,
                        outputEncoding: sRGBEncoding,
                        pixelRatio: devicePixelRatio
                    }}
                    camera={{
                        position: [0, 1, 1.5]
                    }}
                >
                    <Perf position={'top-left'} />
                    {/*<Suspense fallback={null}>*/}
                    {/*    <World />*/}
                    {/*    <Halo color={"#4756d3"} />*/}
                    {/*    <Lights />*/}
                    {/*    <RenderOrder />*/}
                    {/*</Suspense>*/}



                    {/*<mesh castShadow>*/}
                    {/*    <sphereGeometry args={[1, 32, 32]} />*/}
                    {/*    <meshStandardMaterial color={'hotpink'} envMapIntensity={envMapIntensity}/>*/}
                    {/*</mesh>*/}

                    {/*<Video />*/}
                    {/*<PlaneComponent />*/}
                    {/*<Float*/}
                    {/*    rotationIntensity={2}*/}
                    {/*    floatIntensity={10}*/}
                    {/*>*/}
                    {/*    <primitive object={ boxingGlove.scene } position={ 1 }  scale={ 2 }/>*/}
                    {/*    <primitive object={ cleats.scene } position={ [1, -1, 3] }  scale={ 0.2 } />*/}
                    {/*</Float>*/}

                    {/*<Environment*/}
                    {/*    background*/}
                    {/*    files={skybox.box1}*/}
                    {/*/>*/}
                    <Earth envMapIntensity={envMapIntensity}/>
                    {/*<ambientLight intensity={ambientIntensity} />*/}
                    {/*<directionalLight  // set the light position, to sunPosition*/}
                    {/*    position={[directionalLightPosition.x, directionalLightPosition.y, directionalLightPosition.z]}*/}
                    {/*    intensity={directionalIntensity}*/}
                    {/*    // castShadow={true}*/}
                    {/*    // shadow-mapSize={[1024, 1024]}*/}
                    {/*    // shadow-camera-far={15}*/}
                    {/*    // shadow-camera-left={-10}*/}
                    {/*    // shadow-camera-right={10}*/}
                    {/*    // shadow-camera-top={10}*/}
                    {/*    // shadow-camera-bottom={-10}*/}
                    {/*/>*/}
                    <OrbitControls/>
                    {/*<ambientLight layers={1} intensity={0.3} />*/}

                    {/*<pointLight position={[10, 10, 10]} />*/}
                    {/*<color args={ ['#0a0a0a']} attach={"background"} />*/}
                    {/*<Stars radius={400} depth={50} count={2000} factor={10} saturation={5} fade={true} />*/}
                </Canvas>
            </div>
        </>
    )
}
