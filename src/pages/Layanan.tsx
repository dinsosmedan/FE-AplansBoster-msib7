import { Container } from '@/components'
import useTitle from '@/hooks/useTitle'
import CardMain from './../components/organisms/CardMain'
import { BgLayananDayasos, BgLayananRehabsos, BgLayananLinjmasos } from '@/assets'

export default function DataPenerima() {
  useTitle('Layanan')

  return (
    <Container className="flex justify-center">
      <div className="grid grid-cols-2 gap-x-[70px] gap-y-[45px] ">
        <CardMain
          title="REHABSOS"
          subTitle="Social Rehabilitation"
          description="Program dan kegiatan Bidang Rehabilitasi Sosial dengan mempedomani rencana umum kota."
          urlImage={BgLayananRehabsos}
          href="/layanan/rehabsos"
        />
        <CardMain
          title="DAYASOS"
          subTitle="Social Empowerment and Poor Handling"
          description="Program dan kegiatan Bidang Pemberdayaan Sosial Dan Penanganan Fakir Miskin dengan mempedomani rencana umum kota."
          urlImage={BgLayananDayasos}
          href="/layanan/dayasos"
        />
        <CardMain
          title="LINJAMSOS"
          subTitle="Social Protection and Security"
          description="Program dan kegiatan Bidang Perlindungan Dan Jaminan Sosial dengan mempedomani rencana umum kota"
          urlImage={BgLayananLinjmasos}
          href="/layanan/linjamsos"
        />
      </div>
    </Container>
  )
}
