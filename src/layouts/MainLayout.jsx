import { Outlet, } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MainLayout() {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (!token) {
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
};