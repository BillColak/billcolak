import { Color, IcosahedronGeometry, BackSide } from 'three'
import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'

const HaloMaterial = shaderMaterial(
    {
        coeficient: 1,
        power: 1.7,
        color: new Color('#27a9e3')
    },
    /* glsl */ `
    varying vec3 vVertexWorldPosition;
    varying vec3 vVertexNormal;
    
    void main() {
      vVertexNormal = normalize(normalMatrix * normal);
      vVertexWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    /* glsl */ `
    uniform vec3 color;
    uniform float coeficient;
    uniform float power;

    varying vec3 vVertexNormal;
    varying vec3 vVertexWorldPosition;

    void main() {
      vec3 worldCameraToVertex = vVertexWorldPosition - cameraPosition;
      vec3 viewCameraToVertex = (viewMatrix * vec4(worldCameraToVertex, 0.0)).xyz;
      viewCameraToVertex = normalize(viewCameraToVertex);
      float intensity = pow(coeficient + dot(vVertexNormal, viewCameraToVertex), power);

      gl_FragColor = vec4(color, intensity * 0.3 );
    }
  `
)
extend({ HaloMaterial })

const geometry = new IcosahedronGeometry(1, 32)

function Outer({ color }) {
    return (
        <mesh scale={1.2} geometry={geometry}>
            <haloMaterial
                color={color}
                coeficient={0.25}
                power={5}
                side={BackSide}
                transparent
                depthWrite={false}
            />
        </mesh>
    )
}

function Inner({ color }) {
    return (
        <mesh scale={1.0001} geometry={geometry}>
            <haloMaterial color={color} transparent />
        </mesh>
    )
}

export default function Halo(props) {
    return (
        <>
            <Inner {...props} />
            <Outer {...props} />
        </>
    )
}
