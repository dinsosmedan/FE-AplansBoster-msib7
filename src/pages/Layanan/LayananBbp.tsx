import ENV from '@/lib/environment'
import {
  Action,
  Container,
  Loading,
  ModalEditDataBBP,
  ModalEditPengajuanBBP,
  Pagination,
  Search,
  Status,
  StatusDropdown
} from '@/components'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useForm } from 'react-hook-form'
import FilterLayanan from './../../components/atoms/FilterLayanan'
import { useCreateParams, useGetParams, useTitle } from '@/hooks'
import { useDeleteTuitionAssistanceEvent, useGetTuitionAssistanceByEventId, useUpdateTuitionAssistanceEventStatus } from '@/store/server/useService'
import { useParams } from 'react-router-dom'
import { useGetEventById } from '@/store/server'
import * as React from 'react'
import { useAlert, useTitleHeader } from '@/store/client'
import { useToastEmail } from '@/hooks'
import axios from 'axios'
import { exportTuitionApplicationPublicFn } from '@/api/service.api'
const dataLayanan = [
  { text: 'Data Pengajuan', tab: 'pending' },
  { text: 'Data Diproses', tab: 'processed' },
  { text: 'Data Direvisi', tab: 'revision' },
  { text: 'Data Diterima', tab: 'approved' },
  { text: 'Data Ditolak', tab: 'rejected' }
]

export default function LayananBbp() {
  useTitle('Bantuan Biaya Pendidikan (BBP)')
  const setBreadcrumbs = useTitleHeader((state) => state.setBreadcrumbs)
  const { id } = useParams<{ id: string }>()

  React.useEffect(() => {
    setBreadcrumbs([
      { url: '/layanan', label: 'Layanan' },
      { url: `/layanan/bbp/${id}`, label: 'BBP' }
    ])
  }, [])
  const { alert } = useAlert()

  const { mutateAsync: isDelete, isLoading:isLoadingDelete } = useDeleteTuitionAssistanceEvent()

const handleDelete = (id: string) => {
  void alert({
    title: 'Delete',
    description: 'Yakin untuk menghapus ?',
    submitText: 'Delete',
    variant: 'danger'
  }).then(async () => {
    await isDelete(id)
  })
}

  const [isShow, setIsShow] = React.useState(false)
  const [isShowPengajuan, setIsShowPengajuan] = React.useState(false)
  const [tuitionAssistanceId, setTuitionAssistanceId] = React.useState('')
  const toastEmail = useToastEmail()

  const createParams = useCreateParams()
  const { search, tab, page } = useGetParams(['search', 'tab', 'page'])

  
  const { data: event } = useGetEventById(id as string)
  const { mutate: update, isLoading: isLoadingUpdate } = useUpdateTuitionAssistanceEventStatus()
  const { data, refetch, isFetching } = useGetTuitionAssistanceByEventId({
    eventId: id as string,
    applicationStatus: tab || 'pending',
    search,
    page: parseInt(page) || 1
  })

  const forms = useForm<{ search: string }>()
  const [loading, setLoading] = React.useState<boolean>(false)

  const onSearch = async (values: { search: string }) => {
    createParams({ key: 'search', value: values.search })
    await refetch()
  }

  const handleChangeStatusDTKS = async (values: string, id: string) => {
    update({ id, fields: { dtksStatus: values } })
  }



  const handleClick = async () => {
    const apiPublic = axios.create({
      baseURL: ENV.apiUrl
    })
    setLoading(true)
    try {
      const response = await apiPublic.post('update-application-status', {
        status: 'updated'
      })
      if (response.status === 200) {
        toastEmail({
          successCondition: true,
          onSuccess: () => {}
        })
      } else {
        toastEmail({
          successCondition: true,
          onSuccess: () => {}
        })
      }
    } catch (error) {
      toastEmail({
        successCondition: true,
        onSuccess: () => {}
      })
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      {(isFetching || isLoadingUpdate || isLoadingDelete) && <Loading />}
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSearch)} className="flex flex-col gap-6">
          <div className="flex flex-row items-center justify-between gap-3 py-6">
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
            <div className="flex items-end justify-end">
              <Button 
              className="bg-primary w-[143px] h-[56px] rounded-xl mr-4" type="button">
              {/* onClick={handleClick}>
                {loading && <Loading />} */}
                <p className="text-base font-bold text-white">Kirim Notifikasi</p>
              </Button>
              <div className="bg-[#fce9ee] px-5 py-4 rounded-xl">
                <p className="text-base font-bold text-primary">
                  Total Kuota : {event?.filledQuota}/{event?.quota ?? event?.filledQuota}
                </p>
              </div>
            </div>
          </div>
        </form>
      </Form>
      
      <FilterLayanan jenis={`bbp/${id}`} data={dataLayanan} />
      <section className="mt-5 overflow-hidden border rounded-xl">
        <Table>
          <TableHeader className="bg-[#FFFFFF]">
            <TableRow>
              <TableHead className="text-white font-bold text-[15px] bg-primary">No</TableHead>
              <TableHead className="text-white font-bold text-[15px] bg-primary">NIK</TableHead>
              <TableHead className="text-white font-bold text-[15px] bg-primary">Nama</TableHead>
              <TableHead className="text-white font-bold text-[15px] bg-primary">Status</TableHead>
              <TableHead className="text-white font-bold text-[15px] bg-primary">Jenis Kelamin</TableHead>
              <TableHead className="text-white font-bold text-[15px] bg-primary">Kecamatan</TableHead>
              <TableHead className="text-white font-bold text-[15px] bg-primary">Kelurahan</TableHead>
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
                    {item?.application_status ? (
                      <Status
                        label={item?.application_status}
                        isWarning="pending"
                        isDanger="rejected"
                        isSuccess="approved"
                      />
                    ) : (
                      '-'
                    )}
                  </TableCell>
                  <TableCell className="bg-[#F9FAFC]">
                    {item?.beneficiary?.gender ? item.beneficiary.gender : '-'}
                  </TableCell>
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
                  <TableCell className="bg-[#F9FAFC] capitalize">
                    <StatusDropdown
                      value={item.dtksStatus ?? ''}
                      action={async (status: string) => await handleChangeStatusDTKS(status, item.id)}
                    />
                  </TableCell>
                  <TableCell className="flex items-center justify-center bg-[#F9FAFC]">
                    <Action
                      onEdit={() => {
                        setIsShow(true)
                        setTuitionAssistanceId(item.id)
                      }}
                      onDetail={() => {
                        setIsShowPengajuan(true)
                        setTuitionAssistanceId(item.id)
                      }}
                      onDelete={()=> {
                        handleDelete(item.id)
                      }}
                      editText="Edit data"
                      detailText="Edit Pengajuan"
                      deleteText='Hapus'
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
        <ModalEditPengajuanBBP
          isShow={isShowPengajuan}
          setIsShow={setIsShowPengajuan}
          tuitionAssistanceId={tuitionAssistanceId}
        />
      </section>
    </Container>
  )
}
