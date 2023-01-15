import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import {Suspense, useLayoutEffect} from "react";
import {ContactShadows, Float, Html, PresentationControls, Text, useGLTF, useMask} from "@react-three/drei";
import Example from "./Embed";
import useSpline from "@splinetool/r3f-spline";
import {useControls} from "leva";


export function Phone() {
    const phone = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/iphone-x/model.gltf')
    // console.log('phone: ',phone)
    const { position, scale } = useControls({
        position:
            {
                value: { x: 0.16,  y: 1.34 , z: 0.08 },
                step: 0.01
            },
        scale:{
            value: 1.56,
            step: 0.01
        },
    })

    return (

        <>
            <color args={ ['#695b5b']} attach={"background"} />

            <PresentationControls
                global
                rotation={ [ 0, 0, 0 ] }
                polar={[-0.4, 0.2]}
                azimuth={[-1,0.75]}
                config={ { mass: 2, tension: 400 } }
                snap={ { mass: 4, tension: 400 } }
            >
                    {/* Screen Light */}

                    <rectAreaLight
                        width={2.5}
                        height={1.65}
                        intensity={65}
                        color={'#4f46e5'}
                        rotation={[0.1, Math.PI, 0]}
                        position={[0, 0.55, -1.55]}
                    />

                    {/* MacBook Model */}
                    <primitive object={ phone.scene } position-y={ -1 }>
                        {/* iframe Website */}
                        <Html
                            center
                            transform

                            className="phoneHtmlScreen"
                            distanceFactor={ 1 }
                            position={[position.x, position.y, position.z]}
                            // rotation-x={0}
                            scale={scale}
                        >
                            <iframe src="https://billcolak.com/" />
                            {/*<Example />*/}
                        </Html>
                    </primitive>

            </PresentationControls>

            <ContactShadows
                position-y={-1.4}
                opacity={0.4}
                scale={5}
                blur={2.4}
            />
        </>
    );
}


