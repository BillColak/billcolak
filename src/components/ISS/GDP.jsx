import React, {useEffect, useMemo, useState} from 'react';
import * as d3 from "d3"
import Globe from "react-globe.gl";

function Gdp(props) {
    const [countries, setCountries] = useState({ features: []});
    const [hoverD, setHoverD] = useState();

    useEffect(() => {
        // load data
        fetch('/ne_110m_admin_0_countries.geojson').then(res => res.json()).then(setCountries);
    }, []);

    const colorScale = d3.scaleSequentialSqrt(d3.interpolateRgb("#6678FF","#330ae1") );

    // GDP per capita (avoiding countries with small pop)
    const getVal = feat => feat.properties.GDP_MD_EST / Math.max(1e5, feat.properties.POP_EST);

    const maxVal = useMemo(
        () => Math.max(...countries.features.map(getVal)),
        [countries]
    );
    colorScale.domain([0, maxVal]);

    return <Globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        // backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        lineHoverPrecision={0}
        polygonsData={countries.features.filter(d => d.properties.ISO_A2 !== 'AQ')}
        polygonAltitude={d => d === hoverD ? 0.12 : 0.06}
        polygonCapColor={d => d === hoverD ? 'steelblue' : colorScale(getVal(d))}
        polygonSideColor={() => 'rgb(8,193,186, 0.35)'}
        polygonStrokeColor={() => '#111'}
        polygonLabel={({ properties: d }) => `
        <b>${d.ADMIN} (${d.ISO_A2}):</b> <br />
        GDP: <i>${d.GDP_MD_EST}</i> M$<br/>
        Population: <i>${d.POP_EST}</i>
      `}
        onPolygonHover={setHoverD}
        polygonsTransitionDuration={300}
    />;
}

export default Gdp;
