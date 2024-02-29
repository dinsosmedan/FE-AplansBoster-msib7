import { Route, Routes } from 'react-router-dom'

import {
  Event,
  DataMaster,
  ForgotPassword,
  Home,
  Layanan,
  Login,
  ManajemenRole,
  ManajemenUser,
  Kube,
  Hibah,
  Ri,
  Bbp,
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
  DataPkh,
  DataPenerima,
  NotFound,
  ResetPassword,
  ManajemenAdmin,
  Forbidden
} from './pages'

import {
  DashboardLayout,
  Alert,
  ProtectedAuth,
  ProtectedRoute,
  UserLayout,
  AuthUserLayout,
  UserProtectedAuth,
  ProtectedFromDashboard,
  ProtectedFromUser,
  UserProtectedRoute
} from './components'

import LayananLinjamsos from './pages/Layanan/LayananLinjamsos'
import LayananDayasos from './pages/Layanan/LayananDayasos'
import CekRiwayatBansos from './pages/CekRiwayatBansos'
import CekDataDukcapil from './pages/CekDataDukcapil'
import DataPenerimaLinjamsos from './pages/DataPenerima/DataPenerimaLinjamsos'
import DataPenerimaDayasos from './pages/DataPenerima/DataPenerimaDayasos'
import DataPenerimaRehabsos from './pages/DataPenerima/DataPenerimaRehabsos'
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
import UserSktm from './pages/LandingPage/Sktm/SktmUser'
import SktmUnregister from './pages/LandingPage/Sktm/SktmUnregister'
import SktmRegister from './pages/LandingPage/Sktm/SktmRegister'
import SktmReligious from './pages/LandingPage/Sktm/SktmRegisterReligious'
import SktmUnregisterReligious from './pages/LandingPage/Sktm/SktmUnregisterReligious'
import BbpUser from './pages/LandingPage/Bbp/BbpUser'
import BbpRegister from './pages/LandingPage/Bbp/BbpRegister'
import BbpFilterBatch from './pages/Layanan/BbpFilterBatch'
import LayananBbp from './pages/Layanan/LayananBbp'
import LayananSktm from './pages/Layanan/LayananSktm'
import LayananDtks from './pages/Layanan/LayananDtks'
import DtksUser from './pages/LandingPage/Dtks/DtksUser'
import DtksRegister from './pages/LandingPage/Dtks/DtksRegister'
import SubmissionHistory from './pages/LandingPage/SubmissionHistory'
import useScrollToTop from './hooks/useScrolltoTop'
import ChangePassword from './pages/LandingPage/Profile/ChangePassword'
import ChangeProfile from './pages/LandingPage/Profile/ChangeProfile'
import ProfileLayout from './components/layouts/landingPage/ProfileLayout'
import SuccessfulRegister from './components/layouts/landingPage/SuccessfulRegister'
import VerifiedAccount from './components/layouts/landingPage/VerifiedAccount'
import DtksSchool from './pages/LandingPage/Sktm/DtksSchool'
import NonDtksSchool from './pages/LandingPage/Sktm/NonDtksSchool'
import DtksCourts from './pages/LandingPage/Sktm/DtksCourts'
import NonDtksCourts from './pages/LandingPage/Sktm/NonDtksCourts'
import DataBSTLansia from './pages/DataPenerima/Rehabsos/DataBSTLansia'
import DataBSTdisab from './pages/DataPenerima/Rehabsos/DataBSTdisab'
import DataBSTanak from './pages/DataPenerima/Rehabsos/DataBSTanak'
import DataPppks from './pages/DataPenerima/Rehabsos/DataPpks'
import DataLks from './pages/DataPenerima/Rehabsos/DataLks'

export default function App() {
  useScrollToTop()
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
        <Route element={<ProtectedFromUser />}>
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Home />} />

              <Route path="/layanan">
                <Route index element={<Layanan />} />
                <Route path="bbp">
                  <Route index element={<BbpFilterBatch />} />
                  <Route path=":id" element={<LayananBbp />} />
                </Route>
                <Route path="linjamsos" element={<LayananLinjamsos />} />
                <Route path="dayasos" element={<LayananDayasos />} />
                <Route path="layanan-sktm" element={<LayananSktm />} />
                <Route path="layanan-dtks" element={<LayananDtks />} />
              </Route>

              <Route path="/data-master">
                <Route index element={<DataMaster />} />
                <Route path="info-data-master/:id" element={<InfoDataMaster />} />
              </Route>

              <Route path="/data-penerima">
                <Route index element={<DataPenerima />} />

                <Route path="Rehabsos">
                  <Route index element={<DataPenerimaRehabsos />} />
                  <Route path="bstlansia">
                    <Route index element={<DataBSTLansia/>} />
                    <Route path="create" element={<Djp />} />
                    <Route path="create/:id" element={<Djp />} />
                  </Route>
                  <Route path="bstdisab">
                    <Route index element={<DataBSTdisab />} />
                    <Route path="create" element={<Djp />} />
                    <Route path="create/:id" element={<Djp />} />
                  </Route>
                  <Route path="anak">
                    <Route index element={<DataBSTanak />} />
                    <Route path="create" element={<Djp />} />
                    <Route path="create/:id" element={<Djp />} />
                  </Route>
                  <Route path="ppks">
                    <Route index element={<DataPppks />} />
                    <Route path="create" element={<Djp />} />
                    <Route path="create/:id" element={<Djp />} />
                  </Route>
                  <Route path="izin-operasi-lks">
                    <Route index element={<DataLks />} />
                    <Route path="create" element={<Djp />} />
                    <Route path="create/:id" element={<Djp />} />
                  </Route>
                </Route>

                <Route path="dayasos">
                  <Route index element={<DataPenerimaDayasos />} />
                  <Route path="djpm">
                    <Route index element={<DataDjp />} />
                    <Route path="create" element={<Djp />} />
                    <Route path="create/:id" element={<Djp />} />
                  </Route>
                  <Route path="pokmas">
                    <Route index element={<DataPokmas />} />
                    <Route path="create" element={<Pokmas />} />
                    <Route path="create/:id" element={<Pokmas />} />
                  </Route>
                  <Route path="kube">
                    <Route index element={<DataKube />} />
                    <Route path="create" element={<Kube />} />
                    <Route path="create/:id" element={<Kube />} />
                  </Route>
                  <Route path="rumah-ibadah">
                    <Route index element={<DataRumahIbadah />} />
                    <Route path="create" element={<Ri />} />
                    <Route path="create/:id" element={<Ri />} />
                  </Route>
                  <Route path="veteran">
                    <Route index element={<DataVeteran />} />
                    <Route path="create" element={<Veteran />} />
                    <Route path="create/:id" element={<Veteran />} />
                  </Route>
                  <Route path="bho">
                    <Route index element={<DataHibah />} />
                    <Route path="create" element={<Hibah />} />
                    <Route path="create/:id" element={<Hibah />} />
                  </Route>
                  <Route path="bltbbm" element={<DataBltbbm />} />
                  <Route path="bpnt" element={<DataBpnt />} />
                </Route>

                <Route path="linjamsos">
                  <Route index element={<DataPenerimaLinjamsos />} />
                  <Route path="pkr">
                    <Route index element={<DataPkr />} />
                    <Route path="create" element={<Pkr />} />
                    <Route path="create/:id" element={<Pkr />} />
                  </Route>
                  <Route path="unregister">
                    <Route index element={<DataUnregister />} />
                    <Route path="create" element={<Unregister />} />
                    <Route path="create/:id" element={<Unregister />} />
                  </Route>
                  <Route path="bbp">
                    <Route index element={<DataBbp />} />
                    <Route path="create" element={<Bbp />} />
                  </Route>
                  <Route path="sktm">
                    <Route index element={<DataSktm />} />
                    <Route path="create" element={<Sktm />} />
                  </Route>
                  <Route path="pbi" element={<DataPbi />} />
                  <Route path="pkh" element={<DataPkh />} />
                </Route>
              </Route>

              <Route path="/event" element={<Event />} />
              <Route path="/data-dtks" element={<DataDtks />} />
              <Route path="/cek-riwayat-bansos" element={<CekRiwayatBansos />} />
              <Route path="/cek-data-dukcapil" element={<CekDataDukcapil />} />
              <Route path="/manajemen-role" element={<ManajemenRole />} />
              <Route path="/manajemen-user" element={<ManajemenUser />} />
              <Route path="/manajemen-admin" element={<ManajemenAdmin />} />
            </Route>
          </Route>
        </Route>

        <Route element={<ProtectedAuth />}>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        <Route element={<ProtectedFromDashboard />}>
          <Route element={<UserLayout />}>
            <Route path="/" element={<LandingPage />} />

            <Route path="/user">
              <Route path="cek-bansos" element={<CekBansosUser />} />
              <Route element={<UserProtectedAuth />}>
                <Route element={<AuthUserLayout />}>
                  <Route path="login" element={<LoginUser />} />
                  <Route path="successful" element={<SuccessfulRegister />} />
                  <Route path="success" element={<VerifiedAccount />} />
                  <Route path="register" element={<RegisterUser />} />
                  <Route path="forgot-password" element={<ForgotPasswordUser />} />
                  <Route path="reset-password" element={<UpdatePasswordUser />} />
                  <Route path="reset-password" element={<UpdatePasswordUser />} />
                </Route>
              </Route>

              <Route element={<UserProtectedRoute />}>
                <Route path="sktm">
                  <Route index element={<UserSktm />} />
                  <Route path="register" element={<SktmRegister />} />
                  <Route path="unregister" element={<SktmUnregister />} />
                  <Route path="register-religious" element={<SktmReligious />} />
                  <Route path="unregister-religious" element={<SktmUnregisterReligious />} />
                  <Route path="dtks-school" element={<DtksSchool />} />
                  <Route path="dtks-school/form" element={<SktmRegister />} />
                  <Route path="non-dtks-school" element={<NonDtksSchool />} />
                  <Route path="non-dtks-school/form" element={<SktmUnregister />} />
                  <Route path="dtks-courts" element={<DtksCourts />} />
                  <Route path="dtks-courts/form" element={<SktmReligious />} />
                  <Route path="non-dtks-courts" element={<NonDtksCourts />} />
                  <Route path="non-dtks-courts/form" element={<SktmUnregisterReligious />} />
                </Route>

                <Route path="bbp">
                  <Route index element={<BbpUser />} />
                  <Route path=":id" element={<BbpUser />} />
                  <Route path="form/:id" element={<BbpRegister />} />
                  <Route path="form/edit/:bbpId" element={<BbpRegister />} />
                </Route>

                <Route path="dtks">
                  <Route index element={<DtksUser />} />
                  <Route path="register-dtks" element={<DtksRegister />} />
                </Route>
                <Route path="submission-history" element={<SubmissionHistory />} />
                <Route path="profile" element={<ProfileLayout />}>
                  <Route index element={<ChangeProfile />} />
                  <Route path="change-password" element={<ChangePassword />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
        <Route path="/permission-denied" element={<Forbidden />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
