import { CardLink, Container } from '@/components'
import useTitle from '@/hooks/useTitle'

export default function Layanan() {
  useTitle('Layanan ')

  return (
    <Container className="flex justify-center">
      <div className="grid grid-cols-2 gap-x-[70px] gap-y-[45px]">
        <CardLink url="/layanan/rehabsos">
          <CardLink.Header title="REHABSOS" circlePosition="bottom" />
          <CardLink.Footer>
            <p className="text-[15px] text-primary text-center">Rehabilitasi Sosial (Social Rehabilitation)</p>
          </CardLink.Footer>
        </CardLink>
        <CardLink url="/layanan/linjamsos">
          <CardLink.Header title="LINJAMSOS" circlePosition="top" />
          <CardLink.Footer>
            <p className="text-[15px] text-primary text-center">Rehabilitasi Sosial (Social Rehabilitation)</p>
          </CardLink.Footer>
        </CardLink>
        <CardLink url="/layanan/dayasos">
          <CardLink.Header title="DAYASOS" circlePosition="bottom" />
          <CardLink.Footer>
            <p className="text-[15px] text-primary text-center">
              Pemberdayaan Sosial dan Penanganan Fakir Miskin (Social Empowerment and Poor Handling)
            </p>
          </CardLink.Footer>
        </CardLink>
      </div>
    </Container>
  )
}
