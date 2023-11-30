import Container from '@/components/atoms/Container'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import useTitle from '@/hooks/useTitle'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { HiMagnifyingGlass, HiOutlineArrowUpOnSquare } from 'react-icons/hi2'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Pagination from './../../../components/atoms/Pagination'
import * as React from 'react'
import { useCreateParams, useDisableBodyScroll, useGetParams } from '@/hooks'
import { useGetOrganizationGrantAssistance } from './../../../store/server/useDayasos'
import { Loading, Search } from '@/components'

const DataHibah = () => {
  useTitle('Data Penerima / Dayasos / Bansos Hibah Organisasi/Lembaga (BHO) ')
  const createParams = useCreateParams()
  const { q, budgetYear, page } = useGetParams(['q', 'budgetYear', 'page'])

  interface FormValues {
    q: string
    budgetYear: string
  }

  const [isLoadingPage, setIsLoadingPage] = React.useState(false)

  const forms = useForm<FormValues>({
    defaultValues: {
      q: '',
      budgetYear: ''
      // batch: ''
    }
  })

  const {
    data: organizationGrantAssistance,
    refetch,
    isFetching,
    isLoading
  } = useGetOrganizationGrantAssistance({
    page: parseInt(page) ?? 1,
    name: q,
    budgetYear
  })

  useDisableBodyScroll(isFetching)

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

    if (values.budgetYear !== '') {
      createParams({
        key: 'budgetYear',
        value: values.budgetYear !== '' ? values.budgetYear : ''
      })
    } else {
      createParams({ key: 'budgetYear', value: '' }) // Set budgetYear to empty string if it's empty
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
    <Container>
      {isFetching && <Loading />}
      <h1 className="font-bold text-2xl ">Bansos Hibah Organisasi/Lembaga (BHO)</h1>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-x-10 gap-y-5 pt-10">
            <FormField
              name="q"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Search {...field} placeholder="Masukkan Nama Lembaga/ NIK Ketua" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="budgetYear"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Search {...field} placeholder="Masukkan Tahun" />
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
          <div className="w-[140px] h-[50px] rounded-xl">
            <Button className="py-6">
              <HiOutlineArrowUpOnSquare className="w-6 h-6 py" />
              <p className="font-bold text-sm text-white ml-3">Export Data</p>
            </Button>
          </div>
        </form>
      </Form>
      <Table className="mt-5">
        <TableHeader className="bg-[#FFFFFF]">
          <TableRow>
            <TableHead className="text-black">Nama Lembaga</TableHead>
            <TableHead className="text-black">Nama Ketua</TableHead>
            <TableHead className="text-black">NIK</TableHead>
            <TableHead className="text-black">Alamat</TableHead>
            <TableHead className="text-black">Nomor Handphone</TableHead>
            <TableHead className="text-black">Jumlah Bantuan</TableHead>
            <TableHead className="text-black">Tahun</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {organizationGrantAssistance?.data?.length !== 0 ? (
            organizationGrantAssistance?.data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="text-center">{item.name}</TableCell>
                <TableCell className="text-center">{item.chairmanName}</TableCell>
                <TableCell className="text-center">{item.chairmanIdentityNumber}</TableCell>
                <TableCell className="text-center">{item.address.fullAddress}</TableCell>
                <TableCell className="text-center">{item.contactNumber}</TableCell>
                <TableCell className="text-center">{item.aprrovedAmount}</TableCell>
                <TableCell className="text-center">{item.budgetYear}</TableCell>
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
      {(organizationGrantAssistance?.meta?.total as number) > 30 ? (
        <Pagination
          className="px-5 py-5 flex justify-end"
          currentPage={page !== '' ? parseInt(page) : 1}
          totalCount={organizationGrantAssistance?.meta.total as number}
          pageSize={30}
          onPageChange={(page) => createParams({ key: 'page', value: page.toString() })}
        />
      ) : null}
    </Container>
  )
}
export default DataHibah
