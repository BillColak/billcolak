import {NavLink} from 'react-router-dom';


const Navbar = () => {
    return (
        <div className="navbar w-full font-mavis text-2xl max-w-fit">
            <nav className="h-flex gap-10 px-6 bg-indigo-500 align-middle justify-center p-2 rounded-xl text-center font-bold z-10 fixed  m-10 ">
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
