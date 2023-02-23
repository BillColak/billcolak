import React, {useEffect, useMemo, useRef} from 'react';
import Globe from "react-globe.gl";
import * as THREE from "three";
import CustomShaderMaterial from "three-custom-shader-material/vanilla";
import {Vector3} from "three";


function Solar(props) {
    // custom globe material
    // const globeM = new THREE.MeshPhongMaterial();
    // globeM.bumpScale = 5;
    // new THREE.TextureLoader().load('//unpkg.com/three-globe/example/img/earth-water.png', texture => {
    //     globeM.specularMap = texture;
    //     globeM.specular = new THREE.Color('grey');
    //     globeM.shininess = 10;
    // });


    const day = useMemo(() => new THREE.TextureLoader().load('//unpkg.com/three-globe/example/img/earth-day.jpg'), []);
    const night = useMemo(() => new THREE.TextureLoader().load('//unpkg.com/three-globe/example/img/earth-night.jpg'), []);



    const uniforms = useMemo(
        () => ({
            uDay: { value: day },
            uNight: { value: night },
            uLight: { value: new Vector3().setScalar(2) }
        }),
        []
    )

    const globeMaterial = new CustomShaderMaterial({
            uniforms: {uniforms},
            vertexShader: ``,
            fragmentShader: ``,
            specularMap: new THREE.TextureLoader().load('//unpkg.com/three-globe/example/img/earth-water.png'),
            specular: new THREE.Color('grey'),
            shininess: 10,
            bumpScale: 5,
    });

        const globeEl = useRef();

        // useEffect(() => {
        //     setTimeout(() => { // wait for scene to be populated (asynchronously)
        //         const directionalLight = globeEl.current.scene().children.find(obj3d => obj3d.type === 'DirectionalLight');
        //         directionalLight && directionalLight.position.set(1, 1, 1); // change light position to see the specularMap's effect
        //     });
        // }, []);

        return <Globe
            ref={globeEl}
            globeMaterial={globeMaterial}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"

        />;
}

export default Solar;
