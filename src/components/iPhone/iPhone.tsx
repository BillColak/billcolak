
import {ContactShadows, Float, Html, PresentationControls, Text, useGLTF, useMask} from "@react-three/drei";
import Example from "./Embed";

import {useControls} from "leva";


export function Phone() {
    const phone = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/iphone-x/model.gltf')

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


