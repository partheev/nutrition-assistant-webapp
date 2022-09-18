import { Container } from '@mui/system'
import React from 'react'
import styles from '../../styles/auth.modules.css'

const Signup = () => {
  return (
    <div
      style={{
        backgroundColor: '#dd790f',
        backgroundImage: 'linear-gradient(45deg, #dd790f 0%, #d9aa4c 100%)',

        height: '100vh',
      }}
    >
      <div>
        <h1 style={{ marginTop: 0, padding: '20px 0 0 20px' }}>Brand</h1>
        <Container
          sx={{
            backgroundColor: '#fff',
            borderRadius: '8px',
            height: '80vh',
            boxShadow:
              '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
          }}
          maxWidth="sm"
        >
          <h1 align="center" style={{ paddingTop: '16px' }}>
            Sign UP
          </h1>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <form style={{ margin: '0 auto' }}>
              <label className="label">Email</label>
              <input
                placeholder="Email"
                className="textField"
                type="email"
              ></input>
              <label placeholder="password" className="label">
                Password
              </label>
              <input className="textField" type="password"></input>
              <label className="label">Confirm Password</label>
              <input className="textField" type="password"></input>
            </form>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <button
                style={{
                  display: 'inline',
                  width: '30%',
                  height: '40px',
                  borderRadius: '6px',
                  fontSize: '20px',
                  backgroundColor: 'var(--themecolor)',
                  color: '#fff',
                  border: '1px solid var(--themecolor)',
                  marginTop: '20px',
                }}
                type="submit"
              >
                Register
              </button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Signup
