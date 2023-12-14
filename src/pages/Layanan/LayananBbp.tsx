import {
  Action,
  Container,
  Loading,
  ModalEditDataBBP,
  ModalEditPengajuanBBP,
  Pagination,
  Search,
  Status
} from '@/components'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useForm } from 'react-hook-form'
import FilterLayanan from './../../components/atoms/FilterLayanan'
import { useCreateParams, useGetParams, useTitle } from '@/hooks'
import { useGetTuitionAssistanceByEventId } from '@/store/server/useService'
import { useParams } from 'react-router-dom'
import { useGetEventById } from '@/store/server'
import * as React from 'react'

interface FormValues {
  search: string
}

export default function LayananBbp() {
  useTitle('Bantuan Biaya Pendidikan (BBP)')
  const { id } = useParams<{ id: string }>()

  const [isShow, setIsShow] = React.useState(false)
  const [isShowPengajuan, setIsShowPengajuan] = React.useState(false)
  const [tuitionAssistanceId, setTuitionAssistanceId] = React.useState('')

  const createParams = useCreateParams()
  const { search, page, applicationStatus } = useGetParams(['search', 'page', 'applicationStatus'])

  const { data: event } = useGetEventById(id as string)
  const { data, refetch, isFetching } = useGetTuitionAssistanceByEventId({
    eventId: id as string,
    applicationStatus: applicationStatus || 'processed',
    search,
    page: parseInt(page) || 1
  })

  const forms = useForm<FormValues>()

  const onSearch = async (values: FormValues) => {
    createParams({ key: 'search', value: values.search })
    await refetch()
  }

  return (
    <Container>
      {isFetching && <Loading />}
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSearch)} className="flex flex-col gap-6">
          <div className="flex flex-row justify-between gap-3 py-6 items-center">
            <div className="w-6/12">
              <FormField
                name="search"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Search value={field.value} onChange={field.onChange} placeholder="Masukkan Nama / NIK" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-end justify-end m">
              <Button className="bg-primary w-[143px] h-[56px] rounded-xl mr-4" type="button">
                <p className="text-white text-base font-bold">Kirim Notifikasi</p>
              </Button>
              <div className="bg-primary px-5 py-4 rounded-xl">
                <p className="text-white text-base font-bold">
                  Total Kuota : {event?.filledQuota}/{event?.quota ?? event?.filledQuota}
                </p>
              </div>
            </div>
          </div>
        </form>
      </Form>
      <FilterLayanan action={async () => await refetch()} />
      <section className="border rounded-xl mt-5 overflow-hidden">
        <Table>
          <TableHeader className="bg-[#FFFFFF]">
            <TableRow>
              <TableHead className="text-white font-bold text-[15px] bg-primary">No</TableHead>
              <TableHead className="text-white font-bold text-[15px] bg-primary">NIK</TableHead>
              <TableHead className="text-white font-bold text-[15px] bg-primary">Nama</TableHead>
              <TableHead className="text-white font-bold text-[15px] bg-primary">Status</TableHead>
              <TableHead className="text-white font-bold text-[15px] bg-primary">Jenis Kelamin</TableHead>
              <TableHead className="text-white font-bold text-[15px] bg-primary">Kecamatan</TableHead>
              <TableHead className="text-white font-bold text-[15px] bg-primary">Kalurahan</TableHead>
              <TableHead className="text-white font-bold text-[15px] bg-primary">Alamat</TableHead>
              <TableHead className="text-white font-bold text-[15px] bg-primary">No Hp</TableHead>
              <TableHead className="text-white font-bold text-[15px] bg-primary">Status DTKS</TableHead>
              <TableHead className="text-white font-bold text-[15px] bg-primary">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.length !== 0 ? (
              data?.data.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="bg-[#F9FAFC]" position="center">
                    {(data.meta.currentPage - 1) * data.meta.perPage + index + 1}
                  </TableCell>
                  <TableCell className="bg-[#F9FAFC]">{item.beneficiary.identityNumber ?? '-'}</TableCell>
                  <TableCell className="bg-[#F9FAFC]">{item.beneficiary.name ?? '-'}</TableCell>
                  <TableCell className="bg-[#F9FAFC]">
                    {item.application_status ? (
                      <Status
                        label={item.application_status}
                        isWarning="pending"
                        isDanger="rejected"
                        isSuccess="approved"
                      />
                    ) : (
                      '-'
                    )}
                  </TableCell>
                  <TableCell className="bg-[#F9FAFC]">{item.beneficiary.gender ?? '-'}</TableCell>
                  <TableCell className="bg-[#F9FAFC] capitalize">
                    {item.beneficiary.address.areaLevel3?.name ?? '-'}
                  </TableCell>
                  <TableCell className="bg-[#F9FAFC] capitalize">
                    {item.beneficiary.address.areaLevel4?.name ?? '-'}
                  </TableCell>
                  <TableCell className="bg-[#F9FAFC] capitalize">
                    {item.beneficiary.address.fullAddress ?? '-'}
                  </TableCell>
                  <TableCell className="bg-[#F9FAFC] capitalize">{item.phoneNumber ?? '-'}</TableCell>
                  <TableCell className="bg-[#F9FAFC] capitalize">{}</TableCell>
                  <TableCell className="flex items-center justify-center bg-[#F9FAFC]">
                    <Action
                      onEdit={() => {
                        setIsShow(true)
                        setTuitionAssistanceId(item.id)
                      }}
                      onDetail={() => setIsShowPengajuan(true)}
                      editText="Edit data"
                      detailText="Edit Pengajuan"
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
        {(data?.meta?.total as number) > 30 ? (
          <Pagination
            currentPage={page !== '' ? parseInt(page) : 1}
            totalCount={data?.meta.total as number}
            pageSize={30}
            onPageChange={(page) => createParams({ key: 'page', value: page.toString() })}
          />
        ) : null}

        <ModalEditDataBBP
          isShow={isShow}
          setIsShow={setIsShow}
          tuitionAssistanceId={tuitionAssistanceId}
          eventId={id as string}
        />
        <ModalEditPengajuanBBP isShow={isShowPengajuan} setIsShow={setIsShowPengajuan} />
      </section>
    </Container>
  )
}
