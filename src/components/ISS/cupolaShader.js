import * as THREE from "three"
import { useRef, useState } from "react"
import { Canvas, extend, useFrame, useLoader } from "@react-three/fiber"
import {useTexture, shaderMaterial, useAspect} from "@react-three/drei"

// let textures = [`https://allyourhtml.club/carousel/lion.jpg`].map((url) =>
//     new THREE.TextureLoader().load(url)
// );
//
// export const ImageFadeMaterial = shaderMaterial(
//     {
//         uTexture: { value: textures[0] },
//
//     },
//     `
//       varying vec2 vUv;
//       void main(){
//         vUv = uv;
//         gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
//       }`,
//     `
//         uniform sampler2D uTexture;
//         uniform vec2 scale;
//         varying vec2 vUv;
//         void main()	{
//           // SCALE, background size cover
//           vec2 newUV = (vUv - vec2(0.5))/scale + vec2(0.5);
//           gl_FragColor = texture2D(uTexture,newUV);
//         }`
// )
//
// extend({ ImageFadeMaterial })
//
// const aspectRatio = (window.innerWidth / window.innerHeight)
// const sizes = {
//     width: 35 * aspectRatio,
//     height: 35
// }
//
// function FadingImage() {
//
//     const [texture1] = useTexture(["/Img1.jpg"] )
//     // const [hovered, setHover] = useState(false)
//     // useFrame(() => {
//     //     ref.current.dispFactor = THREE.MathUtils.lerp(ref.current.dispFactor, hovered ? 1 : 0, 0.075)
//     // })
//     return (
//         <mesh >
//             <planeGeometry />
//             <imageFadeMaterial  tex={texture1} toneMapped={false} />
//         </mesh>
//     )
// }

// export default function cupolaShader() {
//     return (
//             <><FadingImage /></>
//     )
// }



function CupolaShader() {
    let cameraRef = useRef();
    // Load the texture
    const texture = [`https://allyourhtml.club/carousel/lion.jpg`].map((url) =>
        new THREE.TextureLoader().load(url)
    );
    // texture.image = undefined;

    // Create a ref for the mesh
    const meshRef = useRef()

    // Setup camera
    const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, -10, 10)
    camera.position.z = 2

    // Setup image aspect ratio
    // const imageAspect = texture.image.width / texture.image.height
    // const imageAspect = 1.77
    const scale = useAspect(
        texture.image.width ,                     // Pixel-width
        texture.image.height,                      // Pixel-height
        1                         // Optional scaling factor
    )


    // Handle resizing
    // function resize() {
    //     const viewportAspect = window.innerWidth / window.innerHeight
    //     if (imageAspect > viewportAspect) {
    //         meshRef.current.material.uniforms.scale.value.set(imageAspect / viewportAspect, 1)
    //     } else {
    //         meshRef.current.material.uniforms.scale.value.set(1, viewportAspect / imageAspect)
    //     }
    // }

    // Animation
    // useFrame((state, delta) => {
    //     meshRef.current.rotation.x += 0.01
    //     meshRef.current.rotation.y += 0.01
    // })



    return (
        <>
            <orthographicCamera ref={cameraRef} position={[0, 0, 2]} />
            <mesh ref={meshRef} scale={scale}>
                <planeBufferGeometry />
                <shaderMaterial
                    uniforms={{
                        uTexture: { value: texture },
                        scale: { value: new THREE.Vector2(1, 1) },
                    }}
                    vertexShader={`
            varying vec2 vUv;
            void main(){
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
            }
          `}
                    fragmentShader={`
            uniform sampler2D uTexture;
            uniform vec2 scale;
            varying vec2 vUv;
            void main()	{
              vec2 newUV = (vUv - vec2(0.5))/scale + vec2(0.5);
              gl_FragColor = texture2D(uTexture,newUV);
            }
          `}
                />
            </mesh>
        </>
    )
}

export default CupolaShader
