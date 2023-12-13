import { Action, Container, CreateEvent, Loading, Pagination, Status } from '@/components'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useCreateParams, useGetParams, useTitle } from '@/hooks'
import { HiNewspaper } from 'react-icons/hi2'
import * as React from 'react'
import { useDeleteEvent, useGetEvent } from '@/store/server'
import { formatToView } from '@/lib/services/formatDate'
import { useAlert } from '@/store/client'

const Event = () => {
  useTitle('Event')

  const { alert } = useAlert()
  const [isShow, setIsShow] = React.useState(false)
  const [eventId, setEventId] = React.useState('')

  const createParams = useCreateParams()
  const { page } = useGetParams(['page'])

  const { data: events, isLoading, isFetching } = useGetEvent()
  const { mutateAsync: deleteEvent } = useDeleteEvent()

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

  if (isLoading) return <Loading />

  return (
    <Container>
      {isFetching && <Loading />}
      <div className="flex justify-end my-5">
        <Button className="py-6 rounded-lg" onClick={() => setIsShow(true)}>
          <HiNewspaper className="text-2xl" />
          <p className="text-sm ml-3">Tambah Event</p>
        </Button>
      </div>
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
