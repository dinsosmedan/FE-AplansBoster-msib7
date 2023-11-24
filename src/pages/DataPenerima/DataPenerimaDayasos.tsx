import { CardLink, Container } from '@/components'
import useTitle from '@/hooks/useTitle'
// import { Link } from 'react-router-dom'
import { HiEye } from 'react-icons/hi2'

const DataPenerimaDayasos = () => {
  useTitle('Data Penerima Dayasos ')

  return (
    <Container className="px-[120px]">
      <h1 className="font-bold text-2xl ">DAYASOS</h1>
      <div className="grid grid-cols-2 gap-x-[85px] gap-y-[45px] mt-10">
        <CardLink className="w-full rounded-2xl">
          <CardLink.Header
            className="h-[185px] flex-col"
            title="Bansos Dana Jasa Pelayanan (DJP)"
            circlePosition="bottom"
          >
            <p className="pt-11 text-white text-base">Service Fund Assistance</p>
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
            className="h-[185px] flex-col px-10"
            title="Bantuan Langsung Tunai BBM"
            circlePosition="bottom"
          >
            <p className="pt-11 text-white text-base">Fuel Cash Assistance</p>
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
            className="h-[185px] flex-col"
            title="Bantuan Pangan Non Tunai (BPNT)"
            circlePosition="bottom"
          >
            <p className="pt-11 text-white text-base">Joint Business Group</p>
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
            className="h-[185px] flex-col"
            title="Bansos Hibah Organisasi/ Lembaga"
            circlePosition="bottom"
          >
            <p className="pt-11 text-white text-base">Organization Grant Assistance</p>
          </CardLink.Header>
          <CardLink.Footer href="/layanan/rehabsos">
            <div className="flex gap-3 items-center">
              <HiEye className="h-[30px] w-[30px] text-primary" />
              <p className="text-[25px] text-primary text-center font-bold ">Lihat Data</p>
            </div>
          </CardLink.Footer>
        </CardLink>
        <CardLink className="w-full rounded-2xl">
          <CardLink.Header className="h-[185px] flex-col" title="Kelompok Usaha Bersama (KUBE)" circlePosition="bottom">
            <p className="pt-11 text-white text-base"> Joint Business Group</p>
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
            title="Kelompok Masyarakat (POKMAS)"
            circlePosition="bottom"
          >
            <p className="pt-11 text-white text-base">Community Group</p>
          </CardLink.Header>
          <CardLink.Footer href="/layanan/rehabsos">
            <div className="flex gap-3 items-center">
              <HiEye className="h-[30px] w-[30px] text-primary" />
              <p className="text-[25px] text-primary text-center font-bold ">Lihat Data</p>
            </div>
          </CardLink.Footer>
        </CardLink>
        <CardLink className="w-full rounded-2xl">
          <CardLink.Header className="h-[185px] flex-col" title="Rumah Ibadah" circlePosition="bottom">
            <p className="pt-11 text-white text-base">House of Worship</p>
          </CardLink.Header>
          <CardLink.Footer href="/layanan/rehabsos">
            <div className="flex gap-3 items-center">
              <HiEye className="h-[30px] w-[30px] text-primary" />
              <p className="text-[25px] text-primary text-center font-bold ">Lihat Data</p>
            </div>
          </CardLink.Footer>
        </CardLink>
        <CardLink className="w-full rounded-2xl">
          <CardLink.Header className="h-[185px] flex-col" title="Veteran" circlePosition="bottom">
            <p className="pt-11 text-white text-base">Veteran</p>
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
export default DataPenerimaDayasos
