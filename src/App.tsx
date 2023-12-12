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
  LoginUser,
  DataSktm,
  RegisterUser,
  ForgotPasswordUser,
  UpdatePasswordUser,
  CekBansosUser,
  DataPkh
} from './pages'
import {
  DashboardLayout,
  Alert,
  ProtectedAuth,
  ProtectedRoute,
  UserLayout,
  AuthUserLayout,
  UserProtectedAuth
} from './components'
import BansosLansia from './pages/Layanan/BansosLansia'
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
import DataPbi from './pages/DataPenerima/Linjamsos/DataPbi'
import Unregister from './pages/Layanan/Linjamsos/Unregister'
// import DataPkr from './pages/DataPenerima/Linjamsos/DataPkr'
import UserSktm from './pages/LandingPage/Sktm/SktmUser'
import SktmUnregister from './pages/LandingPage/Sktm/SktmUnregister'
import SktmRegister from './pages/LandingPage/Sktm/SktmRegister'
import SktmReligious from './pages/LandingPage/Sktm/SktmRegisterReligious'
import SktmUnregisterReligious from './pages/LandingPage/Sktm/SktmUnregisterReligious'
import BbpUser from './pages/LandingPage/Bbp/BbpUser'
import BbpRegister from './pages/LandingPage/Bbp/BbpRegister'
import BbpFilterBatch from './pages/Layanan/BbpFilterBatch'
import LayananBbp from './pages/Layanan/LayananBbp'
import LayananSktm from './pages/Layanan/LayananSktm';

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
              <Route path="bbp-filter" element={<BbpFilterBatch />} />
              <Route path="layanan-bbp" element={<LayananBbp />} />
              <Route path="linjamsos" element={<LayananLinjamsos />} />
              <Route path="dayasos" element={<LayananDayasos />} />
              <Route path="layanan-sktm" element={<LayananSktm />} />
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
              <Route path="Pkr/:id" element={<Pkr />} />
              <Route path="Sktm" element={<Sktm />} />
              <Route path="Unregister" element={<Unregister />} />
              <Route path="Unregister/:id" element={<Unregister />} />
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
              <Route path="data-sktm" element={<DataSktm />} />
              <Route path="data-pbi" element={<DataPbi />} />
              <Route path="data-pkh" element={<DataPkh />} />
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
          <Route path="/user">
            <Route element={<UserProtectedAuth />}>
              <Route element={<AuthUserLayout />}>
                <Route path="login" element={<LoginUser />} />
                <Route path="register" element={<RegisterUser />} />
                <Route path="forgot-password" element={<ForgotPasswordUser />} />
                <Route path="reset-password" element={<UpdatePasswordUser />} />
              </Route>
            </Route>
            <Route path="sktm">
              <Route index element={<UserSktm />} />
              <Route path="register" element={<SktmRegister />} />
              <Route path="unregister" element={<SktmUnregister />} />
              <Route path="register-religious" element={<SktmReligious />} />
              <Route path="unregister-religious" element={<SktmUnregisterReligious />} />
            </Route>
            <Route path="bbp">
              <Route index element={<BbpUser />} />
              <Route path="register-bbp" element={<BbpRegister />} />
            </Route>
            <Route path="cek-bansos" element={<CekBansosUser />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}
