import SectionDataDtks from '@/components/section/dashboard/DataDtks'
import SectionDayasos from '@/components/section/dashboard/Dayasos'
import SectionLinjamsos from '@/components/section/dashboard/Linjamsos'
import useTitle from '@/hooks/useTitle'
import { useGetServiceFunds } from '@/store/server'

const Home = () => {
  useTitle('Dashboard')
  const { data: serviceFunds, isSuccess } = useGetServiceFunds({
    page: 1,
    idKecamatan: '',
    idKelurahan: '',
    name: ''
  })

  return (
    <>
      <SectionDataDtks />
      <SectionDayasos />
      <SectionLinjamsos />
    </>
  )
}

export default Home
