import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import {useFrame, ThreeElements, MeshProps} from '@react-three/fiber'


/**
 *  Stairway
 *  @param props
 *  @param props.leftHandrail - boolean - default true - show left handrail
 *  @param props.rightHandrail - boolean - default true - show right handrail
 *  @param props.steps - number - default 5 - number of steps
 *  @param props.railHeight - number - default 3 - height of each step
 *  @param props.stepHeight - number - default 2 - height of each step
 *  @param props.stepWidth - number - default 3 - width of each step
 *  @param props.railColor - string - default 'yellow' - color of handrails
 *  @param props.stepColor - string - default 'purple' - color of steps
 *  @param props.position - [number, number, number] - default [0, 0, 0] - position of stairway
 *  @param props.rotation - [number, number, number] - default [0, 0, 0] - rotation of stairway
 *  @param props.scale - [number, number, number] - default [1, 1, 1] - scale of stairway
 */

interface StairWayProps extends MeshProps {
    leftHandrail?: boolean
    rightHandrail?: boolean
    railColor?: string
    stepsColor?: string
    steps?: number
    railHeight?: number
    stepHeight?: number
    stepWidth?: number
    position?: [number, number, number]
    rotation?: [number, number, number]
    scale?: [number, number, number]
}

export default function StairWay (props: StairWayProps) {
    // todo remove intersecting vertices?
    const mesh = useRef<THREE.Mesh>(null!)

    const tempArray = [...Array(props.steps || 5)]
    const leftHandrail = props.leftHandrail ?? true
    const rightHandrail = props.rightHandrail ?? true
    const railColor = props.railColor ?? 'yellow'
    const stepsColor = props.stepsColor ?? 'purple'
    const railHeight = props.railHeight ?? 3
    const stepsHeight = props.stepHeight ?? 2
    const stepsWidth = props.stepWidth ?? 3
    const position = props.position ?? [0, 0, 0]
    const rotation = props.rotation ?? [0, 0, 0]
    const scale = props.scale ?? [1, 1, 1]  // todo scale


    return (
        <>
            <mesh
                ref={mesh}
                position={position}
                rotation={rotation}
                scale={scale}
            >
                {/*Left Handrails*/}
                {leftHandrail && tempArray.map((value, index) => {
                    return (
                        <mesh
                            position={[index, index + 2.5, 1.2]}
                            rotation-z={ Math.PI * 0.75 }
                            key={'leftHandRailHandle' + index}
                        >
                            <cylinderGeometry args={[0.1, 0.1, 1.5]} />
                            <meshStandardMaterial color={railColor} />
                        </mesh>
                    )
                })}
                {leftHandrail && tempArray.map((value, index) => {
                    return (
                        <mesh
                            key={'leftHandRailStand' + index}
                            position={[index, index + 1, 1.2]}
                        >
                            <cylinderGeometry args={[0.1, 0.1, railHeight]} />
                            <meshStandardMaterial color={railColor} />
                        </mesh>
                    )
                })}

                {/* Right Handrails */}
                {rightHandrail && tempArray.map((value, index) => {
                    return (
                        <mesh
                            key={'rightHandRailHandle' + index}
                            position={[index, index + 2.5, -1.2]}
                            rotation-z={ Math.PI * 0.75 }
                        >
                            <cylinderGeometry args={[0.1, 0.1, 1.5]} />
                            <meshStandardMaterial color={railColor} />
                        </mesh>
                    )
                })}
                {rightHandrail && tempArray.map((value, index) => {
                    return (
                        <mesh
                            key={'rightHandRailStand' + index}
                            position={[index, index + 1, -1.2]}
                        >
                            <cylinderGeometry args={[0.1, 0.1, railHeight]}  />
                            <meshStandardMaterial color={railColor} />
                        </mesh>
                    )
                })}

                {/*Steps*/}
                <mesh position={[-1, -0.5, 0]}>
                    <boxGeometry args={[1, 1, 3]} />
                    <meshStandardMaterial color={stepsColor} />
                </mesh>
                {tempArray.map((value, index) => {
                        return (
                            <mesh
                                key={'step' + index}
                                position={[index, index, 0]}   // if you position[2] + index, it kind of looks like a curved stairway.
                            >
                                <boxGeometry args={[1, stepsHeight, stepsWidth]} />
                                <meshStandardMaterial color={stepsColor} />
                            </mesh>
                        )
                    })}
            </mesh>
        </>
    )
}
