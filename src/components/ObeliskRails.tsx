// import * as THREE from 'three'
// import React, {useEffect, useMemo, useRef, useState} from 'react'
// import {useFrame, ThreeElements, MeshProps} from '@react-three/fiber'
import { RailProps } from './Rails'


export default function ObeliskRails (props: RailProps) {

    const standArray = [...Array(props.count)]
    const handleArray = [...Array(props.count -1 )]
    const position = props.position ?? [0, 0, 0]
    const rotation = props.rotation ?? [0, 0, 0]
    const color = props.color ?? 'purple'
    const height = props.height ?? 3
    const rightClosed = props.rightClosed ?? false
    const leftClosed = props.leftClosed ?? false


    return (
        <>
            <mesh
                position={position}
                rotation={rotation}
                scale={props.scale}
            >
            {!leftClosed &&
                <mesh position={[props.count*2+0.5 -1.5, height-(height/4), 0]} rotation-z={ Math.PI * 0.5 }>
                    <cylinderGeometry  args={[0.1, 0.1, 2, 14, 1, true]} />
                    <meshStandardMaterial color={color}  />
                </mesh>
            }
            {!rightClosed &&
                <mesh position={[-1, height-(height/4), 0]} rotation-z={ Math.PI * 0.5 }>
                    <cylinderGeometry args={[0.1, 0.1, 2, 14, 1, true]} />
                    <meshStandardMaterial color={color}  />
                </mesh>
            }

            {/* handle */}
            {handleArray.map((value, index) => {
                return (
                    <mesh
                        key={'ObeliskRailsHandle' + index}
                        position={[index*2+1, height - 0.5 , 0]}
                        rotation-z={ Math.PI * 0.5 }
                    >
                        <cylinderGeometry args={[0.1, 0.1, 2, 14, 1, true]} />
                        <meshStandardMaterial color={color}  />
                    </mesh>
            )})}

            {/* Ball */}
            {standArray.map((value, index) => {
                return (
                    <mesh
                        key={'ObeliskRailsBall' + index}
                        position={[index*2, height + 0.2, 0]}

                    >
                        <sphereGeometry args={[0.2, 24, 24]} />
                        <meshStandardMaterial color={color} />
                    </mesh>
            )})}

            {/* stand */}
            {standArray.map((value, index) => {
                return (
                    <mesh
                        position={[index*2, height/2, 0]}
                        key={'ObeliskRailsStand' + index}
                    >
                        <boxGeometry args={[0.4, height, 0.4]} />
                        <meshStandardMaterial color={color} />
                    </mesh>
            )})}
            </mesh>
        </>
    )
}
