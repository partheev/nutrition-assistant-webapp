import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter, useLocation } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import { AppContextProvider } from './Context/AppContext'
const root = ReactDOM.createRoot(document.getElementById('root'))

export const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

root.render(
  <SnackbarProvider maxSnack={3}>
    <BrowserRouter>
      <AppContextProvider>
        <ScrollToTop />
        <App />
      </AppContextProvider>
    </BrowserRouter>
  </SnackbarProvider>
)
