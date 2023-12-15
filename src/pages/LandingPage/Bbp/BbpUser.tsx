import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { HiAcademicCap, HiArrowDownTray } from 'react-icons/hi2'
import CardLandingPage from '../../../components/organisms/landingPage/CardLandingPage'
import { Button } from '@/components/ui/button'
import { Link, useParams } from 'react-router-dom'
import { useGetPublicEventTuition } from '@/store/server'
import { Loading, Markdown } from '@/components'
import { useDisableBodyScroll } from '@/hooks'
import * as React from 'react'
import { cn } from '@/lib/utils'

export default function BbpUser() {
  const { id } = useParams<{ id: string }>()
  const [details, setDetails] = React.useState('')
  const { data, isLoading, isSuccess } = useGetPublicEventTuition()

  useDisableBodyScroll(isLoading)

  React.useEffect(() => {
    if (id) {
      setDetails(data?.find((item) => item.id === id)?.eventDescription as string)
    } else {
      setDetails(data?.[0]?.eventDescription as string)
    }
  }, [isSuccess, id])

  if (isLoading) return <Loading />

  return (
    <section className="bg-[#F9F9F9] px-10 py-[38px]">
      <Tabs defaultValue="open">
        <div className="w-full bg-[#FFFFFF] border border-[#E4E4E4] rounded-lg">
          <p className="text-[26px] font-semibold mb-7 px-10 mt-9">Bantuan Biaya Pendidikan </p>
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
            {data?.map((item, index) => (
              <CardLandingPage
                key={index}
                className={cn('w-[400px]', (item.id === id || !id) && 'border-2 border-primary bg-[#F9F4F5] SH')}
                title={item.batch}
                desc={item.eventDescription}
                btnText="Pendaftaran Pengajuan"
                icon={HiAcademicCap}
                href={`/user/bbp/${item.id}`}
              />
            ))}
          </div>
          <section className="flex flex-col gap-8">
            <div className="bg-white rounded-lg px-10 py-14 h-fit">
              <p className="font-semibold text-xl">Informasi Tentang Beasiswa</p>
              <Markdown values={details} />

              <section className="flex flex-col gap-5 border-t border-zinc-200 py-3">
                <div className="flex gap-4 items-center justify-between w-full">
                  <p className="text-base font-semibold max-w-[80%]">Pengumuman Beasiswa Gel II</p>
                  <Button variant="outline" className="border-primary border-2 rounded-lg gap-2 items-center">
                    <p className="text-sm text-primary">Unduh</p>
                    <HiArrowDownTray className="text-xl text-primary" />
                  </Button>
                </div>
                <div className="flex gap-4 items-center justify-between w-full">
                  <p className="text-base font-semibold max-w-[80%]">
                    Biodata Mahasiswa Calon Penerima Bantuan Biaya Pendidikan
                  </p>
                  <Button variant="outline" className="border-primary border-2 rounded-lg gap-2 items-center">
                    <p className="text-sm text-primary">Unduh</p>
                    <HiArrowDownTray className="text-xl text-primary" />
                  </Button>
                </div>
                <div className="flex gap-4 items-center justify-between w-full">
                  <p className="text-base font-semibold max-w-[80%]">
                    Template Surat Permohonan Ditujukan Kepada Bapak Wali Kota Medan Cq. Kepala Dinas Sosial Kota Medan
                  </p>
                  <Button variant="outline" className="border-primary border-2 rounded-lg gap-2 items-center">
                    <p className="text-sm text-primary">Unduh</p>
                    <HiArrowDownTray className="text-xl text-primary" />
                  </Button>
                </div>
                <div className="flex gap-4 items-center justify-between w-full">
                  <p className="text-base font-semibold max-w-[80%]">
                    Template Surat Pernyataan Tidak Menerima Beasiswa/Bantuan Biaya Pendidikan Dari Sumber Lain{' '}
                  </p>
                  <Button variant="outline" className="border-primary border-2 rounded-lg gap-2 items-center">
                    <p className="text-sm text-primary">Unduh</p>
                    <HiArrowDownTray className="text-xl text-primary" />
                  </Button>
                </div>
                <div className="flex gap-4 items-center justify-between w-full">
                  <p className="text-base font-semibold max-w-[80%]">
                    Template Surat Pernyataan Tidak Berstatus Sebagai Aparatur Sipil Negara (Asn)
                  </p>
                  <Button variant="outline" className="border-primary border-2 rounded-lg gap-2 items-center">
                    <p className="text-sm text-primary">Unduh</p>
                    <HiArrowDownTray className="text-xl text-primary" />
                  </Button>
                </div>
              </section>
            </div>
            <Link to={`/user/bbp/form/${id ?? data?.[0].id}`}>
              <Button className="w-full py-8">
                <p className="text-xl">Daftar Sekarang</p>
              </Button>
            </Link>
          </section>
        </TabsContent>
        <TabsContent value="request" className="flex flex-row gap-10">
          <div className="w-[40%] h-[349px] bg-white rounded-lg bg-[url('@/assets/images/line-curve.svg')] bg-no-repeat">
            <div className="py-14 px-7">
              <HiAcademicCap className="w-[70px] h-[70px] text-primary" />
              <p className="text-xl  font-semibold py-[26px]">Bantuan Biaya Pendidikan Gelombang I 2023 </p>
              <Button className="disabled:bg-black w-full h-[60px]" disabled>
                <p className="text-xl text-white">Diproses</p>
              </Button>
            </div>
          </div>
          <div className="bg-white w-[925px]">
            <div className="pt-24 px-[90px] flex flex-row">
              <div className="bg-primary rounded-full w-[70px] h-[70px] flex items-center justify-center">
                <p className="text-white text-[26px]">1</p>
              </div>
              <div className="flex items-center ">
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
          </div>
        </TabsContent>
      </Tabs>
    </section>
  )
}
