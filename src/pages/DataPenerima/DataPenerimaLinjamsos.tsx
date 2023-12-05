import { CardSub, Container } from '@/components'
import useTitle from '@/hooks/useTitle'
// import { Link } from 'react-router-dom'

const DataPenerimaLinjamsos = () => {
  useTitle('Data Penerima / Linjamsos ')

  return (
    <Container className="px-[120px]">
      <h1 className="font-bold text-2xl ">LINJAMSOS</h1>
      <div className="grid grid-cols-2 gap-x-[85px] gap-y-[40px] mt-10">
        <CardSub
          title={'Bantuan Biaya Pendidikan'}
          subTitle={'Education Financial Aid'}
          href={'/data-penerima/linjamsos/data-bbp'}
        />
        <CardSub
          title={'Penerima Bantuan Iuran (PBI)'}
          subTitle={'Premium Assistance Beneficiary'}
          href={'/data-penerima/linjamsos/data-pbi'}
        />
        <CardSub
          title={'Penanganan Kelompok Rentan'}
          subTitle={'Vulnerable Group Handling'}
          href={'/data-penerima/linjamsos/data-pkr'}
        />
        <CardSub title={'Program Keluarga Harapan (PKH)'} subTitle={'Family Home Program'} href={'/layanan/rehabsos'} />
        <CardSub
          title={'Surat Keterangan Tidak Mampu (SKTM)'}
          subTitle={'Indigency Certificate'}
          href={'/data-penerima/linjamsos/data-sktm'}
        />
        <CardSub title={'Tidak Terdaftar'} subTitle={'Unregister'} href={'/data-penerima/linjamsos/data-unregister'} />
      </div>
    </Container>
  )
}
export default DataPenerimaLinjamsos
