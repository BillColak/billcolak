import * as THREE from 'three'
import {Suspense, useRef, useState} from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {Preload, Image as ImageImpl, Html} from '@react-three/drei'
import { ScrollControls, Scroll, useScroll } from '@react-three/drei'
import EdLoadingScreen from "../components/LoadingScreen/EDLoadingScreen";
import ErrorBoundary from "../components/errorBoundary";

// function Card(props) {
//     const {imgs} = props
//
//     return(
//         <div className="max-w-xs rounded-md shadow-md dark:bg-gray-900 dark:text-gray-100">
//             {imgs}
//             {/*<img src="https://source.unsplash.com/random/300x300/?2" alt="" className="object-cover object-center w-full rounded-t-md h-72 dark:bg-gray-500" />*/}
//             <div className="flex flex-col justify-between p-6 space-y-8">
//                 <div className="space-y-2">
//                     <h2 className="text-3xl font-semibold tracking-wide">Donec lectus leo</h2>
//                     <p className="dark:text-gray-100">Curabitur luctus erat nunc, sed ullamcorper erat vestibulum eget.</p>
//                 </div>
//                 <button type="button" className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md dark:bg-violet-400 dark:text-gray-900">Read more</button>
//             </div>
//         </div>
//     )
// }


// todo rounded corners of images

// https://discourse.threejs.org/t/roundedrectangle-squircle/28645

// function RectangleRounded( w, h, r, s ) { // width, height, radiusCorner, smoothness
//
//     const pi2 = Math.PI * 2;
//     const n = ( s + 1 ) * 4; // number of segments
//     let indices = [];
//     let positions = [];
//     let uvs = [];
//     let qu, sgx, sgy, x, y;
//
//     for ( let j = 1; j < n + 1; j ++ ) indices.push( 0, j, j + 1 ); // 0 is center
//     indices.push( 0, n, 1 );
//     positions.push( 0, 0, 0 ); // rectangle center
//     uvs.push( 0.5, 0.5 );
//     for ( let j = 0; j < n ; j ++ ) contour( j );
//
//     const geometry = new THREE.BufferGeometry( );
//     geometry.setIndex( new THREE.BufferAttribute( new Uint32Array( indices ), 1 ) );
//     geometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array( positions ), 3 ) );
//     geometry.setAttribute( 'uv', new THREE.BufferAttribute( new Float32Array( uvs ), 2 ) );
//
//     return geometry;
//
//     function contour( j ) {
//
//         qu = Math.trunc( 4 * j / n ) + 1 ;      // quadrant  qu: 1..4
//         sgx = ( qu === 1 || qu === 4 ? 1 : -1 ) // signum left/right
//         sgy =  qu < 3 ? 1 : -1;                 // signum  top / bottom
//         x = sgx * ( w / 2 - r ) + r * Math.cos( pi2 * ( j - qu + 1 ) / ( n - 4 ) ); // corner center + circle
//         y = sgy * ( h / 2 - r ) + r * Math.sin( pi2 * ( j - qu + 1 ) / ( n - 4 ) );
//
//         positions.push( x, y, 0 );
//         uvs.push( 0.5 + x / w, 0.5 + y / h );
//
//     }
// }
//
// function roundedImage({url, width, height, radius, smoothness, ...props}) {
//     const geometry = RectangleRounded(width, height, radius, smoothness)
//     const texture = new THREE.TextureLoader().load(url)
//     const material = new THREE.MeshBasicMaterial({map: texture})
//     return (
//         <mesh geometry={geometry} material={material} {...props}>
//             {/*<planeBufferGeometry attach="geometry" args={[width, height, 1, 1]}/>*/}
//             {/*<meshBasicMaterial attach="material" map={texture}/>*/}
//         </mesh>
//     )
// }



function Image(props) {
    const ref = useRef()
    const group = useRef()
    const data = useScroll()
    const [hovered, hover] = useState(false)
    const over = () => hover(true)
    const out = () => hover(false)

    // console.log(ref.current)

    useFrame((state, delta) => {
        group.current.position.z = THREE.MathUtils.damp(group.current.position.z, Math.max(0, data.delta * 50), 4, delta)
        let grayscale = THREE.MathUtils.damp(ref.current.material.grayscale, Math.max(0.3, 1 - data.delta * 1000), 4, delta)
        ref.current.material.grayscale = hovered ? 0 : grayscale
    })
    return (
        <group ref={group}>
            <ImageImpl ref={ref} {...props} onPointerOver={over} onPointerOut={out}/>
        </group>
    )
}

function Page({ m = 0.4, urls, ...props }) {
    const { width } = useThree((state) => state.viewport)
    const w = width < 10 ? 1.5 / 3 : 1 / 3
    return (
        <group {...props}>
            <Image position={[-width * w, 0, -1]} scale={[width * w - m * 2, 5, 1]} url={urls[0]} />
            <Image position={[0, 0, 0]} scale={[width * w - m * 2, 5, 1]} url={urls[1]} />
            <Image position={[width * w, 0, 1]} scale={[width * w - m * 2, 5, 1]} url={urls[2]} />
            {/*<Image  position={[0, 0, 0]} scale={[width * w - m * 2, 6, 1]} url={'/Scptr.png'} transparent={true}/>*/}
            {/*<Image position={[width * w, 0, 1]} scale={[width * w - m * 2, 5, 1]} url={'/whatever.png'} transparent={true} />*/}
        </group>
    )
}

function Pages() {
    const { width } = useThree((state) => state.viewport)
    return (
        <>
            <Page position={[-width * 1, 0, 0]} urls={['/scroll/images/img1.png', '/scroll/images/img2.png', '/scroll/images/img3.png']} />
            <Page position={[width * 0, 0, 0]} urls={['/scroll/images/img4.png', '/scroll/images/img5.png', '/scroll/images/img6.png']} />
            <Page position={[width * 1, 0, 0]} urls={['/scroll/images/img7.png', '/scroll/images/img8.png', '/scroll/images/img9.png']} />
            <Page position={[width * 2, 0, 0]} urls={['/scroll/images/img1.png', '/scroll/images/img2.png', '/scroll/images/img3.png']} />
            <Page position={[width * 3, 0, 0]} urls={['/scroll/images/img4.png', '/scroll/images/img5.png', '/scroll/images/img6.png']} />
            <Page position={[width * 4, 0, 0]} urls={['/scroll/images/img7.png', '/scroll/images/img8.png', '/scroll/images/img9.png']} />
        </>
    )
}

export default function App() {
    return (
        <div className={'h-screen'}>
            <ErrorBoundary  >
            <Suspense fallback={<EdLoadingScreen/>}>
                <Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
                    <ScrollControls infinite horizontal damping={4} pages={4} distance={1}>
                        <Scroll>
                            <Pages />
                        </Scroll>
                        <Scroll html >
                            <div className={'font-mavis font-bold text-8xl'}>
                                <h1 style={{ position: 'absolute', top: '15vh', left: '-75vw'}}>AI</h1>
                                <h1 style={{ position: 'absolute', top: '15vh', left: '15vw' }}>Generated</h1>
                                <h1 style={{ position: 'absolute', top: '15vh', left: '125vw' }}>Art</h1>
                                <h1 style={{ position: 'absolute', top: '15vh', left: '225vw' }}>AI</h1>
                                <h1 style={{ position: 'absolute', top: '15vh', left: '315vw' }}>Generated</h1>
                                <h1 style={{ position: 'absolute', top: '15vh', left: '425vw' }}>Art</h1>
                            </div>
                        </Scroll>
                    </ScrollControls>
                    <Preload />
                </Canvas>
            </Suspense>
            </ErrorBoundary>
        </div>
    )
}
