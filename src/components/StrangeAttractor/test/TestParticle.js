import { useFBO } from "@react-three/drei";
import {useState, useMemo, useRef, useEffect} from "react";
import {useFrame, useThree} from "@react-three/fiber";
import {OrthographicCamera, Scene} from "three";
import * as THREE from "three";

export function TestParticles({ initialPositions, type, width, height }) {
    const point = useRef();
    const simulationMaterialRef = useRef();
    const { gl } = useThree();

    const [scene] = useState(() => new Scene());
    const [camera] = useState(() => new OrthographicCamera(-1, 1, 1, -1, 1 / Math.pow(2, 53), 1));
    const positions = useMemo(() => new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0]), []);
    const uvs = useMemo(() => new Float32Array([0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0]), []);

    let renderTarget = useFBO(width, height, {
        minFilter: THREE.NearestFilter,
        magFilter: THREE.NearestFilter,
        format: THREE.RGBAFormat,
        stencilBuffer: false,
        type: THREE.FloatType,
    });
    let renderTargetClone = renderTarget.clone();


    useEffect(() => {
        gl.setRenderTarget(renderTarget);
        gl.clear();
        gl.render(scene, camera);
        gl.setRenderTarget(renderTargetClone);
        gl.clear();
        gl.render(scene, camera);
        gl.setRenderTarget(null);
    }, []);

    useFrame(({ gl }) => {
        const temp = renderTarget;
        renderTarget = renderTargetClone;
        renderTargetClone = temp;
        simulationMaterialRef.current.uniforms.attractor.value = type;
        simulationMaterialRef.current.uniforms.positions.value = renderTarget.texture;
        gl.setRenderTarget(renderTargetClone);
        gl.clear();
        gl.render(scene, camera);
        gl.setRenderTarget(null);
        point.current.uniforms.positions.value = renderTargetClone.texture;
    });

    return (
        <>
            <points ref={point}>
                <mesh>
                    <simulationMaterial ref={simulationMaterialRef} />
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes.position"
                            count={positions.length / 3}
                            array={positions} itemSize={3}
                        />
                        <bufferAttribute
                            attach="attributes.uv"
                            count={uvs.length / 2}
                            array={uvs}
                            itemSize={2}
                        />
                    </bufferGeometry>
                </mesh>
            </points>
            <points>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes.position"
                        count={initialPositions.length / 3}
                        array={initialPositions}
                        itemSize={3}
                    />
                </bufferGeometry>
                <renderMaterial ref={point} />
            </points>
        </>
    );
}
