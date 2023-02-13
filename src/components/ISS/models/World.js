
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
        ]
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


    // let geometry = new BoxGeometry(0.75, 0.75, 1);
    // geometry.applyMatrix(new Matrix4().makeTranslation(0,0,-0.5));
    // let point = new Mesh(geometry);

    // let geometry = new SphereGeometry(200, 40, 30);




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


//  function addData(data, opts) {
//     var lat, lng, size, color, i, step, colorFnWrapper;
//
//     opts.animated = opts.animated || false;
//     this.is_animated = opts.animated;
//     opts.format = opts.format || 'magnitude'; // other option is 'legend'
//     if (opts.format === 'magnitude') {
//       step = 3;
//       colorFnWrapper = function(data, i) { return colorFn(data[i+2]); }
//     } else if (opts.format === 'legend') {
//       step = 4;
//       colorFnWrapper = function(data, i) { return colorFn(data[i+3]); }
//     } else {
//       throw('error: format not supported: '+opts.format);
//     }
//
//     if (opts.animated) {
//       if (this._baseGeometry === undefined) {
//         this._baseGeometry = new THREE.Geometry();
//         for (i = 0; i < data.length; i += step) {
//           lat = data[i];
//           lng = data[i + 1];
// //        size = data[i + 2];
//           color = colorFnWrapper(data,i);
//           size = 0;
//           addPoint(lat, lng, size, color, this._baseGeometry);
//         }
//       }
//       if(this._morphTargetId === undefined) {
//         this._morphTargetId = 0;
//       } else {
//         this._morphTargetId += 1;
//       }
//       opts.name = opts.name || 'morphTarget'+this._morphTargetId;
//     }
//     var subgeo = new THREE.Geometry();
//     for (i = 0; i < data.length; i += step) {
//       lat = data[i];
//       lng = data[i + 1];
//       color = colorFnWrapper(data,i);
//       size = data[i + 2];
//       size = size*200;
//       addPoint(lat, lng, size, color, subgeo);
//     }
//     if (opts.animated) {
//       this._baseGeometry.morphTargets.push({'name': opts.name, vertices: subgeo.vertices});
//     } else {
//       this._baseGeometry = subgeo;
//     }
//
//   };
//
//   function createPoints() {
//     if (this._baseGeometry !== undefined) {
//       if (this.is_animated === false) {
//         this.points = new THREE.Mesh(this._baseGeometry, new THREE.MeshBasicMaterial({
//               color: 0xffffff,
//               vertexColors: THREE.FaceColors,
//               morphTargets: false
//             }));
//       } else {
//         if (this._baseGeometry.morphTargets.length < 8) {
//           console.log('t l',this._baseGeometry.morphTargets.length);
//           var padding = 8-this._baseGeometry.morphTargets.length;
//           console.log('padding', padding);
//           for(var i=0; i<=padding; i++) {
//             console.log('padding',i);
//             this._baseGeometry.morphTargets.push({'name': 'morphPadding'+i, vertices: this._baseGeometry.vertices});
//           }
//         }
//         this.points = new THREE.Mesh(this._baseGeometry, new THREE.MeshBasicMaterial({
//               color: 0xffffff,
//               vertexColors: THREE.FaceColors,
//               morphTargets: true
//             }));
//       }
//       scene.add(this.points);
//     }
//   }
//
//   function addPoint(lat, lng, size, color, subgeo) {
//
//     var phi = (90 - lat) * Math.PI / 180;
//     var theta = (180 - lng) * Math.PI / 180;
//
//     point.position.x = 200 * Math.sin(phi) * Math.cos(theta);
//     point.position.y = 200 * Math.cos(phi);
//     point.position.z = 200 * Math.sin(phi) * Math.sin(theta);
//
//     point.lookAt(mesh.position);
//
//     point.scale.z = Math.max( size, 0.1 ); // avoid non-invertible matrix
//     point.updateMatrix();
//
//     for (var i = 0; i < point.geometry.faces.length; i++) {
//
//       point.geometry.faces[i].color = color;
//
//     }
//     if(point.matrixAutoUpdate){
//       point.updateMatrix();
//     }
//     subgeo.merge(point.geometry, point.matrix);
//   }
