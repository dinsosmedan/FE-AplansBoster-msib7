import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { HiAcademicCap, HiArrowDownTray, HiGift } from 'react-icons/hi2'
import CardLandingPage from '../../../components/organisms/landingPage/CardLandingPage'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export default function DtksUser() {
  return (
    <section className="bg-[#F9F9F9] px-10 py-[38px]">
      <Tabs defaultValue="open">
        <div className="w-full bg-[#FFFFFF] border border-[#E4E4E4] rounded-lg">
          <p className="text-[26px] font-semibold mb-7 px-10 mt-9">DTKS (Data Terpadu Kesejahteraan Sosial)</p>
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
              title={'DTKS (Data Terpadu Kesejahteraan Sosial) '}
              desc={'Layanan Pengajuan DTKS (Data Terpadu Kesejahteraan Sosial)'}
              btnText={'Pendaftaran Pengajuan'}
              icon={HiGift}
              href={'/'}
            />
          </div>
          <section className="flex flex-col gap-8 w-full">
            <div className=" bg-white rounded-lg px-10 py-14">
              <p className="font-semibold text-xl pb-6">Persyaratan</p>
              <ol className="list-decimal list-inside pl-3">
                <li className="text-lg leading-relaxed">Foto KTP/KK</li>
                <li className="text-lg leading-relaxed">Fotocopy </li>
              </ol>
            </div>
            <Link to={'/user/dtks/register-dtks'}>
              <Button className="w-full py-8">
                <p className="text-xl">Daftar Sekarang</p>
              </Button>
            </Link>
          </section>
        </TabsContent>
        <TabsContent value="request" className="flex flex-row gap-10">
          <div className="w-[40%] h-[349] bg-white rounded-lg bg-[url('@/assets/images/line-curve.svg')] bg-no-repeat">
            <div className="py-14 px-7">
              <HiAcademicCap className="w-[70px] h-[70px] text-primary" />
              <p className="text-xl  font-semibold py-[26px]">DTKS (Data Terpadu Kesejahteraan Sosial) </p>
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
