import React, {useState} from 'react';
import {FBOParticles} from "../Particles/FBOdemo/FBOParticles"
import {useControls} from "leva";

function ParticleSimulations() {

    const [simulation, setSimulation] = useState('FBO Particles')
    useControls('Particle Simulation: ',{
        Particle_Simulation: {
            value: 'FBO Particles',
            options: ['FBO Particles', 'Surface Sampling', 'Strange Attractor', 'Earth', 'Black Hole', 'Jellyfish'],
            onChange: (value) => {
                setSimulation(value)
            }
        }
    })


    return (
        <>
            <FBOParticles />
        </>
    );
}

export default ParticleSimulations;
