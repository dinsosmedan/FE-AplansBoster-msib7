import { Route, Routes } from 'react-router-dom'

import { ForgotPassword, Home, Login } from './pages'
import { DashboardLayout } from './components'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  )
}
