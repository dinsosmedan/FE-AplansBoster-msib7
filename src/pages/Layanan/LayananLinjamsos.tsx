import { CardLink, Container } from '@/components'
import useTitle from '@/hooks/useTitle'
// import { Link } from 'react-router-dom'
    import { HiPlus } from 'react-icons/hi2'

const LayananLinjamsos = () => {
  useTitle('Layanan Linjamsos ')

  return (
    <Container className="px-[120px]">
      <h1 className="font-bold text-2xl ">LINJAMSOS</h1>
      <div className="grid grid-cols-2 gap-x-[85px] gap-y-[45px] mt-10">
        <CardLink className="w-full rounded-2xl">
          <CardLink.Header className="h-[185px] flex-col" title="Bantuan Biaya Pendidikan" circlePosition="bottom">
            <p className="pt-11 text-white text-base">Education Financial Aid</p>
          </CardLink.Header>
          <CardLink.Footer href="/layanan/rehabsos">
            <div className="flex gap-1 items-center">
              <HiPlus className="h-[30px] w-[30px] text-primary" />
              <p className="text-[25px] text-primary text-center font-bold ">Lihat Data</p>
            </div>
          </CardLink.Footer>
        </CardLink>
        <CardLink className="w-full rounded-2xl">
          <CardLink.Header className="h-[185px] flex-col" title="Penerima Bantuan Iuran (PBI)" circlePosition="bottom">
            <p className="pt-11 text-white text-base">Premium Assistance Beneficiary</p>
          </CardLink.Header>
          <CardLink.Footer href="/layanan/rehabsos">
            <div className="flex gap-1 items-center">
              <HiPlus className="h-[30px] w-[30px] text-primary" />
              <p className="text-[25px] text-primary text-center font-bold ">Lihat Data</p>
            </div>
          </CardLink.Footer>
        </CardLink>
        <CardLink className="w-full rounded-2xl">
          <CardLink.Header
            className="h-[185px] flex-col px-4"
            title="Penanganan Kelompok Rentan"
            circlePosition="bottom"
          >
            <p className="pt-11 text-white text-base">Vulnerable Group Handling</p>
          </CardLink.Header>
          <CardLink.Footer href="/layanan/rehabsos">
            <div className="flex gap-1 items-center">
              <HiPlus className="h-[30px] w-[30px] text-primary" />
              <p className="text-[25px] text-primary text-center font-bold ">Lihat Data</p>
            </div>
          </CardLink.Footer>
        </CardLink>
        <CardLink className="w-full rounded-2xl">
          <CardLink.Header
            className="h-[185px] flex-col"
            title="Program Keluarga Harapan (PKH)"
            circlePosition="bottom"
          >
            <p className="pt-11 text-white text-base">Family Home Program</p>
          </CardLink.Header>
          <CardLink.Footer href="/layanan/rehabsos">
            <div className="flex gap-1 items-center">
              <HiPlus className="h-[30px] w-[30px] text-primary" />
              <p className="text-[25px] text-primary text-center font-bold ">Lihat Data</p>
            </div>
          </CardLink.Footer>
        </CardLink>
        <CardLink className="w-full rounded-2xl">
          <CardLink.Header
            className="h-[185px] flex-col px-5"
            title="Surat Keterangan Tidak Mampu (SKTM)"
            circlePosition="bottom"
          >
            <p className="pt-11 text-white text-base">Indigency Certificate</p>
          </CardLink.Header>
          <CardLink.Footer href="/layanan/rehabsos">
            <div className="flex gap-1 items-center">
              <HiPlus className="h-[30px] w-[30px] text-primary" />
              <p className="text-[25px] text-primary text-center font-bold ">Lihat Data</p>
            </div>
          </CardLink.Footer>
        </CardLink>
      </div>
    </Container>
  )
}
export default LayananLinjamsos
