import ContainerUser from '@/components/organisms/landingPage/ContainerUser'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { HiDocumentArrowUp, HiMagnifyingGlass, HiPaperAirplane } from 'react-icons/hi2'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from '@/components/ui/select'
import DropZone, { type FileWithPreview } from '../../../components/atoms/DropZone'
import DatePicker from './../../../components/atoms/DatePicker'
import {
  useCreatePublicEventTuition,
  useGetAssistanceCheck,
  useGetBank,
  useGetKecamatan,
  useGetKelurahan,
  useGetPublicEventTuition,
  useGetStudyPrograms,
  useGetUniversities
} from '@/store/server'
import { Loading } from '@/components'
import * as React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  publicEventTuitionValidation,
  type publicEventTuitionFields
} from '@/lib/validations/landingPage/public.validation'
import { yupResolver } from '@hookform/resolvers/yup'
import { formatDateToString } from '@/lib/services/formatDate'

export default function BbpRegister() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [details, setDetails] = React.useState('')

  const forms = useForm<publicEventTuitionFields>({
    mode: 'onTouched',
    resolver: yupResolver(publicEventTuitionValidation)
  })

  const areaLevel3 = forms.watch('areaLevel3')
  const university = forms.watch('universityId')
  const studyProgram = forms.watch('studyProgramId')
  const bank = forms.watch('bank')
  const identityNumber = forms.watch('identityNumber')

  const { data, isLoading, isSuccess } = useGetPublicEventTuition()
  const { mutate: create, isLoading: isLoadingCreate } = useCreatePublicEventTuition()
  const { data: assistance, isLoading: isLoadingAssistance, refetch } = useGetAssistanceCheck(identityNumber, false)

  const { data: kecamatanLists } = useGetKecamatan()
  const { data: kelurahanLists } = useGetKelurahan(areaLevel3)

  const { data: bankLists } = useGetBank()
  const { data: universities } = useGetUniversities()
  const { data: studyPrograms } = useGetStudyPrograms(university)

  React.useEffect(() => {
    if (assistance) {
      forms.setValue('name', assistance.name)
      forms.setValue('address', assistance.address.fullAddress)
      forms.setValue('areaLevel3', assistance.address.areaLevel3?.id as string)
      forms.setValue('areaLevel4', assistance.address.areaLevel4?.id as string)
    }
  }, [assistance])

  React.useEffect(() => {
    if (id) {
      setDetails(data?.find((item) => item.id === id)?.batch as string)
    } else {
      setDetails(data?.[0]?.batch as string)
    }
  }, [isSuccess, id])

  React.useEffect(() => {
    if (bank) {
      forms.setValue('bankAccountName', bankLists?.find((item) => item.id === bank)?.name as string)
    }
    if (studyProgram) {
      forms.setValue('studyProgramName', studyPrograms?.find((item) => item.id === studyProgram)?.name as string)
    }
    if (university) {
      forms.setValue('universityName', universities?.find((item) => item.id === university)?.name as string)
    }
  }, [bank, studyProgram, university])

  const onSubmit = async (values: publicEventTuitionFields) => {
    const newData = {
      ...values,
      birthDate: formatDateToString(values.birthDate as Date),
      event: id as string
    }

    console.log(formatDateToString(values.birthDate as Date), newData)
    create(newData, {
      onSuccess: () => {
        forms.reset()
        navigate('/')
      }
    })
  }

  console.log(forms.formState.errors)

  if (isLoading) return <Loading />

  return (
    <ContainerUser title={`Form Pengajuan Bantuan Biaya Pendidikan ${details}`}>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6 pt-16">
          <p className="text-[20px] font-semibold mt-5">Informasi Pribadi</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="flex">
              <div className="w-full">
                <FormField
                  name="identityNumber"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold dark:text-white">NIK</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-md rounded-r-none"
                          type="number"
                          placeholder="Cari NIK"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-end">
                <Button
                  type="button"
                  className="rounded-md rounded-l-none"
                  onClick={async () => await refetch()}
                  loading={isLoadingAssistance}
                >
                  <HiMagnifyingGlass className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <FormField
              name="name"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Nama</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      value={field.value}
                      className="rounded-md"
                      placeholder="Masukkan Nama Anda"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="birthPlace"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Tempat Lahir</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      value={field.value}
                      className="rounded-md"
                      placeholder="Masukkan Tempat Lahir "
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <FormField
              name="birthDate"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tanggal Lahir</FormLabel>
                  <DatePicker
                    selected={field.value as Date}
                    onChange={field.onChange}
                    placeholder="dd/mm/yyy"
                    className="rounded-md"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="gender"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Jenis Kelamin</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="rounded-md">
                        <SelectValue placeholder="Pilih Jenis Kelamin" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="LAKI-LAKI">Laki-laki</SelectItem>
                      <SelectItem value="PEREMPUAN">Perempuan</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      className="rounded-md"
                      type="text"
                      placeholder="Masukan Email"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <FormField
              name="phoneNumber"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">No. Hp</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      className="rounded-md"
                      type="number"
                      placeholder="Masukan No.Hp"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="areaLevel3"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Kecamatan</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-md">
                          <SelectValue placeholder="Pilih Kecamatan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {kecamatanLists?.map((kecamatan) => (
                          <SelectItem key={kecamatan.id} value={kecamatan.id}>
                            {kecamatan.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="areaLevel4"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Kelurahan</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value} disabled={!areaLevel3 || !kelurahanLists}>
                    <FormControl>
                      <SelectTrigger className="rounded-md">
                        <SelectValue placeholder="Pilih Kelurahan" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {kelurahanLists?.map((kelurahan) => (
                        <SelectItem key={kelurahan.id} value={kelurahan.id}>
                          {kelurahan.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 gap-5">
            <FormField
              name="address"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Alamat Lengkap</FormLabel>
                  <FormControl>
                    <Textarea {...field} value={field.value ?? ''} placeholder="Masukan Alamat Lengkap Anda" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <p className="font-semibold text-[20px] mt-5">Akademis</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormField
              name="universityId"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Perguruan Tinggi</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="rounded-md">
                        <SelectValue placeholder="Pilih Perguruan Tinggi" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {universities?.map((university) => (
                        <SelectItem key={university.id} value={university.id}>
                          {university.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              name="studyProgramId"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Prodi</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value} disabled={!university || !studyPrograms}>
                      <FormControl>
                        <SelectTrigger className="rounded-md">
                          <SelectValue placeholder="Pilih Prodi" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {studyPrograms?.map((studyProgram) => (
                          <SelectItem key={studyProgram.id} value={studyProgram.id}>
                            {studyProgram.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormField
              name="gpa"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">IPK</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      className="rounded-md"
                      type="text"
                      placeholder="Masukan IPK"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="semester"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Semester</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      className="rounded-md"
                      type="number"
                      placeholder="Masukan Semester"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="tuitionFee"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">UKT</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value} className="rounded-md" type="number" placeholder="Rp. " />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <p className="font-semibold text-[20px] mt-5">Rekening</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormField
              name="bank"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Nama Bank</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="rounded-md">
                        <SelectValue placeholder="Pilih Nama Bank" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {bankLists?.map((bank) => (
                        <SelectItem key={bank.id} value={bank.id}>
                          {bank.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              name="bankAccountNumber"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">No Rekening</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      className="rounded-md"
                      type="number"
                      placeholder="Masukan No Rekening"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <p className="text-[12px] text-primary font-medium">
            *Catatan: File yang diizinkan berupa jpg, png atau pdf. Dengan maksimal 2MB
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2  gap-12 mt-5">
            <FormField
              name="applicationLetter"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-md">Scan Surat Permohonan</FormLabel>
                  <FormControl className="w-[522px]">
                    <DropZone
                      setValue={field.onChange}
                      fileValue={field.value as unknown as FileWithPreview[]}
                      helperText="*Catatan: File yang diizinkan berupa jpg, png atau pdf. Dengan maksimal 2MB"
                      accept={{ 'application/pdf': ['.pdf'] }}
                      maxFiles={1}
                      id="applicationLetter"
                      Icon={HiDocumentArrowUp}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="photo"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-md">Pass Foto</FormLabel>
                  <FormControl className="w-[522px]">
                    <DropZone
                      setValue={field.onChange}
                      fileValue={field.value as unknown as FileWithPreview[]}
                      helperText="*Catatan: File yang diizinkan berupa jpg, png atau pdf. Dengan maksimal 2MB"
                      accept={{ 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'] }}
                      maxFiles={1}
                      id="photo"
                      Icon={HiDocumentArrowUp}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="familyCard"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-md">Scan Kartu Keluarga</FormLabel>
                  <FormControl className="w-[522px]">
                    <DropZone
                      setValue={field.onChange}
                      fileValue={field.value as unknown as FileWithPreview[]}
                      helperText="*Catatan: File yang diizinkan berupa jpg, png atau pdf. Dengan maksimal 2MB"
                      accept={{ 'application/pdf': ['.pdf'] }}
                      maxFiles={1}
                      id="familyCard"
                      Icon={HiDocumentArrowUp}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="identityCard"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-md">KTP</FormLabel>
                  <FormControl className="w-[522px]">
                    <DropZone
                      setValue={field.onChange}
                      fileValue={field.value as unknown as FileWithPreview[]}
                      helperText="*Catatan: File yang diizinkan berupa jpg, png atau pdf. Dengan maksimal 2MB"
                      accept={{ 'application/pdf': ['.pdf'] }}
                      maxFiles={1}
                      id="identityCard"
                      Icon={HiDocumentArrowUp}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="studentCard"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-md">KTM</FormLabel>
                  <FormControl className="w-[522px]">
                    <DropZone
                      setValue={field.onChange}
                      fileValue={field.value as unknown as FileWithPreview[]}
                      helperText="*Catatan: File yang diizinkan berupa jpg, png atau pdf. Dengan maksimal 2MB"
                      accept={{ 'application/pdf': ['.pdf'] }}
                      maxFiles={1}
                      id="studentCard"
                      Icon={HiDocumentArrowUp}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="activeStudentCertificate"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-md">Surat Aktif Kuliah</FormLabel>
                  <FormControl className="w-[522px]">
                    <DropZone
                      setValue={field.onChange}
                      fileValue={field.value as unknown as FileWithPreview[]}
                      helperText="*Catatan: File yang diizinkan berupa jpg, png atau pdf. Dengan maksimal 2MB"
                      accept={{ 'application/pdf': ['.pdf'] }}
                      maxFiles={1}
                      id="activeStudentCertificate"
                      Icon={HiDocumentArrowUp}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="dtksPrintout"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-md">Scan Printout DTKS/PRELIST</FormLabel>
                  <FormControl className="w-[522px]">
                    <DropZone
                      setValue={field.onChange}
                      fileValue={field.value as unknown as FileWithPreview[]}
                      helperText="*Catatan: File yang diizinkan berupa jpg, png atau pdf. Dengan maksimal 2MB"
                      accept={{ 'application/pdf': ['.pdf'] }}
                      maxFiles={1}
                      id="dtksPrintout"
                      Icon={HiDocumentArrowUp}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="noScholarshipStatement"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-md">Surat Pernyataan Tidak Mendapatkan Mahasiswa</FormLabel>
                  <FormControl className="w-[522px]">
                    <DropZone
                      setValue={field.onChange}
                      fileValue={field.value as unknown as FileWithPreview[]}
                      helperText="*Catatan: File yang diizinkan berupa jpg, png atau pdf. Dengan maksimal 2MB"
                      accept={{ 'application/pdf': ['.pdf'] }}
                      maxFiles={1}
                      id="noScholarshipStatement"
                      Icon={HiDocumentArrowUp}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="noGovernmentEmployeeStatement"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-md">Surat Pernyataan Bukan ASN</FormLabel>
                  <FormControl className="w-[522px]">
                    <DropZone
                      setValue={field.onChange}
                      fileValue={field.value as unknown as FileWithPreview[]}
                      helperText="*Catatan: File yang diizinkan berupa jpg, png atau pdf. Dengan maksimal 2MB"
                      accept={{ 'application/pdf': ['.pdf'] }}
                      maxFiles={1}
                      id="noGovernmentEmployeeStatement"
                      Icon={HiDocumentArrowUp}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="gradeTranscript"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-md">Transkrip Nilai (Legalisir)</FormLabel>
                  <FormControl className="w-[522px]">
                    <DropZone
                      setValue={field.onChange}
                      fileValue={field.value as unknown as FileWithPreview[]}
                      helperText="*Catatan: File yang diizinkan berupa jpg, png atau pdf. Dengan maksimal 2MB"
                      accept={{ 'application/pdf': ['.pdf'] }}
                      maxFiles={1}
                      id="gradeTranscript"
                      Icon={HiDocumentArrowUp}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="passBook"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-md">Scan Buku Tabungan</FormLabel>
                  <FormControl className="w-[522px]">
                    <DropZone
                      setValue={field.onChange}
                      fileValue={field.value as unknown as FileWithPreview[]}
                      helperText="*Catatan: File yang diizinkan berupa jpg, png atau pdf. Dengan maksimal 2MB"
                      accept={{ 'application/pdf': ['.pdf'] }}
                      maxFiles={1}
                      id="passBook"
                      Icon={HiDocumentArrowUp}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="tuitionReceipt"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-md">Bukti Pembayaran UKT Terakhir</FormLabel>
                  <FormControl className="w-[522px]">
                    <DropZone
                      setValue={field.onChange}
                      fileValue={field.value as unknown as FileWithPreview[]}
                      helperText="*Catatan: File yang diizinkan berupa jpg, png atau pdf. Dengan maksimal 2MB"
                      accept={{ 'application/pdf': ['.pdf'] }}
                      maxFiles={1}
                      id="tuitionReceipt"
                      Icon={HiDocumentArrowUp}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end gap-7 items-center pt-10">
            <Button variant="outline" className="border-primary text-primary px-8 py-6 rounded-lg" type="button">
              <p className="text-base font-semibold">Kembali</p>
            </Button>
            <Button className="px-8 py-6 rounded-lg items-center gap-3" loading={isLoadingCreate} type="submit">
              <p className="text-base font-semibold">Kirim Pengajuan</p>
              <HiPaperAirplane className="w-5 h-5" />
            </Button>
          </div>
        </form>
      </Form>
    </ContainerUser>
  )
}
