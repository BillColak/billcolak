import {ContactShadows, Float, Html, PresentationControls, Text, useGLTF } from "@react-three/drei";


// todo open + close laptop, some kind of animation when waiting for model to load https://codesandbox.io/s/q23sw
// zoom in on laptop when clicked
// check https://codesandbox.io/s/interactive-spline-scene-live-html-f79ucc?file=/src/App.js:278-292
// todo Suspense?
// TODO OPTIMIZE WITH DRACO?
// SAME PROJECT BY PMDRS https://codesandbox.io/s/9keg6?file=/src/HeroPage.js



export default function Laptop() {

    const computer = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf')
    // const computer = useGLTF('iphone_12_pro/scene.gltf')


    return (

        <>
            <color args={ ['#695b5b']} attach={"background"} />

            <PresentationControls
                global
                rotation={ [ 0.13, 0.4, 0 ] }
                polar={[-0.4, 0.2]}
                azimuth={[-1,0.75]}
                config={ { mass: 2, tension: 400 } }
                snap={ { mass: 4, tension: 400 } }
            >
                <Float
                    rotationIntensity={0.2}
                >
                    {/* Screen Light */}
                    <rectAreaLight
                        width={2.5}
                        height={1.65}
                        intensity={65}
                        color={'#4f46e5'} // todo change this color to admin
                        rotation={[0.1, Math.PI, 0]}
                        position={[0, 0.55, -1.55]}
                    />
                    {/* MacBook Model */}
                    <primitive object={ computer.scene } position-y={ -1 }>
                        {/* iframe Website */}
                        <Html
                            transform
                            wrapperClass="computerHtmlScreen"
                            distanceFactor={ 1 }
                            position={[0, 1.56, -1.4]}
                            rotation-x={-0.256}
                        >
                        {/* iframe is on top of everything check https://codesandbox.io/s/interactive-spline-scene-live-html-f79ucc?file=/src/App.js:278-292 */}
                        <iframe src="https://billcolak.com/" />
                        </Html>
                    </primitive>
                    <Text
                        fontSize={ 1 }
                        position={ [2.5, 0.75, 0.75]}
                        rotation-y={ -1 }
                        maxWidth={ 2 }
                        textAlign={ 'center' }
                    >Bill Colak</Text>
                </Float>
            </PresentationControls>

            <ContactShadows
                position-y={-1.4}
                opacity={0.4}
                scale={5}
                blur={2.4}
                />
        </>
    )
}
