import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/auth/Signup'
import Signin from './pages/auth/Signin'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </>
  )
}

export default App
