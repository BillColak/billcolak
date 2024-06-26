import React, {Suspense, useRef} from 'react';
import * as THREE from "three";
import EDLoadingScreen from "../components/LoadingScreen/EDLoadingScreen";
import {Canvas} from "@react-three/fiber";
// import {EffectComposer, Glitch} from "@react-three/postprocessing";
// import {FBOParticles} from "../components/Particles/FBOdemo/FBOParticles";
import {OrbitControls} from "@react-three/drei";


// https://discourse.threejs.org/t/roundedrectangle-squircle/28645

function RectangleRounded( w, h, r, s ) { // width, height, radiusCorner, smoothness

    const pi2 = Math.PI * 2;
    const n = ( s + 1 ) * 4; // number of segments
    let indices = [];
    let positions = [];
    let uvs = [];
    let qu, sgx, sgy, x, y;

    for ( let j = 1; j < n + 1; j ++ ) indices.push( 0, j, j + 1 ); // 0 is center
    indices.push( 0, n, 1 );
    positions.push( 0, 0, 0 ); // rectangle center
    uvs.push( 0.5, 0.5 );
    for ( let j = 0; j < n ; j ++ ) contour( j );

    const geometry = new THREE.BufferGeometry( );
    geometry.setIndex( new THREE.BufferAttribute( new Uint32Array( indices ), 1 ) );
    geometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array( positions ), 3 ) );
    geometry.setAttribute( 'uv', new THREE.BufferAttribute( new Float32Array( uvs ), 2 ) );

    return geometry;

    function contour( j ) {

        qu = Math.trunc( 4 * j / n ) + 1 ;      // quadrant  qu: 1..4
        sgx = ( qu === 1 || qu === 4 ? 1 : -1 ) // signum left/right
        sgy =  qu < 3 ? 1 : -1;                 // signum  top / bottom
        x = sgx * ( w / 2 - r ) + r * Math.cos( pi2 * ( j - qu + 1 ) / ( n - 4 ) ); // corner center + circle
        y = sgy * ( h / 2 - r ) + r * Math.sin( pi2 * ( j - qu + 1 ) / ( n - 4 ) );

        positions.push( x, y, 0 );
        uvs.push( 0.5 + x / w, 0.5 + y / h );
    }
}

function RoundedImage({url, radius, smoothness, ...props}) {
    const ref = useRef()
    const geometry = RectangleRounded(16, 16, 2, 8)
    const texture = new THREE.TextureLoader().load(url)
    const material = new THREE.MeshBasicMaterial(
        {
            map: texture,
            doubleSide: true,
        }
    )
    return (
        <mesh ref={ref} geometry={geometry} material={material} {...props}>
            {/*<planeBufferGeometry attach="geometry" args={[width, height, 1, 1]}/>*/}
            {/*<meshBasicMaterial attach="material" map={texture}/>*/}
        </mesh>
    )
}



function Collections() {
    return (
        <div className={'h-screen'}>
            <Suspense fallback={<EDLoadingScreen/>}>
                <Canvas
                    dpr={[1, 2]}
                    gl={{
                        alpha: true,
                        antialias: true,
                        toneMapping: THREE.ACESFilmicToneMapping,
                        outputEncoding: THREE.sRGBEncoding,
                    }}
                    camera={ {
                        fov: 45,
                        near: 0.1,
                        far: 100,
                        position: [ 3, 2, 2], // use the third index to bring the camera closer.
                        zoom: 1
                    } }
                >
                    <RoundedImage url={'/scroll/images/img1.png'} scale={[3, 5, 1]} />
                    <OrbitControls />
                    <ambientLight intensity={1.5} />
                </Canvas>
            </Suspense>
        </div>
    );
}

export default Collections;
