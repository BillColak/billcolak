import * as THREE from "three";
import React, { useRef, Suspense } from "react";
import { Canvas, extend, useFrame, useLoader } from "@react-three/fiber";
import { Color, DoubleSide, ShaderMaterial, Vector2 } from "three"
import {useControls} from "leva";
import { discVertexShader } from "./shaders/Disc/discVertex.glsl.ts"
import { discFragmentShader } from "./shaders/Disc/discFragment.glsl.ts"
import { noiseVertexShader } from "./shaders/Noises/noiseVertex.glsl.ts"
import { noiseFragmentShader } from "./shaders/Noises/noiseFragment.glsl.ts"


// todo: add glitch effect to the scene

const NoiseMesh = (props) => {

    const material = new ShaderMaterial({
        vertexShader: noiseVertexShader,
        fragmentShader: noiseFragmentShader,
    })

    return (
        <>
            <mesh material={material} >
                <planeGeometry
                    args={[2, 2]}
                    frustumCulled={false}
                />
            </mesh>
        </>
    );
};





const DiscMesh = (props) => {

    const material = new ShaderMaterial({
        vertexShader: discVertexShader,
        fragmentShader: discFragmentShader,
        side: DoubleSide,
        uniforms: {
            uTime: props.uniforms.uTime || { value: 0 },
            uNoiseTexture: { value: props.uniforms.uNoiseTexture },
            uInnerColor: { value: props.uniforms.uInnerColor },
            uOuterColor: { value: props.uniforms.uOuterColor }
        }
    })

    return (
        <>
            <mesh material={material} >
                <cylinderGeometry args={[5, 1, 0, 64, 10, true]} />
            </mesh>
        </>
    );
};

const ParticleMesh = () => {
    return (
        <>

        </>
    );
};

const ActiveMesh = () => {
    return (
        <>

        </>
    );
};

const MaskMesh = () => {
    return (
        <>

        </>
    );
};





export default function BlackHole () {

    const commonUniforms = {
        uInnerColor : new THREE.Color('#ff8080'),
        uOuterColor: new THREE.Color('#3633ff')
    }

    useFrame(({ clock }) => {
        commonUniforms.uTime.value = clock.getElapsedTime()
    })

    return (
        <>
            <group>
                <DiscMesh args={commonUniforms} />
            </group>

        </>
    )
};





// const BlackHole = () => {
//     const {
//         uDepthColor,
//         uSurfaceColor,
//         uColorOffset,
//         uColorMultiplier,
//
//         uBigWavesElevation,
//         uBigWavesFrequencyX,
//         uBigWavesFrequencyY,
//         uBigWavesSpeed,
//
//         uSmallWavesElevation,
//         uSmallWavesFrequency,
//         uSmallWavesSpeed,
//         uSmallIterations,
//     } = useControls({
//         uDepthColor: "#186691",
//         uSurfaceColor: "#9bd8ff",
//         uColorOffset: {
//             value: 0.08,
//             step: 0.001,
//             min: 0,
//             max: 1,
//         },
//         uColorMultiplier: { value: 5, step: 0.01, min: 0, max: 10 },
//
//         uBigWavesElevation: { value: 0.2, step: 0.001, min: 0, max: 1 },
//         uBigWavesFrequencyX: { value: 4, step: 0.01, min: 0, max: 10 },
//         uBigWavesFrequencyY: { value: 1.5, step: 0.01, min: 0, max: 10 },
//         uBigWavesSpeed: { value: 0.75, step: 0.005, min: 0, max: 4 },
//
//         uSmallWavesElevation: { value: 0.15, step: 0.001, min: 0, max: 1 },
//         uSmallWavesFrequency: { value: 3, step: 0.1, min: 0, max: 30 },
//         uSmallWavesSpeed: { value: 0.2, step: 0.005, min: 0, max: 4 },
//         uSmallIterations: { value: 4, step: 0.005, min: 0, max: 5 },
//     })
//
//     const material = new ShaderMaterial({
//         vertexShader,
//         fragment,
//         side: DoubleSide,
//         uniforms: {
//             uTime: { value: 0 },
//
//             uDepthColor: { value: new Color(uDepthColor) },
//             uSurfaceColor: { value: new Color(uSurfaceColor) },
//             uColorOffset: { value: uColorOffset },
//             uColorMultiplier: { value: uColorMultiplier },
//
//             uBigWavesElevation: { value: uBigWavesElevation },
//             uBigWavesFrequency: {
//                 value: new Vector2(uBigWavesFrequencyX, uBigWavesFrequencyY),
//             },
//             uBigWavesSpeed: { value: uBigWavesSpeed },
//
//             uSmallWavesElevation: { value: uSmallWavesElevation },
//             uSmallWavesFrequency: { value: uSmallWavesFrequency },
//             uSmallWavesSpeed: { value: uSmallWavesSpeed },
//             uSmallIterations: { value: uSmallIterations },
//         },
//     })
//
//     useFrame((state) => {
//         const elapsedTime = state.clock.getElapsedTime()
//         material.uniforms.uTime.value = elapsedTime
//     })
//
//     return (
//         <mesh material={material} rotation={[-Math.PI * 0.5, 0, 0]}>
//             <planeGeometry args={[3, 3, 512, 512]} />
//         </mesh>
//     )
// };


