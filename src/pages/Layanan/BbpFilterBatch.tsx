import { Container, Loading, Status } from '@/components'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useTitle } from '@/hooks'
import { formatToView } from '@/lib/services/formatDate'
import { useGetEvent } from '@/store/server'
import { useForm } from 'react-hook-form'
import { HiOutlineExclamationCircle } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'

interface FormValues {
  nik: string
}

export default function BbpFilterBatch() {
  useTitle('Bantuan Biaya Pendidikan (BBP)')
  const navigate = useNavigate()
  const { data: events, isLoading } = useGetEvent()
  const forms = useForm<FormValues>({
    mode: 'onTouched'
  })

  const onSubmit = async (values: FormValues) => {
    console.log(values)
  }

  if (isLoading) return <Loading />

  return (
    <Container>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-row justify-between gap-3 py-6">
            <div className="w-11/12">
              <FormField
                name="nik"
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
            <div className="w-1/12 flex items-end justify-end">
              <Button className="w-full">Cari</Button>
            </div>
          </div>
        </form>
      </Form>
      <section className="border rounded-xl mt-5 overflow-hidden">
        <Table>
          <TableHeader className="bg-[#FFFFFF]">
            <TableRow>
              <TableHead className="text-[#534D59] font-bold text-[15px]">No</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Batch</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Kuota</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Tanggal Dibuka</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Tanggal Tutup</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Status</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events?.data?.length !== 0 ? (
              events?.data.map((event, index) => (
                <TableRow key={event.id}>
                  <TableCell className="bg-[#F9FAFC]">
                    {(events.meta.currentPage - 1) * events.meta.perPage + index + 1}
                  </TableCell>
                  <TableCell className="bg-[#F9FAFC]">{event.batch}</TableCell>
                  <TableCell className="bg-[#F9FAFC]">{event.quota}</TableCell>
                  <TableCell className="bg-[#F9FAFC]">
                    {event.startDate ? formatToView(event.startDate) : '-'}
                  </TableCell>
                  <TableCell className="bg-[#F9FAFC]">{event.endDate ? formatToView(event.startDate) : '-'}</TableCell>
                  <TableCell className="bg-[#F9FAFC] capitalize">
                    {event.status && (
                      <Status label={event.status} isSuccess="active" isWarning="in-progress" isDanger="inactive" />
                    )}
                  </TableCell>
                  <TableCell className="flex items-center justify-center bg-[#F9FAFC]">
                    <Button className="py-6 rounded-lg" onClick={() => navigate(`/layanan/bbp/${event.id}`)}>
                      <p className="font-bold pr-3">Action</p>
                      <HiOutlineExclamationCircle className="h-5 w-5" />
                    </Button>
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
    </Container>
  )
}
