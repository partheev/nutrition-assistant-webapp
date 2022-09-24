import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import { Box } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState } from 'react';
import '../../styles/auth.modules.css';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

const UserInitialForm = () => {
    const navigate = useNavigate();

    const [state, setstate] = useState({
        age: '',
        gender: 'female',
        weight: '',
        height: '',
        exercise: '',
    });
    const handleLogout = () => {
        localStorage.removeItem('token', '');
        localStorage.removeItem('userInfo', '');
        navigate('/');
    };
    return (
        <div
            style={{
                background:
                    'linear-gradient(45deg, rgba(244,235,215,1) 50%, rgba(241,181,113,1) 50%)',

                height: '100vh',
            }}
        >
            <div>
                <button
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        float: 'right',
                        background: 'var(--onOrange)',
                        color: 'var(--themecolor)',
                        padding: '10px 15px',
                        fontSize: '20px',
                        margin: '20px 10px 0 0',
                        border: '1px solid var(--onOrange)',
                        borderRadius: '8px',
                    }}
                    onClick={handleLogout}
                >
                    <span style={{ marginRight: '10px' }}>Logout</span>{' '}
                    <LogoutIcon />
                </button>
                <h1 style={{ marginTop: 0, padding: '20px 0 0 20px' }}>
                    Brand
                </h1>
                <Container maxWidth='sm'>
                    <Box
                        sx={{
                            mt: '2rem',
                            mx: '1rem',
                            p: '1rem',
                            backgroundColor: '#fff',
                            borderRadius: '8px',
                            boxShadow:
                                '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                        }}
                    >
                        <h1 align='center'>Just one last step</h1>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                flexDirection: 'column',
                            }}
                        >
                            <form>
                                <label className='label'>Age</label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        value={state.age}
                                        onChange={(e) =>
                                            setstate({
                                                ...state,
                                                age: e.target.value,
                                            })
                                        }
                                        style={{
                                            width: '100%',
                                            paddingRight: '35px',
                                        }}
                                        placeholder='eg. 25'
                                        className='textField'
                                        type='number'
                                    ></input>
                                    <span
                                        style={{
                                            position: 'absolute',
                                            right: '10px',
                                            top: '12px',
                                        }}
                                    >
                                        Yrs
                                    </span>
                                </div>
                                <FormControl>
                                    <label className='label'>Gender</label>
                                    <RadioGroup
                                        value={state.gender}
                                        onChange={(e) =>
                                            setstate({
                                                ...state,
                                                gender: e.target.value,
                                            })
                                        }
                                        row
                                        aria-labelledby='demo-row-radio-buttons-group-label'
                                        name='row-radio-buttons-group'
                                    >
                                        <FormControlLabel
                                            value='female'
                                            control={
                                                <Radio
                                                    sx={{
                                                        color: 'var(--themecolor)',
                                                        '&.Mui-checked': {
                                                            color: 'var(--themecolor)',
                                                        },
                                                    }}
                                                />
                                            }
                                            label='Female'
                                        />
                                        <FormControlLabel
                                            value='male'
                                            control={
                                                <Radio
                                                    sx={{
                                                        color: 'var(--themecolor)',
                                                        '&.Mui-checked': {
                                                            color: 'var(--themecolor)',
                                                        },
                                                    }}
                                                />
                                            }
                                            label='Male'
                                        />
                                        <FormControlLabel
                                            value='other'
                                            control={
                                                <Radio
                                                    sx={{
                                                        color: 'var(--themecolor)',
                                                        '&.Mui-checked': {
                                                            color: 'var(--themecolor)',
                                                        },
                                                    }}
                                                />
                                            }
                                            label='Other'
                                        />
                                    </RadioGroup>
                                </FormControl>
                                <label
                                    style={{ display: 'block' }}
                                    className='label'
                                >
                                    Weight
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        value={state.weight}
                                        onChange={(e) =>
                                            setstate({
                                                ...state,
                                                weight: e.target.value,
                                            })
                                        }
                                        style={{ paddingRight: '35px' }}
                                        placeholder='eg. 60'
                                        className='textField'
                                        type='number'
                                    ></input>
                                    <span
                                        style={{
                                            position: 'absolute',
                                            right: '10px',
                                            top: '12px',
                                        }}
                                    >
                                        KG
                                    </span>
                                </div>
                                <label className='label'>Height</label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        value={state.height}
                                        onChange={(e) =>
                                            setstate({
                                                ...state,
                                                height: e.target.value,
                                            })
                                        }
                                        style={{ paddingRight: '35px' }}
                                        placeholder='eg. 5.8'
                                        className='textField'
                                        type='number'
                                    ></input>
                                    <span
                                        style={{
                                            position: 'absolute',
                                            right: '10px',
                                            top: '12px',
                                        }}
                                    >
                                        cm
                                    </span>
                                </div>
                                <select
                                    value={state.exercise}
                                    onChange={(e) =>
                                        setstate({
                                            ...state,
                                            exercise: e.target.value,
                                        })
                                    }
                                    className='textField'
                                    style={{ marginTop: '20px' }}
                                >
                                    <option>Little or No Exercise</option>
                                    <option>
                                        Light : Exercise 1 to 3 days a week
                                    </option>
                                    <option>
                                        Moderate : Exercise 4 to 5 times a week
                                    </option>
                                    <option>Active : Daily Exercise</option>
                                    <option>
                                        Very Active : Intense Exercise Daily
                                    </option>
                                </select>
                            </form>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <button
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        columnGap: '1rem',
                                        padding: '12px 24px',
                                        borderRadius: '6px',
                                        fontSize: '20px',
                                        color: 'white',
                                        background: 'var(--themecolor)',
                                        border: '1px solid var(--themecolor)',
                                        marginTop: '20px',
                                    }}
                                    className='btn'
                                    type='submit'
                                >
                                    <span>Complete</span>
                                    <ArrowForwardIos />
                                </button>
                            </div>
                        </div>
                    </Box>
                </Container>
            </div>
        </div>
    );
};

export default UserInitialForm;