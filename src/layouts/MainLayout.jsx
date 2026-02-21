import { Outlet, } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MainLayout() {
    return (
        <div className='mx-4 sm:mx-[10%] lg:px-[10%]'>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
};