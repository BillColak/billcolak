import React from 'react';

    // https://codesandbox.io/s/n60qg  Boot Landing Page
    // https://codesandbox.io/s/yjhzv?file=/src/App.js:0-82 Scrollcontrols with minimap
    // https://codesandbox.io/s/gsm1y useIntersect scrollControls
    // https://codesandbox.io/s/x8gvs Infinite scroll




function DevPortfolio() {

    const itemsExternal = [
        {name:'Refresh Wellness App', link:'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FLYckn9p2qT5qoJhpHft1ES%2FRWA-Main-Draft-%2526-Collab%3Fpage-id%3D4%253A97044%26node-id%3D168-133276%26viewport%3D1373%252C498%252C0.06%26scaling%3Dscale-down%26starting-point-node-id%3D168%253A133276'},
        {name:'Refresh Wellness Moderation', link:'https://www.figma.com/proto/LYckn9p2qT5qoJhpHft1ES/RWA-Main-Draft-%26-Collab?page-id=769%3A17493&node-id=1196-43141&viewport=-267%2C-396%2C0.07&scaling=min-zoom&starting-point-node-id=852%3A28418&show-proto-sidebar=1'},
        {name:'Koble Technologies', link:'https://billcolak.net/'},
        {name:'Centennial Driving School', link:'https://centennialdt.com/'},
        {name:'Python Node Editor', link:'https://www.youtube.com/watch?v=GUQF47B5hoA'},
        {name:'LinkedIn', link:'https://www.linkedin.com/in/bill-colak/'},
    ];

    function Block(props: any) {
        const {name, link} = props;
        return (
            <div
                className={'bg-indigo-600 rounded-xl text-center lg:font-bold z-10 px-6 p-2 hover:text-gray-400 cursor-pointer leading-snug'}
                onClick={() => {window.open(link, '_blank')}}
            >
                {name}
            </div>
        );
    }


    return (
        <div className={'w-full h-screen text-white text-2xl font-mavis font-bold'}>
            <div className={'grid gap-4 h-full place-content-center'}>
                {itemsExternal.map((item, index) => {
                    return <Block key={index} name={item.name} link={item.link}/>
                })}

            </div>

        </div>
    );
}

export default DevPortfolio;
