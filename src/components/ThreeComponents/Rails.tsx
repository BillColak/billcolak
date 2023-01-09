import * as THREE from 'three'
import React, {useEffect, useMemo, useRef, useState} from 'react'
import {useFrame, ThreeElements, MeshProps} from '@react-three/fiber'


/**
 *  Stairway
 *  @param props
 *  @param props.count - boolean - default true - show left handrail
 */

export interface RailProps extends MeshProps {
    rightClosed?: boolean
    leftClosed?: boolean
    count: number
    color?: string
    height?: number
    position?: [number, number, number]
    rotation?: [number, number, number]
    scale?: [number, number, number]
}

export default function Rails (props: RailProps) {
    // todo remove intersecting vertices?
    const mesh = useRef<THREE.Mesh>(null!)
    const standArray = [...Array(props.count)]
    const handleArray = [...Array(props.count - 1)]
    const position = props.position ?? [0, 0, 0]
    const rotation = props.rotation ?? [0, 0, 0]
    const color = props.color ?? 'purple'
    const height = props.height ?? 3
    const rightClosed = props.rightClosed ?? false
    const leftClosed = props.leftClosed ?? false

    return (
        <>
            <mesh
                ref={mesh}
                position={position}
                rotation={rotation}
            >
                {leftClosed ?
                    <mesh position={[props.count-1, height, 0]}>
                        <sphereGeometry args={[0.1, 24, 24]} />
                        <meshStandardMaterial color={color} />
                    </mesh>:
                    <mesh position={[props.count-0.5, height, 0]} rotation-z={ Math.PI * 0.5 }>
                        <cylinderGeometry  args={[0.1, 0.1, 1]} />
                        <meshStandardMaterial color={color}/>
                    </mesh>
                }
                {rightClosed ?
                    <mesh position={[0, height, 0]}>
                        <sphereGeometry args={[0.1, 24, 24]} />
                        <meshStandardMaterial color={color} />
                    </mesh>:
                    <mesh position={[-0.5, height, 0]} rotation-z={ Math.PI * 0.5 }>
                        <cylinderGeometry args={[0.1, 0.1, 1]} />
                        <meshStandardMaterial color={color}/>
                    </mesh>
                }
                {/* handle */}
                {handleArray.map((value, index) => {
                    return (
                        <mesh
                            position={[index+0.5, height, 0]}
                            rotation-z={ Math.PI * 0.5 }
                        >
                            <cylinderGeometry args={[0.1, 0.1, 1, 14, 1, true]} />
                            <meshStandardMaterial color={color} />
                        </mesh>
                    )
                })}

                {/* stand */}
                {standArray.map((value, index) => {
                    return (
                        <mesh position={[index, (height-height/2), 0]}>
                            <cylinderGeometry args={[0.1, 0.1, height, 14, 1, true]} />
                            <meshStandardMaterial color={'blue'} />
                        </mesh>
                    )
                })}
            </mesh>
        </>
    )
}
