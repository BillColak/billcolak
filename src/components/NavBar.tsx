import {NavLink} from 'react-router-dom';
import {useRef} from "react";


const Navbar = () => {
    const ref = useRef<HTMLDivElement>(null);
    return (
        <div className="navbar ">
            <nav ref={ref} className={"rotate-90 transition origin-top-left ease-in lg:rotate-0 h-flex lg:gap-10 gap-4 bg-indigo-500 px-6 p-2 rounded-xl text-center lg:font-bold z-10 fixed m-10 font-mavis text-2xl"}>
                <NavLink className={'hover:text-gray-300'} to="/" >Particles</NavLink>
                <NavLink className={'hover:text-gray-300'} to="/GeoEarth" >Earth</NavLink>
                <NavLink className={'hover:text-gray-300'} to="/Gallery" >Gallery</NavLink>
                <NavLink className={'hover:text-gray-300'} to="/Test" >UX</NavLink>
            </nav>
        </div>
    );
};
export default Navbar;


