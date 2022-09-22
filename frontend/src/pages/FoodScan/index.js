import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import CameraswitchIcon from '@mui/icons-material/Cameraswitch';
import '../../styles/scan.module.css';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Nutrients from './Nutrients';
import { Box, Divider } from '@mui/material';
import { API } from '../../services/apis';
import { useSnackbar } from 'notistack';

const ScannedImg = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { state } = useLocation();
    const navigate = useNavigate();
    const [selectedItems, setselectedItems] = useState([]);
    const [screen, setscreen] = useState(false);
    const [image, setimage] = useState('');
    const [foodItems, setfoodItems] = useState([]);

    const handleSelectImage = async (foodImage) => {
        try {
            const res = await API.captureFood({ foodImage });
            setimage(res.image_url);
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

    useEffect(() => {
        setimage(state.image_url);
        setfoodItems(state.foodItems);
    }, []);

    return (
        <Box sx={{ pb: '2rem' }}>
            {!screen ? (
                <div
                    style={{
                        background: '',
                        margin: 0,
                        height: '100vh',
                        display: 'flex',
                        justifyContent: 'center',
                        paddingTop: '1rem',
                    }}
                >
                    <div style={{ width: '96%' }}>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                margin: '8px 0',
                            }}
                        >
                            <button
                                style={{
                                    display: 'block',
                                    background: '#fff',
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
                                    borderRadius: '5px',
                                    alignItems: 'center',
                                }}
                                onClick={(e) => {
                                    setscreen(true);
                                }}
                            >
                                {' '}
                                <span style={{ fontSize: '18px' }}>
                                    Next
                                </span>{' '}
                                <ArrowForwardIos sx={{ fontSize: '16px' }} />
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
                                    width: '98%',
                                    height: '40vh',
                                    borderRadius: '8px',
                                }}
                                src={image}
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
                                        handleSelectImage(e.target.files[0]);
                                }}
                            />
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
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
                        <h3 align='center'>Select The Items</h3>
                        <div
                            style={{
                                marginTop: '20px',
                                width: '100%',
                                height: '34vh',
                                overflow: 'scroll',
                                backgroundColor: '#fff',
                                borderRadius: '8px',
                                background: '#FFD8A9',
                                boxShadow:
                                    '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                            }}
                        >
                            <table
                                style={{
                                    margin: '0 1rem',
                                    padding: '0.5rem',
                                    width: '90%',
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
                                                        <span>{item.name}</span>
                                                        <span
                                                            style={{
                                                                position:
                                                                    'absolute',
                                                                right: 10,
                                                            }}
                                                        >
                                                            {isSelected ? (
                                                                <CheckCircleOutlineIcon
                                                                    sx={{
                                                                        display:
                                                                            'inline',
                                                                        color: 'var(--themecolor)',
                                                                    }}
                                                                />
                                                            ) : (
                                                                ''
                                                            )}
                                                        </span>
                                                    </td>
                                                </tr>
                                                {idx !== arr.length && (
                                                    <Divider />
                                                )}
                                            </>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ) : (
                <Nutrients setscreen={setscreen} img={image} />
            )}
        </Box>
    );
};

export default ScannedImg;
