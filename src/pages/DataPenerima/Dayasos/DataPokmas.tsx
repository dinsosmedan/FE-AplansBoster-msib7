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
import { useGetCommunityGroups, useGetKecamatan, useGetKelurahan } from '@/store/server'
import { Loading } from '@/components'
interface FormValues {
  q: string
  community_activity_code: string
  status: string
  kecamatan: string
  kelurahan: string
  application_year: string
}
const DataPokmas = () => {
  useTitle('Data Penerima / Dayasos / Pokmas ')
  const createParams = useCreateParams()
  const { page, q, kecamatan, kelurahan, community_activity_code, status, application_year } = useGetParams(['page', 'q', 'kecamatan', 'kelurahan', 'community_activity_code', 'status', 'application_year'])


  const forms = useForm<FormValues>({
    defaultValues: {
      q: '',
      community_activity_code: '',
      status: '',
      kecamatan: '',
      kelurahan: '',
      application_year: ''
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
    community_activity_code: community_activity_code,
    status: status,
    application_year: application_year
  })
  useDisableBodyScroll(isFetching)

  const handleReset = () => {
    forms.reset({ q: '', kecamatan: '', kelurahan: '', application_year: '', status: '', community_activity_code: '' });
    createParams({ key: 'q', value: '' });
    createParams({ key: 'application_year', value: '' });
    createParams({ key: 'kecamatan', value: '' });
    createParams({ key: 'kelurahan', value: '' });
    createParams({ key: 'status', value: '' });
    createParams({ key: 'community_activity_code', value: '' });
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
    updateParam('q', values.q);
    updateParam('application_year', values.application_year);
    updateParam('kecamatan', values.kecamatan);
    updateParam('kelurahan', values.kelurahan);
    updateParam('status', values.status);
    updateParam('community_activity_code', values.community_activity_code);

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
        <h1 className="font-bold text-xl ">Dat a Kelompok Masyarakat (Pokmas)</h1>
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
                name="community_activity_code"
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
                name="application_year"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Tahun" />
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
          <TableHeader className="bg-zinc-300">
            <TableRow>
              <TableHead className="text-black">No.</TableHead>
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
              communityGroup?.data.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="text-left">{(communityGroup.meta.currentPage - 1) * communityGroup.meta.perPage + index + 1}</TableCell>
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
