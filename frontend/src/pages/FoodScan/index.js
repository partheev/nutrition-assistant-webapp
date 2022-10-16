import React, { Fragment, useEffect, useState } from 'react';
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
const UNITS = ['gm', 'ounce', 'ml', 'pieces', 'slices', 'cup', 'tbsp'];
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
            if (err?.response?.data?.msg)
                enqueueSnackbar(err.response.data.msg, {
                    variant: 'error',
                });
            else
                enqueueSnackbar('Something went wrong. Try again', {
                    variant: 'error',
                });
        }
    };

    const handleSelectItem = (foodItem) => {
        if (selectedItems.find((item) => item.id === foodItem.id)) {
            setselectedItems(
                selectedItems.filter((item) => item.id !== foodItem.id)
            );
        } else {
            if (selectedItems.length === 3) {
                enqueueSnackbar('Select 3 items only', { variant: 'error' });
                return;
            }

            setselectedItems([
                ...selectedItems,
                { ...foodItem, qty: 50, unit: 'gm' },
            ]);
        }
    };
    const handleModifyItem = ({ value, id, field }) => {
        setselectedItems((prevState) => {
            const items = [...prevState];
            const idx = items.findIndex((item) => item.id === id);
            items[idx] = { ...items[idx], [field]: value };
            return items;
        });
    };

    const handleNext = async () => {
        if (selectedItems.length === 0) {
            enqueueSnackbar('Please select atleast 1 item', {
                variant: 'error',
            });
            return;
        }

        setisLoading(true);
        try {
            const res = await API.foodNutritionDetails({
                image_url: image,
                food_item: selectedItems
                    .reduce(
                        (prev, curr, idx, arr) =>
                            prev +
                            `${curr.qty} ${curr.unit} ` +
                            curr.name +
                            (idx === arr.length - 1 ? '' : ', '),
                        ''
                    )
                    .substring(0, 90),
            });
            setscreen(true);
            setnutrientsList(res.nutrients);
            setconsumed_food_id(res.consumed_food_id);
        } catch (err) {
            if (err?.response?.data?.msg)
                enqueueSnackbar(err.response.data.msg, {
                    variant: 'error',
                });
            else
                enqueueSnackbar('Something went wrong. Try again', {
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
                                    paddingTop: '1rem',
                                    background: 'var(--backgroundColor)',
                                    position: 'fixed',
                                    width: '100%',
                                    padding: '0.8rem 0.5rem 0.5rem 0.5rem',
                                    top: 0,
                                    left: 0,
                                }}
                            >
                                <Container maxWidth='md'>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <button
                                            style={{
                                                display: 'block',
                                                background:
                                                    'var(--backgroundColor)',
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
                                </Container>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    paddingTop: '4.3rem',
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
                                            const selectedItem =
                                                selectedItems.find(
                                                    (x) => x.id === item.id
                                                );
                                            return (
                                                <Fragment key={item.id}>
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
                                                            {Boolean(
                                                                selectedItem
                                                            ) ? (
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
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                handleModifyItem(
                                                                                    {
                                                                                        value: e
                                                                                            .target
                                                                                            .value,
                                                                                        id: item.id,
                                                                                        field: 'qty',
                                                                                    }
                                                                                )
                                                                            }
                                                                            type='number'
                                                                            value={String(
                                                                                selectedItem.qty
                                                                            )}
                                                                        />
                                                                        <select
                                                                            style={{
                                                                                backgroundColor:
                                                                                    'var(--lightOrange)',
                                                                                border: '1px solid var(--lightOrange)',
                                                                            }}
                                                                            onClick={(
                                                                                e
                                                                            ) => {
                                                                                e.stopPropagation();
                                                                            }}
                                                                            value={
                                                                                selectedItem.unit
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                handleModifyItem(
                                                                                    {
                                                                                        value: e
                                                                                            .target
                                                                                            .value,
                                                                                        id: item.id,
                                                                                        field: 'unit',
                                                                                    }
                                                                                )
                                                                            }
                                                                        >
                                                                            {UNITS.map(
                                                                                (
                                                                                    unit
                                                                                ) => (
                                                                                    <option
                                                                                        value={
                                                                                            unit
                                                                                        }
                                                                                        key={
                                                                                            unit
                                                                                        }
                                                                                        style={{
                                                                                            backgroundColor:
                                                                                                'var(--backgroundColor)',
                                                                                        }}
                                                                                    >
                                                                                        {
                                                                                            unit
                                                                                        }
                                                                                    </option>
                                                                                )
                                                                            )}
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
                                                </Fragment>
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
