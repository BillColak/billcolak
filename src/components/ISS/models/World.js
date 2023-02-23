
import {useFrame, useLoader, useThree} from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import {MeshStandardMaterial, Vector3, TextureLoader, SphereGeometry, Color} from 'three'
import CustomShaderMaterial from 'three-custom-shader-material'


export default function World(props) {


    const [day, night, normal, rough, clouds] = useLoader(TextureLoader,
        [
            '/GlobeTextures/earth/textures/day.jpg',
            '/GlobeTextures/earth/textures/night.jpg',
            '/GlobeTextures/earth/textures/normal.jpg',
            '/GlobeTextures/earth/textures/roughness.jpg',
            '/GlobeTextures/earth/textures/clouds.jpg',
        ],
    )

    const mat = useRef()
    const cloudsRef = useRef()
    const { gl } = useThree()

    useFrame(() => {
        if (mat?.current?.uniforms && gl.state.lightPos) {
            mat.current.uniforms.uLight.value = gl.state.lightPos
        }
    })

    useFrame((_, dt) => {
        if (cloudsRef?.current) {
            cloudsRef.current.rotation.y += dt * 0.01
        }
    })

    const uniforms = useMemo(
        () => ({
            uDay: { value: day },
            uNight: { value: night },
            uLight: { value: new Vector3().setScalar(2) }
        }),
        []
    )

    let {options} = props;
    options = options || {};

    const colorFn = options.colorFn || function (x) {
        const c = new Color();
        c.setHSL((0.6 - (x * 0.5)), 1.0, 0.5);
        return c;
    };

    return (
        <>
            <mesh ref={cloudsRef} castShadow scale={1.001} rotation-y={Math.PI}>
                <icosahedronGeometry args={[1, 16]} />
                <meshStandardMaterial
                    color={0xffffff}
                    roughness={1}
                    opacity={0.4}
                    alphaMap={clouds}
                    transparent
                />
            </mesh>
            <mesh receiveShadow scale={[0.99, 0.99, 0.99]} rotation-y={Math.PI}>
                <icosahedronGeometry args={[1, 64]} />
                <CustomShaderMaterial
                    ref={mat}
                    baseMaterial={MeshStandardMaterial}
                    vertexShader={`
          uniform vec3 uLight;
          varying vec2 vUv2;
          varying float vDist;

          float map(float value, float min1, float max1, float min2, float max2) {
            return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
          }
          

          void main() {
            vUv2 = uv;
            vDist = clamp(pow(map((dot(normalize(uLight) * vec3(-1.,1.,-1.) , position) * 2.), -1.0, 1.0, 0.0, 1.0), 2.), 0., 1.);
          }
          `}
                    fragmentShader={`
          uniform sampler2D uDay;
          uniform sampler2D uNight;
          uniform vec3 uLight;
          varying vec2 vUv2;
          varying float vDist;

          void main() {
            vec4 texDay = texture2D(uDay, vUv2);
            vec4 texNight = texture2D(uNight, vUv2);
            float c = vDist;
            vec4 d = mix(texNight,texDay,vDist);
            csm_DiffuseColor = d;
          }
          `}
                    uniforms={uniforms}
                    flatShading
                    normalMap={normal}
                    roughnessMap={rough}
                />
            </mesh>
        </>
    )
}
