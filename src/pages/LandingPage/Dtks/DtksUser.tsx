import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { HiAcademicCap, HiGift } from 'react-icons/hi2'
import CardLandingPage from '../../../components/organisms/landingPage/CardLandingPage'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useGetDTKSApplicationPublic } from '@/store/server'
import { Loading } from '@/components'
import { useDisableBodyScroll } from '@/hooks'
import { formatToView } from '@/lib/services/formatDate'

export default function DtksUser() {
  const { isLoading, data } = useGetDTKSApplicationPublic()
  useDisableBodyScroll(isLoading)
  if (isLoading) return <Loading />

  return (
    <section className="bg-[#F9F9F9] lg:px-10 py-[38px] pb-[200px]">
      <Tabs defaultValue="open">
        <div className="w-full bg-[#FFFFFF] border border-[#E4E4E4] rounded-lg pt-10 lg:pt-0">
          <p className="md:text-[26px] text-[18px] font-semibold mb-7 px-9 mt-9">
            DTKS (Data Terpadu Kesejahteraan Sosial)
          </p>
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
          <div className="flex gap-8 lg:flex-col lg:justify-start justify-center">
            <CardLandingPage
              className="lg:w-[400px] w-[90%] shadow-sm border-2 border-primary bg-[#F9F4F5]"
              title={'DTKS (Data Terpadu Kesejahteraan Sosial) '}
              desc={'Layanan Pengajuan DTKS (Data Terpadu Kesejahteraan Sosial)'}
              btnText={'Pendaftaran Pengajuan'}
              icon={HiGift}
              href={'/user/dtks'}
            />
          </div>
          <section className="flex flex-col gap-5 md:gap-8 w-[95%] mt-5 lg:mt-0 lg:justify-start justify-center">
            <div className="bg-white rounded-lg md:px-10 px-7 md:py-14 py-9 h-fit shadow">
              <p className="font-semibold text-lg md:pb-6 pb-3">File yang perlu diupload:</p>
              <ol className="list-decimal list-inside pl-3">
                <li className="text-md leading-relaxed">Scan Foto KTP/KK</li>
                <li className="text-md leading-relaxed">Foto Rumah</li>
              </ol>
            </div>
            <Link to={'/user/dtks/register-dtks'}>
              <Button className="w-full py-6">
                <p className="text-lg">Daftar Sekarang</p>
              </Button>
            </Link>
          </section>
        </TabsContent>
        <TabsContent
          value="request"
          className="flex md:flex-row flex-col items-center md:items-start gap-10 mb-[100px] px-6 md:px-0"
        >
          <div className="lg:w-[550px] w-[90%] shadow-sm border-2 border-primary bg-[#F9F4F5] h-[349px] rounded-lg bg-[url('@/assets/images/line-curve.svg')] bg-no-repeat">
            <div className="pt-14 px-7">
              <HiAcademicCap className="w-[70px] h-[70px] text-primary" />
              <p className="text-xl font-semibold pt-[26px]">DTKS (Data Terpadu Kesejahteraan Sosial)</p>
              <p className="pb-[26px] pt-3">{formatToView(data?.updatedAt as string)}</p>
              <Button className="disabled:bg-black w-full h-[60px]" disabled>
                <p className="text-xl text-white">{data?.isApproved ? 'Diterima' : 'Diproses'}</p>
              </Button>
            </div>
          </div>
          <div className="bg-white md:w-full w-fit md:px-0 p-10 md:p-0 md:pb-24 flex flow-row md:flex-col justify-center items-center rounded-lg md:rounded-none">
            <div className="md:pt-24 pr-8 md:px-[90px] flex justify-center md:flex-row flex-col items-center">
              <div
                className={cn(
                  'rounded-full w-[70px] h-[70px] flex items-center justify-center border-primary',
                  'bg-primary text-white'
                )}
              >
                <p className="text-xl md:text-[26px]">1</p>
              </div>
              <div className="flex items-center">
                <div className="border-2 border-dashed h-[100px] md:w-[250px] md:h-0 border-primary" />
              </div>
              <div
                className={cn(
                  'border-2 border-primary rounded-full w-[70px] h-[70px] flex items-center justify-center',
                  data?.isApproved ? 'bg-primary text-white' : 'bg-white text-primary'
                )}
              >
                <p className="text-xl md:text-[26px]">2</p>
              </div>
            </div>
            <div className="flex md:flex-row items-center justify-center pt-3 gap-[100px] md:gap-[200px] flex-col">
              <div className="w-[135px] h-[60px] rounded-lg px-2 flex items-center bg-primary text-white">
                <p className="md:text-base text-sm text-center">Pengajuan Terkirim</p>
              </div>
              <div
                className={cn(
                  'w-[135px] h-[60px] rounded-lg flex items-center',
                  data?.isApproved ? 'bg-primary text-white' : 'bg-white text-primary'
                )}
              >
                <p className="md:text-base text-sm text-center">Pengajuan Diterima</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  )
}
