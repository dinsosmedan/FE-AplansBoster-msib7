import { Action, Container, Loading, ModalEditPengajuanSKTM, Pagination, Search, StatusDropdown } from '@/components'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useTitleHeader } from '@/store/client'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import FilterLayanan from './../../components/atoms/FilterLayanan'
import { useGetIndigencyCertificate, useUpdateIndigencyCertificateStatus } from '@/store/server/useService'
import useGetParams from '@/hooks/useGetParams'
import { useCreateParams, useTitle } from '@/hooks'
import ModalEditDataSKTM from '@/components/organisms/service/sktm/ModalEditData'

interface FormValues {
  nik: string
  tahunAnggaran: string
  jadwalAwal: string
  tahunNotifikasi: string
  jumlahPeserta: string
  batch: string
  jadwalAkhir: string
  jenisEvent: string
}

const dataLayanan = [
  { text: 'Data Pengajuan', tab: 'pending' },
  { text: 'Data Diterima', tab: 'approved' },
  { text: 'Data Ditolak', tab: 'rejected' }
]

export default function LayananSktm() {
  useTitle('Surat Keterangan Tidak Mampu (SKTM)')
  const setBreadcrumbs = useTitleHeader((state) => state.setBreadcrumbs)

  React.useEffect(() => {
    setBreadcrumbs([
      { url: '/layanan', label: 'Layanan' },
      { url: '/layanan/layanan-sktm', label: 'SKTM' }
    ])
  }, [])

  const [isShow, setIsShow] = React.useState(false)
  const [isShowPengajuan, setIsShowPengajuan] = React.useState(false)

  const [search, setsearch] = React.useState('')
  const [indigencyId, setIndigencyId] = React.useState('')

  const createParams = useCreateParams()
  const { tab, page } = useGetParams(['tab', 'page'])
  const { mutate: update, isLoading: isLoadingUpdate } = useUpdateIndigencyCertificateStatus()
  const {
    data: indigencyCertificate,
    refetch,
    isFetching
  } = useGetIndigencyCertificate(tab, search, parseInt(page) || 1)

  React.useEffect(() => {
    void refetch()
  }, [tab])

  React.useEffect(() => {
    void refetch()
  }, [search])

  const forms = useForm<FormValues>()

  const onSubmit = async (values: FormValues) => {
    setsearch(values.nik)
    await refetch()
  }

  const handleChangeStatusDTKS = async (values: string, id: string) => {
    update({ id, fields: { statusDtks: values } })
  }

  return (
    <Container>
      <Form {...forms}>
        {(isFetching || isLoadingUpdate) && <Loading />}
        <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="w-12/12">
            <FormField
              name="nik"
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
        </form>
      </Form>
      <FilterLayanan jenis={'layanan-sktm'} data={dataLayanan} />
      <section className="border rounded-xl mt-5 overflow-hidden">
        <Table>
          <TableHeader className="bg-[#FFFFFF]">
            <TableRow>
              <TableHead className="text-white font-bold text-[15px] bg-primary">No</TableHead>
              <TableHead className="text-white font-bold text-[15px] bg-primary">Nama</TableHead>
              <TableHead className="text-white font-bold text-[15px] bg-primary">NIK</TableHead>
              <TableHead className="text-white font-bold text-[15px] bg-primary">Kecamatan</TableHead>
              <TableHead className="text-white font-bold text-[15px] bg-primary">Keluarahan</TableHead>
              <TableHead className="text-white font-bold text-[15px] bg-primary">Status DTKS</TableHead>
              <TableHead className="text-white font-bold text-[15px] bg-primary">Status</TableHead>
              <TableHead className="text-white font-bold text-[15px] bg-primary">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {indigencyCertificate?.data.length !== 0 ? (
              indigencyCertificate?.data.map((valsktm: any, i: any) => {
                const val = valsktm.peopleConcerned
                const status = valsktm.applicationStatus
                const color =
                  status === 'pending'
                    ? 'text-[#FFB60A] '
                    : status === 'approved'
                    ? 'text-green-500'
                    : status === 'rejected'
                    ? 'text-rose-500'
                    : status === 'processed'
                    ? 'text-cyan-500'
                    : ''
                return (
                  <TableRow key={i}>
                    <TableCell className="text-left bg-[#F9FAFC]">
                      {(indigencyCertificate.meta.currentPage - 1) * indigencyCertificate.meta.perPage + i + 1}
                    </TableCell>
                    <TableCell className="text-left bg-[#F9FAFC]">{val?.name ?? '-'}</TableCell>
                    <TableCell className="text-left bg-[#F9FAFC]">{val?.identityNumber ?? '-'}</TableCell>
                    <TableCell className="text-left bg-[#F9FAFC]">{val?.address?.areaLevel3?.name ?? '-'}</TableCell>
                    <TableCell className="text-left bg-[#F9FAFC]">{val?.address?.areaLevel4?.name ?? '-'}</TableCell>
                    <TableCell className="text-left bg-[#F9FAFC]" position="center">
                      <StatusDropdown
                        value={valsktm.dtksStatus ?? ''}
                        action={async (status: string) => await handleChangeStatusDTKS(status, valsktm.id)}
                      />
                    </TableCell>
                    <TableCell className={`text-left bg-[#F9FAFC] ${color} capitalize`} position="center">
                      {status ?? '-'}
                    </TableCell>
                    <TableCell className="flex items-center justify-center text-left bg-[#F9FAFC] ">
                      <Action
                        onEdit={() => {
                          setIsShow(true)
                          setIndigencyId(valsktm.id)
                        }}
                        onDetail={() => {
                          setIsShowPengajuan(true)
                          setIndigencyId(valsktm.id)
                        }}
                        editText="Edit data"
                        detailText="Edit Pengajuan"
                      />
                    </TableCell>
                  </TableRow>
                )
              })
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
      {(indigencyCertificate?.meta?.total as number) > 30 ? (
        <Pagination
          currentPage={page !== '' ? parseInt(page) : 1}
          totalCount={indigencyCertificate?.meta.total as number}
          pageSize={30}
          onPageChange={(page) => createParams({ key: 'page', value: page.toString() })}
        />
      ) : null}

      <ModalEditPengajuanSKTM isShow={isShowPengajuan} setIsShow={setIsShowPengajuan} indigencyId={indigencyId} />
      <ModalEditDataSKTM isShow={isShow} setIsShow={setIsShow} indigencyId={indigencyId} />
    </Container>
  )
}
