import { Outlet, } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/Axios";

export default function MainLayout() {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');

        // 1. لو مفيش توكين أصلاً، ملوش لازمة نكلم السيرفر
        if (!token) {
            navigate('/login');
            return;
        }

        // 2. لو فيه توكين، نبعته للسيرفر نتأكد هو سليم ولا "مضروب"
        api.get('/users/me', {
            headers: {
                Authorization: `Bearer ${token}`, // استخدمنا الـ token الموجود فعلاً
            }
        })
            .then((res) => {
                // لو السيرفر رد بـ 200، يبقى التوكين سليم 100%
                console.log("Welcome back!", res);
            })
            .catch(() => {
                // لو السيرفر رد بـ 401 (يعني التوكين مزيف أو منتهي)
                console.error("Token is fake or expired!");
                localStorage.removeItem('token') || sessionStorage.removeItem('token'); // امسح التوكين المضروب
                navigate('/login'); // اطرده لصفحة الدخول
            });
    }, [navigate]);
    return (
        <div className='mx-4 sm:mx-[10%] lg:px-[10%]'>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
};