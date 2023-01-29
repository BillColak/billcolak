
import * as THREE from "three";
import {useMemo, useRef} from "react";
import {useFrame, useLoader} from "@react-three/fiber";
import {Stars, useTexture} from "@react-three/drei";
import vertexShader from './vertex.glsl'
import fragmentShader from './fragment.glsl'
import {MeshPhysicalMaterial, Vector3} from "three";

import CustomShaderMaterial from "three-custom-shader-material";
export default function Earth(props) {
    const {envMapIntensity} = props;

    // const [colorMap, nightMap, normalMap, specularMap, cloudsMap] = useLoader(THREE.TextureLoader,
    //     [
    //         '/GlobeTextures/earth/textures/8k_earth_daymap.jpg',
    //         '/GlobeTextures/earth/textures/8k_earth_nightmap.jpg',
    //         '/GlobeTextures/earth/textures/8k_earth_normal_map.jpg',
    //         '/GlobeTextures/earth/textures/8k_earth_specular_map.jpg',
    //         '/GlobeTextures/earth/textures/8k_earth_clouds.jpg'
    //     ]
    // );

    const [dayMap, nightMap, secularMap, cloudsMap, bumpMap ] = useLoader(THREE.TextureLoader,
        [
            '/GlobeTextures/earth/diffuse.jpg',
            '/GlobeTextures/earth/night.jpg',
            '/GlobeTextures/earth/water.png',
            '/GlobeTextures/earth/fair_clouds.png',
            '/GlobeTextures/earth/elev_bump.jpg'
        ]
    );

    const earthRef = useRef();
    const cloudsRef = useRef();

    // useFrame(({ clock }) => {
    //     const elapsedTime = clock.getElapsedTime();
    //
    //     earthRef.current.rotation.y = elapsedTime / 6;
    //     cloudsRef.current.rotation.y = elapsedTime / 6;
    // });
    const uniforms = useMemo(
        () => ({
            uDay: { value: dayMap },
            uNight: { value: nightMap },
            uLight: { value: new Vector3().setScalar(2) }
        }),
        []
    );
    return (
        <>
            {/* <ambientLight intensity={1} /> */}
            {/*<pointLight color="#f6f3ea" position={[2, 0, 5]} intensity={1.2} />*/}
            {/*<Stars*/}
            {/*    radius={300}*/}
            {/*    depth={60}*/}
            {/*    count={20000}*/}
            {/*    factor={7}*/}
            {/*    saturation={0}*/}
            {/*    fade={true}*/}
            {/*/>*/}
            <group>
                {/*<mesh ref={cloudsRef} position={[0, 0, 0]} >*/}
                {/*    <sphereGeometry args={[1.005, 64, 64]} />*/}
                    {/*<meshPhongMaterial*/}
                    {/*    map={cloudsMap}*/}
                    {/*    opacity={0.4}*/}
                    {/*    depthWrite={true}*/}
                    {/*    transparent={true}*/}
                    {/*    side={THREE.DoubleSide}*/}
                    {/*    envMapIntensity={envMapIntensity}*/}
                    {/*/>*/}
                {/*</mesh>*/}
                <mesh ref={earthRef} position={[0, 0, 0]} >
                    <sphereGeometry args={[1, 64, 32]} />

                    {/*<icosahedronGeometry args={[1, 128]} />*/}
                    {/*<meshPhongMaterial*/}
                    {/*    map={colorMap}*/}
                    {/*    specularMap={secularMap}*/}
                    {/*    specular={new THREE.Color('grey')}*/}
                    {/*    roughness={0.7}*/}
                    {/*    bumpMap={bumpMap}*/}
                    {/*    bumpScale={0.02}*/}
                    {/*    envMapIntensity={envMapIntensity}*/}
                    {/*/>*/}
                    {/*<meshStandardMaterial*/}
                    {/*    map={colorMap}*/}
                    {/*    normalMap={normalMap}*/}
                    {/*    // metalness={0.4}*/}
                    {/*    roughness={0.7}*/}
                    {/*    envMapIntensity={envMapIntensity}*/}
                    {/*    // bumpMap={bumpMap}*/}
                    {/*    // bumpScale={0.05}*/}
                    {/*/>*/}

                </mesh>
            </group>
        </>
    );
}
