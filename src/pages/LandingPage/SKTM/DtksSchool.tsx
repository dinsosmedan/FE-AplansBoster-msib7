import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { HiAcademicCap, HiArrowDownTray, HiBuildingLibrary } from 'react-icons/hi2'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useGetIndigencyCertificateApplicationPublic } from '@/store/server'
import { Loading, CardLandingPage, NoData } from '@/components'
import { cn } from '@/lib/utils'
import { BgEmpty } from '@/assets'

export default function DtksSchool() {
  const { data, isLoading } = useGetIndigencyCertificateApplicationPublic('dtks-schools')

  if (isLoading) return <Loading />

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
        <TabsContent value="open" className="mt-11 lg:flex lg:flex-row lg:justify-between grid place-items-center lg:place-items-start bg-[#F9F9F9] gap-10">
          <div className="flex flex-col place-items-center gap-8 grid grid-cols-1 lg:px-10">
            <CardLandingPage
              className="lg:w-[400px] w-[90%] shadow-sm border-2 border-primary bg-[#F9F4F5] "
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
              <div className="md:flex gap-4 items-center pt-6 justify-between">
                <p className="text-lg text-primary font-medium">Download Template Surat Permohonan</p>
                <Button variant="outline" className="border-primary border-2 rounded-lg md:w-[25%] lg:w-[15%] w-[100%] mt-5 md:mt-0">
                  <p className="text-base text-primary">Unduh</p>
                  <HiArrowDownTray className="text-2xl ml-2 text-primary" />
                </Button>
              </div>
            </div>
            <Link to={'/user/sktm/dtks-school/form'}>
              <Button className="w-full py-6">
                <p className="text-lg">Daftar Sekarang</p>
              </Button>
            </Link>
          </section>
        </TabsContent>
        <TabsContent value="request" className="flex flex-row gap-10 mb-[100px] ">
          {data?.length !== 0 ? (
            <>
              {data?.map((item, index) => (
                <div
                  key={index}
                  className="min-w-[400px] h-fit bg-white rounded-lg bg-[url('@/assets/images/line-curve.svg')] bg-no-repeat border-2 border-primary"
                >
                  <div className="mt-14 pb-5 px-7">
                    <HiAcademicCap className="w-[70px] h-[70px] text-primary" />
                    <p className="text-xl font-semibold py-[26px]">SKTM Untuk Sekolah/Universitas (Terdaftar DTKS)</p>
                    <Button className="disabled:bg-black w-full h-[60px]" disabled>
                      <p className="text-xl text-white capitalize">{item.applicationStatus}</p>
                    </Button>
                  </div>
                </div>
              ))}
              <div className="bg-white w-full pb-14">
                <div className="pt-24 px-[90px] flex flex-row justify-center">
                  <div
                    className={cn(
                      'border-2 border-primary rounded-full w-[70px] h-[70px] flex items-center justify-center',
                      data?.[0].applicationStatus === 'pending' ||
                        data?.[0].applicationStatus === 'processed' ||
                        data?.[0].applicationStatus === 'rejected' ||
                        data?.[0].applicationStatus === 'approved' ||
                        data?.[0].applicationStatus === 'revision'
                        ? 'bg-primary text-white'
                        : 'bg-white text-primary'
                    )}
                  >
                    <p className="text-[26px]">1</p>
                  </div>
                  <div className="flex items-center">
                    <div className="border-2 border-dashed w-[250px] h-0 border-primary" />
                  </div>
                  <div
                    className={cn(
                      'border-2 border-primary rounded-full w-[70px] h-[70px] flex items-center justify-center',
                      data?.[0].applicationStatus === 'processed' ||
                        data?.[0].applicationStatus === 'rejected' ||
                        data?.[0].applicationStatus === 'approved' ||
                        data?.[0].applicationStatus === 'revision'
                        ? 'bg-primary text-white'
                        : 'bg-white text-primary'
                    )}
                  >
                    <p className="text-[26px]">2</p>
                  </div>
                  <div className="flex items-center px-2 ">
                    <div className="border-2 border-dashed w-[250px] h-0 border-primary " />
                  </div>
                  <div
                    className={cn(
                      'border-2 border-primary rounded-full w-[70px] h-[70px] flex items-center justify-center',
                      data?.[0].applicationStatus === 'rejected' ||
                        data?.[0].applicationStatus === 'approved' ||
                        data?.[0].applicationStatus === 'revision'
                        ? 'bg-primary text-white'
                        : 'bg-white text-primary'
                    )}
                  >
                    <p className="text-[26px]">3</p>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-center pt-3 gap-[200px] ">
                  <div
                    className={cn(
                      'w-[135px] h-[60px] rounded-lg flex items-center',
                      (data?.[0].applicationStatus === 'pending' ||
                        data?.[0].applicationStatus === 'processed' ||
                        data?.[0].applicationStatus === 'rejected' ||
                        data?.[0].applicationStatus === 'approved' ||
                        data?.[0].applicationStatus === 'revision') &&
                        'bg-primary text-white'
                    )}
                  >
                    <p className="text-base text-center">Pengajuan Terkirim</p>
                  </div>
                  <div
                    className={cn(
                      'w-[135px] h-[60px] rounded-lg flex items-center',
                      (data?.[0].applicationStatus === 'processed' ||
                        data?.[0].applicationStatus === 'rejected' ||
                        data?.[0].applicationStatus === 'approved' ||
                        data?.[0].applicationStatus === 'revision') &&
                        'bg-primary text-white'
                    )}
                  >
                    <p className="text-base text-[##858585] text-center">Pengajuan Diproses</p>
                  </div>
                  <div
                    className={cn(
                      'w-[135px] h-[60px] rounded-lg flex items-center',
                      (data?.[0].applicationStatus === 'rejected' ||
                        data?.[0].applicationStatus === 'approved' ||
                        data?.[0].applicationStatus === 'revision') &&
                        'bg-primary text-white'
                    )}
                  >
                    <p className="text-base text-[##858585] text-center max-w">Pengajuan Diterima / Ditolak</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <NoData
              title="Tidak Ada Proses Pengajuan"
              desc="Mohon Maaf, Anda Belum Melakukan Pengajuan"
              image={BgEmpty}
              className="w-full"
            />
          )}
        </TabsContent>
      </Tabs>
    </section>
  )
}
