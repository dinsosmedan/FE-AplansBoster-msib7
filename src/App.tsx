import { Route, Routes } from 'react-router-dom'

import {
  Event,
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
  Ri,
  Bbp,
  Pkh,
  Djpm,
  Veteran,
  Pokmas
} from './pages'
import { DashboardLayout, Alert } from './components'
import BansosLansia from './pages/Layanan/BansosLansia'
import LayananRehabsos from './pages/Layanan/LayananRehabsos'
import LayananLinjamsos from './pages/Layanan/LayananLinjamsos'
import LayananDayasos from './pages/Layanan/LayananDayasos'
import CekRiwayatBansos from './pages/CekRiwayatBansos'
import CekDataDukcapil from './pages/CekDataDukcapil'
import DataPenerimaLinjamsos from './pages/DataPenerima/DataPenerimaLinjamsos'
import DataPenerimaRehabsos from './pages/DataPenerima/DataPenerimaRehabsos'
import DataPenerimaDayasos from './pages/DataPenerima/DataPenerimaDayasos'
import { useAlert } from './store/client'
import { type AlertOptions } from './components/organisms/Alert'

export default function App() {
  const { alertOptions, handleClose, handleSubmit } = useAlert()
  return (
    <>
      <Alert
        open={Boolean(alertOptions)}
        onSubmit={handleSubmit}
        onClose={handleClose}
        {...(alertOptions as AlertOptions)}
      />
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Home />} />
          <Route path="/layanan">
            <Route index element={<Layanan />} />
            <Route path="rehabsos" element={<LayananRehabsos />} />
            <Route path="linjamsos" element={<LayananLinjamsos />} />
            <Route path="dayasos" element={<LayananDayasos />} />
          </Route>
          <Route path="/cek-riwayat-bansos" element={<CekRiwayatBansos />} />
          <Route path="/data-penerima">
            <Route index element={<DataPenerima />} />
            <Route path="linjamsos" element={<DataPenerimaLinjamsos />} />
            <Route path="rehabsos" element={<DataPenerimaRehabsos />} />
            <Route path="dayasos" element={<DataPenerimaDayasos />} />
          </Route>
          <Route path="/event" element={<Event />} />
          <Route path="/data-master" element={<DataMaster />} />
          <Route path="/manajemen-role" element={<ManajemenRole />} />
          <Route path="/manajemen-user" element={<ManajemenUser />} />
          <Route path="/profiling-masyarakat" element={<ProfilingMasyarakat />} />
          <Route path="/bansos-lansia" element={<BansosLansia />} />
          <Route path="/Bbp" element={<Bbp />} />
          <Route path="/Pkh" element={<Pkh />} />
          <Route path="/Djpm" element={<Djpm />} />
          <Route path="/cek-data-dukcapil" element={<CekDataDukcapil />} />
          <Route path="/layanan/dayasos">
            <Route index element={<LayananDayasos />} />
            <Route path="djp" element={<Djp />} />
            <Route path="bpnt" element={<Bpnt />} />
            <Route path="hibah" element={<Hibah />} />
            <Route path="ri" element={<Ri />} />
            <Route path="pokmas" element={<Pokmas />} />
            <Route path="veteran" element={<Veteran />} />
            <Route path="kube" element={<Kube />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </>
  )
}
