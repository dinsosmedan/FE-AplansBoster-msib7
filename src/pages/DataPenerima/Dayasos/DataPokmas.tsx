import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Action, ExportButton, Loading, Modal, Container, Pagination, SearchSelect } from '@/components'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { formatToView } from '@/lib/services/formatDate'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { HiArrowPath, HiMagnifyingGlass, HiPlus } from 'react-icons/hi2'

import {
  useDeleteCommunityGroups,
  useGetCommunityGroup,
  useGetCommunityGroups,
  useGetKecamatan,
  useGetKelurahan,
  useGetMe
} from '@/store/server'
import { useAlert, useTitleHeader } from '@/store/client'
import { exportCommunityGroupFn } from '@/api/dayasos.api'
import { formatRibuan, useCreateParams, useDisableBodyScroll, useGetParams, useTitle } from '@/hooks'
interface FormValues {
  q: string
  communityActivityCode: string
  status: string
  kecamatan: string
  kelurahan: string
  application_year: string
}

const DataPokmas = () => {
  const { alert } = useAlert()
  const navigate = useNavigate()

  useTitle('Data Penerima')
  const setBreadcrumbs = useTitleHeader((state) => state.setBreadcrumbs)

  React.useEffect(() => {
    setBreadcrumbs([
      { url: '/data-penerima', label: 'Data Penerima' },
      { url: '/data-penerima/dayasos', label: 'Dayasos & PFM' },
      { url: '/data-penerima/dayasos/pokmas', label: 'Pokmas' }
    ])
  }, [])

  const [isShow, setIsShow] = React.useState(false)
  const [selectedId, setSelectedId] = React.useState('')
  const [isLoadingExport, setIsLoadingExport] = React.useState(false)

  const forms = useForm<FormValues>({
    defaultValues: {
      q: '',
      communityActivityCode: '',
      status: '',
      kecamatan: '',
      kelurahan: '',
      application_year: ''
    }
  })

  const createParams = useCreateParams()
  const {
    page,
    q,
    kecamatan,
    kelurahan,
    community_activity_code: communityActivityCode,
    status,
    application_year: applicationYear
  } = useGetParams(['page', 'q', 'kecamatan', 'kelurahan', 'community_activity_code', 'status', 'application_year'])

  const areaLevel3 = forms.watch('kecamatan')
  const { data: listKecamatan } = useGetKecamatan()
  const { data: listKelurahan } = useGetKelurahan(areaLevel3 ?? kecamatan)
  const { data: communityGroup, isLoading: isLoadingCommunityGroup } = useGetCommunityGroup(selectedId)
  const { mutateAsync: deleteCommunityGroups } = useDeleteCommunityGroups()
  const {
    data: communityGroups,
    refetch,
    isFetching,
    isLoading
  } = useGetCommunityGroups({
    page: parseInt(page) ?? 1,
    idKecamatan: kecamatan,
    idKelurahan: kelurahan,
    q,
    communityActivityCode,
    status,
    applicationYear
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
    navigate('/data-penerima/dayasos/pokmas')
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
    updateParam('application_year', values.application_year)
    updateParam('kecamatan', values.kecamatan)
    updateParam('kelurahan', values.kelurahan)
    updateParam('status', values.status)
    updateParam('community_activity_code', values.communityActivityCode)

    await refetch()
  }

  const handleDelete = (id: string) => {
    void alert({
      title: 'Hapus Data POKMAS',
      description: 'Apakah kamu yakin ingin menghapus data ini?',
      variant: 'danger',
      submitText: 'Delete'
    }).then(async () => {
      await deleteCommunityGroups(id)
    })
  }

  const exportAsCsv = async () => {
    setIsLoadingExport(true)
    const response = await exportCommunityGroupFn('csv', {
      idKecamatan: kecamatan,
      idKelurahan: kelurahan,
      q,
      communityActivityCode,
      status,
      applicationYear
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
    const response = await exportCommunityGroupFn('xlsx', {
      idKecamatan: kecamatan,
      idKelurahan: kelurahan,
      q,
      communityActivityCode,
      status,
      applicationYear
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

  if (isLoading || isLoadingGetme) return <Loading />
  return (
    <div>
      <Container>
        {(isFetching || isLoadingExport) && <Loading />}
        <h1 className="font-bold text-xl ">Data Kelompok Masyarakat (Pokmas)</h1>
        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="grid grid-cols-3 gap-x-10 gap-y-5 mt-5">
              <FormField
                name="q"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} type="text" placeholder="Nama Kelompok Masyarakat" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="communityActivityCode"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} type="text" placeholder="Kode Kegiatan " />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="status"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Status Pencarian" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="diproses">Diproses</SelectItem>
                          <SelectItem value="diterima">Diterima</SelectItem>
                        </SelectContent>
                      </Select>
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
                name="application_year"
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
            <section className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  className="gap-2 border-none rounded-lg"
                  onClick={() => navigate('/data-penerima/dayasos/pokmas/create')}
                >
                  <HiPlus className="text-lg" />
                  <span>Tambah Data</span>
                </Button>
                {communityGroups?.data?.length !== 0 ? (
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
            <TableHeader className="bg-white">
              <TableRow>
                <TableHead className="text-[#534D59] font-bold text-[15px]">No.</TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]">Kode Kegiatan</TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]">Nama Kelompok Masyarakat</TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]">Kecamatan</TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]">Kelurahan</TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]">Jenis Kegiatan</TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]">Jenis Bantuan</TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]">Jumlah Bantuan Disetujui</TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]">Tahun Pencairan</TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]">Status Pencairan</TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]"> Tanggal Update</TableHead>
                <TableHead className="text-[#534D59] font-bold text-[15px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {communityGroups?.data?.length !== 0 ? (
                communityGroups?.data.map((item, index) => (
                  <TableRow key={item?.id}>
                    <TableCell className="text-left bg-[#F9FAFC]">
                      {(communityGroups.meta.currentPage - 1) * communityGroups.meta.perPage + index + 1}
                    </TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]" position="center">
                      {item?.communityActivityCode}
                    </TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]">{item?.communityName ?? '-'}</TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]" position="center">
                      {item?.address?.areaLevel3?.name ?? '-'}
                    </TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]" position="center">
                      {item?.address?.areaLevel4?.name ?? '-'}
                    </TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]">
                      {item?.communityActivityTypeDescription ?? '-'}
                    </TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]" position="center">
                      {item?.communityAssistanceType ?? '-'}
                    </TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]">
                      {item?.approvedFundAmount ? `Rp. ${formatRibuan(item.approvedFundAmount)}` : '-'}
                    </TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]" position="center">
                      {item?.applicationYear ?? '-'}
                    </TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]" position="center">
                      {item?.statusDisimbursement ?? '-'}
                    </TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]" position="center">
                      {formatToView(item?.updatedAt) ?? '-'}
                    </TableCell>
                    <TableCell className="flex items-center justify-center bg-[#F9FAFC]">
                      {isEnableDelete ? (
                        <Action
                          onDelete={() => handleDelete(item?.id)}
                          onDetail={() => showDetail(item?.id)}
                          onEdit={() => navigate(`/data-penerima/dayasos/pokmas/create/${item?.id}`)}
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
        {(communityGroups?.meta?.total as number) > 30 ? (
          <Pagination
            currentPage={page !== '' ? parseInt(page) : 1}
            totalCount={communityGroups?.meta.total as number}
            pageSize={30}
            onPageChange={(page) => createParams({ key: 'page', value: page.toString() })}
          />
        ) : null}
        <Modal
          isShow={isShow}
          className="md:max-w-4xl max-h-[calc(100vh-50px)] overflow-y-auto"
          isLoading={isLoadingCommunityGroup}
        >
          <Modal.Header setIsShow={setIsShow} className="gap-1 flex flex-col">
            <h3 className="text-base font-bold leading-6 text-title md:text-2xl">Detail Data POKMAS</h3>
            <p className="text-sm text-[#A1A1A1]">View Data Detail Data POKMAS</p>
          </Modal.Header>
          <div className="grid grid-cols-3 gap-y-5">
            <div>
              <p className="text-sm font-bold">Nama Komunitas</p>
              <p className="text-base capitalize">{communityGroup?.communityName ?? '-'}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Kode Aktivitas Komunitas</p>
              <p className="text-base capitalize">{communityGroup?.communityActivityCode ?? '-'}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Jenis Aktivitas Deskripsi Komunitas</p>
              <p className="text-base capitalize">{communityGroup?.communityActivityTypeDescription ?? '-'}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Jenis Bantuan Komunitas</p>
              <p className="text-base capitalize">{communityGroup?.communityAssistanceType ?? '-'}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Kecamatan</p>
              <p className="text-base capitalize">{communityGroup?.address.areaLevel3?.name ?? '-'}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Kelurahan</p>
              <p className="text-base capitalize">{communityGroup?.address.areaLevel4?.name ?? '-'}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Alamat Lengkap</p>
              <p className="text-base capitalize">{communityGroup?.address.fullAddress ?? '-'}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Bantuan yang diajukan</p>
              <p className="text-base capitalize">{communityGroup?.requestedRabAmount ?? '-'}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Jumlah Bansos yang diajukan</p>
              <p className="text-base capitalize">{communityGroup?.requestedBansosAmount ?? '-'}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Alamat Eksekusi</p>
              <p className="text-base capitalize">{communityGroup?.executionPlace ?? '-'}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Tahun Pengajuan</p>
              <p className="text-base capitalize">{communityGroup?.applicationYear ?? '-'}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Nama Bank</p>
              <p className="text-base capitalize">{communityGroup?.bankName ?? '-'}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Nama Rekening</p>
              <p className="text-base capitalize">{communityGroup?.bankAccAddress ?? '-'}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Alamat Rekening</p>
              <p className="text-base capitalize">{communityGroup?.bankAccAddress ?? '-'}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Jumlah Anggota</p>
              <p className="text-base capitalize">{communityGroup?.membersCount ?? '-'}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Status</p>
              <p className="text-base capitalize">{communityGroup?.statusDisimbursement ?? '-'}</p>
            </div>
          </div>
          <div className="text-center mt-[-20px]">
            <p className="text-lg font-bold">Data Anggota</p>
          </div>
          <section className="border">
            <Table>
              <TableHeader className="bg-primary">
                <TableRow>
                  <TableHead className="text-white font-bold text-[15px]">Nama</TableHead>
                  <TableHead className="text-white font-bold text-[15px]">NIK</TableHead>
                  <TableHead className="text-white font-bold text-[15px]"> Jabatan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {communityGroup?.members?.length !== 0 ? (
                  communityGroup?.members.map((item) => (
                    <TableRow key={item?.id}>
                      <TableCell className="text-center bg-[#F9FAFC]" position="center">
                        {item?.beneficiary?.name ?? '-'}
                      </TableCell>
                      <TableCell className="text-center bg-[#F9FAFC]" position="center">
                        {item?.beneficiary?.identityNumber ?? '-'}
                      </TableCell>
                      <TableCell className="text-center bg-[#F9FAFC]" position="center">
                        {item?.position ?? '-'}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      Tidak ada data
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </section>
        </Modal>
      </Container>
    </div>
  )
}
export default DataPokmas
