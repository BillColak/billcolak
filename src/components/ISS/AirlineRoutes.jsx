import {Suspense, useEffect, useRef, useState} from "react";
import Globe from "react-globe.gl";
import * as d3 from "d3"
// import * as THREE from "three";
// import countries from '/custom.geo.json';
import {useControls} from "leva";
import EdLoadingScreen from "../LoadingScreen/EDLoadingScreen";



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

// const COUNTRY = 'Canada';
const OPACITY = 0.3;
const countries = ['Canada', 'Mexico', 'Portugal', 'Turkey', 'Germany', 'Indonesia', 'Japan', 'Russia', 'Australia', 'Brazil'];


export default function AirlineRoutes(props) {
    const globeEl = useRef();
    const [airports, setAirports] = useState([]);
    const [routes, setRoutes] = useState([]);
    const [popData, setPopData] = useState([]);
    const [country, setCountry] = useState('Canada');
    const [archColor, setArchColor] = useState('#6678FF');

    const {atmosphere} = useControls('Domestic Airline Routes',{
        atmosphere: {value: '#08c1ba', label: 'Atmosphere'},
        arch: {
            value: '#6678FF',
            label: 'Arch Color',
            onChange: (value) => {
                setArchColor(value);
            }
        },
        COUNTRY: {
            value: 'Canada',
            label: 'Country',
            options: countries,
            onChange: (value) => {
                setCountry(value);}
        }
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

            const filteredAirports = airports.filter(d => d.country === country);
            const byIata = indexBy(filteredAirports, 'iata', false);

            const filteredRoutes = routes
                .filter(d => byIata.hasOwnProperty(d.srcIata) && byIata.hasOwnProperty(d.dstIata)) // exclude unknown airports
                .filter(d => d.stops === '0') // non-stop flights only
                .map(d => Object.assign(d, {
                    srcAirport: byIata[d.srcIata],
                    dstAirport: byIata[d.dstIata]
                }))
                .filter(d => d.srcAirport.country === country && d.dstAirport.country === country); // domestic routes within country

            setAirports(filteredAirports);
            setRoutes(filteredRoutes);
        });
    }, [country]);


    useEffect(() => {
        // Auto-rotate
        globeEl.current.controls().autoRotate = true;
        globeEl.current.controls().autoRotateSpeed = 0.1;
    }, []);

    // const weightColor = d3.scaleSequentialSqrt(d3.interpolateYlOrRd)
    //     .domain([0, 1e7]);


    return (
        <Suspense fallback={<EdLoadingScreen/>}>
            <Globe
                ref={globeEl}
                atmosphereColor={atmosphere}
                // backgroundColor={'#181452'}
                // globeMaterial={
                //     new THREE.MeshPhongMaterial({
                //         color: GlobeBase,
                //         emissive: GlobeBase,
                //         emissiveIntensity: 0.1,
                //         shininess: 0,
                //     })
                // }
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                // backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                backgroundColor={"#0a1329"}

                arcsData={routes}
                arcLabel={d => `${d.airline}: ${d.srcIata} &#8594; ${d.dstIata}`}
                arcStartLat={d => +d.srcAirport.lat}
                arcStartLng={d => +d.srcAirport.lng}
                arcEndLat={d => +d.dstAirport.lat}
                arcEndLng={d => +d.dstAirport.lng}
                arcDashLength={0.4}
                arcDashGap={0.2}
                arcDashAnimateTime={2000}
                arcsTransitionDuration={0}
                arcColor={d => {return [archColor, archColor];}}


                pointsData={airports}
                pointColor={() => 'orange'}
                pointAltitude={0}
                pointRadius={0.04}
                pointsMerge={true}
                // hexPolygonsData={popData.features}
                // hexPolygonColor={() => 'rgba(82,234,82,1)'}
                // hexPolygonResolution={3}
                // hexPolygonMargin={0.5}
                // enablePointerInteraction={false}
                // waitForGlobeReady={true}
            />
        </Suspense>
    );
}
