
import {ContactShadows, Float, PresentationControls, useGLTF, Html} from "@react-three/drei";
import {useControls} from "leva";

export function Phone() {
    const phone = useGLTF('models/Iphone12.glb');
    const {rotation, position} = useControls( {
            rotation: {
                value: {x: 0, y: -1.5, z: 0},
            },
            position: {
                value: {x: -0.5, y: -1, z: 0},
            }

        }
    );

    return (
        <>
            <PresentationControls
                global
                rotation={[ 0, 0, 0 ] }
                polar={[-0.4, 0.2]}
                azimuth={[-0.75,0.75]}
                config={ { mass: 2, tension: 400 } }
                snap={ { mass: 4, tension: 400 } }
            >
                <Float>
                    <primitive object={ phone.scene } position={[-0.5, -1, 0]} rotation={[0, -1.5, 0]}>
                        {/*<Html*/}
                        {/*    center*/}
                        {/*    transform*/}
                        {/*    className="phoneHtmlScreen"*/}
                        {/*    distanceFactor={ 1 }*/}
                        {/*    position={[position.x, position.y, position.z]}*/}
                        {/*    rotation={[rotation.x, rotation.y, rotation.z]}*/}
                        {/*    scale={[1.6, 1.58, 1]}*/}
                        {/*>*/}
                        {/*    <img src={'/ProfilePage.png'}/>*/}
                        {/*</Html>*/}
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


//                    <primitive object={ phone.scene } position={[position.x, position.y, position.z]} rotation={[rotation.x, rotation.y, rotation.z]}/>
