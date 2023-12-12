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
import { useCreateParams, useDisableBodyScroll, useGetParams } from '@/hooks'
import { useNavigate } from 'react-router-dom'
import {
  useGetIndigencyCertificateByID,
  useGetIndigencyCertificateFn,
  useGetKecamatan,
  useGetKelurahan,
  useDeleteSktm
} from '@/store/server'
import { Action, Loading, Modal } from '@/components'
import React from 'react'
import { useAlert, useTitleHeader } from '@/store/client'

interface FormValues {
  q: string
  kelurahan: string
  kecamatan: string
  year: string
  statusDtks: string
}
const DataSktm = () => {
  useTitle('Data Penerima')
  const setBreadcrumbs = useTitleHeader((state) => state.setBreadcrumbs)

  React.useEffect(() => {
    setBreadcrumbs([
      { url: '/data-penerima/linjamsos', label: 'Linjamsos' },
      { url: '/data-penerima/linjamsos/sktm', label: 'SKTM' }
    ])
  }, [])
  const navigate = useNavigate()
  const { alert } = useAlert()
  const createParams = useCreateParams()
  const [isShow, setIsShow] = React.useState(false)
  const [selectedId, setSelectedId] = React.useState('')
  const { q, kecamatan, kelurahan, page, year, statusDtks } = useGetParams([
    'q',
    'kecamatan',
    'kelurahan',
    'page',
    'year',
    'statusDtks'
  ])
  const forms = useForm<FormValues>({
    defaultValues: {
      q: '',
      kecamatan: '',
      kelurahan: '',
      year: '',
      statusDtks: ''
    }
  })
  const areaLevel3 = forms.watch('kecamatan')
  const { data: listKecamatan } = useGetKecamatan()
  const { data: listKelurahan } = useGetKelurahan(areaLevel3 ?? kecamatan)
  const { data: indigency, isLoading: isLoadingIndigencyCertificate } = useGetIndigencyCertificateByID(selectedId)
  const showDetail = (id: string) => {
    setSelectedId(id)
    setIsShow(true)
  }
  const {
    data: indigencys,
    refetch,
    isFetching,
    isLoading
  } = useGetIndigencyCertificateFn({
    page: parseInt(page) ?? 1,
    idKecamatan: kecamatan,
    idKelurahan: kelurahan,
    year,
    statusDtks,
    q
  })
  const { mutateAsync: deleteSktm } = useDeleteSktm()
  const handleDelete = async (id: string) => {
    await alert({
      title: 'Hapus Data SKTM',
      description: 'Apakah kamu yakin ingin menghapus data ini?',
      variant: 'danger',
      submitText: 'Delete'
    }).then(async () => {
      await deleteSktm(id)
    })
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
    updateParam('statusDtks', values.statusDtks)

    await refetch()
  }

  const handleReset = () => {
    navigate('/data-penerima/linjamsos/sktm')
    forms.reset()
  }
  if (isLoading && isLoadingIndigencyCertificate) {
    return <Loading />
  }
  function ubahFormatDateTime(dateTimeString: string): string {
    const regex = /^(\d{4})-(\d{2})-(\d{2})T.*$/
    const match = regex.exec(dateTimeString)

    if (!match) {
      return 'Format DateTime tidak valid'
    }

    const year = match[1]
    const month = match[2]
    const day = match[3]

    return `${day}-${month}-${year}`
  }

  return (
    <Container>
      {isFetching && <Loading />}
      <h1 className="font-bold text-2xl ">Surat Keterangan Tidak Mampu (SKTM)</h1>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="grid grid-cols-3 gap-x-5 gap-y-5 mt-6 ">
            <FormField
              name="q"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Masukkan Nama / NIK" />
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
                    <Input {...field} type="number" placeholder="Masukkan Tahun Pembuatan" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="statusDtks"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Status DTKS" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dtks">DTKS</SelectItem>
                        <SelectItem value="non-dtks">Non DTKS</SelectItem>
                        <SelectItem value="prelist">PRELIST</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-3 gap-x-5 gap-y-5 ">
            <FormField
              name="kecamatan"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
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
                      value={field.value}
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
              <TableHead className="text-[#534D59] font-bold text-[15px]">No. </TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Nama Pemohon</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Nama Bersangkutan</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Tahun Pembuatan</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Tanggal Terbit</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Status DTKS</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Kecamatan</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Kelurahan</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {indigencys?.data?.length !== 0 ? (
              indigencys?.data.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="text-left bg-[#F9FAFC]">
                    {(indigencys.meta.currentPage - 1) * indigencys.meta.perPage + index + 1}
                  </TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.applicant?.name ?? '-'}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.peopleConcerned?.name ?? '-'}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.issueYear ?? '-'}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">
                    {ubahFormatDateTime(item.issueDate) ?? '-'}
                  </TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">{item.isDtks ? 'DTKS' : 'Non DTKS'}</TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">
                    {item.applicant?.address.areaLevel3?.name ?? '-'}
                  </TableCell>
                  <TableCell className="text-center bg-[#F9FAFC]">
                    {item.applicant?.address.areaLevel4?.name ?? '-'}
                  </TableCell>
                  <TableCell className="flex items-center justify-center bg-[#F9FAFC]">
                    <Action
                      onDelete={async () => await handleDelete(item.id)}
                      onDetail={() => showDetail(item.id)}
                      onEdit={() => console.log('detail')}
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
      {(indigencys?.meta?.total as number) > 30 ? (
        <Pagination
          currentPage={page !== '' ? parseInt(page) : 1}
          totalCount={indigencys?.meta.total as number}
          pageSize={30}
          onPageChange={(page) => createParams({ key: 'page', value: page.toString() })}
        />
      ) : null}
      <Modal isShow={isShow} className="md:max-w-4xl max-h-[calc(100vh-50px)] overflow-y-auto">
        <Modal.Header setIsShow={setIsShow} className="gap-1 flex flex-col">
          <h3 className="text-base font-bold leading-6 text-title md:text-2xl">Detail Data SKTM</h3>
          <p className="text-sm text-[#A1A1A1]">View Data Detail Data SKTM</p>
        </Modal.Header>
        {isLoadingIndigencyCertificate && <Loading />}
        <div className="grid grid-cols-3 gap-y-5">
          <div>
            <p className="text-sm font-bold">Nama Pemohon</p>
            <p className="text-base capitalize">{indigency?.applicant.name ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">NIK Pemohon</p>
            <p className="text-base capitalize">{indigency?.applicant.identityNumber ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">No. KK Pemohon</p>
            <p className="text-base capitalize">{indigency?.applicant.familyCardNumber ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Kecamatan Pemohon</p>
            <p className="text-base capitalize">{indigency?.applicant.address.areaLevel3?.name ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Kelurahan Pemohon</p>
            <p className="text-base capitalize">{indigency?.applicant.address.areaLevel4?.name ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Alamat Lengkap Pemohon</p>
            <p className="text-base capitalize">{indigency?.applicant.address.fullAddress ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Pekerjaan Pemohon</p>
            <p className="text-base capitalize">{indigency?.applicant.occupation ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Tempat / Tanggal Lahir Pemohon</p>
            <p className="text-base capitalize">
              {indigency?.applicant.birthPlace ?? '-'} / {indigency?.applicant.birthDate ?? '-'}
            </p>
          </div>
          <div>
            <p className="text-sm font-bold">Status DTKS Pemohon</p>
            <p className="text-base capitalize">{indigency?.applicant.isDtks ? 'DTKS' : 'Tidak DTKS'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Usia Pemohon</p>
            <p className="text-base capitalize">{indigency?.applicant.age ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Nama Yang Bersangkutan</p>
            <p className="text-base capitalize">{indigency?.peopleConcerned.name ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">NIK Yang Bersangkutan</p>
            <p className="text-base capitalize">{indigency?.peopleConcerned.identityNumber ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">No. KK Yang Bersangkutan</p>
            <p className="text-base capitalize">{indigency?.peopleConcerned.familyCardNumber ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Kecamatan Yang Bersangkutan</p>
            <p className="text-base capitalize">{indigency?.peopleConcerned.address.areaLevel3?.name ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Kelurahan Yang Bersangkutan</p>
            <p className="text-base capitalize">{indigency?.peopleConcerned.address.areaLevel4?.name ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Alamat Lengkap Yang Bersangkutan</p>
            <p className="text-base capitalize">{indigency?.peopleConcerned.address.fullAddress ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Pekerjaan Yang Bersangkutan</p>
            <p className="text-base capitalize">{indigency?.peopleConcerned.occupation ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Tempat / Tanggal Lahir Yang Bersangkutan</p>
            <p className="text-base capitalize">
              {indigency?.peopleConcerned.birthPlace ?? '-'} / {indigency?.peopleConcerned.birthDate ?? '-'}
            </p>
          </div>
          <div>
            <p className="text-sm font-bold">Status DTKS Yang Bersangkutan</p>
            <p className="text-base capitalize">{indigency?.peopleConcerned.isDtks ? 'DTKS' : 'Tidak DTKS'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Usia Yang Bersangkutan</p>
            <p className="text-base capitalize">{indigency?.peopleConcerned.age ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Permohonan</p>
            <p className="text-base capitalize">{indigency?.application ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Tujuan Permohonan</p>
            <p className="text-base capitalize">{indigency?.certificateDestination ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Tanggal Pengajuan</p>
            <p className="text-base capitalize">{indigency?.issueDate ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Tahun Pengajuan</p>
            <p className="text-base capitalize">{indigency?.issueYear ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Status DTKS</p>
            <p className="text-base capitalize">{indigency?.statusDtks ?? '-'}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Pengajuan Online</p>
            <p className="text-base capitalize">{indigency?.isApplicationOnline ? 'Ya' : 'Tida'}</p>
          </div>
        </div>
      </Modal>
    </Container>
  )
}
export default DataSktm
