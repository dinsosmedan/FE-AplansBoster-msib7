import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Action, ExportButton, Loading, Modal, Title, Pagination, Container, SearchSelect } from '@/components'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { formatToView } from '@/lib/services/formatDate'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { HiArrowPath, HiMagnifyingGlass, HiPlus } from 'react-icons/hi2'

import {
  useDeleteServiceFund,
  useGetKecamatan,
  useGetKelurahan,
  useGetMe,
  useGetServiceFund,
  useGetServiceFunds,
  useGetServiceTypes
} from '@/store/server'
import { exportServiceFundFn } from '@/api/dayasos.api'
import { useAlert, useTitleHeader } from '@/store/client'
import { useCreateParams, useDisableBodyScroll, useGetParams, useTitle } from '@/hooks'

interface FormValues {
  q: string
  kelurahan: string
  kecamatan: string
  type: string
  budget_year: string
}

const DataDjp = () => {
  useTitle('Data Penerima')
  const setBreadcrumbs = useTitleHeader((state) => state.setBreadcrumbs)

  React.useEffect(() => {
    setBreadcrumbs([
      { url: '/data-penerima', label: 'Data Penerima' },
      { url: '/data-penerima/dayasos', label: 'Dayasos & PFM' },
      { url: '/data-penerima/dayasos/djpm', label: 'DJPM' }
    ])
  }, [])

  const navigate = useNavigate()
  const { alert } = useAlert()

  const [isShow, setIsShow] = React.useState(false)
  const [selectedId, setSelectedId] = React.useState('')
  const [isLoadingExport, setIsLoadingExport] = React.useState(false)
  const { data: user, isLoading: isLoadingGetme } = useGetMe()

  const isEnableDelete = user?.data.role.permissions.some(
    (permission) => permission.slugName === 'delete-update' && permission.isPermitted
  )

  const createParams = useCreateParams()
  const {
    q,
    kecamatan,
    kelurahan,
    page,
    type,
    budget_year: budgetYear
  } = useGetParams(['q', 'kecamatan', 'kelurahan', 'page', 'type', 'budget_year'])
  const forms = useForm<FormValues>({
    defaultValues: { q: '', kelurahan: '', kecamatan: '', type: '', budget_year: '' }
  })

  const areaLevel3 = forms.watch('kecamatan')
  const { data: listKecamatan } = useGetKecamatan()
  const { data: listKelurahan } = useGetKelurahan(areaLevel3 ?? kecamatan)
  const { data: serviceTypes } = useGetServiceTypes()
  const { data: serviceFund, isLoading: isLoadingServiceFund } = useGetServiceFund(selectedId)
  const { mutateAsync: deleteServiceFund } = useDeleteServiceFund()

  const {
    data: serviceFunds,
    refetch,
    isFetching,
    isLoading
  } = useGetServiceFunds({
    page: parseInt(page) ?? 1,
    idKecamatan: kecamatan,
    idKelurahan: kelurahan,
    name: q,
    assistance: type,
    budgetYear
  })

  useDisableBodyScroll(isFetching || isLoadingExport || isLoadingServiceFund || isLoading)

  const handleReset = () => {
    navigate('/data-penerima/dayasos/djpm')
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
    updateParam('q', values.q)
    updateParam('budget_year', values.budget_year)
    updateParam('kecamatan', values.kecamatan)
    updateParam('kelurahan', values.kelurahan)
    updateParam('type', values.type)

    await refetch()
  }

  const handleDelete = (id: string) => {
    void alert({
      title: 'Hapus Data DJPM',
      description: 'Apakah kamu yakin ingin menghapus data ini?',
      variant: 'danger',
      submitText: 'Delete'
    }).then(async () => {
      await deleteServiceFund(id)
    })
  }

  const showDetail = (id: string) => {
    setSelectedId(id)
    setIsShow(true)
  }

  const exportAsCsv = async () => {
    setIsLoadingExport(true)
    const response = await exportServiceFundFn('csv', {
      idKecamatan: kecamatan,
      idKelurahan: kelurahan,
      name: q,
      assistance: type
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
    const response = await exportServiceFundFn('xlsx', {
      idKecamatan: kecamatan,
      idKelurahan: kelurahan,
      name: q,
      assistance: type
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

  if (isLoading && isLoadingServiceFund && isLoadingGetme) return <Loading />

  return (
    <Container>
      {(isFetching || isLoadingExport) && <Loading />}
      <Title>Dana Jasa Pelayanan Masyarakat (DJPM)</Title>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-[18px]">
          <section>
            <div className="grid grid-cols-2  gap-y-5  gap-x-5 mt-5">
              <FormField
                name="q"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} placeholder="Cari berdasarkan NIK atau Nama" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="type"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Jenis Bantuan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {serviceTypes?.map((item, index) => (
                          <SelectItem key={index} value={item.id}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-3 gap-y-5  gap-x-5 mt-5">
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
                name="budget_year"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} type="number" placeholder="Masukkan Tahun" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </section>

          <section className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                type="button"
                className="gap-2 border-none rounded-lg"
                onClick={() => navigate('/data-penerima/dayasos/djpm/create')}
              >
                <HiPlus className="text-lg" />
                <span>Tambah Data</span>
              </Button>
              {serviceFunds?.data?.length !== 0 && (
                <ExportButton onExportFirst={exportAsXlsx} onExportSecond={exportAsCsv} />
              )}
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
          <TableHeader className="bg-white">
            <TableRow>
              <TableHead className="text-[#534D59] font-bold text-[15px]">No.</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Nama</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">NIK</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Jenis Kelamin</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Tempat/ Tanggal Lahir</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Kelurahan</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Kecamatan</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Jenis Bantuan</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Jumlah Bantuan Disetujui</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]"> Tanggal Update</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {serviceFunds?.data?.length !== 0 ? (
              serviceFunds?.data.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="text-center bg-[#F9FAFC]">
                    {(serviceFunds.meta.currentPage - 1) * serviceFunds.meta.perPage + index + 1}
                  </TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.beneficiary.name}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.beneficiary.identityNumber}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]" position="center">
                    {item.beneficiary.gender}
                  </TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]" position="center">
                    {item.beneficiary.birthPlace} / {item.beneficiary.birthDate}
                  </TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]" position="center">
                    {item.beneficiary.address.areaLevel4?.name}
                  </TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]" position="center">
                    {item.beneficiary.address.areaLevel3?.name}
                  </TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]" position="center">
                    {item.serviceType.name}
                  </TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]" position="center">
                    {item?.assistanceAmount ?? '-'}
                  </TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]" position="center">
                    {formatToView(item.updatedAt) ?? '-'}
                  </TableCell>
                  <TableCell className="flex items-center justify-center bg-[#F9FAFC]">
                    {isEnableDelete ? (
                      <Action
                        onDetail={() => showDetail(item.id)}
                        onDelete={() => handleDelete(item.id)}
                        onEdit={() => navigate(`/data-penerima/dayasos/djpm/create/${item.id}`)}
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
      {(serviceFunds?.meta?.total as number) > 30 ? (
        <Pagination
          currentPage={page !== '' ? parseInt(page) : 1}
          totalCount={serviceFunds?.meta.total as number}
          pageSize={30}
          onPageChange={(page) => createParams({ key: 'page', value: page.toString() })}
        />
      ) : null}
      <Modal isShow={isShow} className="md:max-w-4xl">
        <Modal.Header setIsShow={setIsShow} className="gap-1 flex flex-col">
          <h3 className="text-base font-bold leading-6 text-title md:text-2xl">Detail Data DJPM</h3>
          <p className="text-sm text-[#A1A1A1]">View Data Detail Data DJPM</p>
        </Modal.Header>
        {isLoadingServiceFund && <Loading />}
        <div className="grid grid-cols-3 gap-y-5">
          <div>
            <p className="text-sm font-bold">Nama</p>
            <p className="text-base capitalize">{serviceFund?.beneficiary.name ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">NIK</p>
            <p className="text-base capitalize">{serviceFund?.beneficiary.identityNumber ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">No. KK</p>
            <p className="text-base capitalize">{serviceFund?.beneficiary.familyCardNumber ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Jenis Bantuan DJPM</p>
            <p className="text-base capitalize">{serviceFund?.serviceType.name ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Kecamatan</p>
            <p className="text-base capitalize">{serviceFund?.beneficiary.address.areaLevel3?.name ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Kelurahan</p>
            <p className="text-base capitalize">{serviceFund?.beneficiary.address.areaLevel4?.name ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Alamat Lengkap</p>
            <p className="text-base capitalize">{serviceFund?.beneficiary.address.fullAddress ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Pekerjaan</p>
            <p className="text-base capitalize">{serviceFund?.beneficiary.occupation ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Tempat / Tanggal Lahir</p>
            <p className="text-base capitalize">
              {serviceFund?.beneficiary.birthPlace} / {serviceFund?.beneficiary.birthDate ?? '-'}
            </p>
          </div>
          <div>
            <p className="text-sm font-bold">No.Telepon</p>
            <p className="text-base capitalize">{serviceFund?.phoneNumber ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Status DTKS</p>
            <p className="text-base capitalize">{serviceFund?.beneficiary.isDtks ? 'DTKS' : 'Tidak DTKS'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Tahun Anggaran</p>
            <p className="text-base capitalize">{serviceFund?.budgetYear ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Nama Rekening</p>
            <p className="text-base capitalize">{serviceFund?.bankAccountName ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">No.Rekening</p>
            <p className="text-base capitalize">{serviceFund?.bankAccountNumber ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Nama Bank</p>
            <p className="text-base capitalize">{serviceFund?.bankBranchName ?? '-'}</p>
          </div>
        </div>
      </Modal>
    </Container>
  )
}
export default DataDjp
