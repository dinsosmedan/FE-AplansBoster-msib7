import { Container } from '@/components'
import useTitle from '@/hooks/useTitle'
import CardMain from './../components/organisms/CardMain'
import { BgDataDayasos, BgDataLinjmasos, BgDataRehabsos } from '@/assets'

export default function DataPenerima() {
  useTitle('Data Penerima  ')

  return (
    <Container className="justify-center p-10">
      <div className="grid grid-cols-3 gap-x-10 gap-y-10 ">
        <CardMain
          title="DAYASOS & PFM"
          subTitle="Social Empowerment and Poor Handling"
          description="Program dan kegiatan Bidang Pemberdayaan Sosial Dan Penanganan Fakir Miskin dengan mempedomani rencana umum kota."
          urlImage={BgDataDayasos}
          href="/data-penerima/dayasos"
        />
        <CardMain
          title="LINJAMSOS"
          subTitle="Social Protection and Security"
          description="Program dan kegiatan Bidang Perlindungan Dan Jaminan Sosial dengan mempedomani rencana umum kota"
          urlImage={BgDataLinjmasos}
          href="/data-penerima/linjamsos"
        />
        <CardMain
          title="REHABSOS"
          subTitle="Social Rehabilitation"
          description="Program dan kegiatan Bidang Rehabilitasi Sosial dengan mempedomani rencana umum kota."
          urlImage={BgDataRehabsos}
          href="/data-penerima/rehabsos"
        />
      </div>
    </Container>
  )
}
