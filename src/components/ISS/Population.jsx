import React, {Suspense, useEffect, useRef, useState} from 'react';
import * as d3 from "d3"
import Globe from "react-globe.gl";
import EdLoadingScreen from "../LoadingScreen/EDLoadingScreen";

function Population(props) {
    const globeEl = useRef();
    const [popData, setPopData] = useState([]);

    useEffect(() => {
        // load data
        fetch('/world_population.csv').then(res => res.text())
            .then(csv => d3.csvParse(csv, ({ lat, lng, pop }) => ({ lat: +lat, lng: +lng, pop: +pop })))
            .then(setPopData);
    }, []);

    useEffect(() => {
        // Auto-rotate
        globeEl.current.controls().autoRotate = true;
        globeEl.current.controls().autoRotateSpeed = 0.1;
    }, []);

    const weightColor = d3.scaleSequentialSqrt(d3.interpolateRgb("#6678FF","#330ae1") )
        .domain([0, 1e7]);

    return(
        <Suspense fallback={<EdLoadingScreen/>}>
            <Globe
                ref={globeEl}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                // backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                backgroundColor={"#0a1329"}

                hexBinPointsData={popData}
                hexBinPointWeight="pop"
                hexAltitude={d => d.sumWeight * 6e-8}
                hexBinResolution={4}
                hexTopColor={d => weightColor(d.sumWeight)}
                hexSideColor={d => weightColor(d.sumWeight)}
                hexBinMerge={true}
                enablePointerInteraction={false}
            />
        </Suspense>)
}

export default Population;

