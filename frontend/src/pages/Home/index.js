import { Container } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import About from './About'
import styles from '../../styles/home.module.css'

export default function Home() {
  const navigate = useNavigate()
  return (
    <div>
      <div
        style={{
          height: '90vh',
          background: '#F77E21',
        }}
      >
        <img
          className={styles.diet_img}
          style={{ float: 'right' }}
          src="/static/img/diet_removedbg.png"
          alt=""
        ></img>
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div>
            <h1>Nutrinix</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s,
            </p>
            <div>
              <button
                style={{
                  color: '#fff',
                  fontSize: '22px',
                  fontWeight: 600,
                  backgroundColor: 'var(--themecolor)',
                  padding: '10px 15px',
                  borderRadius: '5px',
                  boxShadow: 'rgba(0, 0, 0, 0.2) 0px 20px 30px',
                  // boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
                  border: '1px solid var(--themecolor)',
                }}
                onClick={(e) => {
                  navigate('/signin')
                }}
              >
                Sign in
              </button>
              <span
                style={{
                  color: '#fff',
                  fontSize: '22px',
                  fontWeight: 600,
                  margin: '0 10px',
                }}
              >
                /
              </span>
              <button
                style={{
                  color: '#fff',
                  border: '1px solid var(--themecolor)',
                  fontSize: '22px',
                  fontWeight: 600,
                  backgroundColor: 'var(--themecolor)',
                  padding: '10px 15px',
                  borderRadius: '5px',
                  boxShadow: 'rgba(0, 0, 0, 0.2) 0px 20px 30px',
                }}
                onClick={(e) => {
                  navigate('/signup')
                }}
              >
                Sign up
              </button>
            </div>
          </div>
        </Container>
      </div>
      <div style={{ height: '10vh' }}></div>
      <About />
    </div>
  )
}
