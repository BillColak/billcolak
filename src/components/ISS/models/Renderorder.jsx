import { useFrame, useThree } from "@react-three/fiber";
import { useEffect } from "react";

export default function RenderOrder() {
  const { camera, gl, scene } = useThree();
  console.log('camera', camera,)
  console.log('gl', gl)
  console.log('scene', scene)

  useEffect(() => {
    gl.autoClear = false;
  }, [gl]);

  useFrame(() => {
    camera.layers.set(1); // Globe
    gl.render(scene, camera);
    gl.clearDepth();

    camera.layers.set(0); // Everything else
    gl.render(scene, camera);
    gl.clearDepth();
  }, 1);

  return <></>;
}
