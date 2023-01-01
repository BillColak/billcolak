import {MeshProps, ThreeElements} from "@react-three/fiber";


/**
 *  Ball
 */

export interface BallProps extends MeshProps {
    position: [number, number, number]
    rotation: [number, number, number]
    colorOne?: string
    colorTwo?: string
}




export default function Ball(props: BallProps) {
    return (
        <>
            <mesh
                position={props.position}
                rotation={props.rotation}
            >
                <mesh
                    position={[0, 0, 0]}
                    rotation={[1.142, 0, 1]}
                >
                    <sphereGeometry
                        args={[1, 32, 32, 0, Math.PI * 2, 0, Math.PI/2]}
                    />
                    <meshStandardMaterial color={props.colorOne} />
                </mesh>
                <mesh
                    position={[0, 0, 0]}
                    rotation={[-2, 0, -1]}
                >
                    <sphereGeometry
                        args={[1, 32, 32, 0, Math.PI * 2, 0, Math.PI/2]}
                    />
                    <meshStandardMaterial color={props.colorTwo} />
                </mesh>
            </mesh>
        </>
    )
}
