import {ThreeElements} from "@react-three/fiber";


export default function Sphere(props: ThreeElements['mesh']) {
    return (
        <>
            <mesh {...props}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial color={'hotpink'} />
            </mesh>
        </>
    )
}
