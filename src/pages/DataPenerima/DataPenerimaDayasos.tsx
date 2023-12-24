import { CardSub, Container } from '@/components'
import useTitle from '@/hooks/useTitle'
import { useTitleHeader } from '@/store/client'
import * as React from 'react'

const DataPenerimaDayasos = () => {
  useTitle('Data Penerima')
  const setBreadcrumbs = useTitleHeader((state) => state.setBreadcrumbs)
  React.useEffect(() => {
    setBreadcrumbs([
      { url: '/data-penerima', label: 'Data Penerima' },
      { url: '/data-penerima/dayasos', label: 'Dayasos & PFM' }
    ])
  }, [])

  return (
    <Container className="px-10 pt-10">
      <h1 className="font-bold text-2xl">DAYASOS & PFM</h1>
      <p className="text-sm text-[#8F8F8F]">Pemberdayaan Sosial dan Penanganan Fakir Miskin</p>
      <div className="grid grid-cols-2 gap-x-10 gap-y-10 mt-10">
        <CardSub
          title={'Bansos Dana Jasa Pelayanan Masyarakat (DJPM)'}
          subTitle={'Service Fund Assistance'}
          href={'/data-penerima/dayasos/djpm'}
        />
        <CardSub
          title={'Bantuan Langsung Tunai BBM'}
          subTitle={'Fuel Cash Assistance'}
          href={'/data-penerima/dayasos/bltbbm'}
        />
        <CardSub
          title={'Bantuan Pangan Non Tunai (BPNT)'}
          subTitle={'Joint Business Group'}
          href={'/data-penerima/dayasos/bpnt'}
        />
        <CardSub
          title={'Bansos Hibah Organisasi/ Lembaga'}
          subTitle={'Organization Grant Assistance'}
          href={'/data-penerima/dayasos/bho'}
        />
        <CardSub
          title={'Kelompok Usaha Bersama (KUBE)'}
          subTitle={'Joint Business Group'}
          href={'/data-penerima/dayasos/kube'}
        />
        <CardSub
          title={'Kelompok Masyarakat (POKMAS)'}
          subTitle={'Community Group'}
          href={'/data-penerima/dayasos/pokmas'}
        />
        <CardSub title={'Rumah Ibadah'} subTitle={'House of Worship'} href={'/data-penerima/dayasos/rumah-ibadah'} />
        <CardSub title={'Veteran'} subTitle={'Veteran'} href={'/data-penerima/dayasos/veteran'} />
      </div>
    </Container>
  )
}
export default DataPenerimaDayasos
