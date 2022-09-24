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

const userAdditionInfo = async ({ height, weight, age }) => {
    return (
        await Axios.post('/auth/user-info', {
            weight,
            height,
            age,
        })
    ).data;
};
const foodNutritionDetails = async ({ food_item, image_url }) => {
    return (
        await Axios.post('/food/nutrition-details', {
            food_item,
            image_url,
        })
    ).data;
};
const intakeFood = async ({ consumed_food_id }) => {
    return (
        await Axios.post('/food/intake', {
            consumed_food_id,
        })
    ).data;
};
const todaysConsumption = async () => {
    return (await Axios.get('/food/todays-consumption')).data;
};
const lastWeekCalorieDetails = async () => {
    return (await Axios.get('/food/last-week-nutrition-details')).data;
};
export const API = {
    login,
    signup,
    userAdditionInfo,
    captureFood,
    foodNutritionDetails,
    signInWithGoogle,
    intakeFood,
    todaysConsumption,
    lastWeekCalorieDetails,
};
