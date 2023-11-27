import { CardLink, Container } from '@/components'
import useTitle from '@/hooks/useTitle'
// import { Link } from 'react-router-dom'
import { HiEye } from 'react-icons/hi2'

const DataPenerimaRehabsos = () => {
  useTitle('Data Penerima / Rehabsos ')

  return (
    <Container className="px-[120px]">
      <h1 className="font-bold text-2xl ">REHABSOS</h1>
      <div className="grid grid-cols-2 gap-x-[85px] gap-y-[45px] mt-10">
        <CardLink className="w-full rounded-2xl">
          <CardLink.Header className="h-[185px] flex-col" title="Anak Anak" circlePosition="bottom">
            <p className="pt-11 text-white text-base italic font-inter">Children</p>
          </CardLink.Header>
          <CardLink.Footer href="/layanan/rehabsos">
            <div className="flex gap-3 items-center">
              <HiEye className="h-[30px] w-[30px] text-primary" />
              <p className="text-[25px] text-primary text-center font-bold ">Lihat Data</p>
            </div>
          </CardLink.Footer>
        </CardLink>
        <CardLink className="w-full rounded-2xl">
          <CardLink.Header className="h-[185px] flex-col" title="Disabilitas" circlePosition="bottom">
            <p className="pt-11 text-white text-base italic font-inter">Disability</p>
          </CardLink.Header>
          <CardLink.Footer href="/layanan/rehabsos">
            <div className="flex gap-3 items-center">
              <HiEye className="h-[30px] w-[30px] text-primary" />
              <p className="text-[25px] text-primary text-center font-bold ">Lihat Data</p>
            </div>
          </CardLink.Footer>
        </CardLink>
        <CardLink className="w-full rounded-2xl">
          <CardLink.Header className="h-[185px] flex-col" title="Korban Perdagangan Orang" circlePosition="bottom">
            <p className="pt-11 text-white text-base italic font-inter">People Trade</p>
          </CardLink.Header>
          <CardLink.Footer href="/layanan/rehabsos">
            <div className="flex gap-3 items-center">
              <HiEye className="h-[30px] w-[30px] text-primary" />
              <p className="text-[25px] text-primary text-center font-bold ">Lihat Data</p>
            </div>
          </CardLink.Footer>
        </CardLink>
        <CardLink className="w-full rounded-2xl">
          <CardLink.Header className="h-[185px] flex-col" title="Orang Lanjut Usia" circlePosition="bottom">
            <p className="pt-11 text-white text-base italic font-inter">The Elderly</p>
          </CardLink.Header>
          <CardLink.Footer href="/layanan/rehabsos">
            <div className="flex gap-3 items-center">
              <HiEye className="h-[30px] w-[30px] text-primary" />
              <p className="text-[25px] text-primary text-center font-bold ">Lihat Data</p>
            </div>
          </CardLink.Footer>
        </CardLink>
        <CardLink className="w-full rounded-2xl">
          <CardLink.Header className="h-[185px] flex-col" title="Rehabilitasi Sosial" circlePosition="top">
            <p className="pt-11 text-white text-base italic font-inter">Social Rehabilitation</p>
          </CardLink.Header>
          <CardLink.Footer href="/layanan/rehabsos">
            <div className="flex gap-3 items-center">
              <HiEye className="h-[30px] w-[30px] text-primary" />
              <p className="text-[25px] text-primary text-center font-bold ">Lihat Data</p>
            </div>
          </CardLink.Footer>
        </CardLink>
        <CardLink className="w-full rounded-2xl">
          <CardLink.Header
            className="h-[185px] flex-col px-5"
            title="Tanda Daftar/Izin Operasional LKS"
            circlePosition="bottom"
          >
            {/* <p className="pt-11 text-white text-base italic font-inter">Children</p> */}
          </CardLink.Header>
          <CardLink.Footer href="/layanan/rehabsos">
            <div className="flex gap-3 items-center">
              <HiEye className="h-[30px] w-[30px] text-primary" />
              <p className="text-[25px] text-primary text-center font-bold ">Lihat Data</p>
            </div>
          </CardLink.Footer>
        </CardLink>
        <CardLink className="w-full rounded-2xl">
          <CardLink.Header className="h-[185px] flex-col" title="Tuna Sosial" circlePosition="top">
            <p className="pt-11 text-white text-base italic font-inter">Socially Impaired</p>
          </CardLink.Header>
          <CardLink.Footer href="/layanan/rehabsos">
            <div className="flex gap-3 items-center">
              <HiEye className="h-[30px] w-[30px] text-primary" />
              <p className="text-[25px] text-primary text-center font-bold ">Lihat Data</p>
            </div>
          </CardLink.Footer>
        </CardLink>
      </div>
    </Container>
  )
}
export default DataPenerimaRehabsos
