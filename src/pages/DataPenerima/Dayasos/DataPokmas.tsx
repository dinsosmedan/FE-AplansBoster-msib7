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
import { useGetCommunityGroups, useGetKecamatan, useGetKelurahan } from '@/store/server'
import { Loading } from '@/components'
interface FormValues {
  q: string
  code: string
  status: string
  kecamatan: string
  kelurahan: string
  year: string
}
const DataPokmas = () => {
  useTitle('Data Penerima / Dayasos / Pokmas ')
  const createParams = useCreateParams()
  const { page, q, kecamatan, kelurahan, code, status, year } = useGetParams(['page', 'q', 'kecamatan', 'kelurahan', 'code', 'status', 'year'])


  const forms = useForm<FormValues>({
    defaultValues: {
      q: '',
      code: '',
      status: '',
      kecamatan: '',
      kelurahan: '',
      year: ''
    }
  })
  const [isLoadingPage, setIsLoadingPage] = React.useState(false)
  const areaLevel3 = forms.watch('kecamatan')
  const { data: listKecamatan } = useGetKecamatan()
  const { data: listKelurahan } = useGetKelurahan(areaLevel3 ?? kecamatan)

  const {
    data: communityGroup,
    refetch,
    isFetching,
    isLoading
  } = useGetCommunityGroups({
    page: parseInt(page) ?? 1,
    idKecamatan: kecamatan,
    idKelurahan: kelurahan,
    q: q,
    code: code, status: status, year
  })
  console.log(communityGroup)
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
        <h1 className="font-bold text-xl ">Data Kelompok Masyarakat (Pokmas)</h1>
        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="grid grid-cols-3 gap-x-10 gap-y-5 pt-10">
              <FormField
                name="q"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Nama Kelompok Masyarakat" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="code"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Kode Kegiatan " />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="status"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Status Pencarian" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="diproses">Diproses</SelectItem>
                          <SelectItem value="diterima">Diterima</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
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
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
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
              <FormField
                name="year"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Tahun Pencairan" />
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
          <TableHeader className="bg-zinc-300">
            <TableRow>
              <TableHead className="text-black">Kode Kegiatan</TableHead>
              <TableHead className="text-black">Nama Kelompok Masyarakat</TableHead>
              <TableHead className="text-black">Kecamatan</TableHead>
              <TableHead className="text-black">Kelurahan</TableHead>
              <TableHead className="text-black">Jenis Kegiatan</TableHead>
              <TableHead className="text-black">Jenis Bantuan</TableHead>
              <TableHead className="text-black">Jumlah Bantuan Disetujui</TableHead>
              <TableHead className="text-black">Tahun Pencairan</TableHead>
              <TableHead className="text-black">Status Pencairan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {communityGroup?.data?.length !== 0 ? (
              communityGroup?.data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="text-center text-black">{item.communityActivityCode}</TableCell>
                  <TableCell className="text-center text-black">{item.communityName}</TableCell>
                  <TableCell className="text-center text-black">{item.address?.areaLevel3?.name}</TableCell>
                  <TableCell className="text-center text-black">{item.address?.areaLevel4?.name}</TableCell>
                  <TableCell className="text-center text-black">{item.communityActivityTypeDescription}</TableCell>
                  <TableCell className="text-center text-black">{item.communityAssistanceType}</TableCell>
                  <TableCell className="text-center text-black">{item.approvedFundAmount}</TableCell>
                  <TableCell className="text-center text-black">{item.applicationYear}</TableCell>
                  <TableCell className="text-center text-black">{item.statusDisimbursement}</TableCell>
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
        {(communityGroup?.meta?.total as number) > 10 ? (
          <Pagination
            className="px-5 py-5 flex justify-end"
            currentPage={page !== '' ? parseInt(page) : 1}
            totalCount={communityGroup?.meta.total as number}
            pageSize={10}
            onPageChange={(page) => createParams({ key: 'page', value: page.toString() })}
          />
        ) : null}
      </Container>
    </div>
  )
}
export default DataPokmas
