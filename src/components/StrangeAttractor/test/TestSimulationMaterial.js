import testSimulationVertex from './testSimulationVertex';
import testSimulationFragment from './testSimulationFragment';
import * as THREE from "three";

const getRandomData = (width, height) => {
  const len = width * height * 4;
  const data = new Float32Array(len);

  for (let i = 0; i < data.length; i++) {
    const stride = i * 4;
    data[stride] = (Math.random() - 0.5)
    data[stride + 1] = 4 * (Math.random() - 0.5)
    data[stride + 2] = 4 * (Math.random() - 0.5)
    data[stride + 3] = 10 * Math.random()
  }
  return data;
}

class TestSimulationMaterial extends THREE.ShaderMaterial {
  constructor(size) {
    const positionsTexture = new THREE.DataTexture(
      getRandomData(size, size),
      size,
      size,
      THREE.RGBAFormat,
      THREE.FloatType
    );

    positionsTexture.needsUpdate = true;

    // const simulationUniforms = {
    //   positions: { value: positionsTexture },
    //   uFrequency: { value: 0.25 },
    //   uTime: { value: 0 },
    // };

    const simulationUniforms = {
      positions: { value: positionsTexture },
      attractor: { value: 0 }
    };

    super({
      uniforms: simulationUniforms,
      vertexShader: "#define GLSLIFY 1\nvarying vec2 vUv;\n\nvoid main() {\n  vUv = uv;\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}",
      fragmentShader: "precision mediump float;\n#define GLSLIFY 1\n\nuniform float attractor;\nuniform sampler2D positions;\n\nvarying vec2 vUv;\n\nvec3 lorezAttractor(vec3 pos) {\n  // Lorenz Attractor parameters\n  float a = 10.0;\n  float b = 28.0;\n  float c = 2.6666666667;\n\n  // Timestep \n  float dt = 0.004;\n\n  float x = pos.x;\n \tfloat y = pos.y;\n \tfloat z = pos.z;\n\n  float dx, dy, dz;\n\n\tdx = dt * (a * (y - x));\n\tdy = dt * (x * (b - z) - y);\n\tdz = dt * (x * y - c * z);\n\n  return vec3(dx, dy, dz);\n}\n\nvec3 lorezMod2Attractor(vec3 pos) {\n  // Lorenz Mod2 Attractor parameters\n  float a = 0.9;\n  float b = 5.0;\n  float c = 9.9;\n  float d = 1.0;\n\n  // Timestep \n  float dt = 0.0005;\n\n  float x = pos.x;\n \tfloat y = pos.y;\n \tfloat z = pos.z;\n\n  float dx, dy, dz;\n\n\tdx = (-a*x+ y*y - z*z + a *c) * dt;\n  dy = (x*(y-b*z)+d)  * dt;\n  dz = (-z + x*(b*y +z))  * dt;\n\n  return vec3(dx, dy, dz);\n}\n\nvec3 thomasAttractor(vec3 pos) {\n  float b = 0.19;\n\n  // Timestep \n  float dt = 0.01;\n\n  float x = pos.x;\n \tfloat y = pos.y;\n \tfloat z = pos.z;\n\n  float dx, dy, dz;\n\n  dx = (-b*x + sin(y)) * dt;\n  dy = (-b*y + sin(z)) * dt;\n  dz = (-b*z + sin(x)) * dt;\n\n  return vec3(dx, dy, dz);\n}\n\nvec3 dequanAttractor(vec3 pos) {\n  float a = 40.0;\n  float b = 1.833;\n  float c = 0.16;\n  float d = 0.65;\n  float e = 55.0;\n  float f = 20.0;\n\n   // Timestep \n  float dt = 0.0005;\n\n  float x = pos.x;\n \tfloat y = pos.y;\n \tfloat z = pos.z;\n\n  float dx, dy, dz;\n\n  dx = ( a*(y-x) + c*x*z) * dt;\n  dy = (e*x + f*y - x*z) * dt;\n  dz = (b*z + x*y - d*x*x) * dt;\n\n  return vec3(dx, dy, dz);\n}\n\nvec3 dradasAttractor(vec3 pos) {\n  float a = 3.0;\n  float b = 2.7;\n  float c = 1.7;\n  float d = 2.0;\n  float e = 9.0;\n\n  // Timestep \n  float dt = 0.0020;\n\n  float x = pos.x;\n \tfloat y = pos.y;\n \tfloat z = pos.z;\n\n  float dx, dy, dz;\n\n  dx = (y- a*x +b*y*z) * dt;\n  dy = (c*y -x*z +z) * dt;\n  dz = (d*x*y - e*z) * dt;\n\n  return vec3(dx, dy, dz);\n}\n\nvec3 arneodoAttractor(vec3 pos) {\n  float a = -5.5;\n  float b = 3.5;\n  float d = -1.0;\n\n  // Timestep \n  float dt = 0.0020;\n\n  float x = pos.x;\n \tfloat y = pos.y;\n \tfloat z = pos.z;\n\n  float dx, dy, dz;\n\n  dx = y * dt;\n  dy = z * dt;\n  dz = (-a*x -b*y -z + (d* (pow(x, 3.0)))) * dt;\n\n  return vec3(dx, dy, dz);\n}\n\nvec3 aizawaAttractor(vec3 pos) {\n  float a = 0.95;\n  float b = 0.7;\n  float c = 0.6;\n  float d = 3.5;\n  float e = 0.25;\n  float f = 0.1;\n\n  // Timestep \n  float dt = 0.003;\n\n  float x = pos.x;\n \tfloat y = pos.y;\n \tfloat z = pos.z;\n\n  float dx, dy, dz;\n\n  dx = ((z-b) * x - d*y) * dt;\n  dy = (d * x + (z-b) * y) * dt;\n  dz = (c + a*z - ((z*z*z) / 3.0) - (x*x) + f * z * (x*x*x)) * dt;\n\n  return vec3(dx, dy, dz);\n}\n\nvoid main() {\n  vec3 pos = texture2D(positions, vUv).rgb;\n  vec3 delta;\n\n  if(attractor == 0.0) {\n    delta = lorezAttractor(pos);\n  }\n\n  if(attractor == 1.0) {\n    delta = lorezMod2Attractor(pos);\n  }\n\n  if(attractor == 2.0) {\n    delta = thomasAttractor(pos);\n  }\n\n  if(attractor == 3.0) {\n    delta = dequanAttractor(pos);\n  }\n\n  if(attractor == 4.0) {\n    delta = dradasAttractor(pos);\n  }\n\n  if(attractor == 5.0) {\n    delta = arneodoAttractor(pos);\n  }\n\n  if(attractor == 6.0) {\n    delta = aizawaAttractor(pos);\n  }\n \n\n  pos.x += delta.x;\n  pos.y += delta.y;\n  pos.z += delta.z;\n\n  // pos.x += cos(pos.y) / 100.0;\n  // pos.y += tan(pos.x) / 100.0;\n\n  gl_FragColor = vec4(pos,1.0);\n}",
    });
  }
}

export default TestSimulationMaterial;
