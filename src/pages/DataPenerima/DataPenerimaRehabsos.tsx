import { CardSub, Container } from '@/components'
import useTitle from '@/hooks/useTitle'
// import { Link } from 'react-router-dom'

const DataPenerimaRehabsos = () => {
  useTitle('Data Penerima / Rehabsos ')

  return (
    <Container className="px-[120px]">
      <h1 className="font-bold text-2xl ">REHABSOS</h1>
      <div className="grid grid-cols-2 gap-x-[85px] gap-y-[40px] mt-10">
        <CardSub title={'Anak Anak'} subTitle={'Children'} href={'/layanan/rehabsos'} />
        <CardSub title={'Disabilitas'} subTitle={'Disability'} href={'/layanan/rehabsos'} />
        <CardSub title={'Korban Perdagangan Orang'} subTitle={'People Trade'} href={'/layanan/rehabsos'} />
        <CardSub title={'Orang Lanjut Usia'} subTitle={'The Elderly'} href={'/layanan/rehabsos'} />
        <CardSub title={'Rehabilitasi Sosial'} subTitle={'Social Rehabilitation'} href={'/layanan/rehabsos'} />
        <CardSub title={'Tanda Daftar/Izin Operasional LKS'} subTitle={''} href={'/layanan/rehabsos'} />
        <CardSub title={'Tuna Sosial'} subTitle={'Socially Impaired'} href={'/layanan/rehabsos'} />
      </div>
    </Container>
  )
}
export default DataPenerimaRehabsos
