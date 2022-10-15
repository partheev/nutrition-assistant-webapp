import { Box } from '@mui/material';
import { Container } from '@mui/system';
import { useSnackbar } from 'notistack';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';
import { API } from '../../services/apis';
import { googleOauthPopup } from '../../services/firebase';
import '../../styles/auth.modules.css';

const Signup = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const {
        fetchTodaysConsumption,
        setmaxCalories,
        fetchWeekData,
        setuserInfo,
    } = useContext(AppContext);
    const [state, setstate] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [isLoading, setisLoading] = useState(false);
    const handleGoogleOauth = async () => {
        setisLoading(true);
        try {
            const accessToken = await googleOauthPopup();
            const res = await API.signInWithGoogle({ accessToken });
            localStorage.setItem('token', res.token);
            localStorage.setItem('userInfo', JSON.stringify(res.user));

            if (res.user.IS_LOGIN_PROCESS_COMPLETE) {
                setmaxCalories(res.maxCalories);

                setuserInfo(res.user);
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

    const handleSignUp = async () => {
        if (
            state.email.trim() &&
            state.password.trim() &&
            state.username.trim()
        ) {
            enqueueSnackbar('Please fill all details', {
                variant: 'error',
            });
            return;
        }
        if (state.password !== state.confirmPassword) {
            enqueueSnackbar("Passwords doesn't match", {
                variant: 'error',
            });
            return;
        }
        setisLoading(true);
        try {
            const res = await API.signup({
                email: state.email,
                password: state.password,
                username: state.username,
            });
            localStorage.setItem('token', res.token);
            navigate('/userInitialForm');
        } catch (err) {
            if (err?.response?.data?.msg)
                enqueueSnackbar(err?.response?.data?.msg, {
                    variant: 'error',
                });
            else {
                enqueueSnackbar('Something went wrong', {
                    variant: 'error',
                });
            }
        }
        setisLoading(false);
    };
    return (
        <div
            style={{
                background:
                    'linear-gradient(45deg, rgba(244,235,215,1) 50%, rgba(241,181,113,1) 50%)',

                minHeight: '110vh',
            }}
        >
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
                    <h1 align='center'>Sign Up</h1>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        <form>
                            <label className='label'>User Name</label>
                            <input
                                value={state.username}
                                onChange={(e) =>
                                    setstate({
                                        ...state,
                                        username: e.target.value,
                                    })
                                }
                                placeholder='Username'
                                className='textField'
                                type='text'
                            ></input>
                            <label className='label'>Email</label>
                            <input
                                placeholder='Email'
                                className='textField'
                                type='email'
                                value={state.email}
                                onChange={(e) =>
                                    setstate({
                                        ...state,
                                        email: e.target.value,
                                    })
                                }
                            ></input>
                            <label placeholder='password' className='label'>
                                Password
                            </label>
                            <input
                                value={state.password}
                                onChange={(e) =>
                                    setstate({
                                        ...state,
                                        password: e.target.value,
                                    })
                                }
                                className='textField'
                                type='password'
                            ></input>
                            <label className='label'>Confirm Password</label>
                            <input
                                value={state.confirmPassword}
                                onChange={(e) =>
                                    setstate({
                                        ...state,
                                        confirmPassword: e.target.value,
                                    })
                                }
                                className='textField'
                                type='password'
                            ></input>
                        </form>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <button
                                onClick={handleSignUp}
                                disabled={isLoading}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: '12px 24px',
                                    borderRadius: '6px',
                                    fontSize: '20px',
                                    backgroundColor: 'var(--themecolor)',
                                    color: '#fff',
                                    border: '1px solid var(--themecolor)',
                                    marginTop: '20px',
                                }}
                                className='btn'
                                type='submit'
                            >
                                <span> Register</span>
                            </button>
                        </div>
                        <button
                            disabled={isLoading}
                            style={{
                                color: 'var(--themecolor)',
                                marginTop: '14px',

                                background: '#fff',
                                border: '1px solid #fff',
                            }}
                            onClick={(e) => {
                                navigate('/signin');
                            }}
                        >
                            Already have an account? sign in{' '}
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
    );
};

export default Signup;
