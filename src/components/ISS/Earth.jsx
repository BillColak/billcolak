import {useEffect, useRef, useState} from "react";
import Globe from "react-globe.gl";
import * as d3 from "d3"
import * as THREE from "three";
// import countries from '/custom.geo.json';
import {useControls} from "leva";



const map = {
    "type": "Map",
};

function indexBy(list, iteratee, context) {
    return list.reduce((map, obj) => {
        const key = typeof iteratee === 'string' ? obj[iteratee] : iteratee.call(context, obj);
        map[key] = obj;
        return map;
    }, {});
}


const airportParse = ([airportId, name, city, country, iata, icao, lat, lng, alt, timezone, dst, tz, type, source]) => ({ airportId, name, city, country, iata, icao, lat, lng, alt, timezone, dst, tz, type, source });
const routeParse = ([airline, airlineId, srcIata, srcAirportId, dstIata, dstAirportId, codeshare, stops, equipment]) => ({ airline, airlineId, srcIata, srcAirportId, dstIata, dstAirportId, codeshare, stops, equipment});

const COUNTRY = 'Canada';
const OPACITY = 0.3;


export default function Earth(props) {
    const globeEl = useRef();
    const [airports, setAirports] = useState([]);
    const [routes, setRoutes] = useState([]);
    const [hoverArc, setHoverArc] = useState();
    const [popData, setPopData] = useState([]);

    const {color, atmosphere} = useControls('Color',{
        color: {value: '#e614b4', label: 'color'},
        atmosphere: {value: '#e614b4', label: 'atmosphere'},
    });


    useEffect(() => {
        // load data
        fetch('/custom.geo.json').then(res => res.text())
            // .then(csv => d3.csvParse(csv, ({ lat, lng, pop }) => ({ lat: +lat, lng: +lng, pop: +pop })))
            // .then(setPopData);
            .then(data => {setPopData(JSON.parse(data))});

        Promise.all([
            fetch('https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat').then(res => res.text())
                .then(d => d3.csvParseRows(d, airportParse)),
            fetch('https://raw.githubusercontent.com/jpatokal/openflights/master/data/routes.dat').then(res => res.text())
                .then(d => d3.csvParseRows(d, routeParse))
        ]).then(([airports, routes]) => {

            const filteredAirports = airports.filter(d => d.country === COUNTRY);
            const byIata = indexBy(filteredAirports, 'iata', false);

            const filteredRoutes = routes
                .filter(d => byIata.hasOwnProperty(d.srcIata) && byIata.hasOwnProperty(d.dstIata)) // exclude unknown airports
                .filter(d => d.stops === '0') // non-stop flights only
                .map(d => Object.assign(d, {
                    srcAirport: byIata[d.srcIata],
                    dstAirport: byIata[d.dstIata]
                }))
                .filter(d => d.srcAirport.country === COUNTRY && d.dstAirport.country === COUNTRY); // domestic routes within country

            setAirports(filteredAirports);
            setRoutes(filteredRoutes);
        });
    }, []);


    useEffect(() => {
        // Auto-rotate
        globeEl.current.controls().autoRotate = true;
        globeEl.current.controls().autoRotateSpeed = 0.1;
    }, []);

    // const weightColor = d3.scaleSequentialSqrt(d3.interpolateYlOrRd)
    //     .domain([0, 1e7]);


    return (
        <Globe
            ref={globeEl}
            atmosphereColor={atmosphere}
            backgroundColor={'#181452'}
            globeMaterial={
                new THREE.MeshPhongMaterial({
                    color: color,
                    emissive: color,
                    emissiveIntensity: 0.1,
                    shininess: 0,
                })
            }

            // globeImageUrl="/GlobeTextures/earth/world.jpg"
            // bumpImageUrl="/GlobeTextures/earth/bump.jpg"
            // backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"

            // hexBinPointsData={popData}
            // hexBinPointWeight="pop"
            // hexAltitude={d => d.sumWeight * 6e-8}
            // hexBinResolution={4}
            // hexTopColor={d => weightColor(d.sumWeight)}
            // hexSideColor={d => weightColor(d.sumWeight)}
            // hexBinMerge={true}


            arcsData={routes}
            arcLabel={d => `${d.airline}: ${d.srcIata} &#8594; ${d.dstIata}`}
            arcStartLat={d => +d.srcAirport.lat}
            arcStartLng={d => +d.srcAirport.lng}
            arcEndLat={d => +d.dstAirport.lat}
            arcEndLng={d => +d.dstAirport.lng}
            arcDashLength={0.4}
            arcDashGap={0.2}
            arcDashAnimateTime={1500}
            arcsTransitionDuration={0}
            arcColor={d => {
                // const op = !hoverArc ? OPACITY : d === hoverArc ? 0.9 : OPACITY / 4;
                return [`#e614b4`, `#27a9e3`];
            }}
            onArcHover={setHoverArc}

            pointsData={airports}
            pointColor={() => 'orange'}
            pointAltitude={0}
            pointRadius={0.1}
            pointsMerge={true}




            hexPolygonsData={popData.features}
            hexPolygonColor={() => 'rgba(82,234,82,1)'}
            hexPolygonResolution={3}
            hexPolygonMargin={0.5}
            enablePointerInteraction={false}
            waitForGlobeReady={true}
        />
    );
}
