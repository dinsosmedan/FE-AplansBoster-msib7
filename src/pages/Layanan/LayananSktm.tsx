import { Container, Loading, Pagination, Search, StatusDropdown } from '@/components'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useTitleHeader } from '@/store/client'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { HiOutlineExclamationCircle } from 'react-icons/hi2'
import FilterLayanan from './../../components/atoms/FilterLayanan'
import { useGetIndigencyCertificate, useUpdateIndigencyCertificateStatus } from '@/store/server/useService'
import useGetParams from '@/hooks/useGetParams'
import { useCreateParams, useTitle } from '@/hooks'

interface FormValues {
  nik: string
  tahunAnggaran: string
  jadwalAwal: string
  tahunNotifikasi: string
  jumlahPeserta: string
  batch: string
  jadwalAkhir: string
  jenisEvent: string
}

const dataLayanan = [
  { text: 'Data Pengajuan', tab: 'pending' },
  { text: 'Data Diterima', tab: 'approved' },
  { text: 'Data Ditolak', tab: 'rejected' }
]

export default function LayananSktm() {
  useTitle('Surat Keterangan Tidak Mampu (SKTM)')
  const setBreadcrumbs = useTitleHeader((state) => state.setBreadcrumbs)

  React.useEffect(() => {
    setBreadcrumbs([
      { url: '/layanan', label: 'Layanan' },
      { url: '/layanan/layanan-sktm', label: 'SKTM' }
    ])
  }, [])

  const [isShow, setIsShow] = React.useState(false)
  const [search, setsearch] = useState('')

  const createParams = useCreateParams()
  const { tab, page } = useGetParams(['tab', 'page'])
  const { mutate: update, isLoading: isLoadingUpdate } = useUpdateIndigencyCertificateStatus()
  const {
    data: indigencyCertificate,
    refetch,
    isFetching
  } = useGetIndigencyCertificate(tab, search, parseInt(page) || 1)

  useEffect(() => {
    void refetch()
  }, [tab])

  useEffect(() => {
    void refetch()
  }, [search])

  const forms = useForm<FormValues>()

  const onSubmit = async (values: FormValues) => {
    setsearch(values.nik)
    await refetch()
  }

  const handleChangeStatusDTKS = async (values: string, id: string) => {
    update({ id, fields: { dtksStatus: values } })
  }

  return (
    <Container>
      <Form {...forms}>
        {(isFetching || isLoadingUpdate) && <Loading />}
        <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="w-12/12">
            <FormField
              name="nik"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Search value={field.value} onChange={field.onChange} placeholder="Masukkan Nama / NIK" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
      <FilterLayanan jenis={'layanan-sktm'} data={dataLayanan} />
      <section className="border rounded-xl mt-5 overflow-hidden">
        <Table>
          <TableHeader className="bg-[#FFFFFF]">
            <TableRow>
              <TableHead className="text-white font-bold text-[15px] bg-primary">No</TableHead>
              <TableHead className="text-white font-bold text-[15px] bg-primary">Nama</TableHead>
              <TableHead className="text-white font-bold text-[15px] bg-primary">NIK</TableHead>
              <TableHead className="text-white font-bold text-[15px] bg-primary">Kecamatan</TableHead>
              <TableHead className="text-white font-bold text-[15px] bg-primary">Keluarahan</TableHead>
              <TableHead className="text-white font-bold text-[15px] bg-primary">Status DTKS</TableHead>
              <TableHead className="text-white font-bold text-[15px] bg-primary">Status</TableHead>
              <TableHead className="text-white font-bold text-[15px] bg-primary">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {indigencyCertificate?.data.length !== 0 ? (
              indigencyCertificate?.data.map((valsktm: any, i: any) => {
                const val = valsktm.peopleConcerned
                const status = valsktm.applicationStatus
                const color =
                  status === 'pending'
                    ? 'text-[#FFB60A] '
                    : status === 'approved'
                    ? 'text-green-500'
                    : status === 'rejected'
                    ? 'text-rose-500'
                    : status === 'processed'
                    ? 'text-cyan-500'
                    : ''
                return (
                  <TableRow key={i}>
                    <TableCell className="text-left bg-[#F9FAFC]">
                      {(indigencyCertificate.meta.currentPage - 1) * indigencyCertificate.meta.perPage + i + 1}
                    </TableCell>
                    <TableCell className="text-left bg-[#F9FAFC]">{val.name}</TableCell>
                    <TableCell className="text-left bg-[#F9FAFC]">{val.identityNumber}</TableCell>
                    <TableCell className="text-left bg-[#F9FAFC]">{val.address.areaLevel3.name}</TableCell>
                    <TableCell className="text-left bg-[#F9FAFC]">{val.address.areaLevel4.name}</TableCell>
                    <TableCell className="text-left bg-[#F9FAFC]" position="center">
                      <StatusDropdown
                        value={valsktm.dtksStatus ?? ''}
                        action={async (status: string) => await handleChangeStatusDTKS(status, valsktm.id)}
                      />
                    </TableCell>
                    <TableCell className={`text-left bg-[#F9FAFC] ${color} capitalize`} position="center">
                      {status}
                    </TableCell>
                    <TableCell
                      className="flex items-center justify-center text-left bg-[#F9FAFC] "
                      onClick={() => setIsShow(true)}
                    >
                      <Button className="py-6">
                        <p className="text-base font-bold pr-3">Action</p>
                        <HiOutlineExclamationCircle className="h-6 w-6" />
                      </Button>
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

        {(indigencyCertificate?.meta?.total as number) > 30 ? (
          <Pagination
            currentPage={page !== '' ? parseInt(page) : 1}
            totalCount={indigencyCertificate?.meta.total as number}
            pageSize={30}
            onPageChange={(page) => createParams({ key: 'page', value: page.toString() })}
          />
        ) : null}

        {/* <Modal isShow={isShow} className="md:max-w-3xl max-h-[calc(100vh-50px)] overflow-y-auto">
          <Modal.Header setIsShow={setIsShow} className="gap-1 flex flex-col">
            <h3 className="text-base font-bold leading-6 text-title md:text-2xl">Data Pengajuan</h3>
            <p className="text-sm text-[#A1A1A1]">Data Pengajuan BBP</p>
          </Modal.Header>
          <Form {...forms}>
            <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3 pb-5">
                <FormField
                  name="jadwalAwal"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white">NIK Pemohon</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="" disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="tahunNotifikasi"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white">NIK yang Bersangkutan</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="" disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="tahunAnggaran"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white">Sekolah/Universitas Tujuan</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="" disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="jumlahPeserta"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white">Jenjang Pendidikan</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="" disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="batch"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white">Bulan Pembuatan</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="" disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="jumlahPeserta"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white">Tahun Pembuatan</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="" disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="batch"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white">Jenis DTKS</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="" disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="jadwalAkhir"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white">Status DTKS</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="" disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full text-center bg-primary py-3">
                <p className="text-base font-bold text-white">Berkas </p>
              </div>
              <div className="flex justify-between w-full border-b-2 pb-6">
                <p className="text-base px-[10px]">SURAT PERMOHONAN</p>
                <Button className="w-[ h-[28px] rounded-md gap-2 mr-24 ">
                  <HiOutlineEye className="h-4 w-4" />
                  <p className="text-xs ">View</p>
                </Button>
              </div>
              <div className="flex justify-between w-full border-b-2 pb-6">
                <p className="text-base px-[10px]">SCAN FOTO COPY SURAT DOMISILI DARI KELURAHAN SETEMPAT</p>
                <Button className="w-[ h-[28px] rounded-md gap-2 mr-24 ">
                  <HiOutlineEye className="h-4 w-4" />
                  <p className="text-xs ">View</p>
                </Button>
              </div>
              <div className="flex justify-between w-full border-b-2 pb-6">
                <p className="text-base px-[10px]">KARTU KELUARGA</p>
                <Button className="w-[ h-[28px] rounded-md gap-2 mr-24 ">
                  <HiOutlineEye className="h-4 w-4" />
                  <p className="text-xs ">View</p>
                </Button>
              </div>
              <div className="flex justify-between w-full border-b-2 pb-6">
                <p className="text-base px-[10px]">KTP</p>
                <Button className="w-[ h-[28px] rounded-md gap-2 mr-24 ">
                  <HiOutlineEye className="h-4 w-4" />
                  <p className="text-xs ">View</p>
                </Button>
              </div>
              <div className="flex justify-between w-full border-b-2 pb-6">
                <p className="text-base px-[10px]">
                  SURAT KETERANGAN DARI SEKOLAH/SURAT PENGUMUMAN DARI PIHAK UNIVERSITAS
                </p>
                <Button className="w-[ h-[28px] rounded-md gap-2 mr-24 ">
                  <HiOutlineEye className="h-4 w-4" />
                  <p className="text-xs ">View</p>
                </Button>
              </div>
              <FormField
                name="jenisEvent"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Status Pengajuan</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="m@example.com">Krisna Asu</SelectItem>
                          <SelectItem value="m@google.com">Krisna Cuki</SelectItem>
                          <SelectItem value="m@support.com">The Little Krishna</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="jumlahPeserta"
                control={forms.control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="font-semibold dark:text-white">Keterangan</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Masukkan Keterangan" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <Modal.Footer>
            <Button
              variant="cancel"
              className="rounded-lg text-[#898989] bg-[#E4E4E4]"
              onClick={() => setIsShow(false)}
            >
              Cancel
            </Button>
            <Button className="rounded-lg" type="submit" onClick={showAlert}>
              <p className="text-white font-bold">Update</p>
            </Button>
          </Modal.Footer>
        </Modal> */}
      </section>
    </Container>
  )
}
