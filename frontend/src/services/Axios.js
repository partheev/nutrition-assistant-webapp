import axios from 'axios';

const instance = axios.create({
    baseURL:
        'https://nutricheck-backend-partheev-dev.apps.sandbox.x8i5.p1.openshiftapps.com/api',
    // 'http://localhost:5000/api',
});
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token') || '';
    config.headers['Authorization'] = `Bearer ${token}`;
    return config;
});

export const Axios = instance;
