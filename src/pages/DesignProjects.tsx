import React, {Suspense, useState} from 'react';
import AirlineRoutes from "../components/ISS/AirlineRoutes";
import {useControls} from "leva";
import Population from "../components/ISS/Population";
import Gdp from "../components/ISS/GDP";
import EarthQuakes from "../components/ISS/EarthQuakes";
import EDLoadingScreen from "../components/LoadingScreen/EDLoadingScreen";

export default function DesignProjects() {
    const [show, setShow] = useState('Population');

    useControls('Projects', {
        projects: {
            options: ['Population', 'Airline Routes', 'Globe GDP', 'Earth Quakes'],
            value: 'Population',
            onChange: (value) => {
                setShow(value);
            }
        }
    })

    return (
            <Suspense fallback={<EDLoadingScreen/>}>
                {show === 'Population' && <Population/>}
                {show === 'Airline Routes' && <AirlineRoutes/>}
                {show === 'Globe GDP' && <Gdp/>}
                {show === 'Earth Quakes' && <EarthQuakes/>}
            </Suspense>
    );
}
