import { Container } from '@/components'
import { DataTableDemo } from '@/components/atoms/DataTable'
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
    <Container className="min-h-[calc(100vh+1000px)]">
      {isSuccess && <DataTableDemo data={serviceFunds?.data} />}
    </Container>
  )
}

export default Home
