import {Environment, Float, OrbitControls, Plane, Stars, useAspect, useGLTF,} from "@react-three/drei";
import {Canvas, useFrame, useLoader} from "@react-three/fiber";
import * as THREE from "three";
import {useEffect, useRef, useState} from "react";
import {useControls} from "leva";
import {Perf} from "r3f-perf";
import Earth from "../components/ISS/Earth";


// const aspectRatio = (window.innerWidth / window.innerHeight)
// https://codesandbox.io/s/tx1pq

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

    // const { envMapIntensity, directionalLight } = useControls('environment map', {
    //     envMapIntensity: {value: 30, min: 0, max: 100, step: 1},
    //     directionalLight: {
    //         value: 10, min: 0, max: 100, step: 1
    //     },
    // })
    const { envMapIntensity, directionalLightPosition, directionalIntensity, ambientIntensity } =
        useControls({
        envMapIntensity: {value: 30, min: 0, max: 100, step: 1},
        directionalLightPosition:
            {
                value: { x: 10,  y: 10 , z: 50 },
                step: 1
            },
        directionalIntensity: {value: 1, min: 0, max: 100, step: 1},
        ambientIntensity: {value: 1, min: 0, max: 100, step: 1},
    })

    const boxingGlove = useGLTF('/models/boxing-glove.glb')
    const cleats = useGLTF('/models/adidas_predator/scene.gltf')

    return (
        <>
            <div className="w-full h-screen">
                <Canvas>
                    <Perf position={'top-left'} />
                    <Earth envMapIntensity={envMapIntensity}/>

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

                    <Environment
                        background
                        // files={'/GlobeTextures/hdr/omega.hdr'}
                        // files={'/GlobeTextures/hdr/alphamayoris.hdr'}
                        // files={'/GlobeTextures/hdr/earth.hdr'}
                        // files={'/GlobeTextures/hdr/nebula.hdr'}
                        files={[
                            '/GlobeTextures/skybox/space-posx.jpg',
                            '/GlobeTextures/skybox/space-negx.jpg',
                            '/GlobeTextures/skybox/space-posy.jpg',
                            '/GlobeTextures/skybox/space-negy.jpg',
                            '/GlobeTextures/skybox/space-posz.jpg',
                            '/GlobeTextures/skybox/space-negz.jpg',
                        ]}
                    />

                    <ambientLight intensity={ambientIntensity} />
                    <directionalLight  // set the light position, to sunPosition
                        position={[directionalLightPosition.x, directionalLightPosition.y, directionalLightPosition.z]}
                        intensity={directionalIntensity}
                        // castShadow={true}
                        // shadow-mapSize={[1024, 1024]}
                        // shadow-camera-far={15}
                        // shadow-camera-left={-10}
                        // shadow-camera-right={10}
                        // shadow-camera-top={10}
                        // shadow-camera-bottom={-10}
                    />

                    {/*<pointLight position={[10, 10, 10]} />*/}
                    {/*<color args={ ['#0a0a0a']} attach={"background"} />*/}
                    {/*<Stars radius={400} depth={50} count={2000} factor={10} saturation={5} fade={true} />*/}
                    <OrbitControls
                        // autoRotate
                        // enablePan={false}
                        // enableZoom={false}
                        // maxPolarAngle={Math.PI / 2}
                        // minPolarAngle={Math.PI / 2}
                    />
                </Canvas>
            </div>
        </>
    )
}
