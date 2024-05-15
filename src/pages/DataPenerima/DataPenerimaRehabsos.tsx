import { CardSub, Container } from '@/components'
import useTitle from '@/hooks/useTitle'
import * as React from 'react'
import { useTitleHeader } from '@/store/client'

const DataPenerimaRehabsos = () => {
  useTitle('Data Penerima')
  const setBreadcrumbs = useTitleHeader((state) => state.setBreadcrumbs)
  React.useEffect(() => {
    setBreadcrumbs([
      { url: '/data-penerima', label: 'Data Penerima' },
      { url: '/data-penerima/rehabsos', label: 'Rehabsos' }
    ])
  }, [])

  return (
    <Container className="px-10 pt-10">
      <h1 className="font-bold text-2xl ">REHABSOS</h1>
      <p className="text-sm text-[#8F8F8F]">Rehabilitasi Sosial</p>
      <div className="grid grid-cols-2 gap-x-10 gap-y-10 mt-10">
        <CardSub
          title={'Bantuan Sosial Tunai (BST) Lansia'}
          subTitle={'Financial Assistance for the Elderly'}
          href={'/data-penerima/rehabsos/bstlansia'}
        />
        <CardSub
          title={'Bantuan Sosial Tunai (BST) Disabilitas'}
          subTitle={'Financial Assistance for Disability Support'}
          href={'/data-penerima/rehabsos/bstdisabilitas'}
        />
        <CardSub
          title={'Bantuan Sosial Tunai Anak Diluar Panti'}
          subTitle={'Financial Assistance for Non-Orpahanges'}
          href={'/data-penerima/rehabsos/anak'}
        />
        <CardSub
          title={'Tanda Daftar/Izin Operasional LKS'}
          subTitle={'Operation License of Social Institution'}
          href={'/data-penerima/rehabsos/izin-operasi-lks'}
        />
        <CardSub
          title={'Penanganan Pemerlu Pelayanan Kesejahteraan Sosial'}
          subTitle={'Handling of Social Welfare Service Need'}
          href={'/data-penerima/rehabsos/ppks'}
        />
        <CardSub
          title={'Penerima Alat Bantu '}
          subTitle={'Recipient of Assistive Devices'}
          href={'/data-penerima/rehabsos/penerima-alat-bantu'}
        />
      </div>
    </Container>
  )
}
export default DataPenerimaRehabsos
