import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Auth/Signup';
import Signin from './pages/Auth/Signin';
import Blogs from './pages/Blogs/Blogs';
import Blog01 from './pages/Blogs/Blog01';
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
import Blog02 from './pages/Blogs/Blog02';

const bottomNavbarPaths = [
    '/dashboard',
    '/reports',
    '/blogs',
    '/profile',
    '/blog/healthyliving',
    '/blog/diet',
];
function App() {
    const navigate = useNavigate();
    const location = useLocation();
    const { enqueueSnackbar } = useSnackbar();

    // GLOBAL APP STATE

    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/signin' element={<Signin />} />
                <Route path='/blogs' element={<Blogs />} />
                <Route path='/blog/healthyliving' element={<Blog01 />} />
                <Route path='/blog/diet' element={<Blog02 />} />

                <Route path='/userInitialForm' element={<UserInitialForm />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/reports' element={<Reports />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/foodScan' element={<FoodScan />} />
                <Route path='/nutrients' element={<Nutrients />} />
            </Routes>
            {bottomNavbarPaths.includes(location.pathname) && <BottomNavBar />}
        </>
    );
}

export default App;
