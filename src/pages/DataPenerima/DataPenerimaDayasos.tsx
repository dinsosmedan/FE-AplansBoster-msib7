import { CardSub, Container } from '@/components'
import useTitle from '@/hooks/useTitle'
import { useTitleHeader } from '@/store/client'
import * as React from 'react'

const DataPenerimaDayasos = () => {
  useTitle('Data Penerima')
  const setBreadcrumbs = useTitleHeader((state) => state.setBreadcrumbs)
  React.useEffect(() => {
    setBreadcrumbs([{ url: '/data-penerima/dayasos', label: 'Dayasos & PFM' }])
  }, [])

  return (
    <Container className="px-[120px]">
      <h1 className="font-bold text-2xl">DAYASOS</h1>
      <div className="grid grid-cols-2 gap-x-[85px] gap-y-[40px] mt-10">
        <CardSub
          title={'Bansos Dana Jasa Pelayanan (DJP)'}
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
