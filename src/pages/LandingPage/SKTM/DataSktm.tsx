import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { HiAcademicCap, HiArrowDownTray, HiBuildingLibrary } from 'react-icons/hi2'
import CardLandingPage from './../../../components/organisms/landingPage/CardLandingPage'
import { Button } from '@/components/ui/button'

export default function UserSktm() {
  return (
    <section className="bg-[#F9F9F9] px-10 pt-[38px]">
      <Tabs defaultValue="account" className="pb-[200px] pl-10">
        <div className="w-full bg-[#FFFFFF]">
          <p className="text-[26px] font-semibold pl-10 py-5">SKTM (Surat Keterangan Tidak Mampu)</p>
          <TabsList className="w-[450px] bg-white">
            <TabsTrigger
              value="account"
              className="w-full data-[state=active]:border-b-8 data-[state=active]:border-primary pb-5"
            >
              <p className="text-xl">Sedang dibuka</p>
            </TabsTrigger>
            <TabsTrigger
              value="password"
              className="w-full data-[state=active]:border-b-8 data-[state=active]:border-primary pb-5"
            >
              <p className="text-xl">Proses Pengajuan</p>
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="account" className="mt-11 flex flex-row justify-between bg-[#F9F9F9] gap-10">
          <div className="flex flex-col gap-8">
            <CardLandingPage
              className="w-[400px]"
              title={'SKTM Untuk Sekolah/Universitas (Terdaftar DTKS)'}
              desc={'Layanan Pengajuan SKTM (Surat Keterangan Tidak Mampu)'}
              btnText={'Pendaftaran Pengajuan'}
              icon={HiAcademicCap}
              href={'/'}
            />
            <CardLandingPage
              className="w-[400px]"
              title={'SKTM Untuk Sekolah / Universitas (Tidak Terdaftar DTKS)'}
              desc={'Layanan Pengajuan SKTM (Surat Keterangan Tidak Mampu)'}
              btnText={'Pendaftaran Pengajuan'}
              icon={HiAcademicCap}
              href={'/'}
            />
            <CardLandingPage
              className="w-[400px]"
              title={'SKTM Untuk Pelayanan ke Pengadilan Agama/LBH (Terdaftar DTKS)'}
              desc={'Layanan Pengajuan SKTM (Surat Keterangan Tidak Mampu)'}
              btnText={'Pendaftaran Pengajuan'}
              icon={HiBuildingLibrary}
              href={'/'}
            />
            <CardLandingPage
              className="w-[400px]"
              title={'  SKTM Untuk Pelayanan ke Pengadilan Agama / LBH (TidakTerdaftarDTKS)'}
              desc={'Layanan Pengajuan SKTM (Surat Keterangan Tidak Mampu)'}
              btnText={'Pendaftaran Pengajuan'}
              icon={HiBuildingLibrary}
              href={'/'}
            />
          </div>
          <div className="h-[480px] bg-white rounded-lg">
            <p className="font-semibold text-xl pl-6 pt-[50px]">Persyaratan</p>
            <div className="px-10 py-7">
              <ol className="list-decimal py-5">
                <li className="text-xl">
                  Mengisi Template Surat Permohonan yang bisa di download di bawah untuk di tujukan kepada Bapak Kepala
                  Dinas Sosial Kota Medan;
                </li>
                <li className="text-xl">Fotocopy Surat Domisili dari Kelurahan Setempat;</li>
                <li className="text-xl">Fotocopy Kartu Keluarga;</li>
                <li className="text-xl">Fotocopy Kartu Tanda Penduduk (KTP);</li>
                <li className="text-xl">Jenjang SD-SMA: Surat Keterangan dari sekolah</li>
                <li className="text-xl">
                  Jenjang Universitas: Print-an Surat Pengumuman dari Pihak Universitas baik berupa download-an alamat
                  link online atau pengumuman dari universitas.
                </li>
              </ol>
            </div>
            <div className="flex gap-4 items-center pl-6 ">
              <p className="text-xl text-primary font-medium">Download Template Surat Permohonan</p>
              <Button variant="outline" className="border-primary border-2">
                <p className="text-base text-primary">Unduh</p>
                <HiArrowDownTray className="text-2xl ml-2 text-primary" />
              </Button>
            </div>
            <Button className="w-full h-[60px] mt-[60px]">
              <p className="text-xl">Daftar Sekarang</p>
              {/* kr */}
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="password" className="flex flex-row gap-10 ">
          <div className="w-[40%] h-[349] bg-white rounded-lg bg-[url('@/assets/images/line-curve.svg')] bg-no-repeat">
            <div className="py-14 px-7">
              <HiAcademicCap className="w-[70px] h-[70px] text-primary" />
              <p className="text-xl font-semibold py-[26px]">SKTM Untuk Sekolah Universitas (Terdaftar DTKS)</p>
              <Button className="disabled:bg-[#535151] w-full h-[60px]" disabled>
                <p className="text-xl text-white">Diproses</p>
              </Button>
            </div>
          </div>
          <div className="bg-white w-full">
            <div className="pt-24 px-[90px] flex flex-row">
              <div className="bg-primary rounded-full w-[70px] h-[70px] flex items-center justify-center">
                <p className="text-white text-[26px]">1</p>
              </div>
              <div className="flex items-center px-2 ">
                <div className="border-2 border-dashed w-[280px] h-0 border-primary " />
              </div>
              <div className="bg-primary rounded-full w-[70px] h-[70px] flex items-center justify-center">
                <p className="text-white text-[26px]">2</p>
              </div>
              <div className="flex items-center px-2 ">
                <div className="border-2 border-dashed w-[280px] h-0 border-primary " />
              </div>
              <div className="bg-primary rounded-full w-[70px] h-[70px] flex items-center justify-center">
                <p className="text-white text-[26px]">3</p>
              </div>
            </div>
            <div className="flex flex-row items-center justify-center pt-3 gap-[225px] ">
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
          </div>
        </TabsContent>
      </Tabs>
    </section>
  )
}
