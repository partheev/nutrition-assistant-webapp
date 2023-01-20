import { Axios } from './Axios';

const login = async ({ email, password }) => {
    return (
        await Axios.post('/auth/login', {
            email,
            password,
        })
    ).data;
};

const userInfo = async () => (await Axios.get('/auth/me')).data;

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

const userAdditionInfo = async ({ height, weight, age, gender, activity }) => {
    return (
        await Axios.post('/auth/user-info', {
            weight,
            height,
            age,
            gender,
            activity,
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

const consumptionOn = async (date) => {
    return (
        await Axios.post(
            '/food/consumption-on',
            {
                consumed_on: date,
            },
            {
                timeout: 5000,
            }
        )
    ).data;
};
export const API = {
    userInfo,
    login,
    signup,
    userAdditionInfo,
    captureFood,
    foodNutritionDetails,
    signInWithGoogle,
    intakeFood,
    todaysConsumption,
    lastWeekCalorieDetails,
    consumptionOn,
};
