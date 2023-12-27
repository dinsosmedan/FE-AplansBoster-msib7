import ContainerUser from '@/components/organisms/landingPage/ContainerUser'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { HiDocumentArrowUp, HiMagnifyingGlass, HiPaperAirplane } from 'react-icons/hi2'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from '@/components/ui/select'
import DropZone, { type FileWithPreview } from '../../../components/atoms/DropZone'
import DatePicker from './../../../components/atoms/DatePicker'
import {
  useCreatePublicEventTuition,
  useGetBank,
  useGetIdentityCheck,
  useGetKecamatan,
  useGetKelurahan,
  useGetPublicEventTuition,
  useGetStudyPrograms,
  useGetTuitionApplicationPublicDetail,
  useGetUniversities,
  useUpdatePublicEventTuition
} from '@/store/server'
import { Loading, SearchSelect } from '@/components'
import * as React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  publicEventTuitionValidation,
  type publicEventTuitionFields
} from '@/lib/validations/landingPage/public.validation'
import { yupResolver } from '@hookform/resolvers/yup'
import { formatDateToString, formatStringToDate } from '@/lib/services/formatDate'

interface BbpParams {
  id?: string
  bbpId?: string
  [key: string]: string | undefined
}

export default function BbpRegister() {
  const navigate = useNavigate()

  const { id, bbpId } = useParams<BbpParams>()
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
  const { data: assistance, isLoading: isLoadingAssistance, refetch } = useGetIdentityCheck(identityNumber, false)

  const { mutate: create, isLoading: isLoadingCreate } = useCreatePublicEventTuition()
  const { mutate: update, isLoading: isLoadingUpdate } = useUpdatePublicEventTuition()

  const {
    data: detailShow,
    isLoading: isLoadingDetail,
    isSuccess: isSuccessDetail
  } = useGetTuitionApplicationPublicDetail(bbpId)

  const { data: kecamatanLists } = useGetKecamatan()
  const { data: kelurahanLists } = useGetKelurahan(areaLevel3)

  const { data: bankLists } = useGetBank()
  const { data: universities } = useGetUniversities()
  const { data: studyPrograms } = useGetStudyPrograms(university)

  React.useEffect(() => {
    if (isSuccessDetail) {
      forms.setValue('identityNumber', detailShow.beneficiary?.identityNumber)
      forms.setValue('name', detailShow.beneficiary?.name)
      forms.setValue('birthPlace', detailShow.beneficiary?.birthPlace)
      if (detailShow.beneficiary?.birthDate) {
        forms.setValue('birthDate', formatStringToDate(detailShow.beneficiary?.birthDate))
      }
      forms.setValue('address', detailShow.beneficiary?.address?.fullAddress)
      forms.setValue('areaLevel3', detailShow.beneficiary?.address?.areaLevel3?.id as string)
      forms.setValue('areaLevel4', detailShow.beneficiary?.address?.areaLevel4?.id as string)
      forms.setValue('gender', detailShow.beneficiary?.gender)
      forms.setValue('email', detailShow.email)
      forms.setValue('phoneNumber', detailShow.phoneNumber)
      forms.setValue('universityId', detailShow.university.id)
      forms.setValue('universityName', detailShow.university.name)
      forms.setValue('studyProgramId', detailShow.studyProgram.id)
      forms.setValue('studyProgramName', detailShow.studyProgram.name)
      forms.setValue('gpa', detailShow.gpa)
      forms.setValue('semester', detailShow.semester)
      forms.setValue('tuitionFee', detailShow.tuitionFee)
      forms.setValue('bank', detailShow.bank.id)
      forms.setValue('bankAccountName', detailShow.bank.name)
      forms.setValue('bankAccountNumber', detailShow.bankAccNumber)
      if (detailShow.documents.applicationLetter?.originalName) {
        forms.setValue('applicationLetter', [detailShow.documents.applicationLetter.originalName])
      }

      if (detailShow.documents.photo?.originalName) {
        forms.setValue('photo', [detailShow.documents.photo.originalName])
      }

      if (detailShow.documents.familyCard?.originalName) {
        forms.setValue('familyCard', [detailShow.documents.familyCard.originalName])
      }

      if (detailShow.documents.identityCard?.originalName) {
        forms.setValue('identityCard', [detailShow.documents.identityCard.originalName])
      }

      if (detailShow.documents.studentCard?.originalName) {
        forms.setValue('studentCard', [detailShow.documents.studentCard.originalName])
      }

      if (detailShow.documents.activeStudentCertificate?.originalName) {
        forms.setValue('activeStudentCertificate', [detailShow.documents.activeStudentCertificate.originalName])
      }

      if (detailShow.documents.dtksPrintout?.originalName) {
        forms.setValue('dtksPrintout', [detailShow.documents.dtksPrintout.originalName])
      }

      if (detailShow.documents.noScholarshipStatement?.originalName) {
        forms.setValue('noScholarshipStatement', [detailShow.documents.noScholarshipStatement.originalName])
      }

      if (detailShow.documents.noGovernmentEmployeeStatement?.originalName) {
        forms.setValue('noGovernmentEmployeeStatement', [
          detailShow.documents.noGovernmentEmployeeStatement.originalName
        ])
      }

      if (detailShow.documents.gradeTranscript?.originalName) {
        forms.setValue('gradeTranscript', [detailShow.documents.gradeTranscript.originalName])
      }

      if (detailShow.documents.passBook?.originalName) {
        forms.setValue('passBook', [detailShow.documents.passBook.originalName])
      }

      if (detailShow.documents.tuitionReceipt?.originalName) {
        forms.setValue('tuitionReceipt', [detailShow.documents.tuitionReceipt.originalName])
      }

      if (detailShow.documents.biodata?.originalName) {
        forms.setValue('biodata', [detailShow.documents.biodata.originalName])
      }
    }
  }, [isSuccessDetail, forms])

  React.useEffect(() => {
    if (assistance) {
      forms.setValue('name', assistance?.name)
      forms.setValue('birthPlace', assistance.birthPlace)
      forms.setValue('address', assistance?.address?.fullAddress)
      forms.setValue('areaLevel3', assistance?.address?.areaLevel3?.id as string)
      forms.setValue('areaLevel4', assistance?.address?.areaLevel4?.id as string)
      forms.setValue('birthDate', formatStringToDate(assistance?.birthDate))
      forms.setValue('gender', assistance.gender)
    }
  }, [assistance, forms])

  React.useEffect(() => {
    if (bank && !isSuccessDetail) {
      forms.setValue('bankAccountName', bankLists?.find((item) => item.id === bank)?.name as string)
    }
    if (university && !isSuccessDetail) {
      forms.setValue('universityName', universities?.find((item) => item.id === university)?.name as string)
    }
    if (studyProgram && !isSuccessDetail) {
      forms.setValue('studyProgramName', studyPrograms?.find((item) => item.id === studyProgram)?.name as string)
    }
  }, [bank, studyProgram, university, forms, isSuccessDetail])

  React.useEffect(() => {
    if (id) {
      setDetails(data?.find((item) => item.id === id)?.batch as string)
    } else {
      setDetails(data?.[0]?.batch as string)
    }
  }, [isSuccess, id])

  const onSubmit = async (values: publicEventTuitionFields) => {
    if (!bbpId) {
      const newData = {
        ...values,
        birthDate: formatDateToString(values.birthDate as Date),
        event: id as string
      }

      create(newData, {
        onSuccess: () => {
          forms.reset()
          navigate(`/user/bbp/${id}`)
        }
      })
      return
    }

    const newData = {
      ...values,
      birthDate: formatDateToString(values.birthDate as Date),
      event: bbpId
    }

    update(
      { id: bbpId, fields: newData },
      {
        onSuccess: () => {
          forms.reset()
          navigate('/user/bbp')
        }
      }
    )
  }

  if (isLoading || isLoadingDetail) return <Loading />

  return (
    <ContainerUser title={`Form Pengajuan Bantuan Biaya Pendidikan ${details}`}>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6 pt-5">
          <p className="text-[18px] font-semibold mt-5">Informasi Pribadi</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="flex">
              <div className="w-full">
                <FormField
                  name="identityNumber"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold dark:text-white">NIK</FormLabel>
                      <div className="flex items-center">
                        <FormControl>
                          <Input
                            {...field}
                            value={field.value ?? ''}
                            className="focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-md rounded-r-none"
                            type="number"
                            placeholder="Cari NIK"
                          />
                        </FormControl>
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                      value={field.value ?? ''}
                      className="rounded-md"
                      placeholder="Masukkan Nama Anda"
                    />
                  </FormControl>
                  <FormMessage />
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
                      value={field.value ?? ''}
                      className="rounded-md"
                      placeholder="Masukkan Tempat Lahir "
                    />
                  </FormControl>
                  <FormMessage />
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
                  <FormControl>
                    <DatePicker
                      selected={field.value as Date}
                      onChange={field.onChange}
                      placeholder="dd/mm/yyy"
                      className="rounded-md"
                    />
                  </FormControl>
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
                  <FormMessage />
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
                  <FormMessage />
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
                  <FormMessage />
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
                    <SearchSelect
                      selected={field.value}
                      onChange={field.onChange}
                      width="md:w-[300px] lg:w-[700px]"
                      className="rounded-md"
                      placeholder="Pilih Kecamatan"
                      options={
                        kecamatanLists?.map((kecamatan) => ({ label: kecamatan.name, value: kecamatan.id })) ?? []
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="areaLevel4"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Kelurahan</FormLabel>
                  <FormControl>
                    <SearchSelect
                      selected={field.value}
                      onChange={field.onChange}
                      disabled={!areaLevel3 || !kelurahanLists}
                      width="md:w-[300px] lg:w-[700px]"
                      className="rounded-md"
                      placeholder="Pilih Kelurahan"
                      options={
                        kelurahanLists?.map((kelurahan) => ({ label: kelurahan.name, value: kelurahan.id })) ?? []
                      }
                    />
                  </FormControl>
                  <FormMessage />
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <p className="font-semibold text-[18px] mt-5">Akademis</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormField
              name="universityId"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Perguruan Tinggi</FormLabel>
                  <FormControl>
                    <SearchSelect
                      selected={field.value}
                      onChange={field.onChange}
                      width="md:w-[300px] lg:w-[700px]"
                      className="rounded-md"
                      placeholder="Pilih Perguruan Tinggi"
                      options={
                        universities?.map((university) => ({ label: university.name, value: university.id })) ?? []
                      }
                    />
                  </FormControl>
                  <FormMessage />
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
                    <SearchSelect
                      selected={field.value}
                      onChange={field.onChange}
                      width="md:w-[300px] lg:w-[700px]"
                      className="rounded-md"
                      disabled={!university || !studyPrograms}
                      placeholder="Pilih Prodi"
                      options={
                        studyPrograms?.map((studyProgram) => ({ label: studyProgram.name, value: studyProgram.id })) ??
                        []
                      }
                    />
                  </FormControl>
                  <FormMessage />
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
                  <FormMessage />
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
                  <FormMessage />
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
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      className="rounded-md"
                      type="number"
                      placeholder="Rp. "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <p className="font-semibold text-[18px] mt-5">Rekening</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormField
              name="bank"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Nama Bank</FormLabel>
                  <FormControl>
                    <SearchSelect
                      selected={field.value}
                      onChange={field.onChange}
                      width="md:w-[300px] lg:w-[700px]"
                      className="rounded-md"
                      placeholder="Pilih Nama Bank"
                      options={bankLists?.map((bank) => ({ label: bank.name, value: bank.id })) ?? []}
                    />
                  </FormControl>
                  <FormMessage />
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
                  <FormMessage />
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
                  <FormLabel className="text-sm">Scan Surat Permohonan</FormLabel>
                  <FormControl className="w-[522px]">
                    <DropZone
                      setValue={field.onChange}
                      fileValue={field.value as unknown as FileWithPreview[]}
                      helperText="*Catatan: File yang diizinkan berupa pdf. Dengan maksimal 2MB"
                      accept={{ 'application/pdf': ['.pdf'] }}
                      maxFiles={1}
                      id="applicationLetter"
                      Icon={HiDocumentArrowUp}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="photo"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-sm">Pass Foto</FormLabel>
                  <FormControl className="w-[522px]">
                    <DropZone
                      setValue={field.onChange}
                      fileValue={field.value as unknown as FileWithPreview[]}
                      helperText="*Catatan: File yang diizinkan berupa jpg. Dengan maksimal 2MB"
                      accept={{ 'image/jpeg': ['.jpg', '.jpeg'] }}
                      maxFiles={1}
                      id="photo"
                      Icon={HiDocumentArrowUp}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="familyCard"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-sm">Scan Kartu Keluarga</FormLabel>
                  <FormControl className="w-[522px]">
                    <DropZone
                      setValue={field.onChange}
                      fileValue={field.value as unknown as FileWithPreview[]}
                      helperText="*Catatan: File yang diizinkan berupa pdf. Dengan maksimal 2MB"
                      accept={{ 'application/pdf': ['.pdf'] }}
                      maxFiles={1}
                      id="familyCard"
                      Icon={HiDocumentArrowUp}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="identityCard"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-sm">KTP</FormLabel>
                  <FormControl className="w-[522px]">
                    <DropZone
                      setValue={field.onChange}
                      fileValue={field.value as unknown as FileWithPreview[]}
                      helperText="*Catatan: File yang diizinkan berupa pdf. Dengan maksimal 2MB"
                      accept={{ 'application/pdf': ['.pdf'] }}
                      maxFiles={1}
                      id="identityCard"
                      Icon={HiDocumentArrowUp}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="studentCard"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-sm">KTM</FormLabel>
                  <FormControl className="w-[522px]">
                    <DropZone
                      setValue={field.onChange}
                      fileValue={field.value as unknown as FileWithPreview[]}
                      helperText="*Catatan: File yang diizinkan berupa pdf. Dengan maksimal 2MB"
                      accept={{ 'application/pdf': ['.pdf'] }}
                      maxFiles={1}
                      id="studentCard"
                      Icon={HiDocumentArrowUp}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="activeStudentCertificate"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-sm">Surat Aktif Kuliah</FormLabel>
                  <FormControl className="w-[522px]">
                    <DropZone
                      setValue={field.onChange}
                      fileValue={field.value as unknown as FileWithPreview[]}
                      helperText="*Catatan: File yang diizinkan berupa pdf. Dengan maksimal 2MB"
                      accept={{ 'application/pdf': ['.pdf'] }}
                      maxFiles={1}
                      id="activeStudentCertificate"
                      Icon={HiDocumentArrowUp}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="dtksPrintout"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-sm">Scan Printout DTKS/PRELIST</FormLabel>
                  <FormControl className="w-[522px]">
                    <DropZone
                      setValue={field.onChange}
                      fileValue={field.value as unknown as FileWithPreview[]}
                      helperText="*Catatan: File yang diizinkan berupa pdf. Dengan maksimal 2MB"
                      accept={{ 'application/pdf': ['.pdf'] }}
                      maxFiles={1}
                      id="dtksPrintout"
                      Icon={HiDocumentArrowUp}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="noScholarshipStatement"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-sm">Surat Pernyataan Tidak Mendapatkan Mahasiswa</FormLabel>
                  <FormControl className="w-[522px]">
                    <DropZone
                      setValue={field.onChange}
                      fileValue={field.value as unknown as FileWithPreview[]}
                      helperText="*Catatan: File yang diizinkan berupa pdf. Dengan maksimal 2MB"
                      accept={{ 'application/pdf': ['.pdf'] }}
                      maxFiles={1}
                      id="noScholarshipStatement"
                      Icon={HiDocumentArrowUp}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="noGovernmentEmployeeStatement"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-sm">Surat Pernyataan Bukan ASN</FormLabel>
                  <FormControl className="w-[522px]">
                    <DropZone
                      setValue={field.onChange}
                      fileValue={field.value as unknown as FileWithPreview[]}
                      helperText="*Catatan: File yang diizinkan berupa pdf. Dengan maksimal 2MB"
                      accept={{ 'application/pdf': ['.pdf'] }}
                      maxFiles={1}
                      id="noGovernmentEmployeeStatement"
                      Icon={HiDocumentArrowUp}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="gradeTranscript"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-sm">Transkrip Nilai (Legalisir)</FormLabel>
                  <FormControl className="w-[522px]">
                    <DropZone
                      setValue={field.onChange}
                      fileValue={field.value as unknown as FileWithPreview[]}
                      helperText="*Catatan: File yang diizinkan berupa pdf. Dengan maksimal 2MB"
                      accept={{ 'application/pdf': ['.pdf'] }}
                      maxFiles={1}
                      id="gradeTranscript"
                      Icon={HiDocumentArrowUp}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="passBook"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-sm">Scan Buku Tabungan</FormLabel>
                  <FormControl className="w-[522px]">
                    <DropZone
                      setValue={field.onChange}
                      fileValue={field.value as unknown as FileWithPreview[]}
                      helperText="*Catatan: File yang diizinkan berupa pdf. Dengan maksimal 2MB"
                      accept={{ 'application/pdf': ['.pdf'] }}
                      maxFiles={1}
                      id="passBook"
                      Icon={HiDocumentArrowUp}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="tuitionReceipt"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-sm">Bukti Pembayaran UKT Terakhir</FormLabel>
                  <FormControl className="w-[522px]">
                    <DropZone
                      setValue={field.onChange}
                      fileValue={field.value as unknown as FileWithPreview[]}
                      helperText="*Catatan: File yang diizinkan berupa pdf. Dengan maksimal 2MB"
                      accept={{ 'application/pdf': ['.pdf'] }}
                      maxFiles={1}
                      id="tuitionReceipt"
                      Icon={HiDocumentArrowUp}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="biodata"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-sm">Biodata Mahasiswa</FormLabel>
                  <FormControl className="w-[522px]">
                    <DropZone
                      setValue={field.onChange}
                      fileValue={field.value as unknown as FileWithPreview[]}
                      helperText="*Catatan: File yang diizinkan berupa pdf. Dengan maksimal 2MB"
                      accept={{ 'application/pdf': ['.pdf'] }}
                      maxFiles={1}
                      id="biodata"
                      Icon={HiDocumentArrowUp}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="md:flex justify-end gap-7 items-center pt-10">
            <Button
              variant="outline"
              className="border-primary text-primary px-8 py-6 rounded-lg w-fit"
              type="button"
              onClick={() => navigate(-1)}
            >
              <p className="text-base font-semibold">Kembali</p>
            </Button>
            <Button
              className="px-8 py-6 rounded-lg items-center gap-3 w-fit mt-5 md:mt-0"
              loading={isLoadingCreate || isLoadingUpdate}
              type="submit"
            >
              <p className="text-base font-semibold w-max">Kirim Pengajuan</p>
              <HiPaperAirplane className="w-5 h-5" />
            </Button>
          </div>
        </form>
      </Form>
    </ContainerUser>
  )
}
