import * as React from 'react'
import { useForm } from 'react-hook-form'
import { HiMagnifyingGlass, HiMiniTrash } from 'react-icons/hi2'

import { Container, Loading, Pagination } from '@/components'
import { useCreateParams, useDisableBodyScroll, useGetParams, useTitle } from '@/hooks'
import { JENIS_RUMAH_IBADAH } from '@/pages/Layanan/Dayasos/RumahIbadah'

import { useGetWorshipPlaces } from '@/store/server/useDayasos'
import { useGetKecamatan, useGetKelurahan } from '@/store/server'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface FormValues {
  q: string
  type: string
  kecamatan: string
  kelurahan: string
}

const DataRumahIbadah = () => {
  useTitle('Data Penerima / Dayasos / Rumah Ibadah (RI) ')
  const createParams = useCreateParams()
  const { page, q, kecamatan, kelurahan, type } = useGetParams([
    'page', 'q',
    'type',
    'kecamatan',
    'kelurahan'
  ])

  const forms = useForm<FormValues>({
    defaultValues: {
      q: '',
      type: '',
      kecamatan: '',
      kelurahan: ''
    }
  })

  const areaLevel3 = forms.watch('kecamatan')

  const { data: listKecamatan } = useGetKecamatan()
  const { data: listKelurahan } = useGetKelurahan(areaLevel3 ?? kecamatan)
  const {
    data: worshipPlaces,
    refetch,
    isFetching,
    isLoading
  } = useGetWorshipPlaces({
    page: parseInt(page) ?? 1,
    idKecamatan: kecamatan,
    idKelurahan: kelurahan,
    type: type,
    q: q
  })
  useDisableBodyScroll(isFetching)
  const [isLoadingPage, setIsLoadingPage] = React.useState(false)

  const handleReset = () => {
    forms.reset({ q: '', kecamatan: '', kelurahan: '', type: '' });
    createParams({ key: 'q', value: '' });
    createParams({ key: 'type', value: '' });
    createParams({ key: 'kecamatan', value: '' });
    createParams({ key: 'kelurahan', value: '' });
    // Tambahan untuk memastikan reset pada list kelurahan saat kecamatan di-reset
    forms.setValue('kelurahan', '');
  };
  const updateParam = (key: any, value: any) => {
    if (value !== '') {
      createParams({ key, value });
      createParams({ key: 'page', value: '' });
    } else {
      createParams({ key, value: '' });
    }
  };

  const onSubmit = async (values: FormValues) => {
    updateParam('type', values.type);
    updateParam('kecamatan', values.kecamatan);
    updateParam('kelurahan', values.kelurahan);
    updateParam('q', values.q);

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
    <Container>
      <h1 className="font-bold text-[32px] ">Rumah Ibadah (RI)</h1>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="grid grid-cols-3 gap-x-10 gap-y-5 pt-10">
            <FormField
              name="q"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Nama Rumah Ibadah" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="type"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Jenis Rumah Ibadah" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {JENIS_RUMAH_IBADAH.map((item, index) => (
                          <SelectItem key={index} value={item}>
                            {item}
                          </SelectItem>
                        ))}
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
            <TableHead className="text-black">No.</TableHead>
            <TableHead className="text-black">Nama Rumah Ibadah</TableHead>
            <TableHead className="text-black">Jenis Rumah Ibadah</TableHead>
            <TableHead className="text-black">Alamat</TableHead>
            <TableHead className="text-black">Kelurahan</TableHead>
            <TableHead className="text-black">Kecamatan</TableHead>
            <TableHead className="text-black">Nama Penanggung jawab</TableHead>
            <TableHead className="text-black">Nomor Handphone</TableHead>
            <TableHead className="text-black">Status</TableHead>
            <TableHead className="text-black">Keterangan</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {worshipPlaces?.data.length !== 0 ? (
            worshipPlaces?.data.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="text-left">{(worshipPlaces.meta.currentPage - 1) * worshipPlaces.meta.perPage + index + 1}</TableCell>
                <TableCell className="text-center text-black">{item.name}</TableCell>
                <TableCell className="text-center text-black">{item.type}</TableCell>
                <TableCell className="text-center text-black">{item.address}</TableCell>
                <TableCell className="text-center text-black">{item.areaLevel3?.name}</TableCell>
                <TableCell className="text-center text-black">{item.areaLevel4?.name}</TableCell>
                <TableCell className="text-center text-black">{item.picName}</TableCell>
                <TableCell className="text-center text-black">{item.picPhone}</TableCell>
                <TableCell className="text-center text-black">{item.status}</TableCell>
                <TableCell className="text-center text-black">{item.note}</TableCell>
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
      {(worshipPlaces?.meta?.total as number) > 10 ? (
        <Pagination
          className="px-5 py-5 flex justify-end"
          currentPage={page !== '' ? parseInt(page) : 1}
          totalCount={worshipPlaces?.meta.total as number}
          pageSize={10}
          onPageChange={(page) => createParams({ key: 'page', value: page.toString() })}
        />
      ) : null}
    </Container>
  )
}
export default DataRumahIbadah
