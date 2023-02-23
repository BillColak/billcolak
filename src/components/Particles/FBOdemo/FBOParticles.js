import {   useFBO } from "@react-three/drei";
import { useFrame, extend, createPortal } from "@react-three/fiber";
import { useMemo, useRef, useState} from "react";
import * as THREE from "three";
import SimulationMaterial from './SimulationMaterial';
import vertexShader from './vertexShader';
import fragmentShader from './fragmentShader';
import {useControls} from "leva";

extend({ SimulationMaterial: SimulationMaterial });

export const FBOParticles = () => {
  const size = 256;

  const points = useRef();
  const simulationMaterialRef = useRef();

  // const [Attractor, setAttractor] = useState("Lorenz");
  // const l = ["Lorenz", "LorenzMod2", "Thomas", "Dequan", "Dradas", "Arneodo", "Aizawa"]
  //
  //  useControls(  {
  //   attractor: {
  //       value: 'Lorenz',
  //       options: l,
  //       onChange: (value) => {
  //         setAttractor(l.indexOf(value).toString())
  //       },
  //   }
  // })

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1 / Math.pow(2, 53), 1);
  const positions = new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0]);
  const uvs = new Float32Array([0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0]);


  const renderTarget = useFBO(size, size, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
    stencilBuffer: false,
    type: THREE.FloatType,
  });

  // const renderTargetClone = renderTarget.clone();

  const particlesPosition = useMemo(() => {
    const length = size * size;
    const particles = new Float32Array(length * 3);
    for (let i = 0; i < length; i++) {
      let i3 = i * 3;
      particles[i3 + 0] = (i % size) / size;
      particles[i3 + 1] = i / size / size;
    }
    return particles;
  }, [size]);



  const uniforms = useMemo(() => ({
    uPositions: { value: null },
    uColor: { value: new THREE.Color('#6678ff') },
    // positions: {value: null,},
    // pointSize: { value: 3 }
  }), []);


  useFrame((state) => {
    // const { gl, clock } = state;
    // simulationMaterialRef.current.uniforms.attractor.value = Attractor;
    // simulationMaterialRef.current.uniforms.positions.value = renderTarget.texture;
    // gl.setRenderTarget(renderTarget);
    // gl.clear();
    // gl.render(scene, camera);
    // gl.setRenderTarget(null);
    // points.current.material.uniforms.positions.value = renderTarget.texture;

    const { gl, clock } = state;
    gl.setRenderTarget(renderTarget);
    gl.clear();
    gl.render(scene, camera);
    gl.setRenderTarget(null);
    points.current.material.uniforms.uPositions.value = renderTarget.texture;
    simulationMaterialRef.current.uniforms.uTime.value = clock.elapsedTime;

  });

  return (
    <>
      {createPortal(
        <mesh>
          <simulationMaterial ref={simulationMaterialRef} args={[size]} />
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={positions.length / 3}
              array={positions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-uv"
              count={uvs.length / 2}
              array={uvs}
              itemSize={2}
            />
          </bufferGeometry>
        </mesh>,
        scene
      )}
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlesPosition.length / 3}
            array={particlesPosition}
            itemSize={3}
          />
        </bufferGeometry>
        <shaderMaterial
            uniforms={uniforms}
            vertexShader={vertexShader} // testVertexPoint
            fragmentShader={fragmentShader} // testFragmentPoint
            transparent={true}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  );
};

// const Attractor = () => {
//   return (
//     <Canvas camera={{ position: [1.5, 1.5, 2.5] }}>
//       <ambientLight intensity={0.5} />
//       <FBOParticles />
//       <OrbitControls />
//     </Canvas>
//   );
// };
//
// export default Attractor;
