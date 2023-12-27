import Container from '@/components/atoms/Container'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import useTitle from '@/hooks/useTitle'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { HiArrowPath, HiMagnifyingGlass, HiPlus } from 'react-icons/hi2'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Pagination from './../../../components/atoms/Pagination'
import { useNavigate } from 'react-router-dom'
import { formatToView } from '@/lib/services/formatDate'
import {
  useDeletePkr,
  useGetDetailVulnerableGroupHandling,
  useGetKecamatan,
  useGetKelurahan,
  useGetMe,
  useVulnerableGroupHandlings
} from '@/store/server'
import { useCreateParams, useDisableBodyScroll, useGetParams } from '@/hooks'
import { Action, ExportButton, Loading, Modal, SearchSelect } from '@/components'
import { useAlert, useTitleHeader } from '@/store/client'
import React from 'react'
import { exportVulnerableGroupHandlingFn } from '@/api/linjamsos.api'
interface FormValues {
  q: string
  kelurahan: string
  kecamatan: string
  year: string
}
const DataPkr = () => {
  useTitle('Data Penerima')
  const setBreadcrumbs = useTitleHeader((state) => state.setBreadcrumbs)

  React.useEffect(() => {
    setBreadcrumbs([
      { url: '/data-penerima', label: 'Data Penerima' },
      { url: '/data-penerima/linjamsos', label: 'Linjamsos' },
      { url: '/data-penerima/linjamsos/pkr', label: 'PKR' }
    ])
  }, [])

  const navigate = useNavigate()
  const createParams = useCreateParams()
  const [isLoadingExport, setIsLoadingExport] = React.useState(false)
  const [isShow, setIsShow] = React.useState(false)
  const [selectedId, setSelectedId] = React.useState('')
  const { q, kecamatan, kelurahan, page, year } = useGetParams(['q', 'kecamatan', 'kelurahan', 'page', 'year'])
  const forms = useForm<FormValues>({
    defaultValues: {
      q: '',
      kecamatan: '',
      kelurahan: '',
      year: ''
    }
  })
  const { alert } = useAlert()

  const areaLevel3 = forms.watch('kecamatan')
  const { data: listKecamatan } = useGetKecamatan()
  const { data: listKelurahan } = useGetKelurahan(areaLevel3 ?? kecamatan)
  const { data: vulnerable, isLoading: isLoadingVulnerable } = useGetDetailVulnerableGroupHandling(selectedId)
  const { data: user, isLoading: isLoadingGetme } = useGetMe()

  const isEnableDelete = user?.data.role.permissions.some(
    (permission) => permission.slugName === 'delete-update' && permission.isPermitted
  )
  const {
    data: vulnerables,
    refetch,
    isFetching,
    isLoading
  } = useVulnerableGroupHandlings({
    page: parseInt(page) ?? 1,
    idKecamatan: kecamatan,
    idKelurahan: kelurahan,
    year,
    q
  })
  const { mutateAsync: deletePkr } = useDeletePkr()
  const handleDelete = async (id: string) => {
    await alert({
      title: 'Hapus Data PKR',
      description: 'Apakah kamu yakin ingin menghapus data ini?',
      variant: 'danger',
      submitText: 'Delete'
    }).then(async () => {
      await deletePkr(id)
    })
  }
  const showDetail = (id: string) => {
    setSelectedId(id)
    setIsShow(true)
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
    updateParam('kecamatan', values.kecamatan)
    updateParam('kelurahan', values.kelurahan)
    updateParam('year', values.year)

    await refetch()
  }
  const handleReset = () => {
    navigate('/data-penerima/linjamsos/pkr')
    forms.reset()
  }
  const exportAsCsv = async () => {
    setIsLoadingExport(true)
    const response = await exportVulnerableGroupHandlingFn('csv', {
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
    const response = await exportVulnerableGroupHandlingFn('xlsx', {
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
  if ((isLoading && isLoadingVulnerable) || isLoadingGetme) {
    return <Loading />
  }

  return (
    <div>
      <Container>
        {(isFetching || isLoadingExport) && <Loading />}
        <h1 className="font-bold text-xl ">Penanganan Kelompok Rentan (PKR)</h1>
        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="flex flex-row justify-between mt-5 items-center gap-5 ">
              <div className="flex-1 ">
                <FormField
                  name="q"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} value={field.value ?? ''} type="text" placeholder="Masukkan NIK Masyarakat" />
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
                      <Input {...field} value={field.value ?? ''} type="number" placeholder="Masukkan Tahun Anggaran" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-6 flex justify-between">
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  className="gap-2 border-none rounded-lg"
                  onClick={() => navigate('/data-penerima/linjamsos/pkr/create')}
                >
                  <HiPlus className="text-lg" />
                  <p className="w-max">Tambah Data</p>
                </Button>
                {vulnerables?.data?.length !== 0 ? (
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
                <TableHead className="text-[#534D59] font-bold text-[15px]">Nomor Kartu Keluraga</TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]">NIK</TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]">Alamat Kartu Keluarga</TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]">Kecamatan</TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]">Kelurahan</TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]">Tahun Anggaran</TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]"> Tanggal Update</TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vulnerables?.data?.length !== 0 ? (
                vulnerables?.data.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-left bg-[#F9FAFC]">
                      {(vulnerables.meta.currentPage - 1) * vulnerables.meta.perPage + index + 1}
                    </TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]">{item.beneficiary?.name ?? '-'}</TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]" position="center">
                      {item.beneficiary?.identityNumber ?? '-'}
                    </TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]" position="center">
                      {item.beneficiary?.familyCardNumber ?? '-'}
                    </TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]">
                      {item.beneficiary?.address.fullAddress ?? '-'}
                    </TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]" position="center">
                      {item.beneficiary?.address.areaLevel3?.name ?? '-'}
                    </TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]" position="center">
                      {item.beneficiary?.address.areaLevel4?.name ?? '-'}
                    </TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]" position="center">
                      {item.budgetYear ?? '-'}
                    </TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]" position="center">
                      {formatToView(item.updatedAt) ?? '-'}
                    </TableCell>
                    <TableCell className="flex items-center justify-center bg-[#F9FAFC]">
                      {isEnableDelete ? (
                        <Action
                          onDelete={async () => await handleDelete(item.id)}
                          onDetail={() => showDetail(item.id)}
                          onEdit={() => navigate(`/data-penerima/linjamsos/pkr/${item.id}`)}
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
        {(vulnerables?.meta?.total as number) > 30 ? (
          <Pagination
            currentPage={page !== '' ? parseInt(page) : 1}
            totalCount={vulnerables?.meta.total as number}
            pageSize={30}
            onPageChange={(page) => createParams({ key: 'page', value: page.toString() })}
          />
        ) : null}
        <Modal isShow={isShow} className="md:max-w-4xl">
          <Modal.Header setIsShow={setIsShow} className="gap-1 flex flex-col">
            <h3 className="text-base font-bold leading-6 text-title md:text-2xl">Detail Data PKR</h3>
            <p className="text-sm text-[#A1A1A1]">View Data Detail Data PKR</p>
          </Modal.Header>
          {isLoadingVulnerable && <Loading />}
          <div className="grid grid-cols-3 gap-y-5">
            <div>
              <p className="text-sm font-bold">Nama</p>
              <p className="text-base capitalize">{vulnerable?.beneficiary.name ?? '-'}</p>
            </div>
            <div>
              <p className="text-sm font-bold">NIK</p>
              <p className="text-base capitalize">{vulnerable?.beneficiary.identityNumber ?? '-'}</p>
            </div>
            <div>
              <p className="text-sm font-bold">No. KK</p>
              <p className="text-base capitalize">{vulnerable?.beneficiary.familyCardNumber ?? '-'}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Kecamatan</p>
              <p className="text-base capitalize">{vulnerable?.beneficiary.address.areaLevel3?.name ?? '-'}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Kelurahan</p>
              <p className="text-base capitalize">{vulnerable?.beneficiary.address.areaLevel4?.name ?? '-'}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Alamat Lengkap</p>
              <p className="text-base capitalize">{vulnerable?.beneficiary.address.fullAddress ?? '-'}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Pekerjaan</p>
              <p className="text-base capitalize">{vulnerable?.beneficiary.occupation ?? '-'}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Tempat / Tanggal Lahir</p>
              <p className="text-base capitalize">
                {vulnerable?.beneficiary.birthPlace ?? '-'} / {vulnerable?.beneficiary.birthDate ?? '-'}
              </p>
            </div>
            <div>
              <p className="text-sm font-bold">Status DTKS</p>
              <p className="text-base capitalize">{vulnerable?.beneficiary.isDtks ? 'DTKS' : 'Tidak DTKS'}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Usia</p>
              <p className="text-base capitalize">{vulnerable?.beneficiary.age ?? '-'}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Tanggal Kejadian</p>
              <p className="text-base capitalize">{vulnerable?.incidentDate ?? '-'}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Lokasi Kejadian</p>
              <p className="text-base capitalize">{vulnerable?.incidentAddress ?? '-'}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Nomor Rekening</p>
              <p className="text-base capitalize">{vulnerable?.bankAccountNumber ?? '-'}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Nama Bank</p>
              <p className="text-base capitalize">{vulnerable?.bankName ?? '-'}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Jumlah Bantuan</p>
              <p className="text-base capitalize">{vulnerable?.assistanceAmount ?? '-'}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Tahun Anggaran</p>
              <p className="text-base capitalize">{vulnerable?.budgetYear ?? '-'}</p>
            </div>
          </div>
        </Modal>
      </Container>
    </div>
  )
}
export default DataPkr
