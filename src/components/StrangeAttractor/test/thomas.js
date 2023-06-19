(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [9437],
    {
        319: function (t, n, e) {
            "use strict";
            e.d(n, {
                R: function () {
                    return i;
                },
            });
            var r = e(7294),
                o = e(9477),
                a = e(3310);
            function i(t, n, e) {
                const { gl: i, size: s, viewport: f } = (0, a.z)(),
                    l = "number" === typeof t ? t : s.width * f.dpr,
                    d = "number" === typeof n ? n : s.height * f.dpr,
                    c = ("number" === typeof t ? e : t) || {},
                    { samples: u, ...p } = c,
                    y = r.useMemo(() => {
                        let t;
                        return (
                            (t = new o.WebGLRenderTarget(l, d, {
                                minFilter: o.LinearFilter,
                                magFilter: o.LinearFilter,
                                encoding: i.outputEncoding,
                                type: o.HalfFloatType,
                                ...p,
                            })),
                                (t.samples = u),
                                t
                        );
                    }, []);
                return (
                    r.useLayoutEffect(() => {
                        y.setSize(l, d), u && (y.samples = u);
                    }, [u, y, l, d]),
                        r.useEffect(() => () => y.dispose(), []),
                        y
                );
            }
        },
        3023: function (t, n, e) {
            (window.__NEXT_P = window.__NEXT_P || []).push([
                "/attractor",
                function () {
                    return e(8093);
                },
            ]);
        },
        8093: function (t, n, e) {
            "use strict";
            e.r(n),
                e.d(n, {
                    default: function () {
                        return j;
                    },
                });
            var r = e(5893),
                o = e(3412),
                a = e(6665),
                i = e(319),
                s = e(5032),
                f = e(5029),
                l = e(3310),
                d = e(7294),
                THREE = e(9477);
            function u(t, n) {
                if (!(t instanceof n))
                    throw new TypeError("Cannot call a class as a function");
            }
            function p(t) {
                return (p = Object.setPrototypeOf
                    ? Object.getPrototypeOf
                    : function (t) {
                        return t.__proto__ || Object.getPrototypeOf(t);
                    })(t);
            }
            function y(t, n) {
                if ("function" !== typeof n && null !== n)
                    throw new TypeError(
                        "Super expression must either be null or a function"
                    );
                (t.prototype = Object.create(n && n.prototype, {
                    constructor: { value: t, writable: !0, configurable: !0 },
                })),
                n && z(t, n);
            }
            function x(t, n) {
                return !n || ("object" !== v(n) && "function" !== typeof n)
                    ? (function (t) {
                        if (void 0 === t)
                            throw new ReferenceError(
                                "this hasn't been initialised - super() hasn't been called"
                            );
                        return t;
                    })(t)
                    : n;
            }
            function z(t, n) {
                return (z =
                    Object.setPrototypeOf ||
                    function (t, n) {
                        return (t.__proto__ = n), t;
                    })(t, n);
            }
            var v = function (t) {
                return t && "undefined" !== typeof Symbol && t.constructor === Symbol
                    ? "symbol"
                    : typeof t;
            };
            function m(t) {
                var n = (function () {
                    if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
                    if (Reflect.construct.sham) return !1;
                    if ("function" === typeof Proxy) return !0;
                    try {
                        return (
                            Boolean.prototype.valueOf.call(
                                Reflect.construct(Boolean, [], function () {})
                            ),
                                !0
                        );
                    } catch (t) {
                        return !1;
                    }
                })();
                return function () {
                    var e,
                        r = p(t);
                    if (n) {
                        var o = p(this).constructor;
                        e = Reflect.construct(r, arguments, o);
                    } else e = r.apply(this, arguments);
                    return x(this, e);
                };
            }
            var SimulationMaterial = (function (t) {
                    y(e, t);
                    var n = m(e);
                    function e() {
                        u(this, e);
                        var dataTexture = new THREE.DataTexture(
                            (function (t, n) {
                                for ( var data = new Float32Array(t * n * 4), i = 0; i < data.length; i++ ) {
                                    var stride = 4 * i;
                                    (data[stride] = 4 * (Math.random() - 0.5)),
                                        (data[stride + 1] = 4 * (Math.random() - 0.5)),
                                        (data[stride + 2] = 4 * (Math.random() - 0.5)),
                                        (data[stride + 3] = 10 * Math.random());
                                }
                                return data;
                            })(65536, 128),
                            256,
                            256,
                            THREE.RGBAFormat,
                            THREE.FloatType
                        );
                        dataTexture.needsUpdate = true;
                        var uniforms = { positions: { value: dataTexture }, attractor: { value: 0 } };
                        return n.call(this, {
                            uniforms: uniforms,
                            vertexShader:
                                "#define GLSLIFY 1\nvarying vec2 vUv;\n\nvoid main() {\n  vUv = uv;\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}",
                            fragmentShader:
                                "precision mediump float;\n#define GLSLIFY 1\n\nuniform float attractor;\nuniform sampler2D positions;\n\nvarying vec2 vUv;\n\nvec3 lorezAttractor(vec3 pos) {\n  // Lorenz Attractor parameters\n  float a = 10.0;\n  float b = 28.0;\n  float c = 2.6666666667;\n\n  // Timestep \n  float dt = 0.004;\n\n  float x = pos.x;\n \tfloat y = pos.y;\n \tfloat z = pos.z;\n\n  float dx, dy, dz;\n\n\tdx = dt * (a * (y - x));\n\tdy = dt * (x * (b - z) - y);\n\tdz = dt * (x * y - c * z);\n\n  return vec3(dx, dy, dz);\n}\n\nvec3 lorezMod2Attractor(vec3 pos) {\n  // Lorenz Mod2 Attractor parameters\n  float a = 0.9;\n  float b = 5.0;\n  float c = 9.9;\n  float d = 1.0;\n\n  // Timestep \n  float dt = 0.0005;\n\n  float x = pos.x;\n \tfloat y = pos.y;\n \tfloat z = pos.z;\n\n  float dx, dy, dz;\n\n\tdx = (-a*x+ y*y - z*z + a *c) * dt;\n  dy = (x*(y-b*z)+d)  * dt;\n  dz = (-z + x*(b*y +z))  * dt;\n\n  return vec3(dx, dy, dz);\n}\n\nvec3 thomasAttractor(vec3 pos) {\n  float b = 0.19;\n\n  // Timestep \n  float dt = 0.01;\n\n  float x = pos.x;\n \tfloat y = pos.y;\n \tfloat z = pos.z;\n\n  float dx, dy, dz;\n\n  dx = (-b*x + sin(y)) * dt;\n  dy = (-b*y + sin(z)) * dt;\n  dz = (-b*z + sin(x)) * dt;\n\n  return vec3(dx, dy, dz);\n}\n\nvec3 dequanAttractor(vec3 pos) {\n  float a = 40.0;\n  float b = 1.833;\n  float c = 0.16;\n  float d = 0.65;\n  float e = 55.0;\n  float f = 20.0;\n\n   // Timestep \n  float dt = 0.0005;\n\n  float x = pos.x;\n \tfloat y = pos.y;\n \tfloat z = pos.z;\n\n  float dx, dy, dz;\n\n  dx = ( a*(y-x) + c*x*z) * dt;\n  dy = (e*x + f*y - x*z) * dt;\n  dz = (b*z + x*y - d*x*x) * dt;\n\n  return vec3(dx, dy, dz);\n}\n\nvec3 dradasAttractor(vec3 pos) {\n  float a = 3.0;\n  float b = 2.7;\n  float c = 1.7;\n  float d = 2.0;\n  float e = 9.0;\n\n  // Timestep \n  float dt = 0.0020;\n\n  float x = pos.x;\n \tfloat y = pos.y;\n \tfloat z = pos.z;\n\n  float dx, dy, dz;\n\n  dx = (y- a*x +b*y*z) * dt;\n  dy = (c*y -x*z +z) * dt;\n  dz = (d*x*y - e*z) * dt;\n\n  return vec3(dx, dy, dz);\n}\n\nvec3 arneodoAttractor(vec3 pos) {\n  float a = -5.5;\n  float b = 3.5;\n  float d = -1.0;\n\n  // Timestep \n  float dt = 0.0020;\n\n  float x = pos.x;\n \tfloat y = pos.y;\n \tfloat z = pos.z;\n\n  float dx, dy, dz;\n\n  dx = y * dt;\n  dy = z * dt;\n  dz = (-a*x -b*y -z + (d* (pow(x, 3.0)))) * dt;\n\n  return vec3(dx, dy, dz);\n}\n\nvec3 aizawaAttractor(vec3 pos) {\n  float a = 0.95;\n  float b = 0.7;\n  float c = 0.6;\n  float d = 3.5;\n  float e = 0.25;\n  float f = 0.1;\n\n  // Timestep \n  float dt = 0.003;\n\n  float x = pos.x;\n \tfloat y = pos.y;\n \tfloat z = pos.z;\n\n  float dx, dy, dz;\n\n  dx = ((z-b) * x - d*y) * dt;\n  dy = (d * x + (z-b) * y) * dt;\n  dz = (c + a*z - ((z*z*z) / 3.0) - (x*x) + f * z * (x*x*x)) * dt;\n\n  return vec3(dx, dy, dz);\n}\n\nvoid main() {\n  vec3 pos = texture2D(positions, vUv).rgb;\n  vec3 delta;\n\n  if(attractor == 0.0) {\n    delta = lorezAttractor(pos);\n  }\n\n  if(attractor == 1.0) {\n    delta = lorezMod2Attractor(pos);\n  }\n\n  if(attractor == 2.0) {\n    delta = thomasAttractor(pos);\n  }\n\n  if(attractor == 3.0) {\n    delta = dequanAttractor(pos);\n  }\n\n  if(attractor == 4.0) {\n    delta = dradasAttractor(pos);\n  }\n\n  if(attractor == 5.0) {\n    delta = arneodoAttractor(pos);\n  }\n\n  if(attractor == 6.0) {\n    delta = aizawaAttractor(pos);\n  }\n \n\n  pos.x += delta.x;\n  pos.y += delta.y;\n  pos.z += delta.z;\n\n  // pos.x += cos(pos.y) / 100.0;\n  // pos.y += tan(pos.x) / 100.0;\n\n  gl_FragColor = vec4(pos,1.0);\n}",
                        });
                    }
                    return e;
                })(THREE.ShaderMaterial),

                RenderMaterial = (function (t) {
                    y(e, t);
                    var n = m(e);
                    function e() {
                        u(this, e);
                        return n.call(this, {
                            uniforms: { positions: { value: null }, pointSize: { value: 3 } },
                            vertexShader:
                                "#define GLSLIFY 1\nuniform sampler2D positions;\nuniform float pointSize;\n\nvoid main() {\n  vec3 pos = texture2D(positions, position.xy).xyz;\n\n  gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );\n  gl_PointSize = step(1.0 - (1.0/64.0), position.x) * pointSize;\n}",
                            fragmentShader:
                                "#define GLSLIFY 1\nvoid main() {\n  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n}",
                            transparent: !0,
                            blending: THREE.AdditiveBlending,
                            depthWrite: !1,
                        });
                    }
                    return e;
                })(THREE.ShaderMaterial);

            (0, l.e)({ SimulationMaterial: SimulationMaterial, RenderMaterial: RenderMaterial });

            var AttractorParticles = function () {
                    var t = (0, d.useState)(0),
                        attractor = t[0],
                        setAttractor = t[1],
                        height = 256,
                        width = 256,
                        l = [
                            "Lorenz",
                            "LorenzMod2",
                            "Thomas",
                            "Dequan",
                            "Dradas",
                            "Arneodo",
                            "Aizawa",
                        ];
                    (0, s.M4)({
                        attractor: {
                            value: l[attractor],
                            options: l,
                            onChange: function (t) {
                                var n = l.indexOf(t);
                                setAttractor(n);
                            },
                        },
                    });
                    var initialPositions = (0, d.useMemo)(
                        function () {
                            for (var particles = new Float32Array(196608), i = 0; i < 65536; i++) {
                                var i3 = 3 * i;
                                (particles[i3 + 0] = (i % width) / width), (particles[i3 + 1] = i / height / height);
                            }
                            return particles;
                        },
                        [height, width]
                    );
                    return (0, r.jsxs)(
                        f.Xz,
                        {
                            camera: { position: [4, 2, [50, 30, 6, 200, 20, 20, 5][attractor]] },
                            children: [
                                (0, r.jsx)(a.z, { attach: "orbitControls" }),
                                (0, r.jsx)("ambientLight", {}),
                                (0, r.jsx)(StrangeAttractor, {
                                    initialPositions: initialPositions,
                                    type: attractor,
                                    width: height,
                                    height: width,
                                }),
                            ],
                        },
                        attractor
                    );
                },
                StrangeAttractor = function (t) {
                    var Attractor = t.type,
                        initialPositions = t.initialPositions,
                        width = t.width,
                        height = t.height,
                        points = (0, d.useRef)(),
                        simulationMaterialRef = (0, d.useRef)(),
                        gl = (0, l.z)().gl,
                        scene = (0, d.useState)(function () {return new THREE.Scene();})[0],
                        camera = (0, d.useState)(function () {
                            return new THREE.OrthographicCamera(
                                -1,
                                1,
                                1,
                                -1,
                                1 / Math.pow(2, 53),
                                1
                            );
                        })[0],
                        positions = (0, d.useState)(function () { return new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0,]);})[0],
                        uvs = (0, d.useState)(function () {return new Float32Array([0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0]);})[0],
                        writeTarget = (0, i.R)(width, height, {
                            minFilter: THREE.NearestFilter,
                            magFilter: THREE.NearestFilter,
                            format: THREE.RGBAFormat,
                            stencilBuffer: !1,
                            type: THREE.FloatType,
                        }),
                        readTarget = writeTarget.clone();
                    return (
                        (0, d.useEffect)(function () {
                            gl.setRenderTarget(writeTarget),
                                gl.clear(),
                                gl.render(scene, camera),
                                gl.setRenderTarget(readTarget),
                                gl.clear(),
                                gl.render(scene, camera),
                                gl.setRenderTarget(null);
                        }),
                            (0, l.A)(function (t) {
                                var gl = t.gl
                                let temp = writeTarget;
                                writeTarget = readTarget
                                readTarget = temp;
                                simulationMaterialRef.current.uniforms.attractor.value = Attractor;
                                simulationMaterialRef.current.uniforms.positions.value = writeTarget.texture
                                gl.setRenderTarget(readTarget)
                                gl.clear()
                                gl.render(scene, camera)
                                gl.setRenderTarget(null)
                                points.current.uniforms.positions.value = readTarget.texture
                            }),
                            (0, r.jsxs)(r.Fragment, {
                                children: [
                                    (0, l.g)(
                                        (0, r.jsxs)("mesh", {
                                            children: [
                                                (0, r.jsx)("simulationMaterial", { ref: simulationMaterialRef }),
                                                (0, r.jsxs)("bufferGeometry", {
                                                    children: [
                                                        (0, r.jsx)("bufferAttribute", {
                                                            attach: "attributes-position",
                                                            count: positions.length / 3,
                                                            array: positions,
                                                            itemSize: 3,
                                                        }),
                                                        (0, r.jsx)("bufferAttribute", {
                                                            attach: "attributes-uv",
                                                            count: uvs.length / 2,
                                                            array: uvs,
                                                            itemSize: 2,
                                                        }),
                                                    ],
                                                }),
                                            ],
                                        }),
                                        scene
                                    ),
                                    (0, r.jsxs)("points", {
                                        children: [
                                            (0, r.jsx)("bufferGeometry", {
                                                children: (0, r.jsx)("bufferAttribute", {
                                                    attach: "attributes-position",
                                                    count: initialPositions.length / 3,
                                                    array: initialPositions,
                                                    itemSize: 3,
                                                }),
                                            }),
                                            (0, r.jsx)("renderMaterial", { ref: points }),
                                        ],
                                    }),
                                ],
                            })
                    );
                },
                A = function () {
                    return (0, r.jsx)(AttractorParticles, {});
                },
                S = {
                    text: "Inspired by the work of Samuel Pietry",
                    href: "https://fusefactory.github.io/openfuse/strange%20attractors/particle%20system/Strange-Attractors-GPU/",
                },
                j = function () {
                    return (0, r.jsx)(o.Z, {
                        title: "Strange Attractors. Built with FBO Particles",
                        link: S,
                        children: (0, r.jsx)(A, {}),
                    });
                };
        },
    },
    function (t) {
        t.O(0, [3737, 5905, 6665, 5847, 5032, 3412, 9774, 2888, 179], function () {
            return (n = 3023), t((t.s = n));
            var n;
        });
        var n = t.O();
        _N_E = n;
    },
]);
