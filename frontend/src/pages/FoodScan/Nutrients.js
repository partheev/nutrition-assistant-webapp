import React, { useState } from 'react';
import Divider from '@mui/material/Divider';
import NoMealsIcon from '@mui/icons-material/NoMeals';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Alert from '@mui/material/Alert';
import { Box, Container } from '@mui/material';

const Nutrients = (props) => {
    const navigate = useNavigate();
    const [calories, setcalories] = useState(900);
    return (
        <div style={{ paddingBottom: '5rem' }}>
            <button
                style={{
                    display: 'inline-block',
                    background: '#fff',
                    border: '0',
                    margin: '10px 0 0 10px',
                }}
                onClick={(e) => {
                    props.setscreen(false);
                }}
            >
                {' '}
                <KeyboardBackspaceIcon sx={{ fontSize: '35px' }} />
            </button>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <img
                    style={{
                        objectFit: 'cover',
                        display: 'block',
                        margin: '0 0.5rem',
                        borderRadius: '5px',
                        width: '90%',
                        height: '20rem',
                    }}
                    src={props.img.url}
                    alt=''
                ></img>
            </Box>
            <div
                style={{
                    width: '9rem',
                    height: '9rem',
                    background: '#F1A661',
                    borderRadius: '100%',
                    boxShadow:
                        '0 4px 4px 0 rgba(0, 0, 0, 0.1), 0 6px 10px 0 rgba(0, 0, 0, 0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '10px auto',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <div
                        style={{
                            fontWeight: 800,
                            fontSize: '2.2rem',
                            color: 'var(--onOrange)',
                        }}
                    >
                        120
                    </div>
                    <span
                        style={{ fontSize: '18px', color: 'var(--onOrange)' }}
                    >
                        calories
                    </span>
                </div>
            </div>
            <div style={{ width: '85%', margin: '10px auto' }}>
                {calories < 400 ? (
                    <Alert variant='outlined' severity='warning'>
                        Insufficient calories. Consume more
                    </Alert>
                ) : calories >= 400 && calories <= 600 ? (
                    <Alert variant='outlined' severity='success'>
                        sufficient calories. Enjoy your meal
                    </Alert>
                ) : (
                    <Alert variant='outlined' severity='error'>
                        Excess calories. Avoid Consuming more
                    </Alert>
                )}
            </div>

            <div style={{}}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        margin: '0 1.5rem',
                    }}
                >
                    <h4>Carbohydrates</h4>
                    <span>120g</span>
                </div>
                <Divider />
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        margin: '0 1.5rem',
                    }}
                >
                    <h4>Fats</h4>
                    <span>90g</span>
                </div>
                <Divider />
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        margin: '0 1.5rem',
                    }}
                >
                    <h4>Protien</h4>
                    <span>200g</span>
                </div>
                <Divider />
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        margin: '0 1.5rem',
                    }}
                >
                    <h4>Fiber</h4>
                    <span>90g</span>
                </div>
                <Divider />
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        margin: '0 1.5rem',
                    }}
                >
                    <h4>Cholestral</h4>
                    <span>20g</span>
                </div>
                <Divider />
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        margin: '0 1.5rem',
                    }}
                >
                    <h4>Iron</h4>
                    <span>90g</span>
                </div>
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    position: 'fixed',
                    bottom: 0,
                    background: '#fff',
                    width: '100%',
                }}
            >
                <button
                    style={{
                        borderRadius: '6px',
                        fontSize: '20px',
                        padding: '12px 24px',
                        background: 'var(--onOrange)',
                        border: '1px solid var(--themecolor)',
                        margin: '20px 0',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <NoMealsIcon />
                    <span style={{ marginLeft: '8px' }}>Cancel</span>
                </button>
                <button
                    style={{
                        borderRadius: '6px',
                        fontSize: '20px',
                        padding: '12px 24px',
                        background: 'var(--themecolor)',
                        border: '1px solid var(--themecolor)',
                        color: '#fff',
                        margin: '20px 0',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <RestaurantIcon />{' '}
                    <span style={{ marginLeft: '8px' }}>Intake</span>
                </button>
            </div>
        </div>
    );
};

export default Nutrients;
