import React, { useRef } from 'react';
import styles from '../styles/dashboard.module.css';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FeedIcon from '@mui/icons-material/Feed';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Axios } from '../services/Axios';
import { API } from '../services/apis';
const SCREENS = {
    DASHBOARD: 'DASHBOARD',
    PROFILE: 'PROFILE',
    CAPTURE: 'CAPTURE',
    REPORTS: 'REPORTS',
    BLOGS: 'BLOGS',
};
const BottomNavBar = () => {
    const navigate = useNavigate();
    const imgCaptureRef = useRef(null);
    const [currentScreen, setcurrentScreen] = useState(SCREENS.DASHBOARD);
    const handleChangeScreen = (screen) => {
        setcurrentScreen(screen);
    };

    const handleSelectImage = async (foodImage) => {
        try {
            const res = await API.captureFood({ foodImage });
            navigate('/foodScan', {
                state: {
                    image_url: res.image_url,
                    foodItems: res.foodItems,
                },
            });
        } catch (err) {
            navigate('/');
        }
    };
    return (
        <div>
            <div className={styles.container}>
                <div className={styles.navigation}>
                    <ul>
                        <li
                            className={
                                currentScreen === SCREENS.DASHBOARD
                                    ? styles.active
                                    : ''
                            }
                            onClick={() =>
                                handleChangeScreen(SCREENS.DASHBOARD)
                            }
                        >
                            <Link to='/dashboard'>
                                <span className={styles.icon}>
                                    <HomeIcon fontSize='large' />
                                </span>
                                <span className={styles.text}>Home</span>
                            </Link>
                        </li>

                        <li
                            className={
                                currentScreen === SCREENS.REPORTS
                                    ? styles.active
                                    : ''
                            }
                            onClick={() => handleChangeScreen(SCREENS.REPORTS)}
                        >
                            <Link to='/reports'>
                                <span className={styles.icon}>
                                    <CalendarMonthIcon fontSize='large' />
                                </span>
                                <span className={styles.text}>Diet</span>
                            </Link>
                        </li>
                        <li
                            className={
                                currentScreen === SCREENS.CAPTURE
                                    ? styles.active
                                    : ''
                            }
                            onClick={() => {
                                handleChangeScreen(SCREENS.CAPTURE);
                                imgCaptureRef.current.click();
                            }}
                        >
                            <input
                                type='file'
                                accept='image/*'
                                ref={imgCaptureRef}
                                style={{ display: 'none' }}
                                onChange={(e) => {
                                    if (e.target.files.length > 0)
                                        handleSelectImage(e.target.files[0]);
                                    else navigate('/dashboard');
                                }}
                            />

                            <Link to='#'>
                                <span className={styles.icon}>
                                    <CameraAltIcon fontSize='large' />
                                </span>
                                <span className={styles.text}>capture</span>
                            </Link>
                        </li>
                        <li
                            className={
                                currentScreen === SCREENS.BLOGS
                                    ? styles.active
                                    : ''
                            }
                            onClick={() => handleChangeScreen(SCREENS.BLOGS)}
                        >
                            <Link to='/reports'>
                                <span className={styles.icon}>
                                    <FeedIcon fontSize='large' />
                                </span>
                                <span className={styles.text}>recommended</span>
                            </Link>
                        </li>
                        <li
                            className={
                                currentScreen === SCREENS.PROFILE
                                    ? styles.active
                                    : ''
                            }
                            onClick={() => handleChangeScreen(SCREENS.PROFILE)}
                        >
                            <Link to='/profile'>
                                <span className={styles.icon}>
                                    <PersonIcon fontSize='large' />
                                </span>
                                <span className={styles.text}>Profile</span>
                            </Link>
                        </li>
                        <div className={styles.indicator}></div>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BottomNavBar;
