import Container from '@/components/atoms/Container'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import useTitle from '@/hooks/useTitle'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { HiArrowPath, HiMagnifyingGlass } from 'react-icons/hi2'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Pagination from './../../../components/atoms/Pagination'
import { Action, ExportButton, Loading, Modal, SearchSelect } from '@/components'
import { useCreateParams, useDisableBodyScroll, useGetParams } from '@/hooks'
import { formatToView } from '@/lib/services/formatDate'
import {
  useGetKecamatan,
  useGetKelurahan,
  useGetPremiumAssistanceBenefitByID,
  useGetPremiumAssistanceBenefitFn
} from '@/store/server'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import { exportPremiumAssistanceBenefitFn } from '@/api/linjamsos.api'
import { useTitleHeader } from '@/store/client'

const DataPbi = () => {
  useTitle('Data Penerima')
  const setBreadcrumbs = useTitleHeader((state) => state.setBreadcrumbs)

  React.useEffect(() => {
    setBreadcrumbs([
      { url: '/data-penerima', label: 'Data Penerima' },
      { url: '/data-penerima/linjamsos', label: 'Linjamsos' },
      { url: '/data-penerima/dayasos/pbi', label: 'PBI' }
    ])
  }, [])

  const navigate = useNavigate()
  const [isShow, setIsShow] = React.useState(false)
  const [selectedId, setSelectedId] = React.useState('')
  const [isLoadingExport, setIsLoadingExport] = React.useState(false)
  interface FormValues {
    q: string
    kelurahan: string
    kecamatan: string
    type: string
  }
  const createParams = useCreateParams()
  const { q, kecamatan, kelurahan, page, type } = useGetParams(['q', 'kecamatan', 'kelurahan', 'page', 'type'])
  const forms = useForm<FormValues>({
    defaultValues: {
      q: '',
      kecamatan: '',
      kelurahan: '',
      type: ''
    }
  })
  const areaLevel3 = forms.watch('kecamatan')
  const { data: listKecamatan } = useGetKecamatan()
  const { data: listKelurahan } = useGetKelurahan(areaLevel3 ?? kecamatan)
  const { data: premium, isLoading: isLoadingPremium } = useGetPremiumAssistanceBenefitByID(selectedId)

  const {
    data: premiums,
    refetch,
    isFetching,
    isLoading
  } = useGetPremiumAssistanceBenefitFn({
    page: parseInt(page) ?? 1,
    idKecamatan: kecamatan,
    idKelurahan: kelurahan,
    budget: type,
    q
  })
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
    updateParam('kecamatan', values.kecamatan)
    updateParam('kelurahan', values.kelurahan)
    updateParam('type', values.type)

    await refetch()
  }
  const showDetail = (id: string) => {
    setSelectedId(id)
    setIsShow(true)
  }
  const handleReset = () => {
    navigate('/data-penerima/linjamsos/pbi')
    forms.reset()
  }
  if (isLoading && isLoadingPremium) {
    return <Loading />
  }
  const exportAsCsv = async () => {
    setIsLoadingExport(true)
    const response = await exportPremiumAssistanceBenefitFn('csv', {
      idKecamatan: kecamatan,
      idKelurahan: kelurahan,
      budget: type,
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
    const response = await exportPremiumAssistanceBenefitFn('xlsx', {
      idKecamatan: kecamatan,
      idKelurahan: kelurahan,
      budget: type,
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
  return (
    <Container>
      {(isFetching || isLoadingExport) && <Loading />}
      <h1 className="font-bold text-xl ">Penerima Bantuan Iuran (PBI)</h1>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-x-5 gap-y-5 mt-5 ">
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
          <div className="grid grid-cols-3 gap-y-5  gap-x-5">
            <FormField
              name="kecamatan"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <SearchSelect
                      selected={field.value}
                      onChange={field.onChange}
                      width="w-[580px]"
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
                      width="w-[580px]"
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
              name="type"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Jenis Anggaran" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="APBN">APBN</SelectItem>
                        <SelectItem value="APBD">APBD</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <section className="flex items-center justify-between">
            <div>
              {premiums?.data?.length !== 0 ? (
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
          <p className="text-primary text-sm font-bold">*data bersumber dari SIKS-NG</p>
        </form>
      </Form>
      <section className="border rounded-xl mt-5 overflow-hidden">
        <Table>
          <TableHeader className="bg-[#FFFFFF]">
            <TableRow>
              <TableHead className="text-[#534D59] font-bold text-[15px]">No. </TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Nama</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">NIK</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Kecamatan</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Kelurahan</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Jenis Anggaran</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]"> Tanggal Update</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {premiums?.data?.length !== 0 ? (
              premiums?.data.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="text-left bg-[#F9FAFC]">
                    {(premiums.meta.currentPage - 1) * premiums.meta.perPage + index + 1}
                  </TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.beneficiary?.name ?? '-'}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]" position="center">
                    {item.beneficiary?.identityNumber ?? '-'}
                  </TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]" position="center">
                    {item.beneficiary?.address.areaLevel3?.name ?? '-'}
                  </TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]" position="center">
                    {item.beneficiary?.address.areaLevel4?.name ?? '-'}
                  </TableCell>
                  <TableCell className="text-center bg-[#F9FAFC] uppercase" position="center">
                    {item.type ?? '-'}
                  </TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]" position="center">
                    {formatToView(item.updatedAt) ?? '-'}
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
      {(premiums?.meta?.total as number) > 30 ? (
        <Pagination
          currentPage={page !== '' ? parseInt(page) : 1}
          totalCount={premiums?.meta.total as number}
          pageSize={30}
          onPageChange={(page) => createParams({ key: 'page', value: page.toString() })}
        />
      ) : null}
      <Modal isShow={isShow} className="md:max-w-4xl">
        <Modal.Header setIsShow={setIsShow} className="gap-1 flex flex-col">
          <h3 className="text-base font-bold leading-6 text-title md:text-2xl">Detail Data PBI</h3>
          <p className="text-sm text-[#A1A1A1]">View Data Detail Data PBI</p>
        </Modal.Header>
        {isLoadingPremium && <Loading />}
        <div className="grid grid-cols-3 gap-y-5">
          <div>
            <p className="text-sm font-bold">Nama</p>
            <p className="text-base capitalize">{premium?.beneficiary.name ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">NIK</p>
            <p className="text-base capitalize">{premium?.beneficiary.identityNumber ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">No. KK</p>
            <p className="text-base capitalize">{premium?.beneficiary.familyCardNumber ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Kecamatan</p>
            <p className="text-base capitalize">{premium?.beneficiary.address.areaLevel3?.name ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Kelurahan</p>
            <p className="text-base capitalize">{premium?.beneficiary.address.areaLevel4?.name ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Alamat Lengkap</p>
            <p className="text-base capitalize">{premium?.beneficiary.address.fullAddress ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Pekerjaan</p>
            <p className="text-base capitalize">{premium?.beneficiary.occupation ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Tempat / Tanggal Lahir</p>
            <p className="text-base capitalize">
              {premium?.beneficiary.birthPlace ?? '-'} / {premium?.beneficiary.birthDate ?? '-'}
            </p>
          </div>
          <div>
            <p className="text-sm font-bold">Status DTKS</p>
            <p className="text-base capitalize">{premium?.beneficiary.isDtks ? 'DTKS' : 'Tidak DTKS'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Jenis Anggaran</p>
            <p className="text-base capitalize">{premium?.type ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Usia</p>
            <p className="text-base capitalize">{premium?.beneficiary.age ?? '-'}</p>
          </div>
        </div>
      </Modal>
    </Container>
  )
}
export default DataPbi
