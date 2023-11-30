import { CardLink, Container } from '@/components'
import useTitle from '@/hooks/useTitle'
// import { Link } from 'react-router-dom'
import { HiEye, HiPlus } from 'react-icons/hi2'

const LayananDayasos = () => {
  useTitle('Layanan / Dayasos ')

  return (
    <Container className="px-[120px]">
      <h1 className="font-bold text-[32px] ">DAYASOS</h1>
      <div className="grid grid-cols-2 gap-x-[85px] gap-y-[45px] mt-10">
        <CardLink className="w-full rounded-2xl">
          <CardLink.Header
            className="h-[185px] flex-col"
            title="Bansos Dana Jasa Pelayanan (DJPM)"
            circlePosition="top"
          >
            <p className="pt-11 relative text-white text-base italic font-inter">Service Fund Assistance</p>
          </CardLink.Header>
          <CardLink.Footer href="/layanan/dayasos/Djp">
            <div className="flex gap-1 items-center">
              <HiPlus className="h-[30px] w-[30px] text-primary" />
              <p className="text-[25px] text-primary text-center font-bold ">Input Data</p>
            </div>
          </CardLink.Footer>
        </CardLink>
        <CardLink className="w-full rounded-2xl">
          <CardLink.Header
            className="h-[185px] flex-col px-10"
            title="Kelompok Masyarakat (POKMAS)"
            circlePosition="top"
          >
            <p className="pt-11 text-white text-base italic font-inter">Community Group</p>
          </CardLink.Header>
          <CardLink.Footer href="/layanan/dayasos/pokmas">
            <div className="flex gap-1 items-center">
              <HiPlus className="h-[30px] w-[30px] text-primary" />
              <p className="text-[25px] text-primary text-center font-bold ">Input Data</p>
            </div>
          </CardLink.Footer>
        </CardLink>
        <CardLink className="w-full rounded-2xl">
          <CardLink.Header className="h-[185px] flex-col" title="Bantuan Pangan Non Tunai (BPNT)" circlePosition="top">
            <p className="pt-11 text-white text-base italic font-inter">Joint Business Group</p>
          </CardLink.Header>
          <CardLink.Footer href="/data-penerima/dayasos/data-bpnt">
            <div className="flex gap-3 items-center">
              <HiEye className="h-[30px] w-[30px] text-primary" />
              <p className="text-[25px] text-primary text-center font-bold ">Lihat Data</p>
            </div>
          </CardLink.Footer>
        </CardLink>
        <CardLink className="w-full rounded-2xl">
          <CardLink.Header
            className="h-[185px] flex-col"
            title="Bansos Hibah Organisasi/ Lembaga"
            circlePosition="bottom"
          >
            <p className="pt-11 text-white text-base italic font-inter">Organization Grant Assistance</p>
          </CardLink.Header>
          <CardLink.Footer href="/layanan/dayasos/hibah">
            <div className="flex gap-1 items-center">
              <HiPlus className="h-[30px] w-[30px] text-primary" />
              <p className="text-[25px] text-primary text-center font-bold ">Input Data</p>
            </div>
          </CardLink.Footer>
        </CardLink>
        <CardLink className="w-full rounded-2xl">
          <CardLink.Header className="h-[185px] flex-col" title="Rumah Ibadah" circlePosition="bottom">
            <p className="pt-11 text-white text-base italic font-inter">House of Worship</p>
          </CardLink.Header>
          <CardLink.Footer href="/layanan/dayasos/ri">
            <div className="flex gap-1 items-center">
              <HiPlus className="h-[30px] w-[30px] text-primary" />
              <p className="text-[25px] text-primary text-center font-bold ">Input Data</p>
            </div>
          </CardLink.Footer>
        </CardLink>
        <CardLink className="w-full rounded-2xl">
          <CardLink.Header className="h-[185px] flex-col" title="Veteran" circlePosition="top">
            <p className="pt-11 text-white text-base italic font-inter">Veteran</p>
          </CardLink.Header>
          <CardLink.Footer href="/layanan/dayasos/veteran">
            <div className="flex gap-1 items-center">
              <HiPlus className="h-[30px] w-[30px] text-primary" />
              <p className="text-[25px] text-primary text-center font-bold ">Input Data</p>
            </div>
          </CardLink.Footer>
        </CardLink>
        <CardLink className="w-full rounded-2xl">
          <CardLink.Header className="h-[185px] flex-col" title="Kelompok Usaha Bersama (KUBE)" circlePosition="top">
            <p className="pt-11 text-white text-base italic font-inter">Joint Business Group </p>
          </CardLink.Header>
          <CardLink.Footer href="/layanan/dayasos/kube">
            <div className="flex gap-1 items-center">
              <HiPlus className="h-[30px] w-[30px] text-primary" />
              <p className="text-[25px] text-primary text-center font-bold ">Input Data</p>
            </div>
          </CardLink.Footer>
        </CardLink>
      </div>
    </Container>
  )
}
export default LayananDayasos
