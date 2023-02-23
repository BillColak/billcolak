import React, {useEffect, useMemo, useRef, useState} from 'react';
import Globe from "react-globe.gl";
import * as THREE from "three";

function SatDish(props) {
    return (
        <group
            position={props.position}
            rotation={props.rotation}
            scale={props.scale}
        >
            <mesh position={[1, 2, 3]}>
                <cylinderGeometry args={[0.8, 1.8, 1, 32]} />
                <meshStandardMaterial color={'grey'} />
            </mesh>
            <mesh position={[1, 3.5, 3]}>
                <cylinderGeometry args={[0.8, 0.8, 3, 32]} />
                <meshStandardMaterial color={'white'} />
            </mesh>
            <mesh position={[1,6.5,3]}>
                <cylinderGeometry args={[1.5, 1.5, 4, 32]} />
                <meshStandardMaterial color={'white'} />
            </mesh>
            <group rotation-z={-0.45} position={[-2.3, 1.2, 0]}>
                <mesh position={[1,6.5,0.2]} >
                    <boxGeometry args={[0.2, 2, 2]} />
                    <meshStandardMaterial color={'#6678FF'} />
                </mesh>

                <mesh position={[1,6.5,-2.2]} >
                    <boxGeometry args={[0.2, 2, 2]} />
                    <meshStandardMaterial color={'#6678FF'} />
                </mesh>
            </group>
            <group rotation-z={-0.45} position={[-2.3, 1.2, 8]}>
                <mesh position={[1,6.5,0.2]} >
                    <boxGeometry args={[0.2, 2, 2]} />
                    <meshStandardMaterial color={'#6678FF'} />
                </mesh>
                <mesh position={[1,6.5,-2.2]} >
                    <boxGeometry args={[0.2, 2, 2]} />
                    <meshStandardMaterial color={'#6678FF'} />
                </mesh>
            </group>
        </group>
    );
}

//unpkg.com/satellite.js/dist/satellite.min.js
let satellite = require('//unpkg.com/satellite.js/dist/satellite.min.js');


function Sat(props) {

    const EARTH_RADIUS_KM = 6371; // km
    const SAT_SIZE = 80; // km
    const TIME_STEP = 3 * 1000; // per frame

    const globeEl = useRef();
    const [satData, setSatData] = useState();
    const [globeRadius, setGlobeRadius] = useState();
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        // time ticker
        (function frameTicker() {
            requestAnimationFrame(frameTicker);
            setTime(time => new Date(+time + TIME_STEP));
        })();
    }, []);

    useEffect(() => {
        // load satellite data
        fetch('//unpkg.com/globe.gl/example/datasets/space-track-leo.txt').then(r => r.text()).then(rawData => {
            const tleData = rawData.replace(/\r/g, '')
                .split(/\n(?=[^12])/)
                .filter(d => d)
                .map(tle => tle.split('\n'));
            let satellite;
            const satData = tleData.map(([name, ...tle]) => ({
                satrec: satellite.twoline2satrec(...tle),
                name: name.trim().replace(/^0 /, '')
            }))
                // exclude those that can't be propagated
                .filter(d => !!satellite.propagate(d.satrec, new Date()).position)
                .slice(0, 1500);

            setSatData(satData);
        });
    }, []);

    const objectsData = useMemo(() => {
        if (!satData) return [];

        // Update satellite positions
        const gmst = satellite.gstime(time);
        return satData.map(d => {
            const eci = satellite.propagate(d.satrec, time);
            if (eci.position) {
                const gdPos = satellite.eciToGeodetic(eci.position, gmst);
                const lat = satellite.radiansToDegrees(gdPos.latitude);
                const lng = satellite.radiansToDegrees(gdPos.longitude);
                const alt = gdPos.height / EARTH_RADIUS_KM;
                return { ...d, lat, lng, alt };
            }
            return d;
        });
    }, [satData, time]);

    const satObject = useMemo(() => {
        if (!globeRadius) return undefined;

        const satGeometry = new THREE.OctahedronGeometry(SAT_SIZE * globeRadius / EARTH_RADIUS_KM / 2, 0);
        const satMaterial = new THREE.MeshLambertMaterial({ color: 'palegreen', transparent: true, opacity: 0.7 });
        return new THREE.Mesh(satGeometry, satMaterial);
        // return <SatDish/>
    }, [globeRadius]);

    useEffect(() => {
        setGlobeRadius(globeEl.current.getGlobeRadius());
        globeEl.current.pointOfView({ altitude: 3.5 });
    }, []);

    return <div>
        <Globe
            ref={globeEl}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            // backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
            objectsData={objectsData}
            objectLabel="name"
            objectLat="lat"
            objectLng="lng"
            objectAltitude="alt"
            objectThreeObject={satObject}
        />
        <div id="time-log">{time.toString()}</div>
    </div>;

}

export default Sat;
