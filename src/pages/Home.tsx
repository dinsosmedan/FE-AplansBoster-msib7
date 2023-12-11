import SectionDataDtks from '@/components/section/dashboard/DataDtks'
import SectionDayasos from '@/components/section/dashboard/Dayasos'
import SectionLinjamsos from '@/components/section/dashboard/Linjamsos'
import useTitle from '@/hooks/useTitle'

const Home = () => {
  useTitle('Dashboard')

  return (
    <>
      <SectionDataDtks />
      <SectionDayasos />
      <SectionLinjamsos />
    </>
  )
}

export default Home
