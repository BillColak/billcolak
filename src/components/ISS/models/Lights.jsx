import { OrbitControls, useHelper } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { useEffect, useRef, useState } from "react";
import { DirectionalLightHelper, Vector3 } from "three";

export default function Lights() {
  const light = useRef();
  const lightGroup = useRef();
  const lightHelper = useHelper(light, DirectionalLightHelper, 2);
  const { gl } = useThree();
  const start = useRef(new Vector3(2, 0, 2));


  const {Speed, Intensity}= useControls("LightRotation", {
    Speed: {
        value: 0.3,
        min: 0,
        max: 1,
    },
    Intensity: {
        value: 0.6,
        min: 0.1,
        max: 1,
    },
    LightDirection: {
          value: false,
            onChange: (value) => {
                lightHelper.current.visible = value;
            }
      },
  });


  useEffect(() => {
    gl.state.lightPos = new Vector3();
  }, [gl]);

  useFrame((state, dt) => {
    if (lightGroup?.current && light.current) {
      lightGroup.current.rotation.y += dt * Speed;
    }
    if (gl.state.lightPos) light.current.getWorldPosition(gl.state.lightPos);
  });

  return (
    <>
      <group ref={lightGroup}>
        <directionalLight
            castShadow
            ref={light}
            shadowMapHeight={512}
            shadowMapWidth={512}
            shadowCameraTop={10}
            shadowCameraBottom={-10}
            shadowCameraLeft={-10}
            shadowCameraRight={10}
            shadowCameraNear={0.5}
            shadowCameraFar={100}
            intensity={Intensity}
            position={start.current}
        />
      </group>

      <ambientLight intensity={0.2} />
    </>
  );
}
