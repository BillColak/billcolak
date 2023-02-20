import { NavLink } from 'react-router-dom';
import favicon from '../assets/favicon.png';



const Navbar = () => {
    return (
        <div className="navbar h-flex w-full justify-between font-mavis text-2xl m-10 absolute">
            {/*<NavLink to="/">*/}
            {/*    <img src={favicon} className="h-10 px-1" alt="logo" />*/}
            {/*</NavLink>*/}

            <nav className="h-flex gap-10 px-6 bg-indigo-500 align-middle justify-center p-2 rounded-xl text-center font-bold z-10">
                <NavLink className={'hover:text-gray-300'} to="/" >Home</NavLink>
                <NavLink className={'hover:text-gray-300'} to="/Contact" >Contact</NavLink>
                <NavLink className={'hover:text-gray-300'} to="/Resume" >Resume</NavLink>
                <NavLink className={'hover:text-gray-300'} to="/Game" >Game</NavLink>
            </nav>
        </div>
    );
};
export default Navbar;
