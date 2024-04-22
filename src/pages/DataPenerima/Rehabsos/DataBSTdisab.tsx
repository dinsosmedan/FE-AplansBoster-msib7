import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Container from '@/components/atoms/Container'
import { Action, ExportButton, Loading, Modal, Pagination, SearchSelect } from '@/components'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { HiArrowPath, HiMagnifyingGlass, HiPlus } from 'react-icons/hi2'
import { formatToView } from '@/lib/services/formatDate'
import {
  useDisabilitySocialAssistance,
  useGetEvent,
  useGetKecamatan,
  useGetKelurahan,
  useGetTuitionAssistanceFn,
  useGetTuitionAssistanceID,
  useGetUniversities
} from '@/store/server'
import React from 'react'
import { exportTuitionAssistanceFn } from '@/api/linjamsos.api'
import { useAlert, useTitleHeader } from '@/store/client'
import { useCreateParams, useDisableBodyScroll, useGetParams, useTitle } from '@/hooks'
interface FormValues {
  q: string
  kelurahan: string
  kecamatan: string
  year: string
  status: string
  event: string
  university: string
}
const DataBSTdisab = () => {
  useTitle('Data Penerima')
  const setBreadcrumbs = useTitleHeader((state) => state.setBreadcrumbs)

  React.useEffect(() => {
    setBreadcrumbs([
      { url: '/data-penerima', label: 'Data Penerima' },
      { url: '/data-penerima/rehabsos', label: 'Rehabsos' },
      { url: '/data-penerima/rehabsos/bstdisab', label: 'BST Disabilitas' }
    ])
  }, [])

  const navigate = useNavigate()
  const createParams = useCreateParams()
  const { alert } = useAlert()
  const [isLoadingExport, setIsLoadingExport] = React.useState(false)
  const [isShow, setIsShow] = React.useState(false)
  const [selectedId, setSelectedId] = React.useState('')
  const { q, kecamatan, kelurahan, page, year, status, event, university } = useGetParams([
    'q',
    'kecamatan',
    'kelurahan',
    'page',
    'year',
    'status',
    'event',
    'university'
  ])

  const forms = useForm<FormValues>({
    defaultValues: {
      q: q ?? '',
      kecamatan: kecamatan ?? '',
      kelurahan: kelurahan ?? '',
      year: year ?? '',
      status: status ?? '',
      event: event ?? '',
      university: university ?? ''
    }
  })
  const areaLevel3 = forms.watch('kecamatan')

  const { data: listEvent } = useGetEvent()
  const { data: listKecamatan } = useGetKecamatan()
  const { data: universities } = useGetUniversities()
  const { data: listKelurahan } = useGetKelurahan(areaLevel3 ?? kecamatan)
  const { data: tuition, isLoading: isLoadingTuition } = useGetTuitionAssistanceID(selectedId)

  const {
    data: disability,
    refetch,
    isFetching,
    isLoading
  } = useDisabilitySocialAssistance({
    page: parseInt(page) ?? 1,
    kecamatan,
    kelurahan,
    year,
    q
  })
  useDisableBodyScroll(isFetching)

  const showDetail = (id: string) => {
    setSelectedId(id)
    setIsShow(true)
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
    updateParam('q', values.q)
    updateParam('kecamatan', values.kecamatan)
    updateParam('kelurahan', values.kelurahan)
    updateParam('year', values.year)

    await refetch()
  }
  const exportAsCsv = async () => {
    setIsLoadingExport(true)
    const response = await exportTuitionAssistanceFn('csv', {
      idKecamatan: kecamatan,
      idKelurahan: kelurahan,
      year,
      status,
      event,
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
    const response = await exportTuitionAssistanceFn('xlsx', {
      idKecamatan: kecamatan,
      idKelurahan: kelurahan,
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
    navigate('/data-penerima/rehabsos/bstdisab')
    forms.reset({
      q: '',
      kecamatan: '',
      kelurahan: '',
      year: ''
    })
  }

  useDisableBodyScroll(isFetching)

  if (isLoading && isLoadingTuition) return <Loading />

  return (
    <Container>
      {(isFetching || isLoadingExport) && <Loading />}
      <h1 className="text-xl font-bold ">Bantuan Sosial Tunai Disabilitas</h1>
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
                      <Input
                        {...field}
                        value={field.value ?? ''}
                        type="text"
                        placeholder="Masukkan Nama/ NIK/ Nomor Kartu Keluarga"
                      />
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
                onClick={() => navigate('/data-penerima/rehabsos/bstdisabilitas/create')}
              >
                <HiPlus className="text-lg" />
                <span>Tambah Data</span>
              </Button>
              {disability?.data?.length !== 0 ? (
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
              <TableHead className="text-[#534D59] font-bold text-[15px]">No. Kartu Keluarga</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">NIK</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Nama</TableHead>
     
         
              <TableHead className="text-[#534D59] font-bold text-[15px]">Alamat</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Kecamatan</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Kelurahan</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Jenis</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Tahun Anggaran</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {disability?.data?.length !== 0 ? (
              disability?.data.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="text-left bg-[#F9FAFC]">
                    {(disability.meta.currentPage - 1) * disability.meta.perPage + index + 1}
                  </TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.nokk ?? '-'}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.nama ?? '-'}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.alamat ?? '-'}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.kecamatan ?? '-'}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]" position="center">
                    {item.nama ?? '-'}
                  </TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.kelurahan ?? '-'}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.disability_type ?? '-'}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]" position="center">
                    {item.tahun ?? '-'}
                  </TableCell>
                 
                  
                 
                  <TableCell className="flex items-center justify-center bg-[#F9FAFC]">
                    <Action onDetail={() => showDetail(item.id)} />
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
      {(disability?.meta?.total as number) > 30 ? (
        <Pagination
          currentPage={page !== '' ? parseInt(page) : 1}
          totalCount={disability?.meta.total as number}
          pageSize={30}
          onPageChange={(page) => createParams({ key: 'page', value: page.toString() })}
        />
      ) : null}
      <Modal isShow={isShow} className="md:max-w-4xl">
        <Modal.Header setIsShow={setIsShow} className="flex flex-col gap-1">
          <h3 className="text-base font-bold leading-6 text-title md:text-2xl">Detail Data BBP</h3>
          <p className="text-sm text-[#A1A1A1]">View Data Detail Data BBP</p>
        </Modal.Header>
        {isLoadingTuition && <Loading />}
        <div className="grid grid-cols-3 gap-5">
          <div>
            <p className="text-sm font-bold">Nama Mahasiswa</p>
            <p className="text-base capitalize">{tuition?.application?.beneficiary.name ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Email</p>
            <p className="text-base capitalize">{tuition?.application.email ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">NIK</p>
            <p className="text-base capitalize">{tuition?.application?.beneficiary.identityNumber ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">No. KK</p>
            <p className="text-base capitalize">{tuition?.application?.beneficiary.familyCardNumber ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Kecamatan</p>
            <p className="text-base capitalize">{tuition?.application?.beneficiary.address.areaLevel3?.name ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Kelurahan</p>
            <p className="text-base capitalize">{tuition?.application?.beneficiary.address.areaLevel4?.name ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Alamat Lengkap</p>
            <p className="text-base capitalize">{tuition?.application?.beneficiary.address.fullAddress ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Tempat / Tanggal Lahir</p>
            <p className="text-base capitalize">
              {tuition?.application?.beneficiary.birthPlace ?? '-'} /{' '}
              {tuition?.application?.beneficiary.birthDate ?? '-'}
            </p>
          </div>
          <div>
            <p className="text-sm font-bold">Usia</p>
            <p className="text-base capitalize">{tuition?.application?.beneficiary.age ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Jenis Bantuan</p>
            <p className="text-base capitalize">{tuition?.application.event.type.name ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Estimasi</p>
            <p className="text-base capitalize">
              {tuition?.application.event.startDate ?? '-'}-{tuition?.application.event.endDate ?? '-'}
            </p>
          </div>
          <div>
            <p className="text-sm font-bold">Batch</p>
            <p className="text-base capitalize">{tuition?.application.event.batch ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Universitas</p>
            <p className="text-base capitalize">{tuition?.application.university?.name ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Program Studi</p>
            <p className="text-base capitalize">{tuition?.application.studyProgram.name ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Semester</p>
            <p className="text-base capitalize">{tuition?.application.semester ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">IPK</p>
            <p className="text-base capitalize">{tuition?.application.gpa ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Uang Kuliah</p>
            <p className="text-base capitalize">{tuition?.application.tuitionFee ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Nomor Rekening</p>
            <p className="text-base capitalize">{tuition?.application.bankAccNumber ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Nama Rekening</p>
            <p className="text-base capitalize">{tuition?.application.bankAccName ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Status Pengajuan</p>
            <p className="text-base capitalize">{tuition?.application.application_status ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Jumlah Bantuan</p>
            <p className="text-base capitalize">{tuition?.assistanceAmount ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Status Pencairan</p>
            <p className="text-base capitalize">{tuition?.disbursementStatus ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Tahun Anggaran</p>
            <p className="text-base capitalize">{tuition?.budgetYear ?? '-'}</p>
          </div>
        </div>
      </Modal>
    </Container>
  )
}
export default DataBSTdisab
