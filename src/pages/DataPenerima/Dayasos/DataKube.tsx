import Container from '@/components/atoms/Container'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import useTitle from '@/hooks/useTitle'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { HiMagnifyingGlass, HiMiniTrash } from 'react-icons/hi2'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Pagination from './../../../components/atoms/Pagination'
import * as React from 'react'
import { useCreateParams, useDisableBodyScroll, useGetParams } from '@/hooks'
import { useGetBusinessGroup, useGetKecamatan, useGetKelurahan } from '@/store/server'
import { Loading } from '@/components'
interface FormValues {
  q: string
  kelurahan: string
  kecamatan: string
  year: string
}
const DataKube = () => {
  useTitle('Data Penerima / Dayasos / Kube ')
  const createParams = useCreateParams()
  const { page, q, kecamatan, kelurahan, year } = useGetParams(['page', 'q', 'kecamatan', 'kelurahan', 'year'])

  const forms = useForm<FormValues>({
    defaultValues: {
      q: '',
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
    data: businessGroup,
    refetch,
    isFetching,
    isLoading
  } = useGetBusinessGroup({
    page: parseInt(page) ?? 1,
    idKecamatan: kecamatan,
    idKelurahan: kelurahan,
    q: q, year: year
  })
  useDisableBodyScroll(isFetching)
  const handleReset = () => {
    forms.reset({ q: '', kecamatan: '', kelurahan: '', year: '' });
    createParams({ key: 'q', value: '' });
    createParams({ key: 'year', value: '' });
    createParams({ key: 'kecamatan', value: '' });
    createParams({ key: 'kelurahan', value: '' });
    // Tambahan untuk memastikan reset pada list kelurahan saat kecamatan di-reset
    forms.setValue('kelurahan', '');
  };
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

    if (values.year !== '') {
      createParams({
        key: 'year',
        value: values.year !== '' ? values.year : ''
      });
      createParams({ key: 'page', value: '' }); // Set page to empty string when searching
    } else {
      createParams({ key: 'year', value: '' }); // Set budgetYear to empty string if it's empty
    }
    if (values.kecamatan !== '') {
      createParams({
        key: 'kecamatan',
        value: values.kecamatan !== '' ? values.kecamatan : ''
      });
      createParams({ key: 'page', value: '' }); // Set page to empty string when searching
    } else {
      createParams({ key: 'kecamatan', value: '' }); // Set budgetYear to empty string if it's empty
    }
    if (values.kelurahan !== '') {
      createParams({
        key: 'kelurahan',
        value: values.kelurahan !== '' ? values.kelurahan : ''
      });
      createParams({ key: 'page', value: '' }); // Set page to empty string when searching
    } else {
      createParams({ key: 'kelurahan', value: '' }); // Set budgetYear to empty string if it's empty
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
        {isFetching && <Loading />}
        <h1 className="font-bold t  ext-2xl ">Kelompok Usaha Bersama (Kube)</h1>
        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="grid grid-cols-3 gap-x-10 gap-y-5 pt-10">
              <FormField
                name="q"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Nama Kelompok Usaha Bersama" />
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
                      <Select onValueChange={field.onChange} value={field.value || ''}>
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
                      <Select onValueChange={field.onChange} defaultValue={field.value} disabled={areaLevel3 === '' && kecamatan === ''}>
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
                      <Input {...field} type="text" placeholder="Masukkan Tahun Anggaran" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className='flex justify-end gap-3'>
              <Button onClick={handleReset} className="w-fit py-6 px-4 bg-primary">
                <HiMiniTrash className="w-6 h-6 text-white" />
                <p className="text-white font-semibold text-sm pl-2 w-max">Reset</p>
              </Button>
              <Button className="w-fit py-6 px-4 bg-primary">
                <HiMagnifyingGlass className="w-6 h-6 text-white" />
                <p className="text-white font-semibold text-sm pl-2 w-max">Cari Data</p>
              </Button>
            </div>
          </form>
        </Form>
        <Table className="mt-5">
          <TableHeader className="bg-[#FFFFFF]">
            <TableRow>
              <TableHead className="text-black text-left font-bold">No.</TableHead>
              <TableHead className="text-black text-left font-bold">Nama Kelompok Usaha Bersama</TableHead>
              <TableHead className="text-black text-left font-bold">Alamat</TableHead>
              <TableHead className="text-black text-left font-bold">Kecamatan</TableHead>
              <TableHead className="text-black text-left font-bold">Kelurahan</TableHead>
              <TableHead className="text-black text-left font-bold">Jenis</TableHead>
              <TableHead className="text-black text-left font-bold">Tahun Anggaran</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {businessGroup?.data?.length !== 0 ? (
              businessGroup?.data.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="text-left text-black">{index + 1}</TableCell>
                  <TableCell className="text-left text-black">{item.businessName}</TableCell>
                  <TableCell className="text-left text-black">{item.businessAddress?.fullAddress}</TableCell>
                  <TableCell className="text-left text-black">{item.businessAddress?.areaLevel3?.name}</TableCell>
                  <TableCell className="text-left text-black">{item.businessAddress?.areaLevel4?.name}</TableCell>
                  <TableCell className="text-left text-black">{item.businessType}</TableCell>
                  <TableCell className="text-left text-black">{item.budgetYear}</TableCell>
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
        {(businessGroup?.meta?.total as number) > 10 ? (
          <Pagination
            className="px-5 py-5 flex justify-end"
            currentPage={page !== '' ? parseInt(page) : 1}
            totalCount={businessGroup?.meta.total as number}
            pageSize={10}
            onPageChange={(page) => createParams({ key: 'page', value: page.toString() })}
          />
        ) : null}
      </Container>
    </div>
  )
}
export default DataKube
