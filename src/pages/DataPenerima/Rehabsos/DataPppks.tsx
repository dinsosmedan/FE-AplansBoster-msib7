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
  useGetTuitionAssistanceID,
  useGetUniversities,
  useNeedForSocialWelfareServices,
  useGetWelfaresID

} from '@/store/server'
import React from 'react'
import { useAlert, useTitleHeader } from '@/store/client'
import { useCreateParams, useDisableBodyScroll, useGetParams, useTitle } from '@/hooks'
import { exportNeedForSocialWelfareServicesFn } from '@/api/rehabsos.api'
interface FormValues {
  q: string
  kelurahan: string
  kecamatan: string
  year: string
}
const DataPppks = () => {
  useTitle('Data Penerima')
  const setBreadcrumbs = useTitleHeader((state) => state.setBreadcrumbs)

  React.useEffect(() => {
    setBreadcrumbs([
      { url: '/data-penerima', label: 'Data Penerima' },
      { url: '/data-penerima/rehabsos', label: 'Rehabsos' },
      { url: '/data-penerima/rehabsos/ppks', label: 'Penanganan Pemerlu Pelayanan Kesejahteraan Sosial' }
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
    'year'
  ])

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
  const { data: welfares, isLoading: isLoadingWelfares } = useGetWelfaresID(selectedId)

  const {
    data: welfare,
    refetch,
    isFetching,
    isLoading
  } = useNeedForSocialWelfareServices({
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
    const response = await exportNeedForSocialWelfareServicesFn('csv', {
      kecamatan,
      kelurahan,
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
    const response = await exportNeedForSocialWelfareServicesFn('xlsx', {
      kecamatan,
      kelurahan,
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
    navigate('/data-penerima/rehabsos/ppks')
    forms.reset({
      q: '',
      kecamatan: '',
      kelurahan: '',
      year: ''
    })
  }

  if (isLoading && isLoadingWelfares) return <Loading />

  return (
    <Container>
      {(isFetching || isLoadingExport) && <Loading />}
      <h1 className="text-xl font-bold ">Penanganan Pemerlu Pelayanan Kesejahteraan Sosial (PPPKS)</h1>
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
                      placeholder="Jenis PPKS"
                      options={
                        listKecamatan?.map((kecamatan) => ({ label: kecamatan.name, value: kecamatan.id })) ?? []
                      }
                    />
                  </FormControl>
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
                      width="w-[380px]"
                      placeholder="Terminasi"
                      options={
                        listKecamatan?.map((kecamatan) => ({ label: kecamatan.name, value: kecamatan.id })) ?? []
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
                    <Input {...field} value={field.value ?? ''} type="text" placeholder="Masukkan Tahun" />
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
                onClick={() => navigate('/data-penerima/rehabsos/ppks/create')}
              >
                <HiPlus className="text-lg" />
                <span>Tambah Data</span>
              </Button>
              {welfare?.data?.length !== 0 ? (
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
              <TableHead className="text-[#534D59] font-bold text-[15px]">Nomor</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Nama</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">NIK</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Kecamatan</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Jenis PPKS</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {welfare?.data?.length !== 0 ? (
              welfare?.data.map((item, index) => (
                <TableRow key={item.nama}>
                  <TableCell className="text-left bg-[#F9FAFC]">
                    {(welfare.meta.currentPage - 1) * welfare.meta.perPage + index + 1}
                  </TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.nik ?? '-'}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.nama ?? '-'}</TableCell>
          
        
                  <TableCell className="text-center bg-[#F9FAFC]" position="center">
                    {item.kecamatan ?? '-'}
                  </TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]" position="center">
                    {item.ppks_type ?? '-'}
                  </TableCell>
                  <TableCell className="flex items-center justify-center bg-[#F9FAFC]">
                    <Action onDetail={() => showDetail(item.nama)} />
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
      {(welfare?.meta?.total as number) > 30 ? (
        <Pagination
          currentPage={page !== '' ? parseInt(page) : 1}
          totalCount={welfare?.meta.total as number}
          pageSize={30}
          onPageChange={(page) => createParams({ key: 'page', value: page.toString() })}
        />
      ) : null}
      <Modal isShow={isShow} className="md:max-w-4xl">
        <Modal.Header setIsShow={setIsShow} className="flex flex-col gap-1">
          <h3 className="text-base font-bold leading-6 text-title md:text-2xl">Detail Data PPKS</h3>
          <p className="text-sm text-[#A1A1A1]">View Data Detail Data PPKS</p>
        </Modal.Header>
        {isLoadingWelfares && <Loading />}
        <div className="grid grid-cols-3 gap-5">
          <div>
            <p className="text-sm font-bold">Nama</p>
            <p className="text-base capitalize">{welfares?.nama ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">NIK</p>
            <p className="text-base capitalize">{welfares?.nik ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Tempat / Tanggal Lahir</p>
            <p className="text-base capitalize">
              {welfares?.tmpt_tgl_lahir ?? '-'} 
             
            </p>
          </div>
          <div>
            <p className="text-sm font-bold">Alamat Domisili</p>
            <p className="text-base capitalize">{welfares?.alamatdomisili ?? '-'}</p>
          </div> 
        
          <div>
            <p className="text-sm font-bold">Kecamatan</p>
            <p className="text-base capitalize">{welfares?.kecamatan ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Jenis PPKS</p>
            <p className="text-base capitalize">{welfares?.ppks_type ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Tahun</p>
            <p className="text-base capitalize">{welfares?.tahun ?? '-'}</p>
          </div>
        </div>
      </Modal>
    </Container>
  )
}
export default DataPppks
