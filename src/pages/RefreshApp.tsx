import React, {Suspense} from 'react';
import EDLoadingScreen from "../components/LoadingScreen/EDLoadingScreen";


export default function RefreshApp() {

    return (
        <Suspense fallback={<EDLoadingScreen/>}>
            <div className={'h-screen'}>
                <iframe className={'h-full w-full'}
                        src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FLYckn9p2qT5qoJhpHft1ES%2FRWA-Main-Draft-%2526-Collab%3Fpage-id%3D4%253A97044%26node-id%3D168-133276%26viewport%3D1373%252C498%252C0.06%26scaling%3Dscale-down%26starting-point-node-id%3D168%253A133276"
                        allowFullScreen>
                </iframe>
            </div>
        </Suspense>
    );
}
