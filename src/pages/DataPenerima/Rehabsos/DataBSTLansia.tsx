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
  useGetEvent,
  useGetKecamatan,
  useGetKelurahan,
  useGetDetailElderlyCashSocialAssistance,
  useElderlyCashSocialAssistance,
  useGetTuitionAssistanceID,
  useGetBeneficiary
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
  status: string
  event: string
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
  const [isShow, setIsShow] = React.useState(false)
  const [selectedId, setSelectedId] = React.useState('')
  const { q, kecamatan, kelurahan, page, year, status, isDtks } = useGetParams([
    'q',
    'kecamatan',
    'kelurahan',
    'page',
    'year',
    'status',
    'event',
    'isDtks'
  ])

  const forms = useForm<FormValues>({
    defaultValues: {
      q: q ?? '',
      kecamatan: kecamatan ?? '',
      kelurahan: kelurahan ?? '',
      year: year ?? '',
      status: status ?? ''
    }
  })
  const areaLevel3 = forms.watch('kecamatan')

  const { data: listEvent } = useGetEvent()
  const { data: listKecamatan } = useGetKecamatan()
  const { data: listKelurahan } = useGetKelurahan(areaLevel3 ?? kecamatan)
  const { data: tuition, isLoading: isLoadingTuition } = useGetTuitionAssistanceID(selectedId)

  const {
    data: elderlys,
    refetch: refetchTuitions,
    isFetching: isFetchingTuitions,
    isLoading
  } = useElderlyCashSocialAssistance({
    page: parseInt(page) ?? 1,
    idKecamatan: kecamatan,
    idKelurahan: kelurahan,
    year,
    q
  })
  useDisableBodyScroll(isFetchingTuitions)

  const { data: beneficiary, isFetching: isFetchingBeneficiary } = useGetBeneficiary({
    page: parseInt(page) ?? 1,
    idKecamatan: kecamatan,
    idKelurahan: kelurahan,
    q,
    isDtks
  })
  useDisableBodyScroll(isFetchingBeneficiary || isShow)

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

    await refetchTuitions()
  }
  const exportAsCsv = async () => {
    setIsLoadingExport(true)
    const response = await exportElderlyCashSocialAssistanceFn('csv', {
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

  const exportAsXlsx = async () => {
    setIsLoadingExport(true)
    const response = await exportElderlyCashSocialAssistanceFn('xlsx', {
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
    navigate('/data-penerima/rehabsos/bstlansia')
    forms.reset({
      q: '',
      kecamatan: '',
      kelurahan: '',
      year: ''
    })
  }

  useDisableBodyScroll(isFetchingTuitions)

  if (isLoading && isLoadingTuition) return <Loading />

  return (
    <Container>
      {(isFetchingTuitions || isLoadingExport) && <Loading />}
      <h1 className="font-bold text-xl ">Bantuan Sosial Tunai Lansia</h1>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-row justify-between items-center gap-5 mt-5">
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
              <Button type="button" variant="outline" className="gap-3 text-primary rounded-lg" onClick={handleReset}>
                <HiArrowPath className="text-lg" />
                <span>Reset</span>
              </Button>
              <Button>
                <HiMagnifyingGlass className="w-4 h-4 py" />
                <p className="font-bold text-sm text-white ml-3 w-max">Cari Data</p>
              </Button>
            </div>
          </section>
        </form>
      </Form>
      <section className="border rounded-xl mt-5 overflow-hidden">
        <Table>
          <TableHeader className="bg-[#FFFFFF]">
            <TableRow>
              <TableHead className="text-[#534D59] font-bold text-[15px]">No .</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">NIK</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Nomor Kartu Keluarga</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Nama</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Status</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Kecamatan</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Kelurahan</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Tahun Anggaran</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {elderlys?.data?.length !== 0 ? (
              elderlys?.data.map((elderlyItem, index) => {
                const beneficiaryItem = beneficiary?.data.find((item) => item.identityNumber == elderlyItem.nokk)
                const dtksStatus = beneficiaryItem ? (beneficiaryItem.isDtks ? 'DTKS' : '') : 'Non DTKS'
                return (
                  <TableRow key={elderlyItem.id}>
                    <TableCell className="text-left bg-[#F9FAFC]">{index + 1}</TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]">{elderlyItem.nik ?? '-'}</TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]">{elderlyItem.nokk ?? '-'}</TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]">{elderlyItem.nama ?? '-'}</TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]">{dtksStatus}</TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]">{elderlyItem.kecamatan ?? '-'}</TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]">{elderlyItem.kelurahan ?? '-'}</TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]"></TableCell>
                    <TableCell className="flex items-center justify-center bg-[#F9FAFC]">
                      <Action onDetail={() => showDetail(elderlyItem.id)} />
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
          <h3 className="text-base font-bold leading-6 text-title md:text-2xl">Detail Data BBP</h3>
          <p className="text-sm text-[#A1A1A1]">View Data Detail Data BBP</p>
        </Modal.Header>
        {isLoadingTuition && <Loading />}
      </Modal>
    </Container>
  )
}
export default DataBSTLansia
