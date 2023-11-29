import Container from '@/components/atoms/Container'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import useTitle from '@/hooks/useTitle'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Pagination from './../../../components/atoms/Pagination'
import * as React from 'react'
import { useCreateParams, useDisableBodyScroll, useGetParams } from '@/hooks'
import { useGetOrganizationGrantAssistance } from './../../../store/server/useDayasos'
import { Loading } from '@/components'

const DataHibah = () => {
  useTitle('Data Penerima / Dayasos / Bansos Hibah Organisasi/Lembaga (BHO) ')
  const createParams = useCreateParams()
  const { nama, budgetYear, page } = useGetParams(['nama', 'budgetYear', 'page'])

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
    name: nama,
    budgetYear
  })

  useDisableBodyScroll(isFetching)

  const onSubmit = async (values: FormValues) => {
    Object.keys(values).forEach((key) => {
      if (values[key as keyof FormValues] !== '') {
        createParams({ key, value: values[key as keyof FormValues] })
      }
    })
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
        <h1 className="font-bold text-2xl ">Bansos Hibah Organisasi/Lembaga (BHO)</h1>
        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="grid grid-cols-3 gap-x-10 gap-y-5 pt-10">
              <FormField
                name="q"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Nama Lembaga" />
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
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Tahun" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="m@example.com">Krisna Asu</SelectItem>
                          <SelectItem value="m@google.com">Krisna Cuki</SelectItem>
                          <SelectItem value="m@support.com">The Little Krishna</SelectItem>
                        </SelectContent>
                      </Select>
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
            {organizationGrantAssistance?.data?.length !== 0
? (
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
            )
: (
              <TableRow>
                <TableCell colSpan={9} className="text-center">
                  Tidak ada data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {(organizationGrantAssistance?.meta?.total as number) > 30
? (
          <Pagination
            className="px-5 py-5 flex justify-end"
            currentPage={page !== '' ? parseInt(page) : 1}
            totalCount={organizationGrantAssistance?.meta.total as number}
            pageSize={30}
            onPageChange={(page) => createParams({ key: 'page', value: page.toString() })}
          />
        )
: null}
      </Container>
    </div>
  )
}
export default DataHibah
