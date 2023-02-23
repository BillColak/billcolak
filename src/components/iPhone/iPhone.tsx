
import {ContactShadows, Float, Html, PresentationControls, useGLTF} from "@react-three/drei";

export function Phone() {
    const phone = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/iphone-x/model.gltf')
    return (
        <>
            <PresentationControls
                global
                rotation={ [ 0, 0, 0 ] }
                polar={[-0.4, 0.2]}
                azimuth={[-1,0.75]}
                config={ { mass: 2, tension: 400 } }
                snap={ { mass: 4, tension: 400 } }
            >
                <Float>
                    <primitive object={ phone.scene } position-y={ -1 }>
                        <Html
                            center
                            transform
                            className="phoneHtmlScreen"
                            distanceFactor={ 1 }
                            position={[0.16, 1.34, 0.08 ]}
                            scale={[1.6, 1.58, 1]}
                        >
                            <img src={'/ProfilePage.png'}/>
                        </Html>
                    </primitive>
                </Float>
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


