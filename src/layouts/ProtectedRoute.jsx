import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../api/Axios'

export default function ProtectedRoute() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            toast.error("Please login first!");
            navigate('/');
            return;
        }

        api.get('/users/me', {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .catch((err) => {
                console.log(err.data);
                toast.error("Token is fake or expired!");
                localStorage.removeItem('token') || sessionStorage.removeItem('token');
                navigate('/login');
            });
    }, [navigate, token]);

    return token ? <Outlet /> : null;
}
