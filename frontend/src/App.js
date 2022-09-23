import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/auth/Signup';
import Signin from './pages/auth/Signin';
import Blogs from './pages/Blogs/Blogs';
import Blog01 from './pages/Blogs/Blog01';
import Reports from './pages/Reports';
import Nutrients from './pages/FoodScan/Nutrients';
import { useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import BottomNavBar from './Components/BottomNavBar';
import FoodScan from './pages/FoodScan';
import UserInitialForm from './pages/UserInitialForm';
import Profile from './pages/profile/Profile';
const bottomNavbarPaths = ['/dashboard', '/reports'];
function App() {
    const navigate = useNavigate();
    const location = useLocation();
    // useEffect(() => {
    //     try {
    //         const token = localStorage.getItem('token');
    //         const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    //         if (token && userInfo) {
    //             if (userInfo.IS_LOGIN_PROCESS_COMPLETE) navigate('/dashboard');
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
                <Route path='/blog' element={<Blogs />} />
                <Route path='/blog/healthyliving' element={<Blog01 />} />
                <Route path='/userInitialForm' element={<UserInitialForm />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/reports' element={<Reports />} />
                <Route path='/foodScan' element={<FoodScan />} />
                <Route path='/nutrients' element={<Nutrients />} />
            </Routes>
            {bottomNavbarPaths.includes(location.pathname) && <BottomNavBar />}
        </>
    );
}

export default App;
