import {ThreeElements} from "@react-three/fiber";
import {useEffect, useMemo, useRef} from "react";
import * as THREE from "three";
import {Float32BufferAttribute} from "three";
// import { LightingStrike } from "three\examples\jsm\geometries\LightningStrike ";


export default function CustomBox(props: ThreeElements['mesh']) {


    //  Arc Length = θ × (π/180) × r, where θ is in degree, r is the radius of the circle.

    const boxRef = useRef<THREE.BufferGeometry>(null!)
    const x = 0, y = 0, r=5, d=0.45;


    const heartShape = new THREE.Shape();
    const wf = false;


    heartShape.moveTo( x + r, y + r );
    // heartShape.bezierCurveTo( x + 15, y + 15, x + 15, y + 25, x + 5, y + 25 );
    // heartShape.quadraticCurveTo( x + 15, y + 10, x + 5, y + 25 );
    // heartShape.splineThru( [ new THREE.Vector2( x + 15, y + 25 ), new THREE.Vector2( x , y + 25 ) ] );
    heartShape.ellipse( x, y, r*2, r*1.5, 0, Math.PI, false, d );



    // heartShape.moveTo( x + 5, y + 5 );
    // heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
    // heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
    // heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
    // heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
    // heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
    // heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );

    // heartShape.moveTo( 25, 25 );
    // heartShape.bezierCurveTo( 25, 25, 20, 0, 0, 0 );
    // heartShape.bezierCurveTo( - 30, 0, - 30, 35, - 30, 35 );
    // heartShape.bezierCurveTo( - 30, 55, - 10, 77, 25, 95 );
    // heartShape.bezierCurveTo( 60, 77, 80, 55, 80, 35 );
    // heartShape.bezierCurveTo( 80, 35, 80, 0, 50, 0 );
    // heartShape.bezierCurveTo( 35, 0, 25, 25, 25, 25 );

    const extrudeSettings = { depth: 8, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

    return (
        <>
            <mesh
                {...props}
                scale={0.05}
            >
                <extrudeGeometry args={[heartShape, extrudeSettings]} />
                <meshStandardMaterial color={'purple'} wireframe={wf} />
            </mesh>
        </>
    )
}





//    const geoRef = useRef<THREE.BufferGeometry>(null!)
//
//     const verticesCount = 10*3;
//     const positions = useMemo(() =>
//     {
//         const positions = new Float32Array(verticesCount * 3)
//         for(let i = 0; i < verticesCount * 3; i++)
//             positions[i] = (Math.random() - 0.5) * 3
//
//         return positions
//     }, [])
//
//
//     useEffect(
//         () =>{
//             geoRef.current.computeVertexNormals()
//         },[positions]
//     )


//    const a = 1;
//     const b = 1;
//     const c = 1;
//
//     const vertices = [
//         -a/2, -b/2, -c/2,
//         -a/2, -b/2, c/2,
//         -a/2, b/2, -c/2,
//         -a/2, b/2, c/2,
//         a/2, -b/2, -c/2,
//         a/2, -b/2, c/2,
//         a/2, b/2, -c/2,
//         a/2, b/2, c/2
//     ]

//            <mesh
//                 {...props}
//             >
//                 <bufferGeometry ref={boxRef}>
//                     <bufferAttribute
//                         attach='attributes-position'
//                         count={vertices.length / 3}
//                         itemSize={3}
//                         array={position.array}
//                     />
//                 </bufferGeometry>
//                 <meshStandardMaterial color={'purple'} />
//             </mesh>
