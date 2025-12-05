import { Outlet, useNavigate, } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useEffect } from "react";

export default function Mainlayout() {
    const navigate = useNavigate();
    useEffect(() => {
        const hasLogged = localStorage.getItem('hasLogged') || sessionStorage.getItem('hasLogged');
        if (hasLogged != 'true') {
            navigate('/login');
        }
    }, [navigate]);
    return (
        <div className='mx-4 sm:mx-[10%]'>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}
