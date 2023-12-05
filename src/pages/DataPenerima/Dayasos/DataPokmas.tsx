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
import * as React from 'react'
import { useCreateParams, useDisableBodyScroll, useGetParams } from '@/hooks'
import {
  useDeleteCommunityGroups,
  useGetCommunityGroup,
  useGetCommunityGroups,
  useGetKecamatan,
  useGetKelurahan
} from '@/store/server'
import { Action, Loading, Modal } from '@/components'
import { useAlert } from '@/store/client'
import { useNavigate } from 'react-router-dom'
interface FormValues {
  q: string
  communityActivityCode: string
  status: string
  kecamatan: string
  kelurahan: string
  application_year: string
}
const DataPokmas = () => {
  useTitle('Data Penerima / Dayasos / Pokmas ')
  const { alert } = useAlert()
  const navigate = useNavigate()
  const [isShow, setIsShow] = React.useState(false)
  const [selectedId, setSelectedId] = React.useState('')
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
  const { data: communityGroup, isLoading: isLoadingCommunityGroup } = useGetCommunityGroup(selectedId)

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
  const [isLoadingPage, setIsLoadingPage] = React.useState(false)
  const areaLevel3 = forms.watch('kecamatan')
  const { data: listKecamatan } = useGetKecamatan()
  const { data: listKelurahan } = useGetKelurahan(areaLevel3 ?? kecamatan)

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
  useDisableBodyScroll(isFetching)
  const showDetail = (id: string) => {
    setSelectedId(id)
    setIsShow(true)
  }
  const handleReset = () => {
    navigate('/data-penerima/dayasos/data-pokmas')
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
  const { mutateAsync: deleteCommunityGroups } = useDeleteCommunityGroups()
  const handleDelete = (id: string) => {
    void alert({
      title: 'Hapus Data DJPM',
      description: 'Apakah kamu yakin ingin menghapus data ini?',
      variant: 'danger',
      submitText: 'Delete'
    }).then(async () => {
      await deleteCommunityGroups(id)
    })
  }
  React.useEffect(() => {
    if (isFetching) {
      setIsLoadingPage(true)
    } else {
      setIsLoadingPage(false)
    }
  }, [isLoadingPage, isFetching])

  if (isLoading) {
    return <Loading />
  }
  return (
    <div>
      <Container>
        {isFetching && <Loading />}
        <h1 className="font-bold text-xl ">Data Kelompok Masyarakat (Pokmas)</h1>
        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="grid grid-cols-3 gap-x-10 gap-y-5 pt-10">
              <FormField
                name="q"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Nama Kelompok Masyarakat" />
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
                      <Input {...field} type="text" placeholder="Kode Kegiatan " />
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
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Kecamatan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {listKecamatan?.map((item, index) => (
                            <SelectItem key={index} value={item.id}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={areaLevel3 === '' && kecamatan === ''}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Kelurahan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {listKelurahan?.map((item, index) => (
                            <SelectItem key={index} value={item.id}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                      <Input {...field} type="text" placeholder="Masukkan Tahun" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <section className="flex items-center justify-between">
              <Select>
                <SelectTrigger className="border-primary flex gap-5 rounded-lg font-bold w-fit bg-white text-primary focus:ring-0">
                  <SelectValue placeholder="Export" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value=".clsx">.clsx</SelectItem>
                  <SelectItem value=".csv">.csv</SelectItem>
                </SelectContent>
              </Select>
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
          <Table className="mt-5">
            <TableHeader className="bg-zinc-300">
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
                <TableHead className="text-[#534D59] font-bold text-[15px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {communityGroups?.data?.length !== 0 ? (
                communityGroups?.data.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-left">
                      {(communityGroups.meta.currentPage - 1) * communityGroups.meta.perPage + index + 1}
                    </TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]">{item.communityActivityCode}</TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]">{item.communityName}</TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]">{item.address?.areaLevel3?.name}</TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]">{item.address?.areaLevel4?.name}</TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]">{item.communityActivityTypeDescription}</TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]">{item.communityAssistanceType}</TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]">{item.approvedFundAmount}</TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]">{item.applicationYear}</TableCell>
                    <TableCell className="text-center bg-[#F9FAFC]">{item.statusDisimbursement}</TableCell>
                    <TableCell className="flex items-center justify-center bg-[#F9FAFC]">
                      <Action
                        onDelete={() => handleDelete(item.id)}
                        onDetail={() => showDetail(item.id)}
                        onEdit={() => navigate(`/layanan/dayasos/pokmas/${item.id}`)}
                      />
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
        {(communityGroups?.meta?.total as number) > 10 ? (
          <Pagination
            className="px-5 py-5 flex justify-end"
            currentPage={page !== '' ? parseInt(page) : 1}
            totalCount={communityGroups?.meta.total as number}
            pageSize={10}
            onPageChange={(page) => createParams({ key: 'page', value: page.toString() })}
          />
        ) : null}
        <Modal isShow={isShow} className="md:max-w-4xl">
          <Modal.Header setIsShow={setIsShow} className="gap-1 flex flex-col">
            <h3 className="text-base font-bold leading-6 text-title md:text-2xl">Detail Data DJPM</h3>
            <p className="text-sm text-[#A1A1A1]">View Data Detail Data DJPM</p>
          </Modal.Header>
          {isLoadingCommunityGroup && <Loading />}
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
        </Modal>
      </Container>
    </div>
  )
}
export default DataPokmas
