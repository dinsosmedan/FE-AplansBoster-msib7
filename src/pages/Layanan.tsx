import { CardSub, Container } from '@/components'
import useTitle from '@/hooks/useTitle'

export default function DataPenerima() {
  useTitle('Layanan')

  return (
    <Container className="flex flex-col p-10">
      <div className="grid grid-cols-2 gap-x-10 gap-y-10">
        <CardSub title={'Bantuan Biaya Pendidikan'} subTitle={'Education Financial Aid'} href={'/layanan/bbp'} />
        <CardSub
          title={'Surat Keterangan Tidak Mampu'}
          subTitle={'Indigency Certificate'}
          href={'/layanan/layanan-sktm?tab=pending'}
        />
        <CardSub
          title={'Data Terpadu Kesejahteraan Sosial'}
          subTitle={'Integrated Social Welfare Data'}
          href={'/layanan/layanan-dtks'}
        />
      </div>
    </Container>
  )
}
