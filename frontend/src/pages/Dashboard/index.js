import React, { useState } from 'react'
import Chart from 'react-apexcharts'
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress'
import { styled } from '@mui/material'
import { Box, Container } from '@mui/system'
import FoodCard from '../../Components/FoodCard'
import BottomNavBar from '../../Components/BottomNavBar'

function calorieProgressColor({ value, seriesIndex, w }) {
  if (value < 35) {
    return '#42855B'
  } else if (value >= 35 && value < 50) {
    return '#FFE162'
  } else if (value >= 50 && value < 80) {
    return '#F76E11'
  } else {
    return '#B20600'
  }
}
const Dashboard = () => {
  const [todaysCaloriesPercent, settodaysCaloriesPercent] = useState(70)

  const [nutrients, setnutrients] = useState({
    protiens: 80,
    fiber: 10,
    carbs: 130,
    fats: 30,
    maxprotiens: 165,
    maxfiber: 30,
    maxcarbs: 225,
    maxfats: 97,
  })

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
  }))
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
  }))
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
  }))
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
  }))

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
        }}
      >
        <h1
          style={{
            display: 'inline-block',
            margin: '0 auto',
            padding: '0.8rem',
          }}
        >
          Calories
        </h1>
      </div>
      <Chart
        type="radialBar"
        series={[todaysCaloriesPercent]}
        height={400}
        options={{
          labels: ['calories'],

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
                    return 1130
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
      <Container maxWidth="sm">
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
              display: 'flex',
              alignItems: 'center',
              padding: '10px 0 10px 0',
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
              protien{' '}
              <span>
                [{nutrients.protiens}g / {nutrients.maxprotiens}
                g]
              </span>
            </p>
          </div>
          <ProtienLinearProgress
            variant="determinate"
            value={(nutrients.protiens / nutrients.maxprotiens) * 100}
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 0 10px 0',
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
              fiber{' '}
              <span>
                [{nutrients.fiber}g / {nutrients.maxfiber}g]
              </span>
            </p>
          </div>
          <FiberLinearProgress
            variant="determinate"
            value={(nutrients.fiber / nutrients.maxfiber) * 100}
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 0 10px 0',
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
              carbohydrates{' '}
              <span>
                [{nutrients.carbs}g / {nutrients.maxcarbs}g]
              </span>
            </p>
          </div>
          <CarbsLinearProgress
            variant="determinate"
            value={(nutrients.carbs / nutrients.maxcarbs) * 100}
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 0 10px 0',
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
              fats{' '}
              <span>
                [{nutrients.fats}g / {nutrients.maxfats}g]
              </span>
            </p>
          </div>
          <FatsLinearProgress
            variant="determinate"
            value={(nutrients.fats / nutrients.maxfats) * 100}
          />
        </Box>
        <h2
          align="center"
          style={{ marginTop: '1.5rem', marginBottom: '1rem' }}
        >
          Today's Food
        </h2>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <FoodCard img="/static/img/dosa.jpg" />
          <FoodCard img="/static/img/foodImage.jpg" />
        </div>
      </Container>
      <BottomNavBar />
    </div>
  )
}

export default Dashboard
