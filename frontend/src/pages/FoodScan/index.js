import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import CameraswitchIcon from '@mui/icons-material/Cameraswitch';
import '../../styles/scan.module.css';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Nutrients from './Nutrients';
import { Box, Container, Divider } from '@mui/material';
import { API } from '../../services/apis';
import { useSnackbar } from 'notistack';
import { FullPageLoading } from '../../Components/LoadingSpinner';
const ScannedImg = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { state } = useLocation();
    const navigate = useNavigate();
    const [selectedItems, setselectedItems] = useState([]);
    const [screen, setscreen] = useState(false);
    const [image, setimage] = useState('');
    const [imageBlob, setimageBlob] = useState('');
    const [foodItems, setfoodItems] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const [nutrientsList, setnutrientsList] = useState([]);
    const [consumed_food_id, setconsumed_food_id] = useState('');
    const handleSelectImage = async (foodImage) => {
        try {
            const res = await API.captureFood({ foodImage });
            setimage(res.image_url);
            setimageBlob(URL.createObjectURL(foodImage));
            setfoodItems(res.foodItems);
        } catch (err) {
            enqueueSnackbar(err.response.data.msg, {
                variant: 'error',
            });
        }
    };

    const handleSelectItem = (foodItem) => {
        if (selectedItems.find((item) => item.id === foodItem.id)) {
            setselectedItems(
                selectedItems.filter((item) => item.id !== foodItem.id)
            );
        } else setselectedItems([...selectedItems, foodItem]);
    };

    const handleNext = async () => {
        setisLoading(true);
        try {
            const res = await API.foodNutritionDetails({
                image_url: image,
                food_item: selectedItems.reduce(
                    (prev, curr) => prev + curr.name + ', ',
                    ''
                ),
            });
            setscreen(true);
            console.log(res);
            setnutrientsList(res.nutrients);
            setconsumed_food_id(res.consumed_food_id);
        } catch (err) {
            enqueueSnackbar(err.response.data.msg, {
                variant: 'error',
            });
        }
        setisLoading(false);
    };

    useEffect(() => {
        if (!state.image_url || !state.foodItems || !state.imageBlob)
            navigate('/');
        else {
            setimage(state.image_url);
            setfoodItems(state.foodItems);
            setimageBlob(state.imageBlob);
        }
    }, []);

    return (
        <div
            maxWidth='lg'
            style={{ backgroundColor: 'var(--backgroundColor)' }}
        >
            <FullPageLoading isLoading={isLoading} />
            <Box sx={{ pb: '2rem' }}>
                {!screen ? (
                    <Container maxWidth='md'>
                        <div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    paddingTop: '1rem',
                                    margin: '0px 7px',
                                }}
                            >
                                <button
                                    style={{
                                        display: 'block',
                                        background: 'var(--backgroundColor)',
                                        border: '0',
                                    }}
                                    onClick={(e) => {
                                        navigate('/dashboard');
                                    }}
                                >
                                    {' '}
                                    <KeyboardBackspaceIcon
                                        sx={{ fontSize: '35px' }}
                                    />
                                </button>

                                <button
                                    style={{
                                        display: 'flex',
                                        border: '0',
                                        padding: '8px',
                                        background: 'var(--themecolor)',
                                        color: '#fff',
                                        margin: '3px 8px 0 0',
                                        borderRadius: '4px',
                                        alignItems: 'center',
                                    }}
                                    onClick={handleNext}
                                >
                                    {' '}
                                    <span style={{ fontSize: '16px' }}>
                                        Next
                                    </span>{' '}
                                    <ArrowForwardIos
                                        sx={{ fontSize: '16px' }}
                                    />
                                </button>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    marginTop: '1rem',
                                }}
                            >
                                <img
                                    style={{
                                        objectFit: 'cover',
                                        width: '94%',
                                        height: '35vh',
                                        borderRadius: '8px',
                                    }}
                                    src={imageBlob}
                                    alt=''
                                ></img>
                            </div>

                            <div style={{ display: 'inline' }}>
                                <input
                                    type='file'
                                    accept='image/*'
                                    capture='environment'
                                    id='img'
                                    style={{ display: 'none' }}
                                    onChange={(e) => {
                                        if (e.target.files)
                                            handleSelectImage(
                                                e.target.files[0]
                                            );
                                    }}
                                />
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        marginRight: '6px',
                                    }}
                                >
                                    <label
                                        htmlFor='img'
                                        style={{
                                            padding: '8px',
                                            background: 'var(--themecolor)',
                                            color: '#fff',
                                            width: '6.8rem',
                                            margin: '10px 8px 0 0',
                                            borderRadius: '5px',
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <CameraswitchIcon />{' '}
                                        <span style={{ marginLeft: '7px' }}>
                                            Retake
                                        </span>
                                    </label>
                                </div>
                            </div>
                            <h3 align='center' style={{ marginTop: '8px' }}>
                                Select the ingredients
                            </h3>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    margin: '20px auto 0 auto',
                                    width: '97%',
                                    height: '39vh',
                                    overflow: 'scroll',
                                    backgroundColor: '#fff',
                                    borderRadius: '8px',
                                    background: 'var(--lightOrange)',
                                    boxShadow:
                                        '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                                }}
                            >
                                <table
                                    style={{
                                        padding: '0.1rem',
                                        width: '100%',
                                    }}
                                >
                                    <tbody>
                                        {foodItems.map((item, idx, arr) => {
                                            const isSelected = Boolean(
                                                selectedItems.find(
                                                    (x) => x.id === item.id
                                                )
                                            );
                                            return (
                                                <>
                                                    <tr>
                                                        <td
                                                            style={{
                                                                position:
                                                                    'relative',
                                                            }}
                                                            onClick={() => {
                                                                handleSelectItem(
                                                                    item
                                                                );
                                                            }}
                                                        >
                                                            <span
                                                                style={{
                                                                    display:
                                                                        'inline-block',
                                                                    marginLeft:
                                                                        '16px',
                                                                }}
                                                            >
                                                                {item.name}
                                                            </span>
                                                            {isSelected ? (
                                                                <span>
                                                                    <span
                                                                        style={{
                                                                            position:
                                                                                'absolute',
                                                                            left: 0,
                                                                            marginTop:
                                                                                '4px',
                                                                        }}
                                                                    >
                                                                        <CheckCircleOutlineIcon
                                                                            sx={{
                                                                                display:
                                                                                    'inline',
                                                                                color: 'var(--themecolor)',
                                                                            }}
                                                                        />
                                                                    </span>
                                                                    <span
                                                                        style={{
                                                                            position:
                                                                                'absolute',
                                                                            right: 0,
                                                                        }}
                                                                    >
                                                                        <input
                                                                            style={{
                                                                                padding:
                                                                                    '5px',
                                                                                width: '4rem',
                                                                                background:
                                                                                    'var(--backgroundColor)',
                                                                                borderRadius:
                                                                                    '3px',
                                                                                border: '1px solid var(--backgroundColor)',
                                                                                marginRight:
                                                                                    '0.4rem',
                                                                            }}
                                                                            onClick={(
                                                                                event
                                                                            ) => {
                                                                                event.stopPropagation();
                                                                            }}
                                                                            type='number'
                                                                            defaultValue={
                                                                                50
                                                                            }
                                                                        />
                                                                        <select
                                                                            style={{
                                                                                backgroundColor:
                                                                                    'var(--lightOrange)',
                                                                                border: '1px solid var(--lightOrange)',
                                                                            }}
                                                                            onClick={(
                                                                                event
                                                                            ) => {
                                                                                event.stopPropagation();
                                                                            }}
                                                                        >
                                                                            <option
                                                                                style={{
                                                                                    backgroundColor:
                                                                                        'var(--backgroundColor)',
                                                                                }}
                                                                            >
                                                                                gm
                                                                            </option>
                                                                            <option
                                                                                style={{
                                                                                    backgroundColor:
                                                                                        'var(--backgroundColor)',
                                                                                }}
                                                                            >
                                                                                ounce
                                                                            </option>
                                                                            <option
                                                                                style={{
                                                                                    backgroundColor:
                                                                                        'var(--backgroundColor)',
                                                                                }}
                                                                            >
                                                                                ml
                                                                            </option>
                                                                            <option
                                                                                style={{
                                                                                    backgroundColor:
                                                                                        'var(--backgroundColor)',
                                                                                }}
                                                                            >
                                                                                pieces
                                                                            </option>
                                                                            <option
                                                                                style={{
                                                                                    backgroundColor:
                                                                                        'var(--backgroundColor)',
                                                                                }}
                                                                            >
                                                                                slices
                                                                            </option>
                                                                            <option
                                                                                style={{
                                                                                    backgroundColor:
                                                                                        'var(--backgroundColor)',
                                                                                }}
                                                                            >
                                                                                cup
                                                                            </option>
                                                                            <option
                                                                                style={{
                                                                                    backgroundColor:
                                                                                        'var(--backgroundColor)',
                                                                                }}
                                                                            >
                                                                                tbsp
                                                                            </option>
                                                                        </select>
                                                                    </span>
                                                                </span>
                                                            ) : (
                                                                ''
                                                            )}
                                                        </td>
                                                    </tr>
                                                    {idx !== arr.length - 1 && (
                                                        <Divider />
                                                    )}
                                                </>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Container>
                ) : (
                    <Nutrients
                        setisLoading={setisLoading}
                        consumedFoodId={consumed_food_id}
                        nutrientsList={nutrientsList}
                        setscreen={setscreen}
                        image_url={image}
                        imageBlob={imageBlob}
                    />
                )}
            </Box>
        </div>
    );
};

export default ScannedImg;
