
import * as THREE from "three";
import {useMemo, useRef} from "react";
import {useFrame, useLoader} from "@react-three/fiber";
import {Stars, useTexture} from "@react-three/drei";
import {BackSide, Color, IcosahedronGeometry, MeshPhysicalMaterial, ShaderMaterial, Vector3} from "three";
import CustomShaderMaterial from "three-custom-shader-material";

const haloShader = {
    v: `
  varying vec3 vVertexWorldPosition;
  varying vec3 vVertexNormal;
  
  void main() {
  
    vVertexNormal = normalize(normalMatrix * normal);
  
    vVertexWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
  
    // set gl_Position
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
    `,
    f: `
  uniform vec3 glowColor;
uniform float coeficient;
uniform float power;

varying vec3 vVertexNormal;
varying vec3 vVertexWorldPosition;

void main() {
  vec3 worldCameraToVertex = vVertexWorldPosition - cameraPosition;
  vec3 viewCameraToVertex = (viewMatrix * vec4(worldCameraToVertex, 0.0)).xyz;
  viewCameraToVertex = normalize(viewCameraToVertex);
  float intensity =
      pow(coeficient + dot(vVertexNormal, viewCameraToVertex), power);

  gl_FragColor = vec4(glowColor, intensity * 0.3  );
}
    `
};

function OuterGlow({ color, geometry }) {
    const mat = useMemo(
        () =>
            new ShaderMaterial({
                vertexShader: haloShader.v,
                fragmentShader: haloShader.f,
                uniforms: {
                    coeficient: { value: 0.35},
                    power: { value: 7 },
                    glowColor: { value: new Color(color || "#6b7fff") }
                },
                side: BackSide,
                transparent: true,
                depthWrite: false
            }),
        []
    );

    return (
        <group scale={[1.2, 1.2, 1.2]}>
            <mesh material={mat} geometry={geometry} />
        </group>
    );
}

function InnerGlow({ color, geometry }) {
    const mat = useMemo(
        () =>
            new ShaderMaterial({
                vertexShader: haloShader.v,
                fragmentShader: haloShader.f,
                uniforms: {
                    coeficient: { value: 1 },
                    power: { value: 1},
                    glowColor: { value: new Color(color || "#6b7fff") }
                },
                transparent: true,
                depthWrite: true
            }),
        []
    );

    return (
        <group scale={[1.0001, 1.0001, 1.0001]}>
            <mesh material={mat} geometry={geometry} />
        </group>
    );
}

function Halo(props) {
    const g = useMemo(() => new IcosahedronGeometry(1, 32), []);
    return (
        <group >
            <InnerGlow geometry={g} {...props} />
            <OuterGlow geometry={g} {...props} />
        </group>
    );
}


export default function Earth(props) {
    const {envMapIntensity} = props;

    const [dayMap, nightMap, normalMap, secularMap, roughness, bumpMap, cloudsMap] = useLoader(THREE.TextureLoader,
        [
            '/GlobeTextures/earth/textures/8k_earth_daymap.jpg',
            '/GlobeTextures/earth/textures/8k_earth_nightmap.jpg',
            '/GlobeTextures/earth/textures/8k_earth_normal_map.jpg',
            '/GlobeTextures/earth/textures/water_8k.png',
            '/GlobeTextures/earth/textures/roughness.jpg',
            '/GlobeTextures/earth/textures/elev_bump_8k.jpg',
            '/GlobeTextures/earth/textures/8k_earth_clouds.jpg'
        ]
    );

    const earthRef = useRef();
    const cloudsRef = useRef();

    // useFrame(({ clock }) => {
    //     const elapsedTime = clock.getElapsedTime();
        // earthRef.current.rotation.y = elapsedTime / 6;
        // cloudsRef.current.rotation.y = elapsedTime / 48;
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
            <ambientLight intensity={1} />
            <pointLight color="#f6f3ea" position={[2, 0, 5]} intensity={1.2} />
            <Stars
                radius={300}
                depth={60}
                count={20000}
                factor={7}
                saturation={0}
                fade={true}
            />
            <Halo color="#6b7fff" />
            <group>

                {/*<mesh ref={cloudsRef} position={[0, 0, 0]} >*/}
                {/*    <sphereGeometry args={[1.005, 64, 64]} />*/}
                {/*    <meshPhongMaterial*/}
                {/*        map={cloudsMap}*/}
                {/*        opacity={0.2}*/}
                {/*        depthWrite={true}*/}
                {/*        transparent={true}*/}
                {/*        side={THREE.DoubleSide}*/}
                {/*        envMapIntensity={envMapIntensity}*/}
                {/*    />*/}
                {/*</mesh>*/}
                <mesh ref={earthRef} position={[0, 0, 0]} >
                    <sphereGeometry args={[1, 64, 64]} />
                    <meshPhongMaterial
                        map={dayMap}
                        normalMap={normalMap}
                        roughnessMap={roughness}
                        bumpMap={bumpMap}
                        envMapIntensity={envMapIntensity}
                    />
                </mesh>
            </group>
        </>
    );
}
