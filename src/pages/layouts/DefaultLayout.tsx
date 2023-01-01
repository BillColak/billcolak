import { Outlet } from 'react-router-dom';
import NavBar from "../../components/NavBar";
import Footer from "../Footer";


export default function DefaultLayout() {
    return (
        <div className="defaultLayout v-flex w-full h-full">
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    );
}
