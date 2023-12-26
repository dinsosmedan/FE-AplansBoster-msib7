import { Container, Loading, Status } from '@/components'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useCreateParams, useDeleteParams, useGetParams, useTitle } from '@/hooks'
import { formatToView } from '@/lib/services/formatDate'
import { useGetEventTuitionAssistance } from '@/store/server'
import { useForm } from 'react-hook-form'
import { HiMagnifyingGlass, HiArrowRightCircle, HiArrowPath } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import * as React from 'react'
import { STATUS_EVENT } from '@/lib/data'

interface FormValues {
  year: string
  status: string
}

export default function BbpFilterBatch() {
  useTitle('Bantuan Biaya Pendidikan (BBP)')
  const navigate = useNavigate()

  const createParams = useCreateParams()
  const deleteParams = useDeleteParams()
  const { year, status } = useGetParams(['year', 'status'])
  const forms = useForm<FormValues>()

  React.useEffect(() => {
    if (year) forms.setValue('year', year)
    if (status) forms.setValue('status', status)
  }, [year, status])

  const { data: events, isLoading, refetch, isFetching } = useGetEventTuitionAssistance(year, status)

  const onSubmit = async (values: FormValues) => {
    Object.keys(values).forEach((key) => {
      if (values[key as keyof FormValues] !== '' && values[key as keyof FormValues] !== undefined) {
        createParams({ key, value: values[key as keyof FormValues] })
      } else {
        deleteParams(key)
      }
    })
    deleteParams('page')
    await refetch()
  }

  const handleReset = async () => {
    forms.setValue('year', '')
    forms.setValue('status', '')
    deleteParams('year')
    deleteParams('status')
    await refetch()
  }

  return (
    <Container>
      {(isFetching || isLoading) && <Loading />}
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-row justify-between gap-3 py-6">
            <div className="w-11/12">
              <FormField
                name="status"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {STATUS_EVENT.map((status, index) => (
                          <SelectItem key={index} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <div className="w-11/12">
              <FormField
                name="year"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} type="number" placeholder="Cari berdasarkan Tahun" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center justify-end gap-2">
              {(year || status) && (
                <Button
                  className="gap-2 border-primary text-primary rounded-lg"
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                >
                  <HiArrowPath className="text-lg" />
                  <span className="w-max">Reset</span>
                </Button>
              )}
              <Button className="gap-2 border-none rounded-lg" type="submit">
                <HiMagnifyingGlass className="text-lg" />
                <span className="w-max">Cari Data</span>
              </Button>
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
                  <TableCell className="bg-[#F9FAFC]" position="center">
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
                      <p className="font-bold"></p>
                      <HiArrowRightCircle className="h-5 w-5" />
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
