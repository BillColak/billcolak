import {ThreeElements} from "@react-three/fiber";
import {useEffect, useMemo, useRef} from "react";
import * as THREE from "three";


export default function CustomObject(props: ThreeElements['mesh']) {

    const geoRef = useRef<THREE.BufferGeometry>(null!)

    const verticesCount = 10*3;
    const positions = useMemo(() =>
    {
        const positions = new Float32Array(verticesCount * 3)
        for(let i = 0; i < verticesCount * 3; i++)
            positions[i] = (Math.random() - 0.5) * 3

        return positions
    }, [])


    useEffect(
        () =>{
            geoRef.current.computeVertexNormals()
        },[positions]
    )

    return (
        <>
            <mesh
                {...props}
            >
                <bufferGeometry ref={geoRef}>
                    <bufferAttribute
                        attach='attributes-position'
                        count={verticesCount}
                        itemSize={3}
                        array={positions}
                    />
                </bufferGeometry>
                <meshStandardMaterial color={'purple'} />
            </mesh>
        </>
    )
}
