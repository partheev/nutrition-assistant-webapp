import axios from 'axios';

const instance = axios.create({
    baseURL:
        'https://nutri-backend-keshava369-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/api',
    // 'http://localhost:5000/api',
});
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token') || '';
    config.headers['Authorization'] = `Bearer ${token}`;
    return config;
});

export const Axios = instance;
