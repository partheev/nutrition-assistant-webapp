import { Divider, Grid } from '@mui/material';
import React from 'react';
import { formatAMPM } from '../utils/utils';
import FoodCard from './FoodCard';

const DailyReport = ({ foodItems, selectedDate }) => {
    const totalCalories = foodItems.reduce(
        (prev, curr) => prev + curr.CALORIE,
        0
    );
    return (
        <div style={{ marginTop: '20px' }}>
            <Divider />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '10px',
                }}
            >
                {new Date(selectedDate).toLocaleDateString()}
            </div>
            <div
                style={{
                    marginTop: '2rem',
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
                        fontWeight: 800,
                        fontSize: '2.2rem',
                        color: 'var(--onOrange)',
                    }}
                >
                    {Number(totalCalories).toFixed(1)}
                </div>
                <span style={{ fontSize: '18px', color: 'var(--onOrange)' }}>
                    Calories
                </span>
            </div>
            <Grid container spacing={'2rem'} sx={{ marginTop: '2rem' }}>
                {foodItems.map((item) => {
                    return (
                        <Grid item key={item.ID} xs={12} sm={6}>
                            <FoodCard
                                calories={item.CALORIE.toFixed(2)}
                                carbohydrates={item.CARBOHYDRATES.toFixed(2)}
                                fats={item.FAT.toFixed(2)}
                                image_url={item.IMAGE}
                                proteins={item.PROTEINS.toFixed(2)}
                                time={formatAMPM(new Date(item.CONSUMED_ON))}
                                calcium={item.CALCIUM.toFixed(2)}
                            />
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
};

export default DailyReport;
