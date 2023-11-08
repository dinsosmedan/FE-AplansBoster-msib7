import { Route, Routes } from 'react-router-dom'

import { ForgotPassword, Home, Login } from './pages'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  )
}
