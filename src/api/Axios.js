// src/api/axios.js
import axios from 'axios';

const api = axios.create({
    baseURL: '/api', // هذا سيجعل كل الطلبات تبدأ بـ /api تلقائياً
});

export default api;