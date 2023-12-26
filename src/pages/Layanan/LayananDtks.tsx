import { Berkas, Container, Loading, Modal, Pagination, Search } from '@/components'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { HiOutlineArrowPath, HiOutlineExclamationCircle } from 'react-icons/hi2'
import FilterLayanan from './../../components/atoms/FilterLayanan'
import { useCreateParams, useDeleteParams, useGetParams, useTitle } from '@/hooks'
import { useTitleHeader } from '@/store/client'
import { useGetDTKSApplication, useGetDTKSApplicationById, useUpdateDTKSApplication } from '@/store/server/useService'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const dataLayanan = [
  { text: 'Data Pending', tab: 'pending' },
  { text: 'Data Diterima', tab: 'approved' }
]

interface FormValues {
  name: string
  identityNumber: string
  familyCardNumber: string
  birthDate: string
  motherName: string
  gender: string
  occupation: string
  martialStatus: string
  areaLevel3: string
  areaLevel4: string
  address: string
  question1: string
  question2: string
  question3: string
  question4: string
  question5: string
  question6: string
  question7: string
  question8: string
  question9: string
  question10: string
  assistanceProgram: string
  disabilityStatus: string
  pregnantDate: string
  remoteIndigenousStatus: string
  tribeName: string
  status: string
}

export default function LayananDtks() {
  useTitle('Data Terpadu Kesejahteraan Sosial (DTKS)')
  const setBreadcrumbs = useTitleHeader((state) => state.setBreadcrumbs)

  React.useEffect(() => {
    setBreadcrumbs([
      { url: '/layanan', label: 'Layanan' },
      { url: '/layanan/layanan-dtks', label: 'DTKS' }
    ])
  }, [])

  const createParams = useCreateParams()
  const deleteParams = useDeleteParams()
  const { page, tab, search } = useGetParams(['page', 'tab', 'search'])

  const [isShow, setIsShow] = React.useState(false)
  const [dtksId, setDtksId] = React.useState('')

  const { data, isFetching, refetch } = useGetDTKSApplication(parseInt(page) || 1, tab === 'approved', search)
  const { mutate: update, isLoading: isLoadingUpdate } = useUpdateDTKSApplication()
  const { data: detail, isLoading, isSuccess } = useGetDTKSApplicationById(dtksId)

  const forms = useForm<{ search: string }>()
  const formsUpdate = useForm<FormValues>()

  React.useEffect(() => {
    if (isSuccess) {
      formsUpdate.reset({
        status: detail.isApproved ? 'true' : 'false',
        name: detail.beneficiary.name,
        identityNumber: detail.beneficiary.identityNumber,
        familyCardNumber: detail.beneficiary.familyCardNumber,
        birthDate: detail.beneficiary.birthDate,
        motherName: detail.beneficiary.motherName,
        gender: detail.beneficiary.gender,
        occupation: detail.beneficiary.occupation,
        martialStatus: detail.beneficiary.maritalStatus as string,
        areaLevel3: detail.beneficiary.address.areaLevel3?.name,
        areaLevel4: detail.beneficiary.address.areaLevel4?.name,
        address: detail.beneficiary.address.fullAddress,
        question1: detail.question1 ? 'Ya' : 'Tidak',
        question2: detail.question2 ? 'Ya' : 'Tidak',
        question3: detail.question3 ? 'Ya' : 'Tidak',
        question4: detail.question4 ? 'Ya' : 'Tidak',
        question5: detail.question5 ? 'Ya' : 'Tidak',
        question6: detail.question6 ? 'Ya' : 'Tidak',
        question7: detail.question7 ? 'Ya' : 'Tidak',
        question8: detail.question8 ? 'Ya' : 'Tidak',
        question9: detail.question9 ? 'Ya' : 'Tidak',
        question10: detail.question10 ? 'Ya' : 'Tidak',
        assistanceProgram: detail.assistanceProgram,
        disabilityStatus: detail.disabilityStatus,
        pregnantDate: detail.pregnantDate,
        remoteIndigenousStatus: detail.remoteIndigenousStatus ? 'Ya' : 'Tidak',
        tribeName: detail.tribeName
      })
    }
  }, [isSuccess])

  const onSearch = async (values: { search: string }) => {
    createParams({ key: 'search', value: values.search })
    await refetch()
  }

  const handleReset = () => {
    forms.reset({ search: '' })
    deleteParams('search')
  }

  const onSubmit = async (values: FormValues) => {
    const newData = { id: dtksId, fields: { status: values.status === 'true' } }
    update(newData, { onSuccess: () => setIsShow(false) })
  }

  return (
    <Container>
      {isFetching && <Loading />}
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSearch)} className="flex gap-4">
          <div className="w-full">
            <FormField
              name="search"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Search
                      value={field.value ?? ''}
                      onChange={field.onChange}
                      placeholder="Masukkan Nama / NIK"
                      className="w-full"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          {search && (
            <Button type="button" className="gap-3" onClick={handleReset}>
              <HiOutlineArrowPath className="text-xl" />
              <span>Reset</span>
            </Button>
          )}
        </form>
      </Form>
      <FilterLayanan jenis={'layanan-dtks'} data={dataLayanan} />

      <section className="border rounded-xl mt-5 overflow-hidden">
        <Table>
          <TableHeader className="bg-[#FFFFFF]">
            <TableRow>
              <TableHead className="text-white font-bold text-[15px] bg-primary">No</TableHead>
              <TableHead className="text-white font-bold text-[15px] bg-primary">NIK</TableHead>
              <TableHead className="text-white font-bold text-[15px] bg-primary">No. KK</TableHead>
              <TableHead className="text-white font-bold text-[15px] bg-primary">Nama</TableHead>
              <TableHead className="text-white font-bold text-[15px] bg-primary">Kecamatan</TableHead>
              <TableHead className="text-white font-bold text-[15px] bg-primary">Kelurahan</TableHead>
              <TableHead className="text-white font-bold text-[15px] bg-primary">Program Bansos</TableHead>
              <TableHead className="text-white font-bold text-[15px] bg-primary">Status</TableHead>
              <TableHead className="text-white font-bold text-[15px] bg-primary">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data.length !== 0 ? (
              data?.data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="bg-[#F9FAFC]">
                    {(data.meta.currentPage - 1) * data.meta.perPage + index + 1}
                  </TableCell>
                  <TableCell className="bg-[#F9FAFC]">{item.beneficiary.identityNumber}</TableCell>
                  <TableCell className="bg-[#F9FAFC]">{item.beneficiary.familyCardNumber}</TableCell>
                  <TableCell className="bg-[#F9FAFC]">{item.beneficiary.name}</TableCell>
                  <TableCell className="bg-[#F9FAFC]">{item.beneficiary.address.areaLevel3?.name}</TableCell>
                  <TableCell className="bg-[#F9FAFC]">{item.beneficiary.address.areaLevel4?.name}</TableCell>
                  <TableCell className="bg-[#F9FAFC]" position="center">
                    {item.assistanceProgram}
                  </TableCell>
                  <TableCell
                    className={cn('bg-[#F9FAFC]', item.isApproved ? 'text-green-500' : 'text-yellow-500')}
                    position="center"
                  >
                    {item.isApproved ? 'Approved' : 'Pending'}
                  </TableCell>
                  <TableCell className="flex items-center justify-center text-left bg-[#F9FAFC]">
                    <Button
                      className="py-6"
                      onClick={() => {
                        setIsShow(true)
                        setDtksId(item.id)
                      }}
                    >
                      <HiOutlineExclamationCircle className="h-6 w-6" />
                    </Button>
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
        {(data?.meta?.total as number) > 30 ? (
          <Pagination
            currentPage={page !== '' ? parseInt(page) : 1}
            totalCount={data?.meta.total as number}
            pageSize={30}
            onPageChange={(page) => createParams({ key: 'page', value: page.toString() })}
          />
        ) : null}
        <Modal isShow={isShow} className="md:max-w-3xl max-h-[calc(100vh-50px)] overflow-y-auto" isLoading={isLoading}>
          <Modal.Header setIsShow={setIsShow} className="gap-1 flex flex-col">
            <h3 className="text-base font-bold leading-6 text-title md:text-2xl">Data Pengajuan DTKS</h3>
            <p className="text-sm text-[#A1A1A1]">Data Pengajuan DTKS</p>
          </Modal.Header>
          <Form {...formsUpdate}>
            <form onSubmit={formsUpdate.handleSubmit(onSubmit)} className="flex flex-col gap-3">
              <p className="text-2xl font-bold text-center pb-2">Data Individu</p>
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  name="name"
                  control={formsUpdate.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white">Nama</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value ?? ''} disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="identityNumber"
                  control={formsUpdate.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white">NIK</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value ?? ''} disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="familyCardNumber"
                  control={formsUpdate.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white">No. KK</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value ?? ''} disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="birthDate"
                  control={formsUpdate.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white">Tanggal Lahir</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value ?? ''} disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="motherName"
                  control={formsUpdate.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white">Nama Ibu Kandung</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value ?? ''} disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="gender"
                  control={formsUpdate.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white">Jenis Kelamin</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value ?? ''} disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="martialStatus"
                  control={formsUpdate.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white">Status Pernikahan</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value ?? ''} disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="areaLevel3"
                  control={formsUpdate.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white">Kecamatan</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value ?? ''} disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="areaLevel4"
                  control={formsUpdate.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white">Kelurahan</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value ?? ''} disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                name="address"
                control={formsUpdate.control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="font-semibold dark:text-white">Alamat Lengkap</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} disabled />
                    </FormControl>
                  </FormItem>
                )}
              />
              <p className="text-2xl font-bold text-center py-3">Survey Kriteria</p>
              <div className="grid grid-cols-2 gap-x-12 gap-y-3">
                <FormField
                  name="question1"
                  control={formsUpdate.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold text-base dark:text-white">
                        1. Apakah Memiliki Tempat Berteduh Tetap Sehari-Hari ?
                      </FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value ?? ''} disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="question2"
                  control={formsUpdate.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold text-base dark:text-white">
                        2. Apakah target Survey Tinggal Bersama Anggota Keluarga ?
                      </FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value ?? ''} disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="question3"
                  control={formsUpdate.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold text-base dark:text-white">
                        3. Apakah Kepala Keluarga Atau Pengurus Keluarga Masih Bekerja ?
                      </FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value ?? ''} disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="question4"
                  control={formsUpdate.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold text-base dark:text-white">
                        4. Apakah Pernah Khawatir Atau Pernah Tidak Makan Dalam Setahun Terakhir ?
                      </FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value ?? ''} disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="question5"
                  control={formsUpdate.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold text-base dark:text-white">
                        5. Apakah Pengeluaran Pangan Lebih Besar (&gt;70) Dari Total Pengeluaran ?
                      </FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value ?? ''} disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="question6"
                  control={formsUpdate.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white text-base">
                        6. Apakah Ada Pengeluaran Untuk Pakaian Selama 1 (Satu) Tahun Terakhir
                      </FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value ?? ''} disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="question7"
                  control={formsUpdate.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white text-base">
                        7. Apakah Tempat Tinggal Sebagaian Besar Berlantai Tanah dan/Atau Plasteran ?
                      </FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value ?? ''} disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="question8"
                  control={formsUpdate.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white text-base">
                        8. Apakah Tempat Tinggal Sebagai Besar Berdinding Batu/Kawat/Kayu ?
                      </FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value ?? ''} disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="question9"
                  control={formsUpdate.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white text-base">
                        9. Apakah Tempat Tinggal Memiliki Fasilitas Buang Air Kecil/Besar Sendiri ?
                      </FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value ?? ''} disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="question10"
                  control={formsUpdate.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white text-base">
                        10. Apakah Sumber Penerangan Berasal Dari Listrik PLN 450 Watt Atau Bukan Listrik ?
                      </FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value ?? ''} disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <p className="text-2xl font-bold text-center py-5">Survey Kriteria</p>
              <div className="grid grid-cols-2 gap-4 pb-5">
                <FormField
                  name="assistanceProgram"
                  control={formsUpdate.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white text-base">Program Bansos</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value ?? ''} disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="disabilityStatus"
                  control={formsUpdate.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white text-base">Status Disabilitas </FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value ?? ''} disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="pregnantDate"
                  control={formsUpdate.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white text-base">Tanggal Hamil </FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value ?? ''} disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="remoteIndigenousStatus"
                  control={formsUpdate.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white text-base">Status Adat Terpencil </FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value ?? ''} disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="tribeName"
                  control={formsUpdate.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white text-base">Nama Suku </FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value ?? ''} disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full text-center bg-primary py-3">
                <p className="text-base font-bold text-white">Berkas </p>
              </div>
              <Berkas title="KTP/KARTU KELUARGA" url={detail?.indentityPath?.url as string} />
              <Berkas title="FOTO RUMAH" url={detail?.housePath?.url as string} />
              <FormField
                name="status"
                control={formsUpdate.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Status Pengajuan</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="true">Approved</SelectItem>
                        <SelectItem value="false">pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <Modal.Footer className="mt-5">
                <Button
                  variant="cancel"
                  className="rounded-lg text-[#898989] bg-[#E4E4E4]"
                  onClick={() => setIsShow(false)}
                  type="button"
                >
                  Cancel
                </Button>
                <Button className="rounded-lg" type="submit" loading={isLoadingUpdate}>
                  <p className="text-white font-bold">Update</p>
                </Button>
              </Modal.Footer>
            </form>
          </Form>
        </Modal>
      </section>
    </Container>
  )
}
