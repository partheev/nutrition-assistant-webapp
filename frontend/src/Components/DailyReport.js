import { Divider } from '@mui/material'
import React from 'react'
import FoodCard from './FoodCard'

const DailyReport = () => {
  return (
    <div style={{ marginTop: '20px' }}>
      <Divider />
      <div
        style={{ display: 'flex', justifyContent: 'center', margin: '10px' }}
      >
        20 may 2022, sat
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
          120
        </div>
        <span style={{ fontSize: '18px', color: 'var(--onOrange)' }}>
          calories
        </span>
      </div>
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}
      >
        <FoodCard />
      </div>
    </div>
  )
}

export default DailyReport
