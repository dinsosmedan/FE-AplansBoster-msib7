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
import { useCreateParams, useDisableBodyScroll, useGetParams } from '@/hooks'
import { useGetVeteran } from '@/store/server'
import { Loading } from '@/components'

const DataVeteran = () => {
  useTitle('Data Penerima / Dayasos / Veteran ')
  const createParams = useCreateParams()
  const { q, page } = useGetParams(['q', 'page'])
  const [isLoadingPage, setIsLoadingPage] = React.useState(false)

  interface FormValues {
    q: string
  }
  const forms = useForm<FormValues>({
    defaultValues: {
      q: '',
      // batch: ''
    }
  })

  const {
    data: veterans,
    refetch,
    isFetching,
    isLoading
  } = useGetVeteran({
    limit: 10,
    page: parseInt(page) ?? 1,
    q: q
  })
  useDisableBodyScroll(isFetching)

  const onSubmit = async (values: FormValues) => {
    if (values.q !== '') {
      createParams({
        key: 'q',
        value: values.q !== '' ? values.q : ''
      });
      createParams({ key: 'page', value: '' }); // Set page to empty string when searching
    } else {
      createParams({ key: 'q', value: '' }); // Set q to empty string if the search query is empty
    }
    await refetch();
  };


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
        <h1 className="font-bold text-2xl ">Veteran (VET)</h1>
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
              <TableHead className="text-black">Nama</TableHead>
              <TableHead className="text-black">NIK</TableHead>
              <TableHead className="text-black"> Jenis Keanggotaan</TableHead>
              <TableHead className="text-black">NPV</TableHead>
              <TableHead className="text-black">Satuan</TableHead>
              <TableHead className="text-black">Ukuran Baju / Celana</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {veterans?.data?.length !== 0 ? (
              veterans?.data.map((veteran) => (
                <TableRow key={veteran.id}>
                  <TableCell className="text-center">{veteran.beneficiary.name}</TableCell>
                  <TableCell className="text-center">{veteran.beneficiary.identityNumber}</TableCell>
                  <TableCell className="text-center">{veteran.isActive}</TableCell>
                  <TableCell className="text-center">{veteran.veteranUnit}</TableCell>
                  <TableCell className="text-center">{veteran.veteranUnit}</TableCell>
                  <TableCell className="text-center">{veteran.uniformSize}</TableCell>
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
        {(veterans?.meta?.total as number) > 10 ? (
          <Pagination
            className="px-5 py-5 flex justify-end"
            currentPage={page !== '' ? parseInt(page) : 1}
            totalCount={veterans?.meta.total as number}
            pageSize={10}
            onPageChange={(page) => createParams({ key: 'page', value: page.toString() })}
          />
        ) : null}
      </Container>
    </div>
  )
}
export default DataVeteran