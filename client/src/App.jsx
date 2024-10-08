import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Chart from './pages/Chart'
function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/charts" element={<Chart/>} />
    </Routes>
    
  )
}

export default App
