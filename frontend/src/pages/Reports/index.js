import React from 'react';
import Chart from 'react-apexcharts';
import DailyReport from '../../Components/DailyReport';
import { getChartData } from '../../utils/utils';

const Reports = ({ weekData }) => {
    const [categories, weekCalories] = getChartData(weekData);

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
                            data: weekCalories,
                        },
                    ]}
                    height={400}
                    options={{
                        xaxis: {
                            categories: categories,
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
