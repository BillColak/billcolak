import React, {Suspense, useEffect, useState} from 'react';
import * as d3 from "d3";
import Globe from "react-globe.gl";
import EdLoadingScreen from "../LoadingScreen/EDLoadingScreen";

function EarthQuakes(props) {

        const [equakes, setEquakes] = useState([]);


    useEffect(() => {
            // load data
            fetch('//earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson').then(res => res.json())
                .then(({ features }) => setEquakes(features));
        }, []);

        const weightColor = d3.scaleLinear()
            .domain([0, 30])
            .range(['lightblue', 'darkred'])
            .clamp(true);

        return (
                <Globe
                    globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                    bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                    // backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                    backgroundColor={"#0a1329"}

                    hexBinPointsData={equakes}
                    hexBinPointLat={d => d.geometry.coordinates[1]}
                    hexBinPointLng={d => d.geometry.coordinates[0]}
                    hexBinPointWeight={d => d.properties.mag}
                    hexAltitude={({ sumWeight }) => sumWeight * 0.0025}
                    hexTopColor={d => weightColor(d.sumWeight)}
                    hexSideColor={d => weightColor(d.sumWeight)}
                    hexLabel={d => `
                        <b>${d.points.length}</b> earthquakes in the past month:<ul><li>
                          ${d.points.slice().sort((a, b) => b.properties.mag - a.properties.mag).map(d => d.properties.title).join('</li><li>')}
                        </li></ul>
                    `}
                />
        );
}

export default EarthQuakes;
