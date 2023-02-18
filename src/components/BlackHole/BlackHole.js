import * as THREE from "three";
import React, { useRef, Suspense } from "react";
import { Canvas, extend, useFrame, useLoader } from "@react-three/fiber";
import { Color, DoubleSide, ShaderMaterial, Vector2 } from "three"
import {useControls} from "leva";
import { vertexShader } from "./vertex.glsl"
import { fragmentShader } from "./fragment.glsl"

const BlackHole = () => {
    const {
        uDepthColor,
        uSurfaceColor,
        uColorOffset,
        uColorMultiplier,

        uBigWavesElevation,
        uBigWavesFrequencyX,
        uBigWavesFrequencyY,
        uBigWavesSpeed,

        uSmallWavesElevation,
        uSmallWavesFrequency,
        uSmallWavesSpeed,
        uSmallIterations,
    } = useControls({
        uDepthColor: "#186691",
        uSurfaceColor: "#9bd8ff",
        uColorOffset: {
            value: 0.08,
            step: 0.001,
            min: 0,
            max: 1,
        },
        uColorMultiplier: { value: 5, step: 0.01, min: 0, max: 10 },

        uBigWavesElevation: { value: 0.2, step: 0.001, min: 0, max: 1 },
        uBigWavesFrequencyX: { value: 4, step: 0.01, min: 0, max: 10 },
        uBigWavesFrequencyY: { value: 1.5, step: 0.01, min: 0, max: 10 },
        uBigWavesSpeed: { value: 0.75, step: 0.005, min: 0, max: 4 },

        uSmallWavesElevation: { value: 0.15, step: 0.001, min: 0, max: 1 },
        uSmallWavesFrequency: { value: 3, step: 0.1, min: 0, max: 30 },
        uSmallWavesSpeed: { value: 0.2, step: 0.005, min: 0, max: 4 },
        uSmallIterations: { value: 4, step: 0.005, min: 0, max: 5 },
    })

    const material = new ShaderMaterial({
        vertexShader,
        fragmentShader,
        side: DoubleSide,
        uniforms: {
            uTime: { value: 0 },

            uDepthColor: { value: new Color(uDepthColor) },
            uSurfaceColor: { value: new Color(uSurfaceColor) },
            uColorOffset: { value: uColorOffset },
            uColorMultiplier: { value: uColorMultiplier },

            uBigWavesElevation: { value: uBigWavesElevation },
            uBigWavesFrequency: {
                value: new Vector2(uBigWavesFrequencyX, uBigWavesFrequencyY),
            },
            uBigWavesSpeed: { value: uBigWavesSpeed },

            uSmallWavesElevation: { value: uSmallWavesElevation },
            uSmallWavesFrequency: { value: uSmallWavesFrequency },
            uSmallWavesSpeed: { value: uSmallWavesSpeed },
            uSmallIterations: { value: uSmallIterations },
        },
    })

    useFrame((state) => {
        const elapsedTime = state.clock.getElapsedTime()
        material.uniforms.uTime.value = elapsedTime
    })

    return (
        <mesh material={material} rotation={[-Math.PI * 0.5, 0, 0]}>
            <planeGeometry args={[3, 3, 512, 512]} />
        </mesh>
    )
};

export default BlackHole;
