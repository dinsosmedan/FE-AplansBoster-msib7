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
          <Route path="/layanan" element={<Layanan />} />
          <Route path="/layanan/rehabsos" element={<LayananRehabsos />} />
          <Route path="/layanan/linjamsos" element={<LayananLinjamsos />} />
          <Route path="/cek-riwayat-bansos" element={<CekRiwayatBansos />} />
          <Route path="/layanan/dayasos" element={<LayananDayasos />} />
          <Route path="/data-penerima" element={<DataPenerima />} />
          <Route path="/data-penerima/linjamsos" element={<DataPenerimaLinjamsos />} />
          <Route path="/data-penerima/rehabsos" element={<DataPenerimaRehabsos />} />
          <Route path="/data-penerima/dayasos" element={<DataPenerimaDayasos />} />
          <Route path="/event" element={<Event />} />
          <Route path="/data-master" element={<DataMaster />} />
          <Route path="/manajemen-role" element={<ManajemenRole />} />
          <Route path="/manajemen-user" element={<ManajemenUser />} />
          <Route path="/profiling-masyarakat" element={<ProfilingMasyarakat />} />
          <Route path="/bansos-lansia" element={<BansosLansia />} />
          <Route path="/bpnt" element={<Bpnt />} />
          <Route path="/kube" element={<Kube />} />
          <Route path="/hibah" element={<Hibah />} />
          <Route path="/djp" element={<Djp />} />
          <Route path="/ri" element={<Ri />} />
          <Route path="/Bbp" element={<Bbp />} />
          <Route path="/Pkh" element={<Pkh />} />
          <Route path="/Djpm" element={<Djpm />} />
          <Route path="/Veteran" element={<Veteran />} />
          <Route path="/cek-data-dukcapil" element={<CekDataDukcapil />} />
          <Route path="/pokmas" element={<Pokmas />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </>
  )
}
