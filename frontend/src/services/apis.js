import { Axios } from './Axios';

const login = async ({ email, password }) => {
    return (
        await Axios.post('/auth/login', {
            email,
            password,
        })
    ).data;
};

const signup = async ({ email, password, username }) => {
    return (
        await Axios.post('/auth/signup', {
            email,
            password,
            username,
        })
    ).data;
};

const captureFood = async ({ foodImage }) => {
    const form = new FormData();
    form.append('foodImage', foodImage);
    return (await Axios.post('/food/capture-food', form)).data;
};

const signInWithGoogle = async ({ accessToken }) => {
    return (
        await Axios.post('/auth/google-oauth', {
            accessToken,
        })
    ).data;
};

export const API = {
    login,
    signup,
    captureFood,
    signInWithGoogle,
};
