import React from 'react'
import { useNavigate } from 'react-router-dom'
import About from './About'
import styles from '../../styles/home.module.css'
import Services from './Services'

export default function Home() {
  const navigate = useNavigate()
  return (
    <div>
      <div
        style={{
          height: '90vh',
          background: '#355764',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'nowrap',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <img
            className={styles.logo}
            style={{ margin: '20px 0 0 20px' }}
            src="/static/img/logo_crop.png"
            alt=""
          />
          <img
            className={styles.diet_img}
            src="/static/img/diet_removedbg.png"
            alt=""
          ></img>
        </div>
        <div
          style={{
            position: 'relative',
            width: '80%',
            margin: '2rem 0 0 2rem',
          }}
        >
          <img
            className={styles.title}
            src="/static/img/brandname.png"
            alt=""
          />
          <p
            style={{
              color: '#fff',
              fontSize: '18px',
              marginTop: '2px',
            }}
          >
            A Nutrition Assistant to control diet, manage food habits and keep
            good health.
          </p>
          <div style={{ marginTop: '20px' }}>
            <button
              className={styles.homebtns}
              style={{
                color: '#fff',
                backgroundColor: 'var(--themecolor)',

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
              className={styles.homebtns}
              style={{
                color: '#fff',
                border: '1px solid var(--themecolor)',

                backgroundColor: 'var(--themecolor)',

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
      </div>
      <div style={{ height: '10vh' }}></div>
      <About />
      <Services />
    </div>
  )
}
