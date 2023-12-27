import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Container from '@/components/atoms/Container'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Action, ExportButton, Loading, Modal, Pagination, SearchSelect } from '@/components'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { formatToView } from '@/lib/services/formatDate'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { HiArrowPath, HiMagnifyingGlass, HiPlus } from 'react-icons/hi2'

import {
  useDeleteBusinessGroup,
  useGetBusinessGroup,
  useGetBusinessGroupById,
  useGetKecamatan,
  useGetKelurahan,
  useGetMe
} from '@/store/server'
import { useAlert, useTitleHeader } from '@/store/client'
import { exportJointBussinessFn } from '@/api/dayasos.api'
import { useCreateParams, useDisableBodyScroll, useGetParams, useTitle } from '@/hooks'
interface FormValues {
  q: string
  kelurahan: string
  kecamatan: string
  year: string
}
const DataKube = () => {
  const { alert } = useAlert()
  const navigate = useNavigate()

  useTitle('Data Penerima')
  const setBreadcrumb = useTitleHeader((state) => state.setBreadcrumbs)

  React.useEffect(() => {
    setBreadcrumb([
      { url: '/data-penerima/dayasos', label: 'Dayasos & PFM' },
      { label: 'Dayasos & PFM', url: '/data-penerima/dayasos' },
      { label: 'Kube', url: '/data-penerima/dayasos/kube' }
    ])
  }, [])

  const [isShow, setIsShow] = React.useState(false)
  const [selectedId, setSelectedId] = React.useState('')
  const [isLoadingExport, setIsLoadingExport] = React.useState(false)

  const createParams = useCreateParams()
  const { page, q, kecamatan, kelurahan, year } = useGetParams(['page', 'q', 'kecamatan', 'kelurahan', 'year'])
  const forms = useForm<FormValues>({ defaultValues: { q: '', kecamatan: '', kelurahan: '', year: '' } })

  const areaLevel3 = forms.watch('kecamatan')
  const { data: listKecamatan } = useGetKecamatan()
  const { data: listKelurahan } = useGetKelurahan(areaLevel3 ?? kecamatan)
  const { mutateAsync: deleteBusinessGroup } = useDeleteBusinessGroup()
  const { data: businessGroup, isLoading: isLoadingBusinessGroup } = useGetBusinessGroupById(selectedId)
  const { data: user, isLoading: isLoadingGetme } = useGetMe()

  const isEnableDelete = user?.data.role.permissions.some(
    (permission) => permission.slugName === 'delete-update' && permission.isPermitted
  )
  const {
    data: businessGroups,
    refetch,
    isFetching,
    isLoading
  } = useGetBusinessGroup({
    page: parseInt(page) ?? 1,
    idKecamatan: kecamatan,
    idKelurahan: kelurahan,
    q,
    year
  })

  useDisableBodyScroll(isFetching)

  const handleReset = () => {
    navigate('/data-penerima/dayasos/kube')
    forms.reset()
  }

  const onSubmit = async (values: FormValues) => {
    if (values.q !== '') {
      createParams({ key: 'q', value: values.q !== '' ? values.q : '' })
      createParams({ key: 'page', value: '' })
    } else {
      createParams({ key: 'q', value: '' })
    }

    if (values.year !== '') {
      createParams({ key: 'year', value: values.year !== '' ? values.year : '' })
      createParams({ key: 'page', value: '' })
    } else {
      createParams({ key: 'year', value: '' })
    }
    if (values.kecamatan !== '') {
      createParams({ key: 'kecamatan', value: values.kecamatan !== '' ? values.kecamatan : '' })
      createParams({ key: 'page', value: '' })
    } else {
      createParams({ key: 'kecamatan', value: '' })
    }
    if (values.kelurahan !== '') {
      createParams({ key: 'kelurahan', value: values.kelurahan !== '' ? values.kelurahan : '' })
      createParams({ key: 'page', value: '' })
    } else {
      createParams({ key: 'kelurahan', value: '' })
    }

    await refetch()
  }

  const showDetail = (id: string) => {
    setSelectedId(id)
    setIsShow(true)
  }

  const handleDelete = (id: string) => {
    void alert({
      title: 'Hapus Data KUBE',
      description: 'Apakah kamu yakin ingin menghapus data ini?',
      variant: 'danger',
      submitText: 'Delete'
    }).then(async () => {
      await deleteBusinessGroup(id)
    })
  }

  const exportAsCsv = async () => {
    setIsLoadingExport(true)
    const response = await exportJointBussinessFn('csv', {
      idKecamatan: kecamatan,
      idKelurahan: kelurahan,
      q,
      year
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
    const response = await exportJointBussinessFn('xlsx', {
      idKecamatan: kecamatan,
      idKelurahan: kelurahan,
      q,
      year
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

  if ((isLoading && isLoadingBusinessGroup) || isLoadingGetme) return <Loading />

  return (
    <React.Fragment>
      <Container>
        {(isFetching || isLoadingExport) && <Loading />}
        <h1 className="font-bold text-xl ">Kelompok Usaha Bersama (Kube)</h1>
        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 gap-x-10 gap-y-5 mt-5">
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
                        placeholder="Nama Kelompok Usaha Bersama"
                      />
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
            <section className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  className="gap-2 border-none rounded-lg"
                  onClick={() => navigate('/data-penerima/dayasos/kube/create')}
                >
                  <HiPlus className="text-lg" />
                  <span>Tambah Data</span>
                </Button>
                {businessGroups?.data?.length !== 0 ? (
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
                <TableHead className="text-[#534D59] font-bold text-[15px]">Nama Kelompok Usaha Bersama</TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]">Alamat</TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]">Kecamatan</TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]">Kelurahan</TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]">Jenis</TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]">Tahun Anggaran</TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]"> Tanggal Update</TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {businessGroups?.data?.length !== 0 ? (
                businessGroups?.data.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-center bg-[#F9FAFC]" position="center">
                      {(businessGroups.meta.currentPage - 1) * businessGroups.meta.perPage + index + 1}
                    </TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]">{item.businessName}</TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]">{item.businessAddress?.fullAddress}</TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]" position="center">
                      {item.businessAddress?.areaLevel3?.name}
                    </TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]" position="center">
                      {item.businessAddress?.areaLevel4?.name}
                    </TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]">{item.businessType}</TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]" position="center">
                      {item.budgetYear}
                    </TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]" position="center">
                      {formatToView(item.updatedAt) ?? '-'}
                    </TableCell>
                    <TableCell className="bg-[#F9FAFC]">
                      {isEnableDelete ? (
                        <Action
                          onDelete={() => handleDelete(item.id)}
                          onDetail={() => showDetail(item.id)}
                          onEdit={() => navigate(`/data-penerima/dayasos/kube/create/${item.id}`)}
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
        {(businessGroups?.meta?.total as number) > 30 ? (
          <Pagination
            currentPage={page !== '' ? parseInt(page) : 1}
            totalCount={businessGroups?.meta.total as number}
            pageSize={30}
            onPageChange={(page) => createParams({ key: 'page', value: page.toString() })}
          />
        ) : null}
      </Container>
      <Modal isShow={isShow} className="md:max-w-4xl">
        <Modal.Header setIsShow={setIsShow} className="gap-1 flex flex-col">
          <h3 className="text-base font-bold leading-6 text-title md:text-2xl">Detail Data KUBE</h3>
          <p className="text-sm text-[#A1A1A1]">View Data Detail Data KUBE</p>
        </Modal.Header>
        {isLoadingBusinessGroup && <Loading />}
        <div className="grid grid-cols-3 gap-y-5">
          <div>
            <p className="text-sm font-bold">Nama Usaha</p>
            <p className="text-base capitalize">{businessGroup?.businessName ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Jenis Usaha</p>
            <p className="text-base capitalize">{businessGroup?.businessType ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Alamat Usaha</p>
            <p className="text-base capitalize">{businessGroup?.businessAddress.fullAddress ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Kecamatan</p>
            <p className="text-base capitalize">{businessGroup?.businessAddress.areaLevel3?.name ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Kelurahan</p>
            <p className="text-base capitalize">{businessGroup?.businessAddress.areaLevel4?.name ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Jumlah Anggota</p>
            <p className="text-base capitalize">{businessGroup?.membersCount ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Jumlah Bantuan</p>
            <p className="text-base capitalize">{businessGroup?.assistanceAmount ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Tahun Anggaran</p>
            <p className="text-base capitalize">{businessGroup?.budgetYear ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Status</p>
            <p className="text-base capitalize">{businessGroup?.status ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Keterangan</p>
            <p className="text-base capitalize">{businessGroup?.note ?? '-'}</p>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  )
}
export default DataKube
