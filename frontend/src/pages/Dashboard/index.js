import React, { useContext, useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import LinearProgress, {
    linearProgressClasses,
} from '@mui/material/LinearProgress';
import { Alert, Grid, styled } from '@mui/material';
import { Box, Container } from '@mui/system';
import FoodCard from '../../Components/FoodCard';
import BottomNavBar from '../../Components/BottomNavBar';
import { API } from '../../services/apis';
import { useSnackbar } from 'notistack';
import { formatAMPM } from '../../utils/utils';
import { FullPageLoading } from '../../Components/LoadingSpinner';
import { AppContext } from '../../Context/AppContext';

const ProtienLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor:
            theme.palette.grey[theme.palette.mode === 'light' ? 200 : 900],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: '#DA0037',
    },
}));
const FiberLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor:
            theme.palette.grey[theme.palette.mode === 'light' ? 200 : 900],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: '#3CCF4E',
    },
}));
const CarbsLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor:
            theme.palette.grey[theme.palette.mode === 'light' ? 200 : 900],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: '#876445',
    },
}));
const FatsLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor:
            theme.palette.grey[theme.palette.mode === 'light' ? 200 : 900],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: '#8758FF',
    },
}));

const MAX_CALORIES = 2000;
function calorieProgressColor({ value, seriesIndex, w }) {
    if (value < 35) {
        return '#42855B';
    } else if (value >= 35 && value < 50) {
        return '#FFE162';
    } else if (value >= 50 && value < 80) {
        return '#F76E11';
    } else {
        return '#B20600';
    }
}
const Dashboard = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [isLoading, setisLoading] = useState(false);
    const { nutrients, setnutrients, todayFoodItems } = useContext(AppContext);

    const todaysCaloriesPercent =
        nutrients.calorie > MAX_CALORIES
            ? 100
            : (nutrients.calorie / MAX_CALORIES) * 100;
    const CALORIES = nutrients.calorie;

    return (
        <div
            style={{
                background: 'var(--backgroundColor)',
                paddingBottom: '6rem',
            }}
        >
            <FullPageLoading isLoading={false} />
            <div
                style={{
                    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 3px 3px 0px',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <h1
                    style={{
                        display: 'inline-block',
                        margin: '0 auto',
                        padding: '0.8rem',
                    }}
                >
                    Dashboard
                </h1>
            </div>
            <Chart
                type='radialBar'
                series={[todaysCaloriesPercent]}
                height={400}
                options={{
                    labels: ['calories'],
                    CALORIES: CALORIES,
                    plotOptions: {
                        radialBar: {
                            hollow: {
                                margin: 0,
                                size: '70%',
                                background: '#F9F9F9',
                                boxShadow:
                                    '0 4px 8px 0 rgba(0, 0, 0, 0.18), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                                dropShadow: {
                                    enabled: true,
                                    top: 0,
                                    left: 0,
                                    blur: 4,
                                    opacity: 0.24,
                                },
                            },
                            track: {
                                background: '#fff',
                                dropShadow: {
                                    enabled: true,
                                    top: 2,
                                    left: 0,
                                    blur: 4,
                                    opacity: 0.5,
                                },
                            },
                            dataLabels: {
                                name: {
                                    color: calorieProgressColor({
                                        value: todaysCaloriesPercent,
                                    }),
                                    fontSize: '1.5rem',
                                    offsetY: 40,
                                    fontWeight: 300,
                                },
                                value: {
                                    color: calorieProgressColor({
                                        value: todaysCaloriesPercent,
                                    }),
                                    fontSize: '4.5rem',
                                    fontWeight: 700,
                                    margin: '1rem',
                                    offsetY: -10,
                                    show: true,
                                    formatter: (value) => {
                                        return CALORIES;
                                    },
                                },
                            },
                        },
                    },
                    fill: {
                        colors: [calorieProgressColor],
                    },
                    stroke: {
                        lineCap: 'round',
                    },
                }}
            ></Chart>
            <Container maxWidth='sm'>
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
                    <div
                        style={{
                            marginBottom: '0.2rem',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: '#DA0037',
                                color: 'red',
                                width: '9px',
                                height: '9px',
                                borderRadius: '100%',
                            }}
                        ></div>
                        <p style={{ marginLeft: '10px' }}>
                            Protien{' '}
                            <span>
                                [{nutrients.protiens}g / {nutrients.maxprotiens}
                                g]
                            </span>
                        </p>
                    </div>
                    <ProtienLinearProgress
                        variant='determinate'
                        value={
                            nutrients.protiens > nutrients.maxprotiens
                                ? 100
                                : (nutrients.protiens / nutrients.maxprotiens) *
                                  100
                        }
                    />
                    <div
                        style={{
                            marginTop: '0.7rem',
                            marginBottom: '0.2rem',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: '#3CCF4E',
                                color: 'red',
                                width: '9px',
                                height: '9px',
                                borderRadius: '100%',
                            }}
                        ></div>
                        <p style={{ marginLeft: '10px' }}>
                            Calcium{' '}
                            <span>
                                [{nutrients.calcium}mg / {nutrients.maxcalcium}
                                mg]
                            </span>
                        </p>
                    </div>
                    <FiberLinearProgress
                        variant='determinate'
                        value={
                            nutrients.calcium > nutrients.maxcalcium
                                ? 100
                                : (nutrients.calcium / nutrients.maxcalcium) *
                                  100
                        }
                    />
                    <div
                        style={{
                            marginTop: '0.7rem',
                            marginBottom: '0.2rem',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: '#876445',
                                color: 'red',
                                width: '9px',
                                height: '9px',
                                borderRadius: '100%',
                            }}
                        ></div>
                        <p style={{ marginLeft: '10px' }}>
                            Carbohydrates{' '}
                            <span>
                                [{nutrients.carbs}g / {nutrients.maxcarbs}g]
                            </span>
                        </p>
                    </div>
                    <CarbsLinearProgress
                        variant='determinate'
                        value={
                            nutrients.carbs > nutrients.maxcarbs
                                ? 100
                                : (nutrients.carbs / nutrients.maxcarbs) * 100
                        }
                    />
                    <div
                        style={{
                            marginTop: '0.7rem',
                            marginBottom: '0.2rem',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: '#8758FF',
                                color: 'red',
                                width: '9px',
                                height: '9px',
                                borderRadius: '100%',
                            }}
                        ></div>
                        <p style={{ marginLeft: '10px' }}>
                            Fats{' '}
                            <span>
                                [{nutrients.fats}g / {nutrients.maxfats}g]
                            </span>
                        </p>
                    </div>
                    <FatsLinearProgress
                        variant='determinate'
                        value={
                            nutrients.fats > nutrients.maxfats
                                ? 100
                                : (nutrients.fats / nutrients.maxfats) * 100
                        }
                    />
                </Box>
                <h2 style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>
                    Today's Food
                </h2>
                {todayFoodItems.length === 0 && (
                    <Alert severity='info'>
                        No foods consumed today. Click on camera icon to capture
                        your food.
                    </Alert>
                )}
                <Grid columnSpacing={'1rem'} container>
                    {todayFoodItems.map((item, idx) => {
                        return (
                            <Grid key={idx} item sm={6} xs={12}>
                                <FoodCard
                                    key={idx}
                                    calories={item.CALORIE.toFixed(2)}
                                    carbohydrates={item.CARBOHYDRATES.toFixed(
                                        2
                                    )}
                                    fats={item.FAT.toFixed(2)}
                                    image_url={item.IMAGE}
                                    proteins={item.PROTEINS.toFixed(2)}
                                    time={formatAMPM(
                                        new Date(item.CONSUMED_ON)
                                    )}
                                    calcium={item.CALCIUM.toFixed(2)}
                                />
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        </div>
    );
};

export default Dashboard;
