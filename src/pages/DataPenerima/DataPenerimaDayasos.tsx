import { CardSub, Container } from '@/components'
import useTitle from '@/hooks/useTitle'
// import { Link } from 'react-router-dom'

const DataPenerimaDayasos = () => {
  useTitle('Data Penerima / Dayasos ')

  return (
    <Container className="px-[120px]">
      <h1 className="font-bold text-2xl">DAYASOS</h1>
      <div className="grid grid-cols-2 gap-x-[85px] gap-y-[40px] mt-10">
        <CardSub
          title={'Bansos Dana Jasa Pelayanan (DJP)'}
          subTitle={'Service Fund Assistance'}
          href={'/data-penerima/dayasos/data-djp'}
        />
        <CardSub
          title={'Bantuan Langsung Tunai BBM'}
          subTitle={'Fuel Cash Assistance'}
          href={'/data-penerima/dayasos/data-bltbbm'}
        />
        <CardSub
          title={'Bantuan Pangan Non Tunai (BPNT)'}
          subTitle={'Joint Business Group'}
          href={'/data-penerima/dayasos/data-bpnt'}
        />
        <CardSub
          title={'Bansos Hibah Organisasi/ Lembaga'}
          subTitle={'Organization Grant Assistance'}
          href={'/data-penerima/dayasos/data-hibah'}
        />
        <CardSub
          title={'Kelompok Usaha Bersama (KUBE)'}
          subTitle={'Joint Business Group'}
          href={'/data-penerima/dayasos/data-kube'}
        />
        <CardSub
          title={'Kelompok Masyarakat (POKMAS)'}
          subTitle={'Community Group'}
          href={'/data-penerima/dayasos/data-pokmas'}
        />
        <CardSub
          title={'Rumah Ibadah'}
          subTitle={'House of Worship'}
          href={'/data-penerima/dayasos/data-rumah-ibadah'}
        />
        <CardSub title={'Veteran'} subTitle={'Veteran'} href={'/data-penerima/dayasos/data-veteran'} />
      </div>
    </Container>
  )
}
export default DataPenerimaDayasos
