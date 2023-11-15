import { Route, Routes } from 'react-router-dom'

import {
  DataDTKS,
  DataMaster,
  DataPenerima,
  ForgotPassword,
  Home,
  Layanan,
  Login,
  ManajemenRole,
  ManajemenUser,
  ProfilingMasyarakat,
  Bpnt,
  Kube,
  Hibah,
  Djp,
  Ri
} from './pages'
import { DashboardLayout } from './components'
import BansosLansia from './pages/Layanan/BansosLansia'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Home />} />
        <Route path="/layanan/rehabsos" element={<Layanan />} />
        <Route path="/data-penerima" element={<DataPenerima />} />
        <Route path="/data-dtks" element={<DataDTKS />} />
        <Route path="/data-master" element={<DataMaster />} />
        <Route path="/manajemen-role" element={<ManajemenRole />} />
        <Route path="/manajemen-user" element={<ManajemenUser />} />
        <Route path="/profiling-masyarakat" element={<ProfilingMasyarakat />} />
        <Route path="/bansos-lansia" element={<BansosLansia />} />
        <Route path="/bpnt" element={<Bpnt />} />
        <Route path="/kube" element={<Kube/>} />
        <Route path="/hibah" element={<Hibah/>} />
        <Route path="/djp" element={<Djp/>} />
        <Route path="/ri" element={<Ri/>} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  )
}
