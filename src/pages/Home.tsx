import {Canvas} from '@react-three/fiber'
import React, {Suspense, useState} from "react";
import { OrbitControls} from '@react-three/drei'
import EDLoadingScreen from "../components/LoadingScreen/EDLoadingScreen";
import ErrorBoundary from "../components/errorBoundary";
import {AttractorParticles} from "../components/StrangeAttractor/test/TestAttractor";
import {useControls} from "leva";


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

const number = Math.floor(Math.random() * 7)

export default function Home() {

    const [Attractor, setAttractor] = useState(number.toString());
    const l = ["Lorenz", "LorenzMod2", "Thomas", "Dequan", "Dradas", "Arneodo", "Aizawa"]

    useControls(  {
        attractor: {
            value: l[number],
            options: l,
            onChange: (value) => {
                setAttractor(l.indexOf(value).toString())
            }
        }
    })

    const camera_pos_z = (Attractor === "0" || Attractor === "3")? 50 : 30


    return (
        <>
            <div className="h-screen">
                <ErrorBoundary>
                <Suspense fallback={<EDLoadingScreen/>}>
                    <Canvas
                        camera={ {
                        fov: 45,
                        position: [ 0, 0, camera_pos_z], // use the third index to bring the camera closer.
                        zoom: 1
                    }}>
                        <AttractorParticles attr={Attractor}/>
                        <OrbitControls />
                    </Canvas>
                </Suspense>
                </ErrorBoundary>
            </div>
        </>
    );
}
