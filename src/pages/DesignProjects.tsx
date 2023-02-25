import React, {Suspense, useState} from 'react';
import EDLoadingScreen from "../components/LoadingScreen/EDLoadingScreen";
import {Overlay, Underlay} from "../components/Baubles/Underlay";
import {Baubles} from "../components/Baubles/Baubles";

export default function DesignProjects() {



    return (
        <div className={'h-screen'}>
            <Underlay />
            <Suspense fallback={<EDLoadingScreen/>}>
                <Baubles />
            </Suspense>
            <Overlay />
        </div>
    );
}
