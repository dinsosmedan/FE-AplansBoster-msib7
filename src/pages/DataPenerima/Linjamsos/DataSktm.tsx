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
import { useCreateParams, useDisableBodyScroll, useGetParams } from '@/hooks'
import { useGetIndigencyCertificateFn, useGetKecamatan, useGetKelurahan } from '@/store/server'
import { Action, Loading } from '@/components'
interface FormValues {
  q: string
  kelurahan: string
  kecamatan: string
  year: string
  status: string
}
const DataSktm = () => {
  useTitle('Data Penerima / Linjamsos / SKTM ')
  const navigate = useNavigate()
  const createParams = useCreateParams()
  const { q, kecamatan, kelurahan, page, year, status } = useGetParams(['q', 'kecamatan', 'kelurahan', 'page', 'year', 'status'])
  const forms = useForm<FormValues>({
    defaultValues: {
      q: '',
      kecamatan: '',
      kelurahan: '',
      year: '',
      status: ''
    }
  })
  const areaLevel3 = forms.watch('kecamatan')
  const { data: listKecamatan } = useGetKecamatan()
  const { data: listKelurahan } = useGetKelurahan(areaLevel3)
  const {
    data: indigencys,
    refetch,
    isFetching,
    isLoading
  } = useGetIndigencyCertificateFn({
    page: parseInt(page) ?? 1,
    idKecamatan: kecamatan,
    idKelurahan: kelurahan,
    year,
    q,
    status
  })
  console.log(indigencys)
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
    <Container>
      <h1 className="font-bold text-2xl ">Surat Keterangan Tidak Mampu (SKTM)</h1>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="grid grid-cols-3 gap-x-5 gap-y-5 mt-6 ">
            <FormField
              name="q"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} type="number" placeholder="Masukkan Nama/ NIK" />
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
              name="status"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className=" bg-white focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">DTKS</SelectItem>
              <SelectItem value="false">Non DTKS</SelectItem>
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
                  <Input {...field} type="text" placeholder="Masukkan Tahun Pembuatan" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <section className="flex items-center justify-between">
            <Select>
              <SelectTrigger className="border-primary flex gap-5 rounded-lg font-bold w-fit bg-white text-primary focus:ring-0">
                <SelectValue placeholder="Export" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value=".clsx">.clsx</SelectItem>
                <SelectItem value=".csv">.csv</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-3">
            <Button type="button" variant="outline" className="gap-3 text-primary rounded-lg" onClick={handleReset}>
                <HiArrowPath className="text-lg" />
                <span>Reset</span>
              </Button>
              <Button>
                <HiMagnifyingGlass className="w-4 h-4 py" />
                <p className="font-bold text-sm text-white ml-3 w-max">Cari Data</p>
              </Button>
            </div>
          </section>
        </form>
      </Form>
      <section className="border rounded-xl mt-5 overflow-hidden">
        <Table>
          <TableHeader className="bg-[#FFFFFF]">
            <TableRow>
              <TableHead className="text-[#534D59] font-bold text-[15px]">No. </TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Nama Pemohon</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Nama Bersangkutan</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Tahun Pembuatan</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Tanggal Terbit</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Status DTKS</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Kecamatan</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {indigencys?.data?.length !== 0 ? (
              indigencys?.data.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="text-left bg-[#F9FAFC]">
                    {(indigencys.meta.currentPage - 1) * indigencys.meta.perPage + index + 1}
                  </TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.applicant?.name ?? '-'}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.peopleConcerned?.name ?? '-'}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.issueYear ?? '-'}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.issueDate ?? '-'}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.isDtks ? 'DTKS' : 'Non DTKS'}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.applicant.address.areaLevel3?.name ?? '-'}</TableCell>
                  <TableCell className="flex items-center justify-center bg-[#F9FAFC]">
                  <Action onDelete={() => console.log('delete')} onDetail={() => console.log('edit')} onEdit={() => console.log('detail')}/>
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
      {(indigencys?.meta?.total as number) > 10 ? (
          <Pagination
            className="px-5 py-5 flex justify-end"
            currentPage={page !== '' ? parseInt(page) : 1}
            totalCount={indigencys?.meta.total as number}
            pageSize={30}
            onPageChange={(page) => createParams({ key: 'page', value: page.toString() })}
          />
        ) : null}
    </Container>
  )
}
export default DataSktm
