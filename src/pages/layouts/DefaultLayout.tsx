import { Outlet } from 'react-router-dom';
import NavBar from "../../components/NavBar";
import Footer from "../Footer";


export default function DefaultLayout() {
    return (
        <div  >
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    );
}
