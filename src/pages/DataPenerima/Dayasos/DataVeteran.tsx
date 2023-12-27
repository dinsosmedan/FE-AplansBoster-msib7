import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Action, ExportButton, Loading, Modal, Pagination, Container } from '@/components'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { formatToView } from '@/lib/services/formatDate'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { HiMagnifyingGlass, HiPlus, HiArrowPath } from 'react-icons/hi2'

import { exportVeteranFn } from '@/api/dayasos.api'
import { useAlert, useTitleHeader } from '@/store/client'
import { useDeleteVeteran, useGetMe, useGetVeteran, useGetVeteranById } from '@/store/server'
import { useCreateParams, useDisableBodyScroll, useGetParams, useTitle } from '@/hooks'

interface FormValues {
  q: string
}

const DataVeteran = () => {
  const { alert } = useAlert()
  const navigate = useNavigate()

  useTitle('Data Penerima')
  const setBreadcrumbs = useTitleHeader((state) => state.setBreadcrumbs)

  React.useEffect(() => {
    setBreadcrumbs([
      { url: '/data-penerima', label: 'Data Penerima' },
      { url: '/data-penerima/dayasos', label: 'Dayasos & PFM' },
      { url: '/data-penerima/dayasos/veteran', label: 'Veteran' }
    ])
  }, [])

  const createParams = useCreateParams()
  const { q, page } = useGetParams(['q', 'page'])
  const forms = useForm<FormValues>({ defaultValues: { q: '' } })

  const [isLoadingExport, setIsLoadingExport] = React.useState(false)
  const [selectedId, setSelectedId] = React.useState('')
  const [isShow, setIsShow] = React.useState(false)

  const { mutateAsync: deleteVeteran } = useDeleteVeteran()
  const { data: veteran, isLoading: isLoadingVeteran } = useGetVeteranById(selectedId)
  const { data: veterans, refetch, isFetching, isLoading } = useGetVeteran({ page: parseInt(page) ?? 1, q })
  const { data: user, isLoading: isLoadingGetme } = useGetMe()

  const isEnableDelete = user?.data.role.permissions.some(
    (permission) => permission.slugName === 'delete-update' && permission.isPermitted
  )
  useDisableBodyScroll(isFetching)

  const handleReset = () => {
    navigate('/data-penerima/dayasos/veteran')
    forms.reset()
  }

  const onSubmit = async (values: FormValues) => {
    if (values.q !== '') {
      createParams({ key: 'q', value: values.q !== '' ? values.q : '' })
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

  const exportAsCsv = async () => {
    setIsLoadingExport(true)
    const response = await exportVeteranFn('csv', {
      q
    })
    if (response.success) {
      void alert({
        title: 'Berhasil Export',
        description: 'Hasil Export akan dikirim ke Email anda. Silahkan cek email anda secara berkala.',
        submitText: 'Oke',
        variant: 'success'
      })
      setIsLoadingExport(false)
    }
  }

  const exportAsXlsx = async () => {
    setIsLoadingExport(true)
    const response = await exportVeteranFn('xlsx', {
      q
    })
    if (response.success) {
      void alert({
        title: 'Berhasil Export',
        description: 'Hasil Export akan dikirim ke Email anda. Silahkan cek email anda secara berkala.',
        submitText: 'Oke',
        variant: 'success'
      })
      setIsLoadingExport(false)
    }
  }

  if (isLoading && isLoadingGetme) return <Loading />

  return (
    <Container>
      {(isFetching || isLoadingExport) && <Loading />}
      <h1 className="font-bold text-xl ">Veteran</h1>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="grid gap-x-10 gap-y-5 mt-5">
            <FormField
              name="q"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} type="text" placeholder="Masukkan Nama" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <section className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                type="button"
                className="gap-2 border-none rounded-lg"
                onClick={() => navigate('/data-penerima/dayasos/veteran/create')}
              >
                <HiPlus className="text-lg" />
                <span>Tambah Data</span>
              </Button>
              {veterans?.data?.length !== 0 ? (
                <ExportButton onExportFirst={exportAsXlsx} onExportSecond={exportAsCsv} />
              ) : null}
            </div>
            <div className="flex items-center gap-3">
              <Button type="button" variant="outline" className="gap-3 text-primary rounded-lg" onClick={handleReset}>
                <HiArrowPath className="text-lg" />
                <span>Reset</span>
              </Button>
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
              <TableHead className="text-[#534D59] font-bold text-[15px]"> Tanggal Update</TableHead>
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
                  <TableCell className="text-center bg-[#F9FAFC]" position="center">
                    {item.beneficiary.identityNumber}
                  </TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]" position="center">
                    {item.isActive}
                  </TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]" position="center">
                    {item.veteranUnit}
                  </TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]" position="center">
                    {item.veteranUnit}
                  </TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]" position="center">
                    {item.uniformSize}
                  </TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]" position="center">
                    {formatToView(item.beneficiary.updatedAt) ?? '-'}
                  </TableCell>
                  <TableCell className="flex items-center justify-center bg-[#F9FAFC]">
                    {isEnableDelete ? (
                      <Action
                        onDelete={() => handleDelete(item.id)}
                        onDetail={() => showDetail(item.id)}
                        onEdit={() => navigate(`/data-penerima/dayasos/veteran/create/${item.id}`)}
                      />
                    ) : (
                      <Action onDetail={() => showDetail(item.id)} />
                    )}
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
      {(veterans?.meta?.total as number) > 30 ? (
        <Pagination
          currentPage={page !== '' ? parseInt(page) : 1}
          totalCount={veterans?.meta.total as number}
          pageSize={30}
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
