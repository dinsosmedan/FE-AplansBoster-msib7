import { Route, Routes } from 'react-router-dom'

import { DataDTKS, DataMaster, DataPenerima, ForgotPassword, Home, Layanan, Login, ManajemenRole, ManajemenUser, ProfilingMasyarakat } from './pages'
import { DashboardLayout } from './components'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Home />} />
        <Route path='/layanan' element={<Layanan />} />
        <Route path='/data-penerima' element={<DataPenerima />} />
        <Route path='/data-dtks' element={<DataDTKS />} />
        <Route path='/data-master' element={<DataMaster />} />
        <Route path='/manajemen-role' element={<ManajemenRole />} />
        <Route path='/manajemen-user' element={<ManajemenUser />} />
        <Route path='/profiling-masyarakat' element={<ProfilingMasyarakat />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  )
}
