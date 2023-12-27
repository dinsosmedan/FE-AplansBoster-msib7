import { Button } from '@/components/ui/button'
import Container from '@/components/atoms/Container'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Action, ExportButton, Loading, Modal, Search, Pagination } from '@/components'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { formatToView } from '@/lib/services/formatDate'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { HiMagnifyingGlass, HiPlus, HiArrowPath } from 'react-icons/hi2'

import {
  useDeleteOrganizationGrantAssistance,
  useGetOrganizationGrantAssistance,
  useGetOrganizationGrantAssistanceById
} from '@/store/server/useDayasos'
import { useAlert, useTitleHeader } from '@/store/client'
import { exportOrganizationGrantAssistance } from '@/api/dayasos.api'
import { useCreateParams, useDisableBodyScroll, useGetParams, useTitle } from '@/hooks'
import { useGetMe } from '@/store/server'

interface FormValues {
  q: string
  budgetYear: string
}

const DataHibah = () => {
  const { alert } = useAlert()
  const navigate = useNavigate()

  useTitle('Data Penerima')
  const setBreadcrumb = useTitleHeader((state) => state.setBreadcrumbs)

  React.useEffect(() => {
    setBreadcrumb([
      { url: '/data-penerima', label: 'Data Penerima' },
      { label: 'Dayasos & PFM', url: '/data-penerima/dayasos' },
      { label: 'BHO', url: '/data-penerima/dayasos/bho' }
    ])
  }, [])

  const [isShow, setIsShow] = React.useState(false)
  const [selectedId, setSelectedId] = React.useState('')
  const [isLoadingExport, setIsLoadingExport] = React.useState(false)

  const createParams = useCreateParams()
  const { q, budgetYear, page } = useGetParams(['q', 'budgetYear', 'page'])
  const forms = useForm<FormValues>({ defaultValues: { q: '', budgetYear: '' } })

  const { data: organizationGrantAssistance, isLoading: isLoadingOrganization } =
    useGetOrganizationGrantAssistanceById(selectedId)

  const {
    data: organizationGrantAssistances,
    refetch,
    isFetching,
    isLoading
  } = useGetOrganizationGrantAssistance({
    page: parseInt(page) ?? 1,
    name: q,
    budgetYear
  })
  const { data: user, isLoading: isLoadingGetme } = useGetMe()

  const isEnableDelete = user?.data.role.permissions.some(
    (permission) => permission.slugName === 'delete-update' && permission.isPermitted
  )
  useDisableBodyScroll(isFetching)

  const handleReset = () => {
    navigate('/data-penerima/dayasos/bho')
    forms.reset()
  }

  const onSubmit = async (values: FormValues) => {
    if (values.q !== '') {
      createParams({ key: 'q', value: values.q !== '' ? values.q : '' })
      createParams({ key: 'page', value: '' })
    } else {
      createParams({ key: 'q', value: '' })
    }

    if (values.budgetYear !== '') {
      createParams({ key: 'budgetYear', value: values.budgetYear !== '' ? values.budgetYear : '' })
    } else {
      createParams({ key: 'budgetYear', value: '' }) // Set budgetYear to empty string if it's empty
    }

    await refetch()
  }
  const { mutateAsync: deleteOrganizationGrantAssistance } = useDeleteOrganizationGrantAssistance()

  const handleDelete = (id: string) => {
    void alert({
      title: 'Hapus Data HIBAH',
      description: 'Apakah kamu yakin ingin menghapus data ini?',
      variant: 'danger',
      submitText: 'Delete'
    }).then(async () => {
      await deleteOrganizationGrantAssistance(id)
    })
  }

  const showDetail = (id: string) => {
    setSelectedId(id)
    setIsShow(true)
  }

  const exportAsCsv = async () => {
    setIsLoadingExport(true)
    const response = await exportOrganizationGrantAssistance('csv', {
      name: q,
      budgetYear
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
    const response = await exportOrganizationGrantAssistance('xlsx', {
      name: q,
      budgetYear
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

  if ((isLoading && isLoadingOrganization) || isLoadingGetme) return <Loading />

  return (
    <Container>
      {(isFetching || isLoadingExport) && <Loading />}
      <h1 className="font-bold text-xl ">Bansos Hibah Organisasi/Lembaga (BHO)</h1>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-x-5 gap-y-5 mt-5">
            <FormField
              name="q"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Search
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Masukkan Nama Lembaga/ NIK Ketua"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="budgetYear"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Search value={field.value} onChange={field.onChange} type="number" placeholder="Masukkan Tahun" />
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
                onClick={() => navigate('/data-penerima/dayasos/bho/create')}
              >
                <HiPlus className="text-lg" />
                <span>Tambah Data</span>
              </Button>
              {organizationGrantAssistances?.data?.length !== 0 ? (
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
              <TableHead className="text-[#534D59] font-bold text-[15px]">Nama Lembaga</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Nama Ketua</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">NIK</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Alamat</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Nomor Handphone</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Jumlah Bantuan</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Tahun</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]"> Tanggal Update</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {organizationGrantAssistances?.data?.length !== 0 ? (
              organizationGrantAssistances?.data.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="bg-[#F9FAFC]" position="center">
                    {(organizationGrantAssistances.meta.currentPage - 1) * organizationGrantAssistances.meta.perPage +
                      index +
                      1}
                  </TableCell>
                  <TableCell className="bg-[#F9FAFC]">{item.name ?? '-'}</TableCell>
                  <TableCell className="bg-[#F9FAFC]">{item.chairmanName ?? '-'}</TableCell>
                  <TableCell className="bg-[#F9FAFC]">{item.chairmanIdentityNumber ?? '-'}</TableCell>
                  <TableCell className="bg-[#F9FAFC]">{item.address.fullAddress ?? '-'}</TableCell>
                  <TableCell className="bg-[#F9FAFC]" position="center">
                    {item.contactNumber ?? '-'}
                  </TableCell>
                  <TableCell className="bg-[#F9FAFC]" position="center">
                    {item.aprrovedAmount ?? '-'}
                  </TableCell>
                  <TableCell className="bg-[#F9FAFC]" position="center">
                    {item.budgetYear ?? '-'}
                  </TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]" position="center">
                    {formatToView(item.updatedAt) ?? '-'}
                  </TableCell>
                  <TableCell className="flex items-center justify-center bg-[#F9FAFC]">
                    {isEnableDelete ? (
                      <Action
                        onDelete={() => handleDelete(item.id)}
                        onDetail={() => showDetail(item.id)}
                        onEdit={() => navigate(`/data-penerima/dayasos/bho/create/${item.id}`)}
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
      {(organizationGrantAssistances?.meta?.total as number) > 30 ? (
        <Pagination
          currentPage={page !== '' ? parseInt(page) : 1}
          totalCount={organizationGrantAssistances?.meta.total as number}
          pageSize={30}
          onPageChange={(page) => createParams({ key: 'page', value: page.toString() })}
        />
      ) : null}
      <Modal isShow={isShow} className="md:max-w-4xl">
        <Modal.Header setIsShow={setIsShow} className="gap-1 flex flex-col">
          <h3 className="text-base font-bold leading-6 text-title md:text-2xl">Detail Data HIBAH</h3>
          <p className="text-sm text-[#A1A1A1]">View Data Detail Data HIBAH</p>
        </Modal.Header>
        {isLoadingOrganization && <Loading />}
        <div className="grid grid-cols-3 gap-y-5">
          <div>
            <p className="text-sm font-bold">Nama Lembaga</p>
            <p className="text-base capitalize">{organizationGrantAssistance?.name ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Nama Ketua</p>
            <p className="text-base capitalize">{organizationGrantAssistance?.chairmanName ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">NIK Ketua</p>
            <p className="text-base capitalize">{organizationGrantAssistance?.chairmanIdentityNumber ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Nama Sekretaris</p>
            <p className="text-base capitalize">{organizationGrantAssistance?.secretaryName ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">NIK Sekretaris</p>
            <p className="text-base capitalize">{organizationGrantAssistance?.secretaryIdentityNumber ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Nama Bendahara</p>
            <p className="text-base capitalize">{organizationGrantAssistance?.treasurerName ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">NIK Bendahara</p>
            <p className="text-base capitalize">{organizationGrantAssistance?.treasurerIdentityNumber ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Nomor Kontak</p>
            <p className="text-base capitalize">{organizationGrantAssistance?.contactNumber ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Kecamatan</p>
            <p className="text-base capitalize">{organizationGrantAssistance?.address.areaLevel3?.name ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Kelurahan</p>
            <p className="text-base capitalize">{organizationGrantAssistance?.address.areaLevel4?.name ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Alamat Lengkap</p>
            <p className="text-base capitalize">{organizationGrantAssistance?.address.fullAddress ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Nama Rekening</p>
            <p className="text-base capitalize">{organizationGrantAssistance?.bankAccountName ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Nomor Rekening</p>
            <p className="text-base capitalize">{organizationGrantAssistance?.bankAccountNumber ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Nama Bank</p>
            <p className="text-base capitalize">{organizationGrantAssistance?.bankName ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Anggaran Yang Diminta</p>
            <p className="text-base capitalize">{organizationGrantAssistance?.requestedAmount ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Anggaran Yang disetujui</p>
            <p className="text-base capitalize">{organizationGrantAssistance?.aprrovedAmount ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Pembayaran Pertama</p>
            <p className="text-base capitalize">{organizationGrantAssistance?.firstDisbursementAmount ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Pembayaran Kedua</p>
            <p className="text-base capitalize">{organizationGrantAssistance?.secondDisbursementAmount ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Tahun Anggaran</p>
            <p className="text-base capitalize">{organizationGrantAssistance?.budgetYear ?? '-'}</p>
          </div>
        </div>
      </Modal>
    </Container>
  )
}
export default DataHibah
