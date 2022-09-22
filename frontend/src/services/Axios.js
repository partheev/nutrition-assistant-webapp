import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    },
});

export const Axios = instance;
