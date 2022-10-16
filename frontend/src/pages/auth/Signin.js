import { Box } from '@mui/material';
import { Container } from '@mui/system';
import { useSnackbar } from 'notistack';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';
import { API } from '../../services/apis';
import { googleOauthPopup } from '../../services/firebase';
import '../../styles/auth.modules.css';

const Signin = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const {
        fetchTodaysConsumption,
        setmaxCalories,
        fetchWeekData,
        setuserInfo,
    } = useContext(AppContext);
    const [state, setstate] = useState({
        email: '',
        password: '',
    });

    const [isLoading, setisLoading] = useState(false);
    const handleSignIn = async () => {
        if (state.email.trim() === '' || state.password.trim() === '') {
            enqueueSnackbar('Please fill all details', { variant: 'error' });
            return;
        }
        setisLoading(true);
        try {
            const res = await API.login({
                email: state.email,
                password: state.password,
            });
            localStorage.setItem('token', res.token);
            localStorage.setItem('userInfo', JSON.stringify(res.user));
            if (res.user.IS_LOGIN_PROCESS_COMPLETE) {
                setuserInfo(res.user);
                setmaxCalories(res.maxCalories);
                navigate('/dashboard');
                fetchTodaysConsumption();
                fetchWeekData();
            } else {
                navigate('/userInfoForm');
            }
        } catch (err) {
            enqueueSnackbar(err.response.data.msg, {
                variant: 'error',
            });
        }
        setisLoading(false);
    };

    const handleGoogleOauth = async () => {
        setisLoading(true);
        try {
            const accessToken = await googleOauthPopup();
            const res = await API.signInWithGoogle({ accessToken });
            localStorage.setItem('token', res.token);
            localStorage.setItem('userInfo', JSON.stringify(res.user));

            if (res.user.IS_LOGIN_PROCESS_COMPLETE) {
                setuserInfo(res.user);
                setmaxCalories(res.maxCalories);
                navigate('/dashboard');
                fetchTodaysConsumption();
                fetchWeekData();
            } else {
                navigate('/userInitialForm');
            }
        } catch (err) {
            enqueueSnackbar('Something went wrong', { variant: 'error' });
        }
        setisLoading(false);
    };
    return (
        <div
            style={{
                background:
                    'linear-gradient(45deg, rgba(244,235,215,1) 50%, rgba(241,181,113,1) 50%)',
                minHeight: '100vh',
            }}
        >
            <div>
                <img
                    style={{ width: '4rem', padding: '6px 0 0 6px' }}
                    src='/static/img/logo_crop.png'
                    alt=''
                />
                <Container maxWidth='sm' style={{ marginTop: '10px' }}>
                    <Box
                        sx={{
                            mx: '1rem',
                            p: '1rem',
                            backgroundColor: '#fff',
                            borderRadius: '8px',
                            boxShadow:
                                '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                        }}
                    >
                        <h1 align='center'>Sign In</h1>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                flexDirection: 'column',
                            }}
                        >
                            <form>
                                <label className='label'>Email</label>
                                <input
                                    value={state.email}
                                    onChange={(e) =>
                                        setstate((prevState) => ({
                                            ...prevState,
                                            email: e.target.value,
                                        }))
                                    }
                                    placeholder='myMail@mail.com'
                                    className='textField'
                                    type='email'
                                ></input>
                                <label placeholder='password' className='label'>
                                    Password
                                </label>
                                <input
                                    onChange={(e) =>
                                        setstate((prevState) => ({
                                            ...prevState,
                                            password: e.target.value,
                                        }))
                                    }
                                    value={state.password}
                                    className='textField'
                                    type='password'
                                ></input>
                            </form>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <button
                                    disabled={isLoading}
                                    onClick={handleSignIn}
                                    style={{
                                        borderRadius: '6px',
                                        fontSize: '20px',
                                        padding: '12px 24px',
                                        background: 'var(--themecolor)',
                                        border: '1px solid var(--themecolor)',
                                        color: '#fff',
                                        marginTop: '20px',
                                    }}
                                    className='btn'
                                    type='submit'
                                >
                                    Sign In
                                </button>
                            </div>
                            <button
                                disabled={isLoading}
                                style={{
                                    color: 'var(--themecolor)',
                                    marginTop: '20px',
                                    background: '#fff',
                                    border: '1px solid #fff',
                                }}
                                onClick={(e) => {
                                    navigate('/signup');
                                }}
                            >
                                Dont have an account? sign up{' '}
                            </button>
                        </div>
                        <hr style={{ marginTop: '15px' }} />
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <button
                                disabled={isLoading}
                                onClick={handleGoogleOauth}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    fontSize: '20px',
                                    padding: '10px 18px',
                                    border: '0px solid black',
                                    borderRadius: '5px',
                                    margin: '10px 0',

                                    background: '#fff',
                                    boxShadow:
                                        '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                                }}
                            >
                                <img
                                    style={{
                                        width: '24px',
                                        margin: '3px 10px 0 0',
                                    }}
                                    src='/static/img/google_icon.png'
                                    alt='google icon'
                                ></img>
                                <span> Login with Google</span>
                            </button>
                        </div>
                    </Box>
                </Container>
            </div>
        </div>
    );
};

export default Signin;
