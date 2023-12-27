import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { HiAcademicCap, HiArrowDownTray, HiBuildingLibrary } from 'react-icons/hi2'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { CardLandingPage, PengajuanSktm } from '@/components'

export default function NonDtksSchool() {
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
          className="mt-11 lg:flex lg:flex-row lg:justify-between grid place-items-center lg:place-items-start bg-[#F9F9F9] gap-10"
        >
          <div className="flex flex-col place-items-center gap-8 grid grid-cols-1 lg:px-10">
            <CardLandingPage
              className="lg:w-[400px] w-[90%] shadow-sm"
              title={'SKTM Untuk Sekolah/Universitas (Terdaftar DTKS)'}
              desc={'Layanan Pengajuan SKTM (Surat Keterangan Tidak Mampu)'}
              btnText={'Pendaftaran Pengajuan'}
              icon={HiAcademicCap}
              href={'/user/sktm/dtks-school'}
            />
            <CardLandingPage
              className="lg:w-[400px] w-[90%] shadow-sm border-2 border-primary bg-[#F9F4F5]"
              title={'SKTM Untuk Sekolah / Universitas (Tidak Terdaftar DTKS)'}
              desc={'Layanan Pengajuan SKTM (Surat Keterangan Tidak Mampu)'}
              btnText={'Pendaftaran Pengajuan'}
              icon={HiAcademicCap}
              href={'/user/sktm/non-dtks-school'}
            />
            <CardLandingPage
              className="lg:w-[400px] w-[90%] shadow-sm"
              title={'SKTM Untuk Pelayanan ke Pengadilan Agama/LBH (Terdaftar DTKS)'}
              desc={'Layanan Pengajuan SKTM (Surat Keterangan Tidak Mampu)'}
              btnText={'Pendaftaran Pengajuan'}
              icon={HiBuildingLibrary}
              href={'/user/sktm/dtks-courts'}
            />
            <CardLandingPage
              className="lg:w-[400px] w-[90%] shadow-sm"
              title={'  SKTM Untuk Pelayanan ke Pengadilan Agama / LBH (TidakTerdaftarDTKS)'}
              desc={'Layanan Pengajuan SKTM (Surat Keterangan Tidak Mampu)'}
              btnText={'Pendaftaran Pengajuan'}
              icon={HiBuildingLibrary}
              href={'/user/sktm/non-dtks-courts'}
            />
          </div>
          <section className="flex flex-col gap-8 w-[95%] mt-5 lg:mt-0 lg:justify-start justify-center">
            <div className="h-fit bg-white rounded-lg px-10 py-14 shadow">
              <p className="font-semibold text-lg pb-6">Persyaratan</p>
              <ol className="list-decimal list-inside pl-3">
                <li className="text-md leading-relaxed">
                  Mengisi Template Surat Permohonan yang bisa di download di bawah untuk di tujukan kepada Bapak Kepala
                  Dinas Sosial Kota Medan;
                </li>
                <li className="text-md leading-relaxed">Fotocopy Surat Domisili dari Kelurahan Setempat;</li>
                <li className="text-md leading-relaxed">Fotocopy Kartu Keluarga;</li>
                <li className="text-md leading-relaxed">Fotocopy Kartu Tanda Penduduk (KTP);</li>
                <li className="text-md leading-relaxed">Jenjang SD-SMA: Surat Keterangan dari sekolah</li>
                <li className="text-md leading-relaxed">
                  Jenjang Universitas: Print-an Surat Pengumuman dari Pihak Universitas baik berupa download-an alamat
                  link online atau pengumuman dari universitas.
                </li>
              </ol>
              <p className="font-semibold text-lg py-6">Tambahan syarat bagi warga tidak terdaftar DTKS:</p>
              <ol className="list-decimal list-inside pl-3">
                <li className="text-md leading-relaxed">Fotocopy Slip Gaji</li>
                <li className="text-md leading-relaxed">
                  Surat Keterangan dari Kepling apabila tinggal menumpang/sewa ditandatangani pakai materai Rp. 10.000,-
                </li>
                <li className="text-md leading-relaxed">
                  Surat pernyataan berpenghasilan di bawah UMR (±Rp. 3.000.000,-) ditandatangani lurah
                </li>
                <li className="text-md leading-relaxed">Photo rumah (tampak depan, ruang tamu, kamar, dan dapur)</li>
              </ol>
              <div className="md:flex gap-4 items-center pt-6 justify-between">
                <p className="text-lg text-primary font-medium">Download Template Surat Permohonan</p>
                <Button
                  variant="outline"
                  className="border-primary border-2 rounded-lg md:w-[25%] lg:w-[15%] w-[100%] mt-5 md:mt-0"
                >
                  <p className="text-base text-primary">Unduh</p>
                  <HiArrowDownTray className="text-2xl ml-2 text-primary" />
                </Button>
              </div>
            </div>
            <Link to={'/user/sktm/non-dtks-school/form'}>
              <Button className="w-full py-6">
                <p className="text-lg">Daftar Sekarang</p>
              </Button>
            </Link>
          </section>
        </TabsContent>
        <TabsContent value="request" className="flex flex-row gap-10 mb-[100px] ">
          <PengajuanSktm href="/user/sktm/non-dtks-school" />
        </TabsContent>
      </Tabs>
    </section>
  )
}
