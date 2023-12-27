import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { HiAcademicCap, HiBuildingLibrary } from 'react-icons/hi2'
import { PengajuanSktm, CardLandingPage } from '@/components'

export default function UserSktm() {
  return (
    <section className="bg-[#F9F9F9] lg:px-10 py-[38px] pb-[200px]">
      <Tabs defaultValue="open">
        <div className="w-full bg-[#FFFFFF] border border-[#E4E4E4] rounded-lg pt-10 lg:pt-0">
          <p className="md:text-[26px] text-[18px] font-semibold mb-7 px-9 mt-9">SKTM (Surat Keterangan Tidak Mampu)</p>
          <TabsList className="p-0 h-auto bg-white gap-5 px-7">
            <TabsTrigger
              value="open"
              className="shadow-none border-b-8 border-white text-black data-[state=active]:border-primary data-[state=active]:text-primary pb-5"
            >
              <p className="md:text-lg font-medium">Sedang dibuka</p>
            </TabsTrigger>
            <TabsTrigger
              value="request"
              className="shadow-none border-b-8 border-white text-black data-[state=active]:border-primary data-[state=active]:text-primary pb-5"
            >
              <p className="md:text-lg font-medium">Proses Pengajuan</p>
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent
          value="open"
          className="mt-11 lg:flex lg:flex-row lg:justify-between lg:place-items-start bg-[#F9F9F9] gap-10"
        >
          <div className="lg:flex lg:flex-col place-items-center gap-8 grid grid-cols-1">
            <CardLandingPage
              className="lg:w-[400px] w-[90%] shadow-sm "
              title={'SKTM Untuk Sekolah/Universitas (Terdaftar DTKS)'}
              desc={'Layanan Pengajuan SKTM (Surat Keterangan Tidak Mampu)'}
              btnText={'Pendaftaran Pengajuan'}
              icon={HiAcademicCap}
              href={'/user/sktm/dtks-school'}
            />
            <CardLandingPage
              className="lg:w-[400px] w-[90%] shadow-sm "
              title={'SKTM Untuk Sekolah / Universitas (Tidak Terdaftar DTKS)'}
              desc={'Layanan Pengajuan SKTM (Surat Keterangan Tidak Mampu)'}
              btnText={'Pendaftaran Pengajuan'}
              icon={HiAcademicCap}
              href={'/user/sktm/non-dtks-school'}
            />
            <CardLandingPage
              className="lg:w-[400px] w-[90%] shadow-sm "
              title={'SKTM Untuk Pelayanan ke Pengadilan Agama/LBH (Terdaftar DTKS)'}
              desc={'Layanan Pengajuan SKTM (Surat Keterangan Tidak Mampu)'}
              btnText={'Pendaftaran Pengajuan'}
              icon={HiBuildingLibrary}
              href={'/user/sktm/dtks-courts'}
            />
            <CardLandingPage
              className="lg:w-[400px] w-[90%] shadow-sm "
              title={'  SKTM Untuk Pelayanan ke Pengadilan Agama / LBH (TidakTerdaftarDTKS)'}
              desc={'Layanan Pengajuan SKTM (Surat Keterangan Tidak Mampu)'}
              btnText={'Pendaftaran Pengajuan'}
              icon={HiBuildingLibrary}
              href={'/user/sktm/non-dtks-courts'}
            />
          </div>
        </TabsContent>
        <TabsContent value="request" className="flex flex-row gap-10 mb-[100px] ">
          <PengajuanSktm href="/user/sktm" />
        </TabsContent>
      </Tabs>
    </section>
  )
}
