import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Container from '@/components/atoms/Container'
import { Action, ExportButton, Loading, Modal, Pagination, SearchSelect } from '@/components'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { HiArrowPath, HiMagnifyingGlass, HiPlus } from 'react-icons/hi2'
import {
  useGetKecamatan,
  useGetKelurahan,
  useElderlyCashSocialAssistance,
  useGetElderlyAssistanceID
} from '@/store/server'
import React from 'react'
import { exportElderlyCashSocialAssistanceFn, getElderlyCashSocialAssistanceFn } from '@/api/rehabsos.api'
import { useAlert, useTitleHeader } from '@/store/client'
import { useCreateParams, useDisableBodyScroll, useGetParams, useTitle } from '@/hooks'
interface FormValues {
  q: string
  kelurahan: string
  kecamatan: string
  year: string
}
const DataBSTLansia = () => {
  useTitle('Data Penerima')
  const setBreadcrumbs = useTitleHeader((state) => state.setBreadcrumbs)

  React.useEffect(() => {
    setBreadcrumbs([
      { url: '/data-penerima', label: 'Data Penerima' },
      { url: '/data-penerima/rehabsos', label: 'Rehabsos' },
      { url: '/data-penerima/rehabsos/bstlansia', label: 'BST Lansia' }
    ])
  }, [])

  const navigate = useNavigate()
  const createParams = useCreateParams()
  const { alert } = useAlert()
  const [isLoadingExport, setIsLoadingExport] = React.useState(false)
  const [selectedStatus, setSelectedStatus] = React.useState('')
  const [isShow, setIsShow] = React.useState(false)
  const [isUpdate, setIsUpdate] = React.useState(false)
  const [selectedId, setSelectedId] = React.useState('')
  const { q, kecamatan, kelurahan, page, year } = useGetParams(['q', 'kecamatan', 'kelurahan', 'page', 'year'])

  const forms = useForm<FormValues>({
    defaultValues: {
      q: q ?? '',
      kecamatan: kecamatan ?? '',
      kelurahan: kelurahan ?? '',
      year: year ?? ''
    }
  })
  const areaLevel3 = forms.watch('kecamatan')

  const { data: listKecamatan } = useGetKecamatan()
  const { data: listKelurahan } = useGetKelurahan(areaLevel3 ?? kecamatan)
  const { data: elderly, isLoading: isLoadingElderly } = useGetElderlyAssistanceID(selectedId)

  const {
    data: elderlys,
    refetch: refetchBSTLansia,
    isFetching: isFetchingBSTLansia,
    isLoading
  } = useElderlyCashSocialAssistance({
    page: parseInt(page) ?? 1,
    kecamatan: kecamatan,
    kelurahan: kelurahan,
    year,
    q
  })
  useDisableBodyScroll(isFetchingBSTLansia || isLoadingElderly || isLoading)

  const showDetail = (id: string) => {
    setSelectedId(id)
    setIsShow(true)
  }
  const showEdit = (id: string) => {
    setSelectedId(id)
    setIsUpdate(true)
  }
  const updateParam = (key: any, value: any) => {
    if (value !== '') {
      createParams({ key, value })
      createParams({ key: 'page', value: '' })
    } else {
      createParams({ key, value: '' })
    }
  }

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value)
  }

  const updateStatus = async (nik: string, newStatus: string) => {
    let data = { nik: nik, status: newStatus }
    let response = await fetch(`http://127.0.0.1:8000/api/v1/updateElderly/${nik}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (response.ok) {
      refetchBSTLansia()
    }
  }

  const handleSubmitStatus = async () => {
    if (selectedId && selectedStatus !== '') {
      try {
        await updateStatus(selectedId, selectedStatus)
        setIsUpdate(false)
        setSelectedId(selectedId)
        setSelectedStatus(selectedStatus)
      } catch (error) {
        console.error('Error updating status:', error)
      }
    } else {
      console.error('Selected ID or Status is empty')
    }
  }

  const onSubmit = async (values: FormValues) => {
    updateParam('q', values.q)
    updateParam('kecamatan', values.kecamatan)
    updateParam('kelurahan', values.kelurahan)
    updateParam('year', values.year)

    await refetchBSTLansia()
  }

  const exportAsCsv = async () => {
    setIsLoadingExport(true)
    const response = await exportElderlyCashSocialAssistanceFn('csv', {
      kecamatan: kecamatan,
      kelurahan: kelurahan,
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
    const response = await exportElderlyCashSocialAssistanceFn('xlsx', {
      kecamatan: kecamatan,
      kelurahan: kelurahan,
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
  const handleReset = () => {
    navigate('/data-penerima/rehabsos/bstlansia')
    forms.reset({
      q: '',
      kecamatan: '',
      kelurahan: '',
      year: ''
    })
  }

  if (isLoading && isLoadingElderly) return <Loading />

  return (
    <Container>
      {(isFetchingBSTLansia || isLoadingExport) && <Loading />}
      <h1 className="text-xl font-bold ">Bantuan Sosial Tunai Lansia</h1>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-row items-center justify-between gap-5 mt-5">
            <div className="flex-1 ">
              <FormField
                name="q"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} type="text" placeholder="Masukkan Nama/ NIK" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-x-5 gap-y-5 ">
            <FormField
              name="kecamatan"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <SearchSelect
                      selected={field.value}
                      onChange={field.onChange}
                      width="w-[380px]"
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
                      width="w-[380px]"
                      placeholder="Pilih Kelurahan"
                      options={
                        listKelurahan?.map((kelurahan) => ({ label: kelurahan.name, value: kelurahan.id })) ?? []
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="year"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} type="text" placeholder="Masukkan Tahun Anggaran" />
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
                onClick={() => navigate('/data-penerima/rehabsos/bstlansia/create')}
              >
                <HiPlus className="text-lg" />
                <span>Tambah Data</span>
              </Button>
              {elderlys?.data?.length !== 0 ? (
                <ExportButton onExportFirst={exportAsXlsx} onExportSecond={exportAsCsv} />
              ) : null}
            </div>
            <div className="flex gap-3">
              <Button type="button" variant="outline" className="gap-3 rounded-lg text-primary" onClick={handleReset}>
                <HiArrowPath className="text-lg" />
                <span>Reset</span>
              </Button>
              <Button>
                <HiMagnifyingGlass className="w-4 h-4 py" />
                <p className="ml-3 text-sm font-bold text-white w-max">Cari Data</p>
              </Button>
            </div>
          </section>
        </form>
      </Form>
      <section className="mt-5 overflow-hidden border rounded-xl">
        <Table>
          <TableHeader className="bg-[#FFFFFF]">
            <TableRow>
              <TableHead className="text-[#534D59] font-bold text-[15px]">No .</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">NIK</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Nomor Kartu Keluarga</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Nama</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Kecamatan</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Kelurahan</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Tahun Anggaran</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Status</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {elderlys?.data?.length !== 0 ? (
              elderlys?.data.map((elderlyItem, index) => {
                return (
                  <TableRow key={elderlyItem.nik}>
                    <TableCell className="text-left bg-[#F9FAFC]">
                      {(elderlys.meta.currentPage - 1) * elderlys.meta.perPage + index + 1}
                    </TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]">{elderlyItem.nik ?? '-'}</TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]">{elderlyItem.nokk ?? '-'}</TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]">{elderlyItem.nama ?? '-'}</TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]">{elderlyItem.kecamatan ?? '-'}</TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]">{elderlyItem.kelurahan ?? '-'}</TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]">{elderlyItem.tahun ?? '-'}</TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]" position="center">
                      {elderlyItem.status ?? '-'}
                    </TableCell>
                    <TableCell className="flex items-center justify-center bg-[#F9FAFC]">
                      <Action onDetail={() => showDetail(elderlyItem.nik)} onEdit={() => showEdit(elderlyItem.nik)} />
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
      {(elderlys?.meta?.total as number) > 30 ? (
        <Pagination
          currentPage={page !== '' ? parseInt(page) : 1}
          totalCount={elderlys?.meta.total as number}
          pageSize={30}
          onPageChange={(page) => createParams({ key: 'page', value: page.toString() })}
        />
      ) : null}
      <Modal isShow={isShow} className="md:max-w-4xl">
        <Modal.Header setIsShow={setIsShow} className="gap-1 flex flex-col">
          <h3 className="text-base font-bold leading-6 text-title md:text-2xl">Detail Data BST Lansia</h3>
          <p className="text-sm text-[#A1A1A1]">View Data Detail Data BST Lansia</p>
        </Modal.Header>
        {isLoadingElderly && <Loading />}
        <div className="grid grid-cols-3 gap-5">
          <div>
            <p className="text-sm font-bold">Nama</p>
            <p className="text-base capitalize">{elderly?.nama ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">NIK</p>
            <p className="text-base capitalize">{elderly?.nik ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Tempat / Tanggal Lahir</p>
            <p className="text-base capitalize">
              {elderly?.tmpt_lahir ?? '-'} / {elderly?.tgl_lahir ?? '-'}
            </p>
            <p className="text-sm font-bold">No. KK</p>
            <p className="text-base capitalize">{elderly?.nokk ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Kecamatan</p>
            <p className="text-base capitalize">{elderly?.kecamatan ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Kelurahan</p>
            <p className="text-base capitalize">{elderly?.kelurahan ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Alamat</p>
            <p className="text-base capitalize">{elderly?.alamat ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Tahun</p>
            <p className="text-base capitalize">{elderly?.tahun ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Status</p>
            <p className="text-base capitalize">{elderly?.status ?? '-'}</p>
          </div>
        </div>
      </Modal>

      <Modal isShow={isUpdate} className="md:max-w-2xl">
        <Modal.Header setIsShow={setIsUpdate} className="gap-1 flex flex-col">
          <h3 className="text-base font-bold leading-6 text-title md:text-2xl">{elderly?.nama ?? '-'}</h3>
          <h4 className="text-sm text-[#A1A1A1]">{elderly?.nik ?? '-'}</h4>
        </Modal.Header>
        {isLoadingElderly && <Loading />}
        <div className="grid grid-cols-2 gap-5">
          <div>
            <p className="text-sm font-bold">Status Penerima</p>
            <p className="text-base capitalize">{elderly?.status ?? '-'}</p>
          </div>
          <div className="flex flex-col space-y-3">
            <p className="text-sm font-bold">Edit Status Penerima</p>
            <select onChange={handleStatusChange}>
              <option value="">Pilih Status</option>
              <option value="TIDAK DITEMUKAN">Data Tidak Ditemukan</option>
              <option value="MENINGGAL">Meninggal</option>
              <option value="PINDAH">Pindah</option>
              <option value="AKTIF">Penerima Aktif</option>
            </select>
            <Button onClick={handleSubmitStatus}>Submit</Button>
          </div>
        </div>
      </Modal>
    </Container>
  )
}
export default DataBSTLansia
