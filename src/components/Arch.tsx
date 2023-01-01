import {MeshProps, SphereGeometryProps, ThreeElements} from "@react-three/fiber";


/**
 *  Ball
 */

interface ArchProps extends SphereGeometryProps {
    radius?: number,
    widthSegments?: number,
    heightSegments?: number,
    phiStart?: number,
    phiLength?: number,
    thetaStart?: number,
    thetaLength?: number,
    color?: string
    wireframe?: boolean
}


export default function Arch(props: ArchProps) {
    return (
        <>
            <mesh
            position={[0, 3, -2]}
            >
                <sphereGeometry
                    args={[
                        props.radius ?? 1,
                        props.widthSegments ?? 32,
                        props.heightSegments ?? 16,
                        props.phiStart ?? 0,
                        props.phiLength ?? Math.PI * 2,
                        props.thetaStart ?? 0,
                        props.thetaLength ?? Math.PI
                    ]}
                />
                <meshStandardMaterial color={props.color} wireframe={props.wireframe}/>
            </mesh>
        </>
    )
}
