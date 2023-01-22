import {Canvas, useFrame, useLoader} from '@react-three/fiber'
import Box from '../components/ThreeComponents/Box';
import Sphere from "../components/ThreeComponents/Sphere";
import {Suspense, useRef} from "react";
import * as THREE from "three";
import {TransformControls, OrbitControls, Html} from '@react-three/drei'
// import TestScene from "../components/testScene";
import CustomBox from "../components/ThreeComponents/CustomBox";
import StairWay from "../components/ThreeComponents/StairWay";
import Column from "../components/ThreeComponents/Column";
import Rails from "../components/ThreeComponents/Rails";
import PyramidRails from "../components/ThreeComponents/PyramidRails";
import ObeliskRails from "../components/ThreeComponents/ObeliskRails";
import Ball from "../components/ThreeComponents/Ball";
import {useControls} from "leva";
import Arch from "../components/ThreeComponents/Arch";
import Laptop from "../components/Laptop/Laptop";
import {Phone} from "../components/iPhone/iPhone";
import {TextureLoader} from "three";



// todo add debug panel instead of updating state
// TODO https://codesandbox.io/s/zxpv7 HAVE TO ADD THIS!!!
// TODO DESIGN SYSTEM WITH COLORS AND FONTS IN FIGMA
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


function Experience() {

    // const controls = useControls({
    //     radius : 1,
    //     widthSegments : 32,
    //     heightSegments : 16,
    //     phiStart : 0,
    //     phiLength : Math.PI,
    //     thetaStart : 4.3,
    //     thetaLength : 1/Math.PI,
    //     wireframe : false
    // });
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
            {/*<Arch*/}
            {/*    radius={controls.radius}*/}
            {/*    widthSegments={controls.widthSegments}*/}
            {/*    heightSegments={controls.heightSegments}*/}
            {/*    phiStart={controls.phiStart}*/}
            {/*    phiLength={controls.phiLength}*/}
            {/*    thetaStart={controls.thetaStart}*/}
            {/*    thetaLength={controls.thetaLength}*/}
            {/*    color={'hotpink'}*/}
            {/*    wireframe={controls.wireframe}*/}
            {/*/>*/}
            {/*<Ball*/}
            {/*    position={[0,2,2]}*/}
            {/*    rotation={[0,0,0]}*/}
            {/*    colorTwo={"#523fea"}*/}
            {/*    colorOne={"#aaff00"}*/}
            {/*    key="Ball123"*/}
            {/*/>*/}
            {/*<PyramidRails*/}
            {/*    key="PyramidRails"*/}
            {/*    count={4}*/}
            {/*    leftClosed={true}*/}
            {/*    rightClosed={true}*/}
            {/*    height={1}*/}
            {/*    position={[-3, 0, 0]}*/}
            {/*    color={'skyblue'}*/}
            {/*/>*/}
            {/*<ObeliskRails*/}
            {/*    key="ObeliskRails123"*/}
            {/*    leftClosed={true}*/}
            {/*    rightClosed={true}*/}
            {/*    count={4}*/}
            {/*    height={1}*/}
            {/*    position={[-3, 0, -2]}*/}
            {/*    color={'#deaa89'}*/}
            {/*/>*/}

            {/*<StairWay*/}
            {/*    // key="StairWay123"*/}
            {/*    steps={7}*/}
            {/*    position={[3, 1, 3]}*/}
            {/*/>*/}

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

    return (
        <>
            <div className="v-flex w-full h-[800px]">

                This is the home page.
                {/*<Spline scene="https://prod.spline.design/m7T1A1rThV4xWH5K/scene.splinecode" />*/}

                {/*<Canvas shadows flat linear>*/}
                {/*    <Suspense fallback={null}>*/}
                {/*        <OrbitControls />*/}
                {/*        <TestScene  />*/}
                {/*    </Suspense>*/}
                {/*</Canvas>*/}

                <Canvas //wtf does Canvas do?
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
                        position: [ 3, 2, 4 ], // use the third index to bring the camera closer.
                        zoom: 1
                    } }
                >
                    <OrbitControls />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    <Experience />
                </Canvas>
            </div>
        </>
    );
}
// todo Spring library for realistic animations? https://react-spring.dev/ https://react-spring.dev/docs/advanced/config#configs even animate dom elements?
// https://codesandbox.io/s/kud9p?file=/src/Model.js:883-933 -->  what is going on with nodes in Model.js?
