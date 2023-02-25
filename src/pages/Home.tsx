import {Canvas, useFrame, useLoader} from '@react-three/fiber'
import Box from '../components/ThreeComponents/Box';
import Sphere from "../components/ThreeComponents/Sphere";
import {Suspense, useRef, useState} from "react";
import * as THREE from "three";
import { OrbitControls, Html} from '@react-three/drei'
import {useControls} from "leva";
import {TextureLoader} from "three";
import {FBOParticles} from "../components/Particles/FBOdemo/FBOParticles";
// import { Glitch, EffectComposer } from '@react-three/postprocessing'

import {EffectComposer, Glitch} from "@react-three/postprocessing";
// import {GlitchMode, BlendFunction} from "postprocessing";

import {Perf} from "r3f-perf";
import EDLoadingScreen from "../components/LoadingScreen/EDLoadingScreen";


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


function Experience() {

    const texture = useLoader(TextureLoader, '/images/Scptr.png');

    const group = useRef<THREE.Group>(null!)

    // useFrame((state, delta) => {
    //     group.current.rotation.y += delta
    //     // const angle = state.clock.elapsedTime
    //     // state.camera.position.x = Math.sin(angle) * 10
    //     // state.camera.position.z = Math.cos(angle) * 10
    //     // state.camera.lookAt(0, 0, 0)
    // })
    // const sphere = useRef(null!)

    return (
        <>
            <group ref={group}>
                <Box position={[-1.2, 1, 0]} rotation-y={ Math.PI * 0.25 } />
                <Sphere position={[1.2, 1, 0]} scale={1} />
                <Html
                    position={ [ 1, 1, 0 ] }
                    wrapperClass="label"
                    className="btn-red py-5  w-[180px]"
                    // center={ true }
                    distanceFactor={ 0.01 }
                >
                    That's a sphere 👍
                    <img src="/images/Scptr.png" alt="Scptr" className="object-contain"/>
                </Html>
            </group>
            {/*<TransformControls object={sphere} mode="translate" />*/}
            {/*<CustomBox*/}
            {/*    position={[0, 2, 0]}*/}
            {/*    rotation={[0, 0, 0]}*/}
            {/*    scale={1}*/}

            {/*/>*/}

            {/*<Laptop/>*/}
            {/*<Phone/>*/}

            {/*<Html distanceFactor={1} className={'max-h-[250px]'}>*/}
            {/*    <img src="/images/Scptr.png" alt="Scptr" className="object-contain"/>*/}
            {/*</Html>*/}

            <mesh position-y={ 0 } rotation-x={ - Math.PI * 0.5 } scale={ 20 }>
                <planeGeometry  />
                <meshStandardMaterial color={'greenyellow'} />
            </mesh>
        </>
    )
}


export default function Home() {

    // const [project, setProject] = useState('FBO Particles')

    // select Project
    // useControls({
    //     Select_Demo: {
    //         value: 'FBO Particles',
    //         options: ['FBO Particles', 'Pulsing Particles', 'Earth', 'Experience'],
    //         onChange: (value) => {
    //             setProject(value)
    //             console.log(value)
    //         }
    //     }
    // })



    return (
        <>
            <div className="h-screen">
                <Suspense fallback={<EDLoadingScreen/>}>
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
                            position: [ 3, 2, 2], // use the third index to bring the camera closer.
                            zoom: 1
                        } }
                    >
                        <EffectComposer>
                            <Glitch
                                // @ts-ignore
                                delay={ [ 4, 8 ] }
                                // @ts-ignore
                                duration={ [ 0.3, 0.5 ] }
                                // @ts-ignore
                                strength={ [ 0.2, 0.4 ] }

                            />
                        </EffectComposer>
                        {/*<Perf position={'bottom-left'}/>*/}

                        {/*{project === 'Experience' && <Experience />}*/}
                        {/*{project === 'Pulsing Particles' && <PulsingParticles />}*/}
                        {/*{project === 'FBO Particles' && <FBOParticles />}*/}
                        <FBOParticles />
                        <OrbitControls />
                        <ambientLight intensity={1.5} />
                        {/*<pointLight position={[10, 10, 10]} />*/}
                    </Canvas>
                </Suspense>
            </div>
        </>
    );
}
