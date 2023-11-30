import Container from '@/components/atoms/Container'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import useTitle from '@/hooks/useTitle'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Pagination from './../../../components/atoms/Pagination'
import * as React from 'react'
import { useGetFuelCashAssistance } from '@/store/server'
import { useCreateParams, useDisableBodyScroll, useGetParams } from '@/hooks'
import { Loading } from '@/components'
interface FormValues {
  q: string
}
const DataBltbbm = () => {
  useTitle('Data Penerima / Dayasos / BLTBBM ')
  const createParams = useCreateParams()
  const { page, q } = useGetParams(['page', 'q'])

  const forms = useForm<FormValues>({
    defaultValues: {
      q: ''
    }
  })
  const [isLoadingPage, setIsLoadingPage] = React.useState(false)

  const {
    data: fuelCashAssistance,
    refetch,
    isFetching,
    isLoading
  } = useGetFuelCashAssistance({
    page: parseInt(page) ?? 1,
    q: q,
  })
  useDisableBodyScroll(isFetching)

  useDisableBodyScroll(isFetching)
  console.log(fuelCashAssistance)
  const onSubmit = async (values: FormValues) => {
    if (values.q !== '') {
      createParams({
        key: 'q',
        value: values.q !== '' ? values.q : ''
      })
      createParams({ key: 'page', value: '' }) // Set page to empty string when searching
    } else {
      createParams({ key: 'q', value: '' }) // Set q to empty string if the search query is empty
    }
    await refetch()
  }
  React.useEffect(() => {
    if (isFetching) {
      setIsLoadingPage(true)
    } else {
      setIsLoadingPage(false)
    }
  }, [isLoadingPage, isFetching])

  if (isLoading) {
    return <Loading />
  }

  return (
    <div>
      <Container>
        {isFetching && <Loading />}
        <h1 className="font-bold text-2xl ">Bantuan Langsung Tunai BBM (BLTBBM)</h1>
        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="grid grid-cols-3 gap-x-10 gap-y-5 pt-10">
              <FormField
                name="q"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Nama" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="w-[140px] h-[50px] ml-auto rounded-xl">
              <Button className="py-6">
                <HiMagnifyingGlass className="w-6 h-6 py" />
                <p className="font-bold text-sm text-white ml-3">Cari Data</p>
              </Button>
            </div>
          </form>
        </Form>
        <Table className="mt-5">
          <TableHeader className="bg-[#FFFFFF]">
            <TableRow>
              <TableHead className="text-black text-left font-bold uppercase">Nomor</TableHead>
              <TableHead className="text-black text-left font-bold uppercase">Nama</TableHead>
              <TableHead className="text-black text-left font-bold uppercase">NIK</TableHead>
              <TableHead className="text-black text-left font-bold uppercase"> Jenis Keanggotaan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fuelCashAssistance?.data?.length !== 0 ? (
              fuelCashAssistance?.data.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="text-left">{(fuelCashAssistance.meta.currentPage - 1) * fuelCashAssistance.meta.perPage + index + 1}</TableCell>
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
        {(fuelCashAssistance?.meta?.total as number) > 10 ? (
          <Pagination
            className="px-5 py-5 flex justify-end"
            currentPage={page !== '' ? parseInt(page) : 1}
            totalCount={fuelCashAssistance?.meta.total as number}
            pageSize={30}
            onPageChange={(page) => createParams({ key: 'page', value: page.toString() })}
          />
        ) : null}
      </Container>
    </div>
  )
}
export default DataBltbbm
