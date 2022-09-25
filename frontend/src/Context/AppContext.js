import { useSnackbar } from 'notistack';
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FullPageLoading } from '../Components/LoadingSpinner';
import { API } from '../services/apis';

export const AppContext = createContext({
    weekData: [],
    fetchWeekData: () => {},
    fetchTodaysConsumption: () => {},
    nutrients: {},
    setnutrients: () => {},
    todayFoodItems: [],
    userInfo: {},
    maxCalories: Number(),
    setmaxCalories: () => {},
    setuserInfo: () => {},
    handleLogout: () => {},
});

export const AppContextProvider = ({ children }) => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const [isLoading, setisLoading] = useState(false);

    const [userInfo, setuserInfo] = useState({});
    const [weekData, setweekData] = useState([]);
    const [todayFoodItems, settodayFoodItems] = useState([]);
    const [maxCalories, setmaxCalories] = useState(2000);
    const [nutrients, setnutrients] = useState({
        protiens: 0,
        calcium: 0,
        calorie: 0,
        carbs: 0,
        fats: 0,
        maxprotiens: 165,
        maxcalcium: 2000,
        maxcarbs: 225,
        maxfats: 97,
    });

    const fetchWeekData = async () => {
        try {
            const res = await API.lastWeekCalorieDetails();
            setweekData(res.weekData);
        } catch (err) {
            if (err?.response?.data?.msg) {
                enqueueSnackbar(err?.response?.data?.msg, {
                    variant: 'error',
                });
            } else {
                enqueueSnackbar('Something went wrong', {
                    variant: 'error',
                });
            }
        }
    };

    const fetchTodaysConsumption = async () => {
        setisLoading(true);
        try {
            const res = await API.todaysConsumption();
            const tot_nutris = res.total_nutrients;
            settodayFoodItems(res.food_items);

            setnutrients((prevState) => ({
                ...prevState,
                calorie: Number(tot_nutris.CALORIE.toFixed(2)),
                protiens: Number(tot_nutris.PROTEINS).toFixed(2),
                calcium: Number(tot_nutris.CALCIUM.toFixed(2)),
                carbs: Number(tot_nutris.CARBOHYDRATES.toFixed(2)),
                fats: Number(tot_nutris.FAT.toFixed(2)),
            }));
        } catch (err) {
            console.log(err);
            if (err?.response?.data?.msg)
                enqueueSnackbar(err?.response?.data?.msg, { variant: 'error' });
            else enqueueSnackbar('Something went wrrong', { variant: 'error' });
        }
        setisLoading(false);
    };

    const fetchUserInfo = async () => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                setisLoading(true);
                const { userInfo, maxCalories } = await API.userInfo();
                if (userInfo?.IS_LOGIN_PROCESS_COMPLETE) {
                    setuserInfo(userInfo);
                    setmaxCalories(maxCalories);
                    navigate('/dashboard');
                    setisLoading(false);
                    return true;
                } else {
                    navigate('/userInitialForm');
                }
            } else {
                navigate('/');
            }
        } catch (err) {
            navigate('/');
        }
        setisLoading(false);
        return false;
    };

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('token');
        navigate('/');
        setuserInfo({});
    };

    useEffect(() => {
        async function exec() {
            if (await fetchUserInfo()) {
                fetchTodaysConsumption();
                fetchWeekData();
            }
        }
        exec();
    }, []);

    return (
        <AppContext.Provider
            value={{
                weekData,
                fetchWeekData,
                nutrients,
                fetchTodaysConsumption,
                setnutrients,
                todayFoodItems,
                userInfo,
                setuserInfo,
                setmaxCalories,
                maxCalories,
                handleLogout,
            }}
        >
            <FullPageLoading isLoading={isLoading} />
            {children}
        </AppContext.Provider>
    );
};
