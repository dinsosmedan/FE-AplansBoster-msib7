import { CardLink, Container } from '@/components'
import useTitle from '@/hooks/useTitle'
// import { Link } from 'react-router-dom'
import { HiEye } from 'react-icons/hi2'

const DataPenerimaLinjamsos = () => {
  useTitle('Data Penerima Linjamsos ')

  return (
    <Container className="px-[81px]">
      <h1 className="font-bold text-2xl ">LINJAMSOS</h1>
      <div className="grid grid-cols-2 gap-x-[85px] gap-y-[45px] mt-10">
        <CardLink className="w-full rounded-lg">
          <CardLink.Header className="h-[185px] flex-col" title="Bantuan Biaya Pendidikan" circlePosition="bottom">
            <p className="pt-11 text-white text-base">Education Financial Aid</p>
          </CardLink.Header>
          <CardLink.Footer href="/layanan/rehabsos">
            <div className="flex gap-3 items-center">
              <HiEye className="h-[30px] w-[30px] text-primary" />
              <p className="text-[30px] text-primary text-center font-bold ">Lihat Data</p>
            </div>
          </CardLink.Footer>
        </CardLink>
        <CardLink className="w-full rounded-lg">
          <CardLink.Header className="h-[185px] flex-col" title="Penerima Bantuan Iuran (PBI)" circlePosition="bottom">
            <p className="pt-11 text-white text-base">Premium Assistance Beneficiary</p>
          </CardLink.Header>
          <CardLink.Footer href="/layanan/rehabsos">
            <div className="flex gap-3 items-center">
              <HiEye className="h-[30px] w-[30px] text-primary" />
              <p className="text-[30px] text-primary text-center font-bold ">Lihat Data</p>
            </div>
          </CardLink.Footer>
        </CardLink>
        <CardLink className="w-full rounded-lg">
          <CardLink.Header className="h-[185px] flex-col px-4" title="Penanganan Kelompok Rentan" circlePosition="bottom">
            <p className="pt-11 text-white text-base">Vulnerable Group Handling</p>
          </CardLink.Header>
          <CardLink.Footer href="/layanan/rehabsos">
            <div className="flex gap-3 items-center">
              <HiEye className="h-[30px] w-[30px] text-primary" />
              <p className="text-[30px] text-primary text-center font-bold ">Lihat Data</p>
            </div>
          </CardLink.Footer>
        </CardLink>
        <CardLink className="w-full rounded-lg">
          <CardLink.Header
            className="h-[185px] flex-col"
            title="Program Keluarga Harapan (PKH)"
            circlePosition="bottom">
            <p className="pt-11 text-white text-base">Family Home Program</p>
          </CardLink.Header>
          <CardLink.Footer href="/layanan/rehabsos">
            <div className="flex gap-3 items-center">
              <HiEye className="h-[30px] w-[30px] text-primary" />
              <p className="text-[30px] text-primary text-center font-bold ">Lihat Data</p>
            </div>
          </CardLink.Footer>
        </CardLink>
        <CardLink className="w-full rounded-lg">
          <CardLink.Header
            className="h-[185px] flex-col px-5"
            title="Surat Keterangan Tidak Mampu (SKTM)"
            circlePosition="bottom">
            <p className="pt-11 text-white text-base">Indigency Certificate</p>
          </CardLink.Header>
          <CardLink.Footer href="/layanan/rehabsos">
            <div className="flex gap-3 items-center">
              <HiEye className="h-[30px] w-[30px] text-primary" />
              <p className="text-[30px] text-primary text-center font-bold ">Lihat Data</p>
            </div>
          </CardLink.Footer>
        </CardLink>
      </div>
    </Container>
  )
}
export default DataPenerimaLinjamsos
