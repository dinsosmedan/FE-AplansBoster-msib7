import { CardSub, Container } from '@/components'
import useTitle from '@/hooks/useTitle'
import { useTitleHeader } from '@/store/client'
import * as React from 'react'

const DataPenerimaLinjamsos = () => {
  useTitle('Data Penerima')
  const setBreadcrumbs = useTitleHeader((state) => state.setBreadcrumbs)

  React.useEffect(() => {
    setBreadcrumbs([
      { url: '/data-penerima', label: 'Data Penerima' },
      { url: '/data-penerima/linjamsos', label: 'Linjamsos' }
    ])
  }, [])

  return (
    <Container className="px-[120px]">
      <h1 className="font-bold text-2xl ">LINJAMSOS</h1>
      <div className="grid grid-cols-2 gap-x-[85px] gap-y-[40px] mt-10">
        <CardSub
          title={'Bantuan Biaya Pendidikan'}
          subTitle={'Education Financial Aid'}
          href={'/data-penerima/linjamsos/bbp'}
        />
        <CardSub
          title={'Penerima Bantuan Iuran (PBI)'}
          subTitle={'Premium Assistance Beneficiary'}
          href={'/data-penerima/linjamsos/pbi'}
        />
        <CardSub
          title={'Penanganan Kelompok Rentan'}
          subTitle={'Vulnerable Group Handling'}
          href={'/data-penerima/linjamsos/pkr'}
        />
        <CardSub
          title={'Program Keluarga Harapan (PKH)'}
          subTitle={'Family Home Program'}
          href={'/data-penerima/linjamsos/pkh'}
        />
        <CardSub
          title={'Surat Keterangan Tidak Mampu (SKTM)'}
          subTitle={'Indigency Certificate'}
          href={'/data-penerima/linjamsos/sktm'}
        />
        <CardSub title={'Tidak Terdaftar'} subTitle={'Unregister'} href={'/data-penerima/linjamsos/unregister'} />
      </div>
    </Container>
  )
}
export default DataPenerimaLinjamsos
