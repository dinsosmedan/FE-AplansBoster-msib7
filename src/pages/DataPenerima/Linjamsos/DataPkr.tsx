import Container from '@/components/atoms/Container'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import useTitle from '@/hooks/useTitle'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { HiArrowPath, HiMagnifyingGlass } from 'react-icons/hi2'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Pagination from './../../../components/atoms/Pagination'
import { useNavigate } from 'react-router-dom'
import { useDeletePkr, useGetKecamatan, useGetKelurahan, useVulnerableGroupHandlings } from '@/store/server'
import { useCreateParams, useDisableBodyScroll, useGetParams } from '@/hooks'
import { Action, ExportButton, Loading } from '@/components'
import { useAlert } from '@/store/client'
interface FormValues {
  q: string
  kelurahan: string
  kecamatan: string
  year: string
}
const DataPkr = () => {
  useTitle('Data Penerima / Linjamsos / Penanganan Kelompok Rentan (PKR) ')
  const navigate = useNavigate()
  const createParams = useCreateParams()
  const { q, kecamatan, kelurahan, page, year } = useGetParams(['q', 'kecamatan', 'kelurahan', 'page', 'year'])
  const forms = useForm<FormValues>({
    defaultValues: {
      q: '',
      kecamatan: '',
      kelurahan: '',
      year: ''
    }
  })
  const { alert } = useAlert()

  const areaLevel3 = forms.watch('kecamatan')
  const { data: listKecamatan } = useGetKecamatan()
  const { data: listKelurahan } = useGetKelurahan(areaLevel3)
  const {
    data: vulnerables,
    refetch,
    isFetching,
    isLoading
  } = useVulnerableGroupHandlings({
    page: parseInt(page) ?? 1,
    idKecamatan: kecamatan,
    idKelurahan: kelurahan,
    year,
    q
  })
  const { mutateAsync: deletePkr } = useDeletePkr()
  const handleDelete = async (id: string) => {
    await alert({
      title: 'Hapus Data PKR',
      description: 'Apakah kamu yakin ingin menghapus data ini?',
      variant: 'danger',
      submitText: 'Delete'
    }).then(async () => {
      await deletePkr(id)
    })
  }
  useDisableBodyScroll(isFetching)
  const updateParam = (key: any, value: any) => {
    if (value !== '') {
      createParams({ key, value })
      createParams({ key: 'page', value: '' })
    } else {
      createParams({ key, value: '' })
    }
  }

  const onSubmit = async (values: FormValues) => {
    updateParam('q', values.q)
    updateParam('kecamatan', values.kecamatan)
    updateParam('kelurahan', values.kelurahan)
    updateParam('year', values.year)

    await refetch()
  }
  const handleReset = () => {
    navigate('/data-penerima/linjamsos/data-pkr')
    forms.reset()
  }
  if (isLoading) {
    return <Loading />
  }
  return (
    <div>
      <Container>
        <h1 className="font-bold text-[32px] ">Penanganan Kelompok Rentan (PKR)</h1>
        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="flex flex-row justify-between pt-10 items-center gap-5 ">
              <div className="flex-1 ">
                <FormField
                  name="q"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} type="number" placeholder="Masukkan NIK Masyarakat" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-x-5 gap-y-5 ">
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
                disabled={areaLevel3 === ''}
                name="kelurahan"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value} disabled={!areaLevel3 || !kecamatan}>
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
            <div className="mb-6 flex justify-between">
              <div className="w-[20%]">
                <ExportButton onExportFirst={() => { }} onExportSecond={() => { }} />
              </div>
              <div className="flex gap-3">
                <Button type="button" variant="outline" className="gap-3 text-primary rounded-lg" onClick={handleReset}>
                  <HiArrowPath className="text-lg" />
                  <span>Reset</span>
                </Button>
                <Button>
                  <HiMagnifyingGlass className="w-4 h-4 py" />
                  <p className="font-bold text-sm text-white ml-3 w-max">Cari Data</p>
                </Button>
              </div>
            </div>
          </form>
        </Form>
        <section className="border rounded-xl mt-5 overflow-hidden">
          <Table>
            <TableHeader className="bg-zinc-300">
              <TableRow>
                <TableHead className="text-[#534D59] font-bold text-[15px]">No. </TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]">Nama Pemohon</TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]">Nomor Kartu Keluraga</TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]">NIK</TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]">Alamat Kartu Keluarga</TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]">Kecamatan</TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]">Kelurahan</TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vulnerables?.data?.length !== 0 ? (
                vulnerables?.data.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-left bg-[#F9FAFC]">
                      {(vulnerables.meta.currentPage - 1) * vulnerables.meta.perPage + index + 1}
                    </TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]">{item.beneficiary?.name ?? '-'}</TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]">
                      {item.beneficiary?.identityNumber ?? '-'}
                    </TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]">
                      {item.beneficiary?.familyCardNumber ?? '-'}
                    </TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]">
                      {item.beneficiary?.address.fullAddress ?? '-'}
                    </TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]">
                      {item.beneficiary?.address.areaLevel3?.name ?? '-'}
                    </TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]">
                      {item.beneficiary?.address.areaLevel4?.name ?? '-'}
                    </TableCell>
                    <TableCell className="flex items-center justify-center bg-[#F9FAFC]">
                      <Action
                        onDelete={async () => await handleDelete(item.id)}
                        onDetail={() => console.log('edit')}
                        onEdit={() => navigate(`/layanan/linjamsos/Pkr/${item.id}`)}
                      />
                    </TableCell>
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
        </section>
        {(vulnerables?.meta?.total as number) > 10 ? (
          <Pagination
            className="px-5 py-5 flex justify-end"
            currentPage={page !== '' ? parseInt(page) : 1}
            totalCount={vulnerables?.meta.total as number}
            pageSize={30}
            onPageChange={(page) => createParams({ key: 'page', value: page.toString() })}
          />
        ) : null}
      </Container>
    </div>
  )
}
export default DataPkr
