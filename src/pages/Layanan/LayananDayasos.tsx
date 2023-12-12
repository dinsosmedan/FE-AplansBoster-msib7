import { CardSub, Container } from '@/components'
import useTitle from '@/hooks/useTitle'
// import { Link } from 'react-router-dom'

const LayananDayasos = () => {
  useTitle('Layanan / Dayasos ')

  return (
    <Container className="px-[120px]">
      <h1 className="font-bold text-[32px] ">DAYASOS</h1>
      <div className="grid grid-cols-2 gap-x-[85px] gap-y-[40px] mt-10">
        <CardSub
          title={'Bansos Dana Jasa Pelayanan (DJPM)'}
          subTitle={'Service Fund Assistance'}
          href={'/layanan/dayasos/Djp'}
        />
        <CardSub
          title={'Bantuan Langsung Tunai BBM'}
          subTitle={'Fuel Cash Assistance'}
          href={'/data-penerima/dayasos/bltbbm'}
        />
        <CardSub title={'Kelompok Masyarakat (POKMAS)'} subTitle={'Community Group'} href={'/layanan/dayasos/pokmas'} />
        <CardSub
          title={'Bantuan Pangan Non Tunai (BPNT)'}
          subTitle={'Joint Business Group'}
          href={'/data-penerima/dayasos/bpnt'}
        />
        <CardSub
          title={'Bansos Hibah Organisasi/ Lembaga'}
          subTitle={'Organization Grant Assistance'}
          href={'/layanan/dayasos/hibah'}
        />
        <CardSub title={'Rumah Ibadah'} subTitle={'House of Worship'} href={'/layanan/dayasos/ri'} />
        <CardSub title={'Veteran'} subTitle={'Veteran'} href={'/layanan/dayasos/veteran'} />
        <CardSub
          title={'Kelompok Usaha Bersama (KUBE)'}
          subTitle={'Joint Business Group'}
          href={'/layanan/dayasos/kube'}
        />
      </div>
    </Container>
  )
}
export default LayananDayasos
