
import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { useFrame, ThreeElements } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'


export default function Model () {

    const model = useGLTF('../assets/pillar.glb')

    return (
        <primitive object={model.scene} />
    )
}
