import { Outlet } from 'react-router-dom';
import NavBar from "../../components/NavBar";
import Footer from "../Footer";


export default function FootlessLayout() {

    return (
        <div>
            <NavBar />
            <Outlet />
        </div>
    );
}
