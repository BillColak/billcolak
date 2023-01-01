import { NavLink } from 'react-router-dom';
import favicon from '../assets/favicon.png';


const Navbar = () => {
    return (
        <div className="navbar h-flex justify-between">
            <NavLink to="/">
                <img src={favicon} className="h-10 px-1" alt="logo" />
            </NavLink>
            <nav className="h-flex">
                <NavLink className="btn-red" to="/" >Home</NavLink>
                <NavLink className="btn-red" to="/Contact" >Contact</NavLink>
            </nav>
        </div>
    );
};
export default Navbar;
