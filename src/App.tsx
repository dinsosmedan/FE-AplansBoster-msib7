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
  Ri,
  Bbp,
  Pkh,
  // Djpm,
  Veteran,
  Pokmas,
  DataDjp,
  DataVeteran,
  DataBltbbm,
  Pkr,
  Sktm,
  Djp,
  InfoDataMaster,
  DataPkr,
  DataUnregister,
  DataBbp,
  DataDtks,
  LandingPage,
  LoginUser
} from './pages'
import { DashboardLayout, Alert, ProtectedAuth, ProtectedRoute, UserLayout } from './components'
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
import DataPokmas from './pages/DataPenerima/Dayasos/DataPokmas'
import DataKube from './pages/DataPenerima/Dayasos/DataKube'
import DataRumahIbadah from './pages/DataPenerima/Dayasos/DataRumahIbadah'
import DataHibah from './pages/DataPenerima/Dayasos/DataHibah'
import { Toaster } from './components/ui/toaster'
import DataBpnt from './pages/DataPenerima/Dayasos/DataBpnt'
// import DataPkr from './pages/DataPenerima/Linjamsos/DataPkr'

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
      <Toaster />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Home />} />
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
            <Route path="/data-master">
              <Route index element={<DataMaster />} />
              <Route path="info-datamaster/:id" element={<InfoDataMaster />} />
            </Route>
            <Route path="/manajemen-role" element={<ManajemenRole />} />
            <Route path="/manajemen-user" element={<ManajemenUser />} />
            <Route path="/profiling-masyarakat" element={<ProfilingMasyarakat />} />
            <Route path="/bansos-lansia" element={<BansosLansia />} />
            <Route path="/Bbp" element={<Bbp />} />
            <Route path="/Pkh" element={<Pkh />} />
            {/* <Route path="/Djpm" element={<Djpm />} /> */}
            <Route path="/cek-data-dukcapil" element={<CekDataDukcapil />} />
            <Route path="/layanan/linjamsos">
              <Route index element={<LayananLinjamsos />} />
              <Route path="Bbp" element={<Bbp />} />
              <Route path="Pkr" element={<Pkr />} />
              <Route path="Sktm" element={<Sktm />} />
            </Route>
            <Route path="/layanan/dayasos">
              <Route index element={<LayananDayasos />} />
              <Route path="djp" element={<Djp />} />
              <Route path="djp/:id" element={<Djp />} />
              <Route path="bpnt" element={<Bpnt />} />
              <Route path="hibah" element={<Hibah />} />
              <Route path="hibah/:id" element={<Hibah />} />
              <Route path="ri" element={<Ri />} />
              <Route path="ri/:id" element={<Ri />} />
              <Route path="pokmas" element={<Pokmas />} />
              <Route path="pokmas/:id" element={<Pokmas />} />
              <Route path="veteran" element={<Veteran />} />
              <Route path="veteran/:id" element={<Veteran />} />
              <Route path="kube" element={<Kube />} />
              <Route path="kube/:id" element={<Kube />} />
            </Route>
            <Route path="/data-penerima/dayasos">
              <Route index element={<DataPenerimaDayasos />} />
              <Route path="data-djp" element={<DataDjp />} />
              <Route path="data-pokmas" element={<DataPokmas />} />
              <Route path="data-kube" element={<DataKube />} />
              <Route path="data-rumah-ibadah" element={<DataRumahIbadah />} />
              <Route path="data-veteran" element={<DataVeteran />} />
              <Route path="data-bltbbm" element={<DataBltbbm />} />
              <Route path="data-hibah" element={<DataHibah />} />
              <Route path="data-bpnt" element={<DataBpnt />} />
            </Route>
            <Route path="/data-penerima/linjamsos">
              <Route index element={<DataPenerimaLinjamsos />} />
              <Route path="data-pkr" element={<DataPkr />} />
              <Route path="data-unregister" element={<DataUnregister />} />
              <Route path="data-bbp" element={<DataBbp />} />
            </Route>
            <Route path="/data-dtks" element={<DataDtks />} />
          </Route>
        </Route>
        <Route element={<ProtectedAuth />}>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>
        <Route element={<UserLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/user/login" element={<LoginUser />} />
        </Route>
      </Routes>
    </>
  )
}
