import * as React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { HiArrowPath, HiMagnifyingGlass, HiPlus } from 'react-icons/hi2'
import { formatToView } from '@/lib/services/formatDate'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Action, Container, ExportButton, Loading, Modal, Pagination, SearchSelect } from '@/components'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { JENIS_RUMAH_IBADAH } from '@/lib/data'
import { exportWorshipPlaceFn } from '@/api/dayasos.api'
import { useAlert, useTitleHeader } from '@/store/client'
import { useGetKecamatan, useGetKelurahan, useGetMe } from '@/store/server'
import { useCreateParams, useDisableBodyScroll, useGetParams, useTitle } from '@/hooks'
import { useDeleteWorshipPlace, useGetWorshipPlace, useGetWorshipPlaces } from '@/store/server/useDayasos'

interface FormValues {
  q: string
  type: string
  kecamatan: string
  kelurahan: string
}

const DataRumahIbadah = () => {
  const { alert } = useAlert()
  const navigate = useNavigate()

  useTitle('Data Penerima')
  const setBreadcrumbs = useTitleHeader((state) => state.setBreadcrumbs)

  React.useEffect(() => {
    setBreadcrumbs([
      { url: '/data-penerima', label: 'Data Penerima' },
      { url: '/data-penerima/dayasos', label: 'Dayasos & PFM' },
      { url: '/data-penerima/dayasos/rumah-ibadah', label: 'RI' }
    ])
  }, [])

  const [isShow, setIsShow] = React.useState(false)
  const [selectedId, setSelectedId] = React.useState('')
  const [isLoadingExport, setIsLoadingExport] = React.useState(false)

  const createParams = useCreateParams()
  const { page, q, kecamatan, kelurahan, type } = useGetParams(['page', 'q', 'type', 'kecamatan', 'kelurahan'])
  const forms = useForm<FormValues>({ defaultValues: { q: '', type: '', kecamatan: '', kelurahan: '' } })

  const areaLevel3 = forms.watch('kecamatan')
  const { data: listKecamatan } = useGetKecamatan()
  const { data: listKelurahan } = useGetKelurahan(areaLevel3 ?? kecamatan)
  const { mutateAsync: deleteWorshipPlace } = useDeleteWorshipPlace()
  const { data: worshipPlace, isLoading: isLoadingWorshipPlace } = useGetWorshipPlace(selectedId)
  const {
    data: worshipPlaces,
    refetch,
    isFetching,
    isLoading
  } = useGetWorshipPlaces({
    page: parseInt(page) ?? 1,
    idKecamatan: kecamatan,
    idKelurahan: kelurahan,
    place: type,
    q
  })
  const { data: user, isLoading: isLoadingGetme } = useGetMe()

  const isEnableDelete = user?.data.role.permissions.some(
    (permission) => permission.slugName === 'delete-update' && permission.isPermitted
  )
  useDisableBodyScroll(isFetching)

  const showDetail = (id: string) => {
    setSelectedId(id)
    setIsShow(true)
  }

  const handleReset = () => {
    navigate('/data-penerima/dayasos/rumah-ibadah')
    forms.reset()
  }

  const updateParam = (key: any, value: any) => {
    if (value !== '') {
      createParams({ key, value })
      createParams({ key: 'page', value: '' })
    } else {
      createParams({ key, value: '' })
    }
  }

  const onSubmit = async (values: FormValues) => {
    updateParam('type', values.type)
    updateParam('kecamatan', values.kecamatan)
    updateParam('kelurahan', values.kelurahan)
    updateParam('q', values.q)

    await refetch()
  }

  const handleDelete = (id: string) => {
    void alert({
      title: 'Hapus Data RUMAH IBADAH',
      description: 'Apakah kamu yakin ingin menghapus data ini?',
      variant: 'danger',
      submitText: 'Delete'
    }).then(async () => {
      await deleteWorshipPlace(id)
    })
  }

  const exportAsCsv = async () => {
    setIsLoadingExport(true)
    const response = await exportWorshipPlaceFn('csv', {
      page: parseInt(page) ?? 1,
      idKecamatan: kecamatan,
      idKelurahan: kelurahan,
      place: type,
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
    const response = await exportWorshipPlaceFn('xlsx', {
      page: parseInt(page) ?? 1,
      idKecamatan: kecamatan,
      idKelurahan: kelurahan,
      place: type,
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

  if (isLoading && isLoadingWorshipPlace && isLoadingGetme) return <Loading />

  return (
    <Container>
      {(isFetching || isLoadingExport) && <Loading />}
      <h1 className="font-bold text-xl ">Rumah Ibadah (RI)</h1>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-x-10 gap-y-5 mt-5">
            <FormField
              name="q"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} type="text" placeholder="Nama Rumah Ibadah" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-3 gap-y-5  gap-x-5">
            <FormField
              name="type"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Jenis Rumah Ibadah" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {JENIS_RUMAH_IBADAH.map((item, index) => (
                        <SelectItem key={index} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              name="kecamatan"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <SearchSelect
                      selected={field.value}
                      onChange={field.onChange}
                      width="w-[370px]"
                      placeholder="Pilih Kecamatan"
                      options={
                        listKecamatan?.map((kecamatan) => ({ label: kecamatan.name, value: kecamatan.id })) ?? []
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="kelurahan"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <SearchSelect
                      selected={field.value}
                      onChange={field.onChange}
                      disabled={!areaLevel3 && !kecamatan}
                      width="w-[370px]"
                      placeholder="Pilih Kelurahan"
                      options={
                        listKelurahan?.map((kelurahan) => ({ label: kelurahan.name, value: kelurahan.id })) ?? []
                      }
                    />
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
                onClick={() => navigate('/data-penerima/dayasos/rumah-ibadah/create')}
              >
                <HiPlus className="text-lg" />
                <span>Tambah Data</span>
              </Button>
              {worshipPlaces?.data?.length !== 0 ? (
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
              <TableHead className="text-[#534D59] font-bold text-[15px]">Nama Rumah Ibadah</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Jenis Rumah Ibadah</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Alamat</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Kelurahan</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Kecamatan</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Nama Penanggung jawab</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Nomor Handphone</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Status</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Keterangan</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]"> Tanggal Update</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {worshipPlaces?.data.length !== 0 ? (
              worshipPlaces?.data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="text-left bg-[#F9FAFC]">
                    {(worshipPlaces.meta.currentPage - 1) * worshipPlaces.meta.perPage + index + 1}
                  </TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item?.name ?? '-'}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]" position="center">
                    {item?.type ?? '-'}
                  </TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item?.address}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]" position="center">
                    {item?.areaLevel3?.name ?? '-'}
                  </TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]" position="center">
                    {item?.areaLevel4?.name ?? '-'}
                  </TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item?.picName ? item.picName : '-'}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]" position="center">
                    {item?.picPhone ?? '-'}
                  </TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]" position="center">
                    {item?.status ?? '-'}
                  </TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item?.note ?? '-'}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]" position="center">
                    {item?.updatedAt ? formatToView(item?.updatedAt) : '-'}
                  </TableCell>
                  <TableCell className="flex items-center justify-center bg-[#F9FAFC]">
                    {isEnableDelete ? (
                      <Action
                        onDelete={() => handleDelete(item?.id)}
                        onDetail={() => showDetail(item?.id)}
                        onEdit={() => navigate(`/data-penerima/dayasos/rumah-ibadah/create/${item?.id}`)}
                      />
                    ) : (
                      <Action onDetail={() => showDetail(item?.id)} />
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
      {(worshipPlaces?.meta?.total as number) > 30 ? (
        <Pagination
          currentPage={page !== '' ? parseInt(page) : 1}
          totalCount={worshipPlaces?.meta.total as number}
          pageSize={30}
          onPageChange={(page) => createParams({ key: 'page', value: page.toString() })}
        />
      ) : null}
      <Modal isShow={isShow} className="md:max-w-4xl">
        <Modal.Header setIsShow={setIsShow} className="gap-1 flex flex-col">
          <h3 className="text-base font-bold leading-6 text-title md:text-2xl">Detail Data Rumah Ibadah</h3>
          <p className="text-sm text-[#A1A1A1]">View Data Detail Data Rumah Ibadah</p>
        </Modal.Header>
        {isLoadingWorshipPlace && <Loading />}
        <div className="grid grid-cols-3 gap-y-5">
          <div>
            <p className="text-sm font-bold">Nama Rumah Ibadah</p>
            <p className="text-base capitalize">{worshipPlace?.name ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Jenis Rumah Ibadah</p>
            <p className="text-base capitalize">{worshipPlace?.type ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Alamat Rumah Ibadah</p>
            <p className="text-base capitalize">{worshipPlace?.address ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Kecamatan</p>
            <p className="text-base capitalize">{worshipPlace?.areaLevel3?.name ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Kelurahan</p>
            <p className="text-base capitalize">{worshipPlace?.areaLevel4?.name ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Nama PIC</p>
            <p className="text-base capitalize">{worshipPlace?.picName ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Kontak PIC</p>
            <p className="text-base capitalize">{worshipPlace?.picPhone ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Tahun</p>
            <p className="text-base capitalize">{worshipPlace?.year ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Status</p>
            <p className="text-base capitalize">{worshipPlace?.status ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Keterangan</p>
            <p className="text-base capitalize">{worshipPlace?.note ?? '-'}</p>
          </div>
        </div>
      </Modal>
    </Container>
  )
}
export default DataRumahIbadah
