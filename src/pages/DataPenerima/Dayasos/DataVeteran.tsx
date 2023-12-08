import Container from '@/components/atoms/Container'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import useTitle from '@/hooks/useTitle'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Pagination from './../../../components/atoms/Pagination'
import * as React from 'react'
import { useCreateParams, useDisableBodyScroll, useGetParams } from '@/hooks'
import { useDeleteVeteran, useGetVeteran, useGetVeteranById } from '@/store/server'
import { Action, ExportButton, Loading, Modal } from '@/components'
import { useAlert } from '@/store/client'
import { exportVeteranFn } from '@/api/dayasos.api'

const DataVeteran = () => {
  useTitle('Data Penerima / Dayasos / Veteran ')
  const { alert } = useAlert()
  const createParams = useCreateParams()
  const { q, page } = useGetParams(['q', 'page'])
  const [isLoadingExport, setIsLoadingExport] = React.useState(false)
  const [isShow, setIsShow] = React.useState(false)
  const [selectedId, setSelectedId] = React.useState('')
  interface FormValues {
    q: string
  }
  const forms = useForm<FormValues>({
    defaultValues: {
      q: ''
      // batch: ''
    }
  })
  const { data: veteran, isLoading: isLoadingVeteran } = useGetVeteranById(selectedId)

  const {
    data: veterans,
    refetch,
    isFetching,
    isLoading
  } = useGetVeteran({
    page: parseInt(page) ?? 1,
    q
  })
  useDisableBodyScroll(isFetching)

  const onSubmit = async (values: FormValues) => {
    if (values.q !== '') {
      createParams({
        key: 'q',
        value: values.q !== '' ? values.q : ''
      })
      createParams({ key: 'page', value: '' })
    } else {
      createParams({ key: 'q', value: '' })
    }
    await refetch()
  }
  const showDetail = (id: string) => {
    setSelectedId(id)
    setIsShow(true)
  }
  const { mutateAsync: deleteVeteran } = useDeleteVeteran()
  const handleDelete = (id: string) => {
    void alert({
      title: 'Hapus Data Veteran',
      description: 'Apakah kamu yakin ingin menghapus data ini?',
      variant: 'danger',
      submitText: 'Delete'
    }).then(async () => {
      await deleteVeteran(id)
    })
  }

  if (isLoading) {
    return <Loading />
  }

  const exportAsCsv = async () => {
    setIsLoadingExport(true)
    await exportVeteranFn('data-veteran', 'csv')
    setIsLoadingExport(false)
  }

  const exportAsXlsx = async () => {
    setIsLoadingExport(true)
    await exportVeteranFn('data-veteran', 'xlsx')
    setIsLoadingExport(false)
  }

  return (
    <Container>
      {(isFetching || isLoadingExport) && <Loading />}
      <h1 className="font-bold text-2xl ">Veteran (VET)</h1>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="grid gap-x-10 gap-y-5 pt-10">
            <FormField
              name="q"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Masukkan Nama" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <section className="flex items-center justify-between">
            <div>
              {veterans?.data?.length !== 0 ? (
                <ExportButton onExportFirst={exportAsXlsx} onExportSecond={exportAsCsv} />
              ) : null}
            </div>
            <div className="flex items-center gap-3">
              <Button className="gap-2 border-none rounded-lg" type="submit">
                <HiMagnifyingGlass className="text-lg" />
                <span>Cari Data</span>
              </Button>
            </div>
          </section>
        </form>
      </Form>
      <section className="border rounded-xl mt-5 overflow-hidden">
        <Table>
          <TableHeader className="bg-[#FFFFFF]">
            <TableRow>
              <TableHead className="text-[#534D59] font-bold text-[15px]">No.</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Nama</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">NIK</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]"> Jenis Keanggotaan</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">NPV</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Satuan</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Ukuran Baju / Celana</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {veterans?.data?.length !== 0 ? (
              veterans?.data.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="text-left bg-[#F9FAFC]">
                    {(veterans.meta.currentPage - 1) * veterans.meta.perPage + index + 1}
                  </TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.beneficiary.name}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.beneficiary.identityNumber}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.isActive}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.veteranUnit}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.veteranUnit}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.uniformSize}</TableCell>
                  <TableCell className="flex items-center justify-center bg-[#F9FAFC]">
                    <Action
                      onDelete={() => handleDelete(item.id)}
                      onDetail={() => showDetail(item.id)}
                      onEdit={() => console.log('detail')}
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
      {(veterans?.meta?.total as number) > 10 ? (
        <Pagination
          className="px-5 py-5 flex justify-end"
          currentPage={page !== '' ? parseInt(page) : 1}
          totalCount={veterans?.meta.total as number}
          pageSize={10}
          onPageChange={(page) => createParams({ key: 'page', value: page.toString() })}
        />
      ) : null}
      <Modal isShow={isShow} className="md:max-w-4xl">
        <Modal.Header setIsShow={setIsShow} className="gap-1 flex flex-col">
          <h3 className="text-base font-bold leading-6 text-title md:text-2xl">Detail Data Veteran</h3>
          <p className="text-sm text-[#A1A1A1]">View Data Detail Data Veteran</p>
        </Modal.Header>
        {isLoadingVeteran && <Loading />}
        <div className="grid grid-cols-3 gap-y-5">
          <div>
            <p className="text-sm font-bold">Nama</p>
            <p className="text-base capitalize">{veteran?.beneficiary.name ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">NIK</p>
            <p className="text-base capitalize">{veteran?.beneficiary.identityNumber ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">No. KK</p>
            <p className="text-base capitalize">{veteran?.beneficiary.familyCardNumber ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Kecamatan</p>
            <p className="text-base capitalize">{veteran?.beneficiary?.address.areaLevel3?.name ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Kelurahan</p>
            <p className="text-base capitalize">{veteran?.beneficiary?.address.areaLevel4?.name ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Tempat / Tanggal Lahir </p>
            <p className="text-base capitalize">
              {veteran?.beneficiary.birthPlace ?? '-'} / {veteran?.beneficiary.birthDate ?? '-'}
            </p>
          </div>
          <div>
            <p className="text-sm font-bold">Usia</p>
            <p className="text-base capitalize">{veteran?.beneficiary.age ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Agama</p>
            <p className="text-base capitalize">{veteran?.beneficiary.religion ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Status DTKS</p>
            <p className="text-base capitalize">{veteran?.beneficiary.isDtks ? 'DTKS' : 'Tidak DTKS' ?? '-'}</p>
          </div>
        </div>
      </Modal>
    </Container>
  )
}
export default DataVeteran
