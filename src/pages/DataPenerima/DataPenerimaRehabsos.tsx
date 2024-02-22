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
<<<<<<< HEAD
        <CardSub title={'Bantuan Sosial Tunai (BST) Lansia'} subTitle={''} href={'/data-penerima/rehabsos/bstlansia'} />
        <CardSub title={'Bantuan Sosial Tunai (BST) Disabilitas'} subTitle={''} href={'/data-penerima/rehabsos/bstdisab'} />
        <CardSub title={'Bantuan Sosial Tunai Anak Diluar Panti'} subTitle={''} href={'/data-penerima/rehabsos/anak'} />
        <CardSub title={'Bansos Permakanan Lansia'} subTitle={''} href={'/data-penerima/rehabsos/pl'} />
        <CardSub title={'Bansos Permakanan Disabilitas'} subTitle={''} href={'/layanan/rehabsos'} />
        <CardSub title={'Tanda Daftar/Izin Operasional LKS'} subTitle={''} href={'/layanan/rehabsos'} />
        <CardSub title={'Pemerlu Pelayanan Kesejahteraan Sosial'} subTitle={''} href={'/layanan/rehabsos'} />
=======
        <CardSub title={'BST Lansia'} subTitle={''} href={'/data-penerima/rehabsos/bstlansia'} />
        <CardSub title={'BST Disabilitas'} subTitle={''} href={'/layanan/rehabsos'} />
        <CardSub title={'BST Anak Diluar Panti'} subTitle={''} href={'/layanan/rehabsos'} />
        <CardSub title={'Bansos Permakanan Lansia'} subTitle={''} href={'/layanan/rehabsos'} />
        <CardSub title={'Bansos Permakanan Disabilitas'} subTitle={''} href={'/data-penerima/rehabsos/bpd'} />
        <CardSub
          title={'Penanganan Pemerlu Pelayanan Kesejahteraan Sosial'}
          subTitle={''}
          href={'/data-penerima/rehabsos/pppks'}
        />
        <CardSub title={'Tanda Daftar/Izin Operasional LKS'} subTitle={''} href={'/data-penerima/rehabsos/lks'} />
>>>>>>> 4c5fd38eac98ea35029cd5ae6785bf542c69406b
      </div>
    </Container>
  )
}
export default DataPenerimaRehabsos
