import {NavLink} from "react-router-dom";
import favicon from "../assets/favicon.png";

export default function Footer(){
    return (
        <div className="footer flex flex-col w-full">
            <div className="flex flex-col py-10 px-4">
                <nav className="flex flex-row font-sans text-lg text-white">
                    <NavLink to="/">home</NavLink>
                </nav>
                <div className="footer_bottom flex flex-row justify-between items-center">
                    <div className="rights_container flex flex-row items-center">
                        <img className="h-10 px-1" src={favicon} alt="logo" />
                        <p>© 2022. All rights reserved.</p>
                    </div>
                    <p>Designed and developed by <a href="https://www.linkedin.com/in/bill-colak/" target="_blank" rel="noreferrer">Bill Colak</a></p>
                </div>
            </div>
        </div>
    )
};
