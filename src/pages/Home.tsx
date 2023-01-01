import {Canvas, useFrame} from '@react-three/fiber'
import Box from '../components/Box';
import Sphere from "../components/Sphere";
import {Suspense, useRef} from "react";
import * as THREE from "three";
import {TransformControls, OrbitControls, Html} from '@react-three/drei'
// import TestScene from "../components/testScene";
import CustomObject from "../components/CustomObject";
import StairWay from "../components/StairWay";
import Column from "../components/Column";
import Rails from "../components/Rails";
import PyramidRails from "../components/PyramidRails";
import ObeliskRails from "../components/ObeliskRails";
import Ball from "../components/Ball";
import {useControls} from "leva";
import Arch from "../components/Arch";


// todo add debug panel instead of updating state


function Experience() {

    const controls = useControls({
        radius : 1,
        widthSegments : 32,
        heightSegments : 16,
        phiStart : 0,
        phiLength : Math.PI,
        thetaStart : 4.3,
        thetaLength : 1/Math.PI,
        wireframe : false
    });


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
            <Arch
                radius={controls.radius}
                widthSegments={controls.widthSegments}
                heightSegments={controls.heightSegments}
                phiStart={controls.phiStart}
                phiLength={controls.phiLength}
                thetaStart={controls.thetaStart}
                thetaLength={controls.thetaLength}
                color={'hotpink'}
                wireframe={controls.wireframe}
            />
            <Ball
                position={[0,2,2]}
                rotation={[0,0,0]}
                colorTwo={"#523fea"}
                colorOne={"#aaff00"}
                key="Ball123"
            />
            <PyramidRails
                key="PyramidRails"
                count={4}
                leftClosed={true}
                rightClosed={true}
                height={1}
                position={[-3, 0, 0]}
                color={'skyblue'}
            />
            <ObeliskRails
                key="ObeliskRails123"
                leftClosed={true}
                rightClosed={true}
                count={4}
                height={1}
                position={[-3, 0, -2]}
                color={'#deaa89'}
            />

            <StairWay
                // key="StairWay123"
                steps={7}
                position={[3, 1, 3]}
            />

            {/*<group ref={group}>*/}
            {/*    <Box position={[-1.2, 1, 0]} rotation-y={ Math.PI * 0.25 } />*/}
            {/*    <Sphere position={[1.2, 1, 0]} scale={1} />*/}
            {/*    <Html*/}
            {/*        position={ [ 1, 1, 0 ] }*/}
            {/*        wrapperClass="label"*/}
            {/*        className="btn-red py-5  w-[180px]"*/}
            {/*        // center={ true }*/}
            {/*        distanceFactor={ 0.01 }*/}
            {/*    >*/}
            {/*        That's a sphere 👍*/}
            {/*    </Html>*/}
            {/*</group>*/}
            {/*<TransformControls object={sphere} mode="translate" />*/}
            {/*<CustomObject position={[0, 0, 0]} scale={1} />*/}


            <mesh position-y={ 0 } rotation-x={ - Math.PI * 0.5 } scale={ 20 }>
                <planeGeometry  />
                <meshStandardMaterial color={'greenyellow'} />
            </mesh>
        </>
    )
}


export default function Home() {

    return (
        <div className="v-flex w-full h-screen">
            This is the home page.
            {/*<Spline scene="https://prod.spline.design/m7T1A1rThV4xWH5K/scene.splinecode" />*/}

            {/*<Canvas shadows flat linear>*/}
            {/*    <Suspense fallback={null}>*/}
            {/*        <OrbitControls />*/}
            {/*        <TestScene  />*/}
            {/*    </Suspense>*/}
            {/*</Canvas>*/}

            <Canvas
                // all these are pretty much default values
                dpr={[1, 2]}
                gl={{
                    alpha: true,
                    antialias: true,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    outputEncoding: THREE.sRGBEncoding,
                }}
                orthographic
                camera={ {
                    fov: 45,
                    near: 0.1,
                    far: 200,
                    position: [ 3, 2, 6 ],
                    zoom: 100
                } }
            >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <Experience />
                <OrbitControls />
            </Canvas>
        </div>
    );
}
