import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/auth/Signup';
import Signin from './pages/auth/Signin';
import Blogs from './pages/Blogs/Blogs';
import Blog01 from './pages/Blogs/Blog01';
import Blog02 from './pages/Blogs/Blog02';
import Reports from './pages/Reports';
import Nutrients from './pages/FoodScan/Nutrients';
import { useEffect, useState } from 'react';
import Dashboard from './pages/Dashboard';
import BottomNavBar from './Components/BottomNavBar';
import FoodScan from './pages/FoodScan';
import UserInitialForm from './pages/UserInitialForm';
import { useSnackbar } from 'notistack';
import { API } from './services/apis';
import Profile from './pages/profile/Profile';

const bottomNavbarPaths = ['/dashboard', '/reports', '/blogs', '/profile'];
function App() {
    // const navigate = useNavigate();
    // const location = useLocation();
    // const { enqueueSnackbar } = useSnackbar();

    // // GLOBAL APP STATE
    // const [weekData, setweekData] = useState([]);

    // const fetchWeekData = async () => {
    //     try {
    //         const res = await API.lastWeekCalorieDetails();
    //         setweekData(res.weekData);
    //     } catch (err) {
    //         if (err?.response?.data?.msg) {
    //             enqueueSnackbar(err?.response?.data?.msg, {
    //                 variant: 'error',
    //             });
    //         } else {
    //             enqueueSnackbar('Something went wrong', {
    //                 variant: 'error',
    //             });
    //         }
    //     }
    // };

    // useEffect(() => {
    //     fetchWeekData();
    // }, []);

    // useEffect(() => {
    //     try {
    //         const token = localStorage.getItem('token');
    //         const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    //         if (token) {
    //             if (userInfo?.IS_LOGIN_PROCESS_COMPLETE) navigate('/dashboard');
    //             else navigate('/userInitialForm');
    //         } else {
    //             navigate('/');
    //         }
    //     } catch (err) {
    //         navigate('/');
    //     }
    // }, []);

    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/signin' element={<Signin />} />
                <Route path='/blogs' element={<Blogs />} />
                <Route path='/blog/healthyliving' element={<Blog01 />} />
                <Route path='/blog/dailydiet' element={<Blog02 />} />
                <Route path='/userInitialForm' element={<UserInitialForm />} />
                <Route path='/dashboard' element={<Dashboard />} />
                {/* <Route
                    path='/reports'
                    element={<Reports weekData={weekData} />}
                /> */}
                <Route path='/profile' element={<Profile />} />
                <Route path='/foodScan' element={<FoodScan />} />
                <Route path='/nutrients' element={<Nutrients />} />
            </Routes>
            {/* {bottomNavbarPaths.includes(location.pathname) && <BottomNavBar />} */}
        </>
    );
}

export default App;
