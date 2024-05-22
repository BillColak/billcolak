import React from 'react';

// https://codesandbox.io/s/n60qg  Boot Landing Page
// https://codesandbox.io/s/yjhzv?file=/src/App.js:0-82 Scrollcontrols with minimap
// https://codesandbox.io/s/gsm1y useIntersect scrollControls
// https://codesandbox.io/s/x8gvs Infinite scroll


function DevPortfolio() {

  const itemsExternal = [
    {name: 'Wendigo Web Agency', link: 'https://wendigoweb.com/'},
    {name: 'Koble Technologies', link: 'https://www.kobleinc.com/'},
    {name: 'Royal Oak Property Services', link: 'https://royal-oak.vercel.app/'},
    {name: 'Inventory Management System', link: 'https://binary-bandits.vercel.app/'},
    {name: 'Python Node Editor', link: 'https://www.youtube.com/watch?v=GUQF47B5hoA'},
    {name: 'LinkedIn', link: 'https://www.linkedin.com/in/bill-colak/'},
  ];

  function Block(props: any) {
    const {name, link} = props;
    return (
      <div
        className={'container bg-indigo-600 rounded-xl text-center lg:font-bold z-10 px-6 p-2 hover:text-gray-400 cursor-pointer leading-snug'}
        onClick={() => {
          window.open(link, '_blank')
        }}
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
