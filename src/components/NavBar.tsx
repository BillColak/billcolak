import {NavLink} from 'react-router-dom';
import {useEffect, useRef, useState} from "react";


const Navbar = () => {
    // const [isOpen, setIsOpen] = useState(false);
    // const toggle = () => {setIsOpen(!isOpen);}
    const ref = useRef<HTMLDivElement>(null);

    // const sizes = {
    //     "lg": 1024,
    //     "md": 768,
    //     "sm": 640,
    // }
    //
    // const getSize = () => {
    //     return {
    //         width: window.innerWidth,
    //         height: window.innerHeight,
    //     };
    // }
    // useEffect(() => {
    // //      get window size
    //
    //     const size = getSize();
    //     //     position navbar middle left on small screens
    //     const positionNavbar = () => {
    //
    //         if (size.width < sizes.lg) {
    //             ref.current!.style.top = `${ref.current!.style.width}px`;
    //             ref.current!.style.left = `${ref.current!.style.height}px`;
    //         }
    //         else {
    //             ref.current!.style.top = `${ref.current!.style.height}px`;
    //             ref.current!.style.left = `${ref.current!.style.height}px`;
    //         }
    //     }
    //
    //     //     add event listener
    //     window.addEventListener('resize', positionNavbar);
    //     positionNavbar();
    //     // return () => window.removeEventListener('resize', positionNavbar);
    //
    //
    // }, [])


    return (
        <div className="navbar ">
            <nav ref={ref} className={"rotate-90 transition origin-top-left ease-in lg:rotate-0 h-flex lg:gap-10 gap-4 bg-indigo-500 px-6 p-2 rounded-xl text-center lg:font-bold z-10 fixed m-10 font-mavis text-2xl"}>
                <NavLink className={'hover:text-gray-300'} to="/" >Particles</NavLink>
                <NavLink className={'hover:text-gray-300'} to="/GeoEarth" >Earth</NavLink>
                <NavLink className={'hover:text-gray-300'} to="/Projects" >Gallery</NavLink>
                {/*<NavLink className={'hover:text-gray-300'} to="/Game" >Game</NavLink>*/}
                <NavLink className={'hover:text-gray-300'} to="/Test" >UX</NavLink>
            </nav>
        </div>
    );
};
export default Navbar;


