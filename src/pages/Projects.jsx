import * as THREE from 'three'
import { Suspense, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {Preload, Image as ImageImpl, Html} from '@react-three/drei'
import { ScrollControls, Scroll, useScroll } from '@react-three/drei'
import {Phone} from "../components/iPhone/iPhone";


function Card(props) {
    const {imgs} = props

    return(
        <div className="max-w-xs rounded-md shadow-md dark:bg-gray-900 dark:text-gray-100">
            {imgs}
            {/*<img src="https://source.unsplash.com/random/300x300/?2" alt="" className="object-cover object-center w-full rounded-t-md h-72 dark:bg-gray-500" />*/}
            <div className="flex flex-col justify-between p-6 space-y-8">
                <div className="space-y-2">
                    <h2 className="text-3xl font-semibold tracking-wide">Donec lectus leo</h2>
                    <p className="dark:text-gray-100">Curabitur luctus erat nunc, sed ullamcorper erat vestibulum eget.</p>
                </div>
                <button type="button" className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md dark:bg-violet-400 dark:text-gray-900">Read more</button>
            </div>
        </div>
    )
}

function Image(props) {
    const ref = useRef()
    const group = useRef()
    const data = useScroll()
    useFrame((state, delta) => {
        group.current.position.z = THREE.MathUtils.damp(group.current.position.z, Math.max(0, data.delta * 50), 4, delta)
        // ref.current.material.grayscale = THREE.MathUtils.damp(ref.current.material.grayscale, Math.max(0, 1 - data.delta * 1000), 4, delta)
    })
    return (
        <group ref={group}>
            <ImageImpl ref={ref} {...props} />
        </group>
    )
}

function Page({ m = 0.4, urls, ...props }) {
    const { width } = useThree((state) => state.viewport)
    const w = width < 10 ? 1.5 / 3 : 1 / 3
    return (
        <group {...props}>
            <Image position={[-width * w, 0, -1]} scale={[width * w - m * 2, 5, 1]} url={urls[0]} />
            {/*<Image position={[0, 0, 0]} scale={[width * w - m * 2, 5, 1]} url={urls[1]} />*/}
            <Image  position={[0, 0, 0]} scale={[width * w - m * 2, 6, 1]} url={'/images/Scptr.png'} transparent={true}/>
            {/*<Image position={[width * w, 0, 1]} scale={[width * w - m * 2, 5, 1]} url={urls[2]} />*/}
            <Image position={[width * w, 0, 1]} scale={[width * w - m * 2, 5, 1]} url={'/images/whatever.png'} transparent={true} />

            {/*<Html position={[-width * w, 0, -1]} scale={[width * w - m * 2, 5, 1]}><img src={urls[0]} className="object-contain"/></Html>*/}
            {/*<Html position={[0, 0, 0]} scale={[width * w - m * 2, 5, 1]}><img src={urls[1]} className="object-contain"/></Html>*/}
            {/*<Html position={[width * w, 0, 1]} scale={[width * w - m * 2, 5, 1]}><img src={urls[2]} className="object-contain"/></Html>*/}
        </group>
    )
}

function Pages() {
    const { width } = useThree((state) => state.viewport)
    return (
        <>
            <Page position={[-width * 1, 0, 0]} urls={['/scroll/trip1.jpg', '/scroll/trip2.jpg', '/scroll/trip3.jpg']} />
            <Page position={[width * 0, 0, 0]} urls={['/scroll/img1.jpg', '/scroll/img2.jpg', '/scroll/img3.jpg']} />
            <Page position={[width * 1, 0, 0]} urls={['/scroll/img4.jpg', '/scroll/img5.jpg', '/scroll/img6.jpg']} />
            <Page position={[width * 2, 0, 0]} urls={['/scroll/trip1.jpg', '/scroll/trip2.jpg', '/scroll/trip3.jpg']} />
            <Page position={[width * 3, 0, 0]} urls={['/scroll/img1.jpg', '/scroll/img2.jpg', '/scroll/img3.jpg']} />
            <Page position={[width * 4, 0, 0]} urls={['/scroll/img4.jpg', '/scroll/img5.jpg', '/scroll/img6.jpg']} />
        </>
    )
}

export default function App() {
    return (
        <div className={'h-screen'}>
            <Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
                <Suspense fallback={null}>
                    <ScrollControls infinite horizontal damping={4} pages={4} distance={1}>
                        <Scroll>
                            <Pages />
                            {/*<Phone />*/}
                        </Scroll>
                        <Scroll html>

                            {/*<div className={'font-Inter text-8xl'}>*/}
                                {/*<h1 style={{ position: 'absolute', top: '20vh', left: '-75vw'}}>home</h1>*/}
                                {/*<h1 style={{ position: 'absolute', top: '20vh', left: '25vw' }}>to</h1>*/}
                                {/*<h1 style={{ position: 'absolute', top: '20vh', left: '125vw' }}>be</h1>*/}
                                {/*<h1 style={{ position: 'absolute', top: '20vh', left: '225vw' }}>home</h1>*/}
                                {/*<h1 style={{ position: 'absolute', top: '20vh', left: '325vw' }}>stuff</h1>*/}
                                {/*<h1 style={{ position: 'absolute', top: '20vh', left: '425vw' }}>be</h1>*/}
                            {/*</div>*/}
                        </Scroll>
                    </ScrollControls>
                    <Preload />
                </Suspense>
            </Canvas>
        </div>
    )
}
