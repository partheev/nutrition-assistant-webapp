import { Alert, Container } from '@mui/material'
import React, { useContext, useState } from 'react'
import Chart from 'react-apexcharts'
import DailyReport from '../../Components/DailyReport'
import { AppContext } from '../../Context/AppContext'
import { API } from '../../services/apis'
import { getChartData } from '../../utils/utils'

const Reports = () => {
  const { weekData, setisLoading } = useContext(AppContext)
  const [categories, weekCalories] = getChartData(weekData)
  const [foodItems, setfoodItems] = useState(null)
  const [selectedDate, setselectedDate] = useState(null)
  const getDate = async (idx) => {
    const selectDate = weekData.find((week) => week.DAY === categories[idx])
    if (!selectDate) {
      return
    }
    const selectedDate = new Date(selectDate.CONSUMED_ON).getTime()
    setselectedDate(new Date(selectDate.CONSUMED_ON))
    setisLoading(true)
    const res = await API.consumptionOn(selectedDate)
    setisLoading(false)
    setfoodItems(res.food_items)
  }

  return (
    <div
      style={{
        background: 'var(--backgroundColor)',
        paddingBottom: '6rem',
        minHeight: '100vh',
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
      <Container maxWidth="md">
        <div style={{ padding: '0 1rem' }}>
          <Chart
            type="bar"
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
                  borderRadius: 6,
                },
                colors: {
                  backgroundBarRadius: 20,
                  backgroundBarColors: ['#fff', 'red'],
                },
              },
              dataLabels: {
                enabled: false,
              },
              chart: {
                events: {
                  dataPointSelection: (event, chartContext, config) => {
                    getDate(config.dataPointIndex)
                  },
                },
              },
            }}
          ></Chart>
          {foodItems && selectedDate ? (
            <div>
              <DailyReport selectedDate={selectedDate} foodItems={foodItems} />
            </div>
          ) : (
            <Alert severity="info">
              Select above bars to see consumed food items on particular date
            </Alert>
          )}
        </div>
      </Container>
    </div>
  )
}

export default Reports
