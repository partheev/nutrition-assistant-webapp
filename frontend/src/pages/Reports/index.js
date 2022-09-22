import { Divider } from '@mui/material';
import React from 'react';
import Chart from 'react-apexcharts';
import BottomNavBar from '../../Components/BottomNavBar';
import DailyReport from '../../Components/DailyReport';

const Reports = () => {
    return (
        <div
            style={{
                background: 'var(--backgroundColor)',
                paddingBottom: '6rem',
            }}
        >
            <div
                style={{
                    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 3px 3px 0px',
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '20px',
                }}
            >
                <h1
                    style={{
                        display: 'inline-block',
                        margin: '0 auto',
                        padding: '0.8rem',
                    }}
                >
                    Weekly health
                </h1>
            </div>
            <div style={{ padding: '0 2rem' }}>
                <Chart
                    type='bar'
                    series={[
                        {
                            name: 'calories',
                            color: '#F0A500',
                            data: [44, 55, 41, 67, 22, 43, 21],
                        },
                    ]}
                    height={400}
                    options={{
                        xaxis: {
                            categories: [
                                'Sun',
                                'Mon',
                                'Tue',
                                'Wed',
                                'Thu',
                                'Fri',
                                'Sat',
                            ],
                        },
                        yaxis: {
                            title: {
                                text: 'calories',
                            },
                        },
                        grid: {
                            show: false,
                        },
                        plotOptions: {
                            bar: {
                                horizontal: false,
                                columnWidth: '30%',
                                borderRadius: 8,
                            },
                            colors: {
                                backgroundBarRadius: 20,
                                backgroundBarColors: ['#fff', 'red'],
                            },
                        },
                        dataLabels: {
                            enabled: false,
                        },
                    }}
                ></Chart>
                <div>
                    <DailyReport />
                </div>
            </div>
        </div>
    );
};

export default Reports;
