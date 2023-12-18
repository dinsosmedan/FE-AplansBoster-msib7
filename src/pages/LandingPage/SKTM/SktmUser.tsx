import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { HiAcademicCap, HiBuildingLibrary } from 'react-icons/hi2'
import CardLandingPage from '../../../components/organisms/landingPage/CardLandingPage'
import { Button } from '@/components/ui/button'
import { BgEmpty } from '@/assets'
import { Link } from 'react-router-dom'

export default function UserSktm() {
  return (
    <section className="bg-[#F9F9F9] px-10 py-[38px]">
      <Tabs defaultValue="open">
        <div className="w-full bg-[#FFFFFF] border border-[#E4E4E4] rounded-lg">
          <p className="text-[26px] font-semibold mb-7 px-10 mt-9">SKTM (Surat Keterangan Tidak Mampu)</p>
          <TabsList className="p-0 h-auto bg-white gap-5 px-7">
            <TabsTrigger
              value="open"
              className="shadow-none border-b-8 border-white text-black data-[state=active]:border-primary data-[state=active]:text-primary pb-5"
            >
              <p className="text-lg font-medium">Sedang dibuka</p>
            </TabsTrigger>
            <TabsTrigger
              value="request"
              className="shadow-none border-b-8 border-white text-black data-[state=active]:border-primary data-[state=active]:text-primary pb-5"
            >
              <p className="text-lg font-medium">Proses Pengajuan</p>
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="open" className="mt-11 flex flex-row justify-between bg-[#F9F9F9] gap-10">
          <div className="flex flex-col gap-8">
            <CardLandingPage
              className="w-[400px]"
              title={'SKTM Untuk Sekolah/Universitas (Terdaftar DTKS)'}
              desc={'Layanan Pengajuan SKTM (Surat Keterangan Tidak Mampu)'}
              btnText={'Pendaftaran Pengajuan'}
              icon={HiAcademicCap}
              href={'/user/sktm/dtks-school'}
            />
            <CardLandingPage
              className="w-[400px]"
              title={'SKTM Untuk Sekolah / Universitas (Tidak Terdaftar DTKS)'}
              desc={'Layanan Pengajuan SKTM (Surat Keterangan Tidak Mampu)'}
              btnText={'Pendaftaran Pengajuan'}
              icon={HiAcademicCap}
              href={'/user/sktm/non-dtks-school'}
            />
            <CardLandingPage
              className="w-[400px]"
              title={'SKTM Untuk Pelayanan ke Pengadilan Agama/LBH (Terdaftar DTKS)'}
              desc={'Layanan Pengajuan SKTM (Surat Keterangan Tidak Mampu)'}
              btnText={'Pendaftaran Pengajuan'}
              icon={HiBuildingLibrary}
              href={'/user/sktm/dtks-courts'}
            />
            <CardLandingPage
              className="w-[400px]"
              title={'  SKTM Untuk Pelayanan ke Pengadilan Agama / LBH (TidakTerdaftarDTKS)'}
              desc={'Layanan Pengajuan SKTM (Surat Keterangan Tidak Mampu)'}
              btnText={'Pendaftaran Pengajuan'}
              icon={HiBuildingLibrary}
              href={'/user/sktm/non-dtks-courts'}
            />
          </div>
        </TabsContent>
        <TabsContent value="request" className="flex flex-row gap-10 ">
          <div className="w-[1356px] h-[540px] bg-white">
            <div className="py- flex flex-col items-center justify-center gap-8">
              <img src={BgEmpty} alt="" />
              <p className="text-[32px] font-semibold">Tidak Ada Proses Pengajuan</p>
              <p className="text-[#8B8B8B] text-xl">Mohon Maaf, Anda Belum Melakukan Pengajuan</p>
              <Link to={'/'}>
                <Button className="py-8 px-7">
                  <p className="text-2xl text-white font-semibold">AJUKAN BANSOS</p>
                </Button>
              </Link>
            </div>
          </div>
          {/* <div className="w-[40%] h-[349] bg-white rounded-lg bg-[url('@/assets/images/line-curve.svg')] bg-no-repeat">
            <div className="py-14 px-7">
              <HiAcademicCap className="w-[70px] h-[70px] text-primary" />
              <p className="text-xl font-semibold py-[26px]">SKTM Untuk Sekolah Universitas (Terdaftar DTKS)</p>
              <Button className="disabled:bg-black w-full h-[60px]  " disabled>
                <p className="text-xl text-white">Diproses</p>
              </Button>
            </div>
          </div>
          <div className="bg-white w-[925px]">
            <div className="pt-24 px-[90px] flex flex-row">
              <div className="bg-primary rounded-full w-[70px] h-[70px] flex items-center justify-center">
                <p className="text-white text-[26px]">1</p>
              </div>
              <div className="flex items-center px-2 ">
                <div className="border-2 border-dashed w-[250px] h-0 border-primary " />
              </div>
              <div className="bg-white border-2 border-primary rounded-full w-[70px] h-[70px] flex items-center justify-center">
                <p className="text-primary text-[26px]">2</p>
              </div>
              <div className="flex items-center px-2 ">
                <div className="border-2 border-dashed w-[250px] h-0 border-primary " />
              </div>
              <div className="bg-white border-2 border-primary rounded-full w-[70px] h-[70px] flex items-center justify-center">
                <p className="text-primary text-[26px]">3</p>
              </div>
            </div>
            <div className="flex flex-row items-center justify-center pt-3 gap-[200px] ">
              <div className="w-[135px] h-[60px] bg-primary rounded-lg flex items-center">
                <p className="text-base text-white text-center">Pengajuan Terkirim</p>
              </div>
              <div className="w-[135px] h-[60px] rounded-lg flex items-center">
                <p className="text-base text-[##858585] text-center">Pengajuan Diproses</p>
              </div>
              <div className="w-[135px] h-[80px] rounded-lg flex items-center">
                <p className="text-base text-[##858585] text-center max-w">Pengajuan Diterima / Ditolak</p>
              </div>
            </div>
          </div> */}
        </TabsContent>
      </Tabs>
    </section>
  )
}
