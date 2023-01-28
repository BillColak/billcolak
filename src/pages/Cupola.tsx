import { Plane,  useAspect, } from "@react-three/drei";
import {Canvas, useLoader} from "@react-three/fiber";
import * as THREE from "three";

function PlaneComponent(){
    const texture = useLoader(THREE.TextureLoader, `https://source.unsplash.com/random/1920x1080`)
    const scale = useAspect(1024, 512)
    return (
        <Plane  scale={scale} >
            <meshPhongMaterial map={texture} color="grey" />
        </Plane>
    )
}

export default function Cupola() {
    return (
        <>
            <div className="w-full h-screen">
                <Canvas>
                    <color args={ ['#695b5b']} attach={"background"} />

                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />

                    <PlaneComponent />

                </Canvas>
            </div>
        </>
    )
}


//
// let textures = [`/images/Scptr.png`].map((url) =>
//     new THREE.TextureLoader().load(url)
// );
//
// const aspectRatio = (window.innerWidth / window.innerHeight)
// const sizes = {
//     width: 35 * aspectRatio,
//     height: 35
// }
// console.log(aspectRatio)
//
// function ImageFadeMaterial(props: any){
//
//     const shader = shaderMaterial(
//         {
//             effectFactor: 1.2,
//             dispFactor: 0,
//             disp: textures[0],
//             tex: textures[0],
//             tex2: textures[0],
//         },
//         ` varying vec2 vUv;
//     void main() {
//       vUv = uv;
//       gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
//     }`,
//         ` varying vec2 vUv;
//     uniform sampler2D tex;
//     uniform sampler2D tex2;
//     uniform sampler2D disp;
//     uniform float _rot;
//     uniform float dispFactor;
//     uniform float effectFactor;
//     void main() {
//       vec2 uv = vUv;
//       vec4 disp = texture2D(disp, uv);
//       vec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r*effectFactor), uv.y);
//       vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);
//       vec4 _texture = texture2D(tex, distortedPosition);
//       vec4 _texture2 = texture2D(tex2, distortedPosition2);
//       vec4 finalTexture = mix(_texture, _texture2, dispFactor);
//       gl_FragColor = finalTexture;
//       #include <tonemapping_fragment>
//       #include <encodings_fragment>
//     }`
//     )
//     return <primitive object={shader} attach="material" />
//
// }
//
// extend({ ImageFadeMaterial })
