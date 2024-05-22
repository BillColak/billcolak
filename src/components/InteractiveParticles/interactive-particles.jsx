import React, {Suspense} from 'react';
import EDLoadingScreen from "../LoadingScreen/EDLoadingScreen";
import {Canvas} from "@react-three/fiber";
import Laptop from "../Laptop/Laptop";

function InteractiveParticles(props) {
  return (
    <div className={'h-[800px]'}>
      <Suspense fallback={<EDLoadingScreen/>}>
        <Canvas camera={{position: [0, 0, 4],}}>
          <Laptop/>
          <ambientLight intensity={1.5}/>
        </Canvas>
      </Suspense>
    </div>
  );
}

export default InteractiveParticles;
