import Container from '@/components/atoms/Container'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import useTitle from '@/hooks/useTitle'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { HiArrowPath, HiMagnifyingGlass, HiPlus } from 'react-icons/hi2'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Pagination from './../../../components/atoms/Pagination'
import { useNavigate } from 'react-router-dom'
import { useCreateParams, useDisableBodyScroll, useGetParams } from '@/hooks'
import { useDeleteUnregister, useGetDetailUnregister, useGetMe, useUnregisters } from '@/store/server'
import { Action, ExportButton, Loading, Modal } from '@/components'
import { exportUnregisterFn } from '@/api/linjamsos.api'
import { useAlert, useTitleHeader } from '@/store/client'
import { formatToView } from '@/lib/services/formatDate'
import * as React from 'react'
interface FormValues {
  q: string
  letterNumber: string
  month: string
  year: string
}
const DataUnregister = () => {
  useTitle('Data Penerima')
  const setBreadcrumbs = useTitleHeader((state) => state.setBreadcrumbs)

  React.useEffect(() => {
    setBreadcrumbs([
      { url: '/data-penerima', label: 'Data Penerima' },
      { url: '/data-penerima/linjamsos', label: 'Linjamsos' },
      { url: '/data-penerima/linjamsos/unregister', label: 'Unregister' }
    ])
  }, [])

  const navigate = useNavigate()
  const createParams = useCreateParams()
  const [isLoadingExport, setIsLoadingExport] = React.useState(false)
  const { alert } = useAlert()
  const [isShow, setIsShow] = React.useState(false)
  const [selectedId, setSelectedId] = React.useState('')
  const { page, month, letterNumber, q, year } = useGetParams(['q', 'letterNumber', 'month', 'page', 'year'])
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
      month: '',
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
    month,
    letterNumber,
    year,
    q
  })
  const { data: unregister, isLoading: isLoadingUnregister } = useGetDetailUnregister(selectedId)
  const { data: user, isLoading: isLoadingGetme } = useGetMe()

  const isEnableDelete = user?.data.role.permissions.some(
    (permission) => permission.slugName === 'delete-update' && permission.isPermitted
  )
  const showDetail = (id: string) => {
    setSelectedId(id)
    setIsShow(true)
  }
  const { mutateAsync: deletePkr } = useDeleteUnregister()
  const handleDelete = async (id: string) => {
    await alert({
      title: 'Hapus Data Unregister',
      description: 'Apakah kamu yakin ingin menghapus data ini?',
      variant: 'danger',
      submitText: 'Delete'
    }).then(async () => {
      await deletePkr(id)
    })
  }
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
    updateParam('month', values.month)
    updateParam('letterNumber', values.letterNumber)
    updateParam('year', values.year)

    await refetch()
  }
  const handleReset = () => {
    navigate('/data-penerima/linjamsos/unregister')
    forms.reset()
  }
  const exportAsCsv = async () => {
    setIsLoadingExport(true)
    const response = await exportUnregisterFn('csv', {
      month,
      letterNumber,
      year,
      q
    })
    if (response.success) {
      void alert({
        title: 'Berhasil Export',
        description: 'Hasil Export akan dikirim ke Email anda. Silahkan cek email anda secara berkala.',
        submitText: 'Oke',
        variant: 'success'
      })
    }
    setIsLoadingExport(false)
  }

  const exportAsXlsx = async () => {
    setIsLoadingExport(true)
    const response = await exportUnregisterFn('xlsx', {
      month,
      letterNumber,
      year,
      q
    })
    if (response.success) {
      void alert({
        title: 'Berhasil Export',
        description: 'Hasil Export akan dikirim ke Email anda. Silahkan cek email anda secara berkala.',
        submitText: 'Oke',
        variant: 'success'
      })
    }
    setIsLoadingExport(false)
  }
  if (isLoading || isLoadingGetme) {
    return <Loading />
  }
  return (
    <div>
      <Container>
        {(isFetching || isLoadingExport) && <Loading />}
        <h1 className="font-bold text-xl ">Unregister</h1>
        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 gap-x-5 gap-y-5 mt-5 ">
              <FormField
                name="q"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ''}
                        type="text"
                        placeholder="Nama Atau Diagnosa Penyakit"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-3 gap-x-5 gap-y-5">
              <FormField
                name="letterNumber"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} type="text" placeholder="Nomor Surat Dinas Sosial" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="month"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ''}
                        type="number"
                        placeholder="Masukkan Bulan e.g. 5 atau 05"
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
                      <Input
                        {...field}
                        value={field.value ?? ''}
                        type="number"
                        placeholder="Masukkan Tahun e.g. 2023"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  className="gap-2 border-none rounded-lg"
                  onClick={() => navigate('/data-penerima/linjamsos/unregister/create')}
                >
                  <HiPlus className="text-lg" />
                  <span>Tambah Data</span>
                </Button>
                {unregisters?.data?.length !== 0 ? (
                  <ExportButton onExportFirst={exportAsXlsx} onExportSecond={exportAsCsv} />
                ) : null}
              </div>
              <div className="flex gap-3">
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
            <TableHeader className="bg-white">
              <TableRow>
                <TableHead className="text-[#534D59] font-bold text-[15px]">No. </TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]">Nama</TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]">Jenis Kelamin</TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]">Tahun</TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]">Diagnosa Penyakit</TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]">Umur</TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]">Tanggal Masuk Rumah Sakit</TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]">Nomor Surat Dinas Sosial</TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]">Tanggal Surat Dinas Sosial</TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]"> Tanggal Update</TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {unregisters?.data?.length !== 0 ? (
                unregisters?.data.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-left bg-[#F9FAFC]" position="center">
                      {(unregisters.meta.currentPage - 1) * unregisters.meta.perPage + index + 1}
                    </TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]">{item.name ?? '-'}</TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]" position="center">
                      {item.gender ?? '-'}
                    </TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]" position="center">
                      {getYearFromDate(item.dinsosLetterDate ?? '') ?? '-'}
                    </TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]" position="center">
                      {item.diseaseDiagnosis ?? '-'}
                    </TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]" position="center">
                      {item.age ?? '-'}
                    </TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]" position="center">
                      {formatToView(item.hospitalEntryDate) ?? '-'}
                    </TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]" position="center">
                      {item.dinsosLetterNumber ?? '-'}
                    </TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]" position="center">
                      {formatToView(item.dinsosLetterDate) ?? '-'}
                    </TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]" position="center">
                      {formatToView(item.updatedAt) ?? '-'}
                    </TableCell>
                    <TableCell className="flex items-center justify-center bg-[#F9FAFC]">
                      {isEnableDelete ? (
                        <Action
                          onDelete={async () => await handleDelete(item.id)}
                          onDetail={() => showDetail(item.id)}
                          onEdit={() => navigate(`/data-penerima/linjamsos/unregister/${item.id}`)}
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
        {(unregisters?.meta?.total as number) > 30 ? (
          <Pagination
            currentPage={page !== '' ? parseInt(page) : 1}
            totalCount={unregisters?.meta.total as number}
            pageSize={30}
            onPageChange={(page) => createParams({ key: 'page', value: page.toString() })}
          />
        ) : null}
      </Container>
      <Modal isShow={isShow} className="md:max-w-4xl">
        <Modal.Header setIsShow={setIsShow} className="gap-1 flex flex-col">
          <h3 className="text-base font-bold leading-6 text-title md:text-2xl">Detail Data Unregister</h3>
          <p className="text-sm text-[#A1A1A1]">View Data Detail Data Unregister</p>
        </Modal.Header>
        {isLoadingUnregister && <Loading />}
        <div className="grid grid-cols-3 gap-y-5">
          <div>
            <p className="text-sm font-bold">Nama</p>
            <p className="text-base capitalize">{unregister?.name ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Usia</p>
            <p className="text-base capitalize">{unregister?.age ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Jenis Kelamin</p>
            <p className="text-base capitalize">{unregister?.gender ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Nomor Surat Dinas Sosial</p>
            <p className="text-base capitalize">{unregister?.dinsosLetterNumber ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Tanggal Surat Dinas Sosial</p>
            <p className="text-base capitalize">{unregister?.dinsosLetterDate ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Diagnosa Penyakit</p>
            <p className="text-base capitalize">{unregister?.diseaseDiagnosis ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Tanggal Masuk Rumah Sakit</p>
            <p className="text-base capitalize">{unregister?.hospitalEntryDate ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Nomor Surat Rumah Sakit</p>
            <p className="text-base capitalize">{unregister?.hospitalLetterNumber ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Tanggal Surat Rumah Sakit</p>
            <p className="text-base capitalize">{unregister?.hospitalLetterDate ?? '-'}</p>
          </div>
        </div>
      </Modal>
    </div>
  )
}
export default DataUnregister
