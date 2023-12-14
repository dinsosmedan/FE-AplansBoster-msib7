import { Action, Container, CreateEvent, Loading, Pagination, Status } from '@/components'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useCreateParams, useDeleteParams, useGetParams, useTitle } from '@/hooks'
import { HiMagnifyingGlass, HiNewspaper } from 'react-icons/hi2'
import * as React from 'react'
import { useDeleteEvent, useGetEvent, useGetEventType } from '@/store/server'
import { formatToView } from '@/lib/services/formatDate'
import { useAlert, useAuth } from '@/store/client'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { STATUS_EVENT } from '@/lib/data'

interface FormValues {
  type: string
  status: string
  year: string
}

const Event = () => {
  useTitle('Event')
  const user = useAuth((state) => state.user)

  const { alert } = useAlert()
  const [isShow, setIsShow] = React.useState(false)
  const [eventId, setEventId] = React.useState('')

  const deleteParams = useDeleteParams()
  const createParams = useCreateParams()
  const { page, status, year } = useGetParams(['page', 'status', 'year'])

  const { data: eventType } = useGetEventType()
  const { data: events, isFetching, refetch } = useGetEvent(status, year, page)
  const { mutateAsync: deleteEvent } = useDeleteEvent()

  if (!user?.role.name.includes('admin')) {
    return <div>You are not have permission to access this menu</div>
  }

  const forms = useForm<FormValues>()

  const handleDelete = (id: string) => {
    void alert({
      title: 'Hapus Data Event',
      description: 'Apakah kamu yakin ingin menghapus data ini?',
      variant: 'danger',
      submitText: 'Hapus'
    }).then(async () => {
      await deleteEvent(id)
    })
  }

  const handleEdit = (id: string) => {
    setEventId(id)
    setIsShow(true)
  }

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

  return (
    <Container>
      {isFetching && <Loading />}
      <div className="flex justify-end my-5">
        <Button className="py-6 rounded-lg" onClick={() => setIsShow(true)}>
          <HiNewspaper className="text-2xl" />
          <p className="text-sm ml-3">Tambah Event</p>
        </Button>
      </div>

      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="flex items-center justify-between gap-8 mb-5">
          <FormField
            control={forms.control}
            name="type"
            render={({ field }) => (
              <FormItem className="flex-1">
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Jenis Event" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {eventType?.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={forms.control}
            name="status"
            render={({ field }) => (
              <FormItem className="flex-1">
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
          <FormField
            control={forms.control}
            name="year"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input {...field} value={field.value ?? ''} type="number" placeholder="Cari berdasarkan tahun" />
                </FormControl>
              </FormItem>
            )}
          />
          <Button className="gap-2 border-none rounded-lg" type="submit">
            <HiMagnifyingGlass className="text-lg" />
            <span>Cari Data</span>
          </Button>
        </form>
      </Form>

      <Table>
        <TableHeader className="bg-primary">
          <TableRow>
            <TableHead className="text-white">No</TableHead>
            <TableHead className="text-white">Jenis Event</TableHead>
            <TableHead className="text-white">Jadwal Awal</TableHead>
            <TableHead className="text-white">Jadwal Akhir</TableHead>
            <TableHead className="text-white">Batch</TableHead>
            <TableHead className="text-white">Kuota</TableHead>
            <TableHead className="text-white">Status</TableHead>
            <TableHead className="text-white">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events?.data?.length !== 0 ? (
            events?.data.map((event, index) => (
              <TableRow key={event.id}>
                <TableCell className="bg-[#F9FAFC]" position="center">
                  {(events.meta.currentPage - 1) * events.meta.perPage + index + 1}
                </TableCell>
                <TableCell className="bg-[#F9FAFC]">{event.type.name ?? '-'}</TableCell>
                <TableCell className="bg-[#F9FAFC]">{event.startDate ? formatToView(event.startDate) : '-'}</TableCell>
                <TableCell className="bg-[#F9FAFC]">{event.endDate ? formatToView(event.startDate) : '-'}</TableCell>
                <TableCell className="bg-[#F9FAFC]">{event.batch ?? '-'}</TableCell>
                <TableCell className="bg-[#F9FAFC]">{event.quota ?? '-'}</TableCell>
                <TableCell className="bg-[#F9FAFC] capitalize" position="center">
                  {event.status && (
                    <Status label={event.status} isSuccess="active" isWarning="in-progress" isDanger="inactive" />
                  )}
                </TableCell>
                <TableCell className="flex items-center justify-center bg-[#F9FAFC]">
                  <Action onDelete={() => handleDelete(event.id)} onEdit={() => handleEdit(event.id)} />
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
      {(events?.meta?.total as number) > 30 ? (
        <Pagination
          currentPage={page !== '' ? parseInt(page) : 1}
          totalCount={events?.meta.total as number}
          pageSize={30}
          onPageChange={(page) => createParams({ key: 'page', value: page.toString() })}
        />
      ) : null}
      <CreateEvent isShow={isShow} setIsShow={setIsShow} eventId={eventId} />
    </Container>
  )
}

export default Event
