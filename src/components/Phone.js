import useSpline from '@splinetool/r3f-spline'

/**
 * @type {React.FC}
 * @param {Object} props
 * */
export default function Phone({ ...props }) {
    // const { nodes, materials } = useSpline('https://prod.spline.design/2fzdsSVagfszNxsd/scene.spline')
    const { nodes, materials } = useSpline('../assets/scene.splinecode')

    return (
        <group {...props} dispose={null}>
            <mesh
                name="Rectangle"
                geometry={nodes.Rectangle.geometry}
                material={materials['Rectangle Material']}
            />
        </group>
    )
}

