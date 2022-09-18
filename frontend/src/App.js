import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/auth/Signup'
import Signin from './pages/auth/Signin'
import Dashboard from './pages/Home/Dashboard'
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App
