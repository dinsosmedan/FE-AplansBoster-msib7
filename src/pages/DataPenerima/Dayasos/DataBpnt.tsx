import Container from '@/components/atoms/Container'
import useTitle from '@/hooks/useTitle'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Pagination from './../../../components/atoms/Pagination'
import * as React from 'react'
import { useGetNonCashFoodAssistanceBeneficiary } from '@/store/server'
import { useCreateParams, useDisableBodyScroll, useGetParams } from '@/hooks'
import { Loading } from '@/components'

const DataBpnt = () => {
  useTitle('Data Penerima / Dayasos / Bantuan Pangan Non Tunai (BPNT) ')
  const createParams = useCreateParams()
  const { page } = useGetParams(['page'])
  const [isLoadingPage, setIsLoadingPage] = React.useState(false)

  const {
    data: NonCashFoodAssistanceBeneficiary,
    refetch,
    isFetching,
    isLoading
  } = useGetNonCashFoodAssistanceBeneficiary({
    page: parseInt(page) ?? 1
  })
  console.log(NonCashFoodAssistanceBeneficiary)
  useDisableBodyScroll(isFetching)

  React.useEffect(() => {
    if (isFetching) {
      setIsLoadingPage(true)
    } else {
      setIsLoadingPage(false)
    }
  }, [isLoadingPage, isFetching, refetch])

  if (isLoading) {
    return <Loading />
  }

  return (
    <div>
      <Container>
        {isFetching && <Loading />}
        <h1 className="font-bold text-2xl "> Bantuan Pangan Non Tunai (BPNT) </h1>
        <Table className="mt-10">
          <TableHeader className="bg-[#FFFFFF]">
            <TableRow>
              <TableHead className="text-black text-left font-bold uppercase">Nama</TableHead>
              <TableHead className="text-black text-left font-bold uppercase">NIK</TableHead>
              <TableHead className="text-black text-left font-bold uppercase"> Jenis Keanggotaan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {NonCashFoodAssistanceBeneficiary?.data?.length !== 0 ? (
              NonCashFoodAssistanceBeneficiary?.data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="text-left">{item.beneficiary.name}</TableCell>
                  <TableCell className="text-left">{item.beneficiary.identityNumber}</TableCell>
                  <TableCell className="text-left">{item.type}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="text-center">
                  Tidak ada data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {(NonCashFoodAssistanceBeneficiary?.meta?.total as number) > 10 ? (
          <Pagination
            className="px-5 py-5 flex justify-end"
            currentPage={page !== '' ? parseInt(page) : 1}
            totalCount={NonCashFoodAssistanceBeneficiary?.meta.total as number}
            pageSize={30}
            onPageChange={(page) => createParams({ key: 'page', value: page.toString() })}
          />
        ) : null}
      </Container>
    </div>
  )
}
export default DataBpnt
