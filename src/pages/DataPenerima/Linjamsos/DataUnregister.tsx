import Container from '@/components/atoms/Container'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import useTitle from '@/hooks/useTitle'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { HiArrowPath, HiMagnifyingGlass } from 'react-icons/hi2'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Pagination from './../../../components/atoms/Pagination'
import DatePicker from '@/components/atoms/DatePicker'
import { useNavigate } from 'react-router-dom'
import { useCreateParams, useDisableBodyScroll, useGetParams } from '@/hooks'
import { useUnregisters } from '@/store/server'
import { Action, Loading } from '@/components'
interface FormValues {
  q: string
  letterNumber: string
  date: string | Date
  year: string
}
const DataUnregister = () => {
  useTitle('Data Penerima / Unregister) ')
  const navigate = useNavigate()
  const createParams = useCreateParams()
  const { page, date, letterNumber, q, year } = useGetParams(['q', 'letterNumber', 'date', 'page', 'year'])
  function getYearFromDate(dateString: string): string | null {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    if (!dateRegex.test(dateString)) {
      return null
    }

    const dateParts = dateString.split('-')
    const year = dateParts[0]

    return year
  }
  const forms = useForm<FormValues>({
    defaultValues: {
      q: '',
      date: '',
      letterNumber: '',
      year: ''
    }
  })
  const {
    data: unregisters,
    refetch,
    isFetching,
    isLoading
  } = useUnregisters({
    page: parseInt(page) ?? 1,
    date,
    letterNumber,
    year,
    q
  })
  console.log(unregisters)
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
    updateParam('date', values.date)
    updateParam('letterNumber', values.letterNumber)
    updateParam('year', values.year)

    await refetch()
  }
  const handleReset = () => {
    navigate('/data-penerima/linjamsos/data-unregister')
    forms.reset()
  }
  if (isLoading) {
    return <Loading />
  }
  return (
    <div>
      <Container>
        <h1 className="font-bold text-[32px] ">Unregister</h1>
        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="grid grid-cols-3 gap-x-5 gap-y-5 mt-5 ">
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
                name="letterNumber"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Kode Kegiatan" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="date"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <DatePicker
                        onChange={field.onChange}
                        selected={field.value as Date}
                        placeholder="Tanggal Masuk Rumah Sakit"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="year"
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
            <div className='flex justify-between'>
            <div className="w-[20%] mb-6">
              <Select>
                <SelectTrigger className="border-primary bg-white text-primary focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 ">
                  <SelectValue placeholder="Export Data" />
                </SelectTrigger>
                <SelectContent className="border-primary text-primary">
                  <SelectItem value="m@example.com">Krisna Asu</SelectItem>
                  <SelectItem value="m@google.com">Krisna Cuki</SelectItem>
                  <SelectItem value="m@support.com">The Little Krishna</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='flex gap-3'>
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
              <TableHead className="text-[#534D59] font-bold text-[15px]">Nama</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Jenis Kelamin</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Tahun</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Diagnosa Penyakit</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Umur</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Tanggal Masuk Rumah Sakit</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {unregisters?.data?.length !== 0 ? (
              unregisters?.data.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="text-left bg-[#F9FAFC]">
                    {(unregisters.meta.currentPage - 1) * unregisters.meta.perPage + index + 1}
                  </TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.name ?? '-'}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.gender ?? '-'}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{getYearFromDate(item.hospitalEntryDate)}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.deseaseDiagnosis ?? '-'}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.age ?? '-'}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.hospitalEntryDate ?? '-'}</TableCell>
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
        {(unregisters?.meta?.total as number) > 10 ? (
          <Pagination
            className="px-5 py-5 flex justify-end"
            currentPage={page !== '' ? parseInt(page) : 1}
            totalCount={unregisters?.meta.total as number}
            pageSize={30}
            onPageChange={(page) => createParams({ key: 'page', value: page.toString() })}
          />
        ) : null}
      </Container>
    </div>
  )
}
export default DataUnregister
