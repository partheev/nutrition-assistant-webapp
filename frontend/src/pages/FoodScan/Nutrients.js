import React, { Fragment, useContext } from 'react';
import Divider from '@mui/material/Divider';
import NoMealsIcon from '@mui/icons-material/NoMeals';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Alert from '@mui/material/Alert';
import { Box } from '@mui/material';
import { API } from '../../services/apis';
import { useSnackbar } from 'notistack';
import { AppContext } from '../../Context/AppContext';

const Nutrients = ({
    setisLoading,
    image_url,
    setscreen,
    nutrientsList,
    consumedFoodId,
}) => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { fetchTodaysConsumption } = useContext(AppContext);
    const calories =
        nutrientsList.find((nutri) => nutri.title === 'Calorie')?.value || 0;

    const handleInTake = async () => {
        setisLoading(true);
        try {
            await API.intakeFood({
                consumed_food_id: consumedFoodId,
            });
            setisLoading(false);
            navigate('/dashboard');
            fetchTodaysConsumption();
        } catch (err) {
            setisLoading(false);
            if (err?.response?.data?.msg) {
                enqueueSnackbar(err.response.data.msg, { variant: 'error' });
            } else {
                enqueueSnackbar('Something went wrong', { variant: 'error' });
            }
        }
    };
    const handleCancelIntake = () => {
        navigate('/dashboard');
    };
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
                    setscreen(false);
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
                    src={image_url}
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
                        {Number(calories).toFixed(2)}
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
                        Insufficient calories. Consume more (Ignore if it's not
                        a meal)
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
                {nutrientsList
                    .filter((nutri) => nutri.title !== 'Calorie')
                    .map((nutrient, idx, arr) => {
                        return (
                            <Fragment key={nutrient.attri_id}>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        margin: '0 1.5rem',
                                    }}
                                >
                                    <h4>{nutrient.title}</h4>
                                    <span>
                                        {nutrient.value} {nutrient.units}
                                    </span>
                                </div>
                                {idx !== arr.length - 1 && <Divider />}
                            </Fragment>
                        );
                    })}
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
                    onClick={handleCancelIntake}
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
                    onClick={handleInTake}
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
