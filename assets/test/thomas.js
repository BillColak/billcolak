// import {extend} from "@react-three/fiber";
//
// (self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
//     [9437],
//     {
//         319: function (t, n, e) {
//             "use strict";
//             e.d(n, {
//                 R: function () {
//                     return i;
//                 },
//             });
//             var r = e(7294),
//                 o = e(9477),
//                 useThree = e(3310);
//             function i(t, n, e) {
//                 const { gl: i, size: s, viewport: f } = (0, useThree.z)(),
//                     l = "number" === typeof t ? t : s.width * f.dpr,
//                     d = "number" === typeof n ? n : s.height * f.dpr,
//                     c = ("number" === typeof t ? e : t) || {},
//                     { samples: u, ...p } = c,
//                     y = r.useMemo(() => {
//                         let t;
//                         return (
//                             (t = new o.WebGLRenderTarget(l, d, {
//                                 minFilter: o.LinearFilter,
//                                 magFilter: o.LinearFilter,
//                                 encoding: i.outputEncoding,
//                                 type: o.HalfFloatType,
//                                 ...p,
//                             })),
//                                 (t.samples = u),
//                                 t
//                         );
//                     }, []);
//                 return (
//                     r.useLayoutEffect(() => {
//                         y.setSize(l, d), u && (y.samples = u);
//                     }, [u, y, l, d]),
//                         r.useEffect(() => () => y.dispose(), []),
//                         y
//                 );
//             }
//         },
//         3023: function (t, n, e) {
//             (window.__NEXT_P = window.__NEXT_P || []).push([
//                 "/attractor",
//                 function () {
//                     return e(8093);
//                 },
//             ]);
//         },
//         8093: function (t, n, e) {
//             "use strict";
//             e.r(n),
//                 e.d(n, {
//                     default: function () {
//                         return j;
//                     },
//                 });
//             var react = e(5893),
//                 o = e(3412),
//                 orbitControls = e(6665),
//                 useFBO = e(319),
//                 useControls = e(5032),
//                 f = e(5029),
//                 extend = e(3310),
//                 d = e(7294),
//                 THREE = e(9477);
//             function u(t, n) {
//                 if (!(t instanceof n))
//                     throw new TypeError("Cannot call a class as a function");
//             }
//             function p(t) {
//                 return (p = Object.setPrototypeOf
//                     ? Object.getPrototypeOf
//                     : function (t) {
//                         return t.__proto__ || Object.getPrototypeOf(t);
//                     })(t);
//             }
//             function y(t, n) {
//                 if ("function" !== typeof n && null !== n)
//                     throw new TypeError(
//                         "Super expression must either be null or a function"
//                     );
//                 (t.prototype = Object.create(n && n.prototype, {
//                     constructor: { value: t, writable: !0, configurable: !0 },
//                 })),
//                 n && z(t, n);
//             }
//             function x(t, n) {
//                 return !n || ("object" !== v(n) && "function" !== typeof n)
//                     ? (function (t) {
//                         if (void 0 === t)
//                             throw new ReferenceError(
//                                 "this hasn't been initialised - super() hasn't been called"
//                             );
//                         return t;
//                     })(t)
//                     : n;
//             }
//             function z(t, n) {
//                 return (z =
//                     Object.setPrototypeOf ||
//                     function (t, n) {
//                         return (t.__proto__ = n), t;
//                     })(t, n);
//             }
//             var v = function (t) {
//                 return t && "undefined" !== typeof Symbol && t.constructor === Symbol
//                     ? "symbol"
//                     : typeof t;
//             };
//             function m(t) {
//                 var n = (function () {
//                     if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
//                     if (Reflect.construct.sham) return !1;
//                     if ("function" === typeof Proxy) return !0;
//                     try {
//                         return (
//                             Boolean.prototype.valueOf.call(
//                                 Reflect.construct(Boolean, [], function () {})
//                             ),
//                                 !0
//                         );
//                     } catch (t) {
//                         return !1;
//                     }
//                 })();
//                 return function () {
//                     var e,
//                         r = p(t);
//                     if (n) {
//                         var o = p(this).constructor;
//                         e = Reflect.construct(r, arguments, o);
//                     } else e = r.apply(this, arguments);
//                     return x(this, e);
//                 };
//             }
//             var SimulationMaterial = (function (t) {
//                     y(e, t);
//                     var n = m(e);
//                     function e() {
//                         u(this, e);
//                         var positionTexture = new THREE.DataTexture(
//
//                             (function (t, n, e, r) {
//                                 for (var o = new Float32Array(t * n * 4), a = 0; a < o.length; a++) {
//                                     var i = 4 * a;
//                                     (o[i] = 4 * (Math.random() - 0.5)),
//                                         (o[i + 1] = 4 * (Math.random() - 0.5)),
//                                         (o[i + 2] = 4 * (Math.random() - 0.5)),
//                                         (o[i + 3] = 10 * Math.random());
//                                 }
//                                 return o;
//                             })
//
//
//                             (65536, 128),
//                             256,
//                             256,
//                             THREE.RGBAFormat,
//                             THREE.FloatType
//                         );
//                         positionTexture.needsUpdate = !0;
//                         var r = { positions: { value: positionTexture }, attractor: { value: 0 } };
//                         return n.call(this, {
//                             uniforms: r,
//                             vertexShader:
//                                 `
//                 #define GLSLIFY 1
//                 varying vec2 vUv;
//
//                 void main() {
//                     vUv = uv;
//                     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//                 }`,
//                             fragmentShader:
//                                 `
//                 precision mediump float;
//                 #define GLSLIFY 1
//                 uniform float attractor;
//                 uniform sampler2D positions;
//                 varying vec2 vUv;
//                 vec3 lorezAttractor(vec3 pos) {
//                         // Lorenz Attractor parameters
//                         float a = 10.0;
//                         float b = 28.0;
//                         float c = 2.6666666667;
//                         // Timestep
//                         float dt = 0.004;
//                         float x = pos.x;
//                         float y = pos.y;
//                         float z = pos.z;
//                         float dx, dy, dz;
//                         dx = dt * (a * (y - x));
//                         dy = dt * (x * (b - z) - y);
//                         dz = dt * (x * y - c * z);
//                       return vec3(dx, dy, dz);
//                 }
//                     vec3 lorezMod2Attractor(vec3 pos) {
//                         // Lorenz Mod2 Attractor parameters
//                         float a = 0.9;
//                         float b = 5.0;
//                         float c = 9.9;
//                         float d = 1.0;
//                         // Timestep
//                         float dt = 0.0005;
//                         float x = pos.x;
//                         float y = pos.y;
//                         float z = pos.z;
//                         float dx, dy, dz;
//                         dx = (-a*x+ y*y - z*z + a *c) * dt;
//                         dy = (x*(y-b*z)+d)  * dt;
//                         dz = (-z + x*(b*y +z))  * dt;
//                       return vec3(dx, dy, dz);
//                 }
//                     vec3 thomasAttractor(vec3 pos) {
//                       float b = 0.19;
//                       // Timestep
//                       float dt = 0.01;
//                       float x = pos.x;
//                       float y = pos.y;
//                       float z = pos.z;
//                       float dx, dy, dz;
//                       dx = (-b*x + sin(y)) * dt;
//                       dy = (-b*y + sin(z)) * dt;
//                       dz = (-b*z + sin(x)) * dt;
//                       return vec3(dx, dy, dz);
//                 }
//                     vec3 dequanAttractor(vec3 pos) {
//                       float a = 40.0;
//                       float b = 1.833;
//                       float c = 0.16;
//                       float d = 0.65;
//                       float e = 55.0;
//                       float f = 20.0;
//                        // Timestep
//                       float dt = 0.0005;
//                       float x = pos.x;
//                       float y = pos.y;
//                       float z = pos.z;
//                       float dx, dy, dz;
//                       dx = ( a*(y-x) + c*x*z) * dt;
//                       dy = (e*x + f*y - x*z) * dt;
//                       dz = (b*z + x*y - d*x*x) * dt;
//                       return vec3(dx, dy, dz);
//                 }
//                     vec3 dradasAttractor(vec3 pos) {
//                       float a = 3.0;
//                       float b = 2.7;
//                       float c = 1.7;
//                       float d = 2.0;
//                       float e = 9.0;
//                       // Timestep
//                       float dt = 0.0020;
//                       float x = pos.x;
//                       float y = pos.y;
//                       float z = pos.z;
//                       float dx, dy, dz;
//                       dx = (y- a*x +b*y*z) * dt;
//                       dy = (c*y -x*z +z) * dt;
//                       dz = (d*x*y - e*z) * dt;
//                       return vec3(dx, dy, dz);
//                 }
//                     vec3 arneodoAttractor(vec3 pos) {
//                       float a = -5.5;
//                       float b = 3.5;
//                       float d = -1.0;
//                       // Timestep
//                       float dt = 0.0020;
//                       float x = pos.x;
//                         float y = pos.y;
//                         float z = pos.z;
//                       float dx, dy, dz;
//                       dx = y * dt;
//                       dy = z * dt;
//                       dz = (-a*x -b*y -z + (d* (pow(x, 3.0)))) * dt;
//                       return vec3(dx, dy, dz);
//                 }
//                     vec3 aizawaAttractor(vec3 pos) {
//                       float a = 0.95;
//                       float b = 0.7;
//                       float c = 0.6;
//                       float d = 3.5;
//                       float e = 0.25;
//                       float f = 0.1;
//                       // Timestep
//                       float dt = 0.003;
//                       float x = pos.x;
//                      \tfloat y = pos.y;
//                      \tfloat z = pos.z;
//                       float dx, dy, dz;
//                       dx = ((z-b) * x - d*y) * dt;
//                       dy = (d * x + (z-b) * y) * dt;
//                       dz = (c + a*z - ((z*z*z) / 3.0) - (x*x) + f * z * (x*x*x)) * dt;
//                       return vec3(dx, dy, dz);
//                 }
//                     void main() {
//                       vec3 pos = texture2D(positions, vUv).rgb;
//                       vec3 delta;
//                       if(attractor == 0.0) {
//                         delta = lorezAttractor(pos);
//                   }
//                       if(attractor == 1.0) {
//                         delta = lorezMod2Attractor(pos);
//                   }
//                       if(attractor == 2.0) {
//                         delta = thomasAttractor(pos);
//                   }
//                       if(attractor == 3.0) {
//                         delta = dequanAttractor(pos);
//                   }
//                       if(attractor == 4.0) {
//                         delta = dradasAttractor(pos);
//                   }
//                       if(attractor == 5.0) {
//                         delta = arneodoAttractor(pos);
//                   }
//                       if(attractor == 6.0) {
//                         delta = aizawaAttractor(pos);
//                   }
//
//                       pos.x += delta.x;
//                       pos.y += delta.y;
//                       pos.z += delta.z;
//                       // pos.x += cos(pos.y) / 100.0;
//                       // pos.y += tan(pos.x) / 100.0;
//                       gl_FragColor = vec4(pos,1.0);
//                 }`,
//                         });
//                     }
//                     return e;
//                 })(THREE.ShaderMaterial),
//
//
//
//                 b = (function (t) {
//                     y(e, t);
//                     var n = m(e);
//                     function e() {
//                         u(this, e);
//                         return n.call(this, {
//                             uniforms: { positions: { value: null }, pointSize: { value: 3 } },
//                             vertexShader:
//                                 `
//                 #define GLSLIFY 1
//                 uniform sampler2D positions;
//                 uniform float pointSize;
//                 void main() {
//                       vec3 pos = texture2D(positions, position.xy).xyz;
//                       gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );
//                       gl_PointSize = step(1.0 - (1.0/64.0), position.x) * pointSize;
//                 }
//             `,
//                             fragmentShader:
//                                 `
//                 #define GLSLIFY 1
//                 void main() {
//                       gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
//                 }`,
//                             transparent: !0,
//                             blending: THREE.AdditiveBlending,
//                             depthWrite: !1,
//                         });
//                     }
//                     return e;
//                 })(THREE.ShaderMaterial);
//             (0, extend.e)({ SimulationMaterial: SimulationMaterial, RenderMaterial: b });
//             var g = function () {
//                     var t = (0, d.useState)(0),
//                         n = t[0],
//                         e = t[1],
//                         o = 256,
//                         i = 256,
//                         l = [
//                             "Lorenz",
//                             "LorenzMod2",
//                             "Thomas",
//                             "Dequan",
//                             "Dradas",
//                             "Arneodo",
//                             "Aizawa",
//                         ];
//                     (0, useControls.M4)({
//                         attractor: {
//                             value: l[n],
//                             options: l,
//                             onChange: function (t) {
//                                 var n = l.indexOf(t);
//                                 e(n);
//                             },
//                         },
//                     });
//                     var c = (0, d.useMemo)(
//                         function () {
//                             for (var t = new Float32Array(196608), n = 0; n < 65536; n++) {
//                                 var e = 3 * n;
//                                 (t[e + 0] = (n % i) / i), (t[e + 1] = n / o / o);
//                             }
//                             return t;
//                         },
//                         [o, i]
//                     );
//                     return (0, react.jsxs)(
//                         f.Xz,
//                         {
//                             camera: { position: [4, 2, [50, 30, 6, 200, 20, 20, 5][n]] },
//                             children: [
//                                 (0, react.jsx)(orbitControls.z, { attach: "orbitControls" }),
//                                 (0, react.jsx)("ambientLight", {}),
//                                 (0, react.jsx)(w, {
//                                     initialPositions: c,
//                                     type: n,
//                                     width: o,
//                                     height: i,
//                                 }),
//                             ],
//                         },
//                         n
//                     );
//                 },
//                 w = function (t) {
//                     var type = t.type,
//                         initialPositions = t.initialPositions,
//                         width = t.width,
//                         height = t.height,
//                         point = (0, d.useRef)(),
//                         simulationMaterialRef = (0, d.useRef)(),
//                         gl = (0, extend.z)().gl,
//                         scene = (0, d.useState)(function () {return new THREE.Scene();})[0],
//                         camera = (0, d.useState)(function () {return new THREE.OrthographicCamera(-1, 1, 1, -1, 1 / Math.pow(2, 53), 1);})[0],
//                         positions = (0, d.useState)(function () {return new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0,]);})[0],
//                         uvs = (0, d.useState)(function () {return new Float32Array([0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0]);})[0],
//                         renderTarget = (0, useFBO.R)(width, height, {
//                             minFilter: THREE.NearestFilter,
//                             magFilter: THREE.NearestFilter,
//                             format: THREE.RGBAFormat,
//                             stencilBuffer: !1,
//                             type: THREE.FloatType,
//                         }),
//                         renderTargetClone = renderTarget.clone();
//                     return (
//                         (0, d.useEffect)(function () {
//                             gl.setRenderTarget(renderTarget),
//                                 gl.clear(),
//                                 gl.render(scene, camera),
//                                 gl.setRenderTarget(renderTargetClone),
//                                 gl.clear(),
//                                 gl.render(scene, camera),
//                                 gl.setRenderTarget(null);
//                         }),
//                             (0, extend.A)(function (t) {
//                                 var gl1 = t.gl,
//                                     r = renderTarget;
//                                 (renderTarget = renderTargetClone),
//                                     (renderTargetClone = r),
//                                     (simulationMaterialRef.current.uniforms.attractor.value = type),
//                                     (simulationMaterialRef.current.uniforms.positions.value = renderTarget.texture),
//                                     gl1.setRenderTarget(renderTargetClone),
//                                     gl1.clear(),
//                                     gl1.render(scene, camera),
//                                     gl1.setRenderTarget(null),
//                                     (point.current.uniforms.positions.value = renderTargetClone.texture);
//                             }),
//                             (0, react.jsxs)(react.Fragment, {
//                                 children: [
//                                     (0, extend.g)(
//                                         (0, react.jsxs)("mesh", {
//                                             children: [
//                                                 (0, react.jsx)("simulationMaterial", { ref: simulationMaterialRef }),
//                                                 (0, react.jsxs)("bufferGeometry", {
//                                                     children: [
//                                                         (0, react.jsx)("bufferAttribute", {
//                                                             attach: "attributes-position",
//                                                             count: positions.length / 3,
//                                                             array: positions,
//                                                             itemSize: 3,
//                                                         }),
//                                                         (0, react.jsx)("bufferAttribute", {
//                                                             attach: "attributes-uv",
//                                                             count: uvs.length / 2,
//                                                             array: uvs,
//                                                             itemSize: 2,
//                                                         }),
//                                                     ],
//                                                 }),
//                                             ],
//                                         }),
//                                         scene
//                                     ),
//                                     (0, react.jsxs)("points", {
//                                         children: [
//                                             (0, react.jsx)("bufferGeometry", {
//                                                 children: (0, react.jsx)("bufferAttribute", {
//                                                     attach: "attributes-position",
//                                                     count: initialPositions.length / 3,
//                                                     array: initialPositions,
//                                                     itemSize: 3,
//                                                 }),
//                                             }),
//                                             (0, react.jsx)("renderMaterial", { ref: point }),
//                                         ],
//                                     }),
//                                 ],
//                             })
//                     );
//                 },
//                 A = function () {
//                     return (0, react.jsx)(g, {});
//                 },
//                 S = {
//                     text: "Inspired by the work of Samuel Pietry",
//                     href: "https://fusefactory.github.io/openfuse/strange%20attractors/particle%20system/Strange-Attractors-GPU/",
//                 },
//                 j = function () {
//                     return (0, react.jsx)(o.Z, {
//                         title: "Strange Attractors. Built with FBO Particles",
//                         link: S,
//                         children: (0, react.jsx)(A, {}),
//                     });
//                 };
//         },
//     },
//     function (t) {
//         t.O(0, [3737, 5905, 6665, 5847, 5032, 3412, 9774, 2888, 179], function () {
//             return (n = 3023), t((t.s = n));
//             var n;
//         });
//         var n = t.O();
//         _N_E = n;
//     },
// ]);
