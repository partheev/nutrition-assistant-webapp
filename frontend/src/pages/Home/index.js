import { Button, Container, createTheme, ThemeProvider } from '@mui/material'
import React from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import About from './About'

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#fff',
          backgroundColor: '#c9be5d',
          height: '45px',
          '&:hover': {
            backgroundColor: '#f5df20',
            color: '#fff',
          },
        },
      },
    },
  },
})

export default function Home() {
  return (
    <div>
      <div
        style={{
          height: '90vh',
          backgroundImage: 'url(/static/img/homebg.jpg)',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          // backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          margin: 0,
          overflow: 'hidden',
        }}
      >
        <Container
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
          }}
        >
          <h1>BRAND NAME</h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s,
          </p>
          <ThemeProvider theme={theme}>
            <Button sx={{ fontSize: '16px' }}>
              Sign IN / Sign UP <ArrowForwardIosIcon />{' '}
            </Button>
          </ThemeProvider>
        </Container>
      </div>
      <div style={{ height: '10vh' }}></div>
      <About />
    </div>
  )
}
