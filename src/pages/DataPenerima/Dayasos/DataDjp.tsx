/* eslint-disable multiline-ternary */
import Container from '@/components/atoms/Container'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import useTitle from '@/hooks/useTitle'
import { useForm } from 'react-hook-form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Pagination from './../../../components/atoms/Pagination'
import * as React from 'react'
import { useCreateParams, useDisableBodyScroll, useGetParams } from '@/hooks'
import { useGetKecamatan, useGetKelurahan, useGetServiceFunds } from '@/store/server'
import { Loading, Search } from '@/components'

interface FormValues {
  q: string
  kelurahan: string
  kecamatan: string
  // batch: string
}

const DataDjp = () => {
  useTitle('Data Penerima / Dayasos / DJPM ')
  const createParams = useCreateParams()
  const { q, kecamatan, kelurahan, page } = useGetParams(['q', 'kecamatan', 'kelurahan', 'page'])

  const forms = useForm<FormValues>({
    defaultValues: {
      q: '',
      kelurahan: '',
      kecamatan: ''
      // batch: ''
    }
  })

  const [isLoadingPage, setIsLoadingPage] = React.useState(false)
  const areaLevel3 = forms.watch('kecamatan')

  const { data: listKecamatan } = useGetKecamatan()
  const { data: listKelurahan } = useGetKelurahan(areaLevel3 ?? kecamatan)
  const {
    data: serviceFunds,
    refetch,
    isFetching,
    isLoading
  } = useGetServiceFunds({
    page: parseInt(page) ?? 1,
    idKecamatan: kecamatan,
    idKelurahan: kelurahan,
    name: q
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

  console.log(serviceFunds?.data)

  return (
    <Container>
      {isFetching && <Loading />}
      <h1 className="font-bold text-[32px] ">Dana Jasa Pelayanan Masyarakat (DJPM)</h1>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-x-10 gap-y-5 pt-10">
            <FormField
              name="kecamatan"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Kecamatan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {listKecamatan?.map((item, index) => (
                          <SelectItem key={index} value={item.id}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="kelurahan"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={areaLevel3 === '' && kecamatan === ''}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Kelurahan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {listKelurahan?.map((item, index) => (
                          <SelectItem key={index} value={item.id}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* <FormField
              name="batch"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Batch" />
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
            /> */}
          </div>
          <div className="flex items-center">
            <FormField
              name="q"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Search {...field} placeholder="Cari berdasarkan NIK atau Nama" className="w-[398px] py-[23px]" />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="w-fit py-6 px-4 ml-auto bg-primary">
              <HiMagnifyingGlass className="w-6 h-6 text-white" />
              <p className="text-white font-semibold text-sm pl-2 w-max">Cari Data</p>
            </Button>
          </div>
        </form>
      </Form>
      <Table className="mt-5">
        <TableHeader className="bg-zinc-300">
          <TableRow>
            <TableHead className="text-black">NIK</TableHead>
            <TableHead className="text-black">Nama</TableHead>
            <TableHead className="text-black">Jenis Kelamin</TableHead>
            <TableHead className="text-black">Tempat/ Tanggal Lahir</TableHead>
            <TableHead className="text-black">Kelurahan</TableHead>
            <TableHead className="text-black">Kecamatan</TableHead>
            <TableHead className="text-black">Jenis Bantuan</TableHead>
            <TableHead className="text-black">Jumlah Bantuan Disetujui</TableHead>
            <TableHead className="text-black">Batch</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {serviceFunds?.data?.length !== 0 ? (
            serviceFunds?.data.map((serviceFund) => (
              <TableRow key={serviceFund.id}>
                <TableCell className="text-center">{serviceFund.beneficiary.identityNumber}</TableCell>
                <TableCell className="text-center">{serviceFund.beneficiary.name}</TableCell>
                <TableCell className="text-center">{serviceFund.beneficiary.gender}</TableCell>
                <TableCell className="text-center">
                  {serviceFund.beneficiary.birthPlace} / {serviceFund.beneficiary.birthDate}
                </TableCell>
                <TableCell className="text-center">{serviceFund.beneficiary.address.areaLevel4?.name}</TableCell>
                <TableCell className="text-center">{serviceFund.beneficiary.address.areaLevel3?.name}</TableCell>
                <TableCell className="text-center">{serviceFund.serviceType.name}</TableCell>
                <TableCell className="text-center">{serviceFund?.assistanceAmount ?? '-'}</TableCell>
                <TableCell className="text-center">{serviceFund?.status ?? '-'}</TableCell>
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
      {(serviceFunds?.meta?.total as number) > 30 ? (
        <Pagination
          className="px-5 py-5 flex justify-end"
          currentPage={page !== '' ? parseInt(page) : 1}
          totalCount={serviceFunds?.meta.total as number}
          pageSize={30}
          onPageChange={(page) => createParams({ key: 'page', value: page.toString() })}
        />
      ) : null}
    </Container>
  )
}
export default DataDjp
