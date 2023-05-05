import React, {Suspense} from 'react';
import EDLoadingScreen from "../components/LoadingScreen/EDLoadingScreen";


export default function RefreshModeration() {

    return (
        <Suspense fallback={<EDLoadingScreen/>}>
            <div className={'h-screen'}>
                <iframe className={'h-full w-full'}
                        src="https://www.figma.com/proto/LYckn9p2qT5qoJhpHft1ES/RWA-Main-Draft-%26-Collab?page-id=769%3A17493&node-id=852-28418&viewport=-267%2C-396%2C0.07&scaling=min-zoom&starting-point-node-id=852%3A28418&show-proto-sidebar=1"
                        allowFullScreen>
                </iframe>
            </div>
        </Suspense>
    );
}
