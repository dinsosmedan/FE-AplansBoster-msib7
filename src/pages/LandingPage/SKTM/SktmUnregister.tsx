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
import { NonDtksSchoolValidation, type NonDtksSchoolFields } from '@/lib/validations/landingPage/public.validation'
import {
  useCreateIndigencyCertificateApplicationNoDTKS,
  useGetAssistanceCheck,
  useGetKecamatan,
  useGetKelurahan
} from '@/store/server'
import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { possibleEducationLevel } from './SktmRegister'

export default function SktmUnregister() {
  const navigate = useNavigate()
  const forms = useForm<NonDtksSchoolFields>({
    mode: 'onTouched',
    resolver: yupResolver(NonDtksSchoolValidation)
  })

  const identityNumber = forms.watch('peopleConcernedIdentityNumber')
  const areaLevel3 = forms.watch('peopleConcernedAreaLevel3')

  const { mutate: create, isLoading: isLoadingCreate } = useCreateIndigencyCertificateApplicationNoDTKS()
  const { data: assistance, isLoading: isLoadingAssistance, refetch } = useGetAssistanceCheck(identityNumber, false)
  const { data: kecamatanLists } = useGetKecamatan()
  const { data: kelurahanLists } = useGetKelurahan(areaLevel3)

  React.useEffect(() => {
    if (assistance) {
      forms.setValue('peopleConcernedName', assistance.name)
      forms.setValue('peopleConcernedAddress', assistance.address.fullAddress)
      forms.setValue('peopleConcernedAreaLevel3', assistance.address.areaLevel3?.id as string)
      forms.setValue('peopleConcernedAreaLevel4', assistance.address.areaLevel4?.id as string)
    }
  }, [assistance])

  const onSubmit = async (values: NonDtksSchoolFields) => {
    create(values, {
      onSuccess: () => {
        forms.reset()
        navigate('/user/sktm')
      }
    })
  }

  return (
    <ContainerUser title={'Form Pengajuan SKTM Untuk Sekolah/Universitas (Tidak Terdaftar DTKS)'}>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6 pt-16">
          <div className="grid grid-cols-2 gap-5">
            <div className="flex">
              <div className="w-full">
                <FormField
                  name="peopleConcernedIdentityNumber"
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
              name="peopleConcernedName"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Nama</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      type="text"
                      placeholder="Masukkan Nama"
                      className="rounded-md"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <FormField
              name="peopleConcernedAreaLevel3"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Kecamatan</FormLabel>
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="peopleConcernedAreaLevel4"
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 pb-10">
            <FormField
              name="peopleConcernedAddress"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Alamat Lengkap</FormLabel>
                  <FormControl>
                    <Textarea {...field} value={field.value ?? ''} placeholder="Masukkan alamat lengkap" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <FormField
              name="publicPhoneNumber"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">No. Hp</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      type="text"
                      placeholder="Masukan No.Hp Anda"
                      className="rounded-md"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="educationLevel"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Pilih Jenjang Pendidikan</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Jawaban" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {possibleEducationLevel?.map((item, index) => (
                          <SelectItem key={index} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField
            name="certificateDestination"
            control={forms.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold dark:text-white">Universitas/Sekolah Tujuan</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ''}
                    type="text"
                    placeholder="Masukan Universitas/Sekolah Tujuan"
                    className="rounded-md"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <p className="text-[18px] text-primary">*Catatan: File yang diizinkan berupa pdf. Dengan maksimal 2MB</p>
          <div className="grid grid-cols-2 gap-12">
            <FormField
              name="petitionLetter"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-xl">Scan Surat Permohonan</FormLabel>
                  <FormControl className="w-[522px]">
                    <DropZone
                      setValue={field.onChange}
                      fileValue={field.value as unknown as FileWithPreview[]}
                      helperText="*Catatan: File yang diizinkan berupa pdf. Dengan maksimal 2MB"
                      accept={{ 'application/pdf': ['.pdf'] }}
                      maxFiles={1}
                      id="fotoKtp"
                      Icon={HiDocumentArrowUp}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="domicileLetter"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-xl">Scan Foto Copy Surat Domisili Dari Kelurahan Setempat</FormLabel>
                  <FormControl className="w-[522px]">
                    <DropZone
                      setValue={field.onChange}
                      fileValue={field.value as unknown as FileWithPreview[]}
                      helperText="*Catatan: File yang diizinkan berupa pdf. Dengan maksimal 2MB"
                      accept={{ 'application/pdf': ['.pdf'] }}
                      maxFiles={1}
                      id="domicileLetter"
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
                  <FormLabel className="text-xl">Scan Kartu Keluarga</FormLabel>
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="idCard"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-xl">Scan Kartu Tanda Penduduk (KTP)</FormLabel>
                  <FormControl className="w-[522px]">
                    <DropZone
                      setValue={field.onChange}
                      fileValue={field.value as unknown as FileWithPreview[]}
                      helperText="*Catatan: File yang diizinkan berupa pdf. Dengan maksimal 2MB"
                      accept={{ 'application/pdf': ['.pdf'] }}
                      maxFiles={1}
                      id="idCard"
                      Icon={HiDocumentArrowUp}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            name="indigencyCertificateApplication"
            control={forms.control}
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="text-xl">
                  Surat Keterangan Dari Sekolah / Surat Pengumuman dari pihak Universitas
                </FormLabel>
                <FormControl className="w-[522px]">
                  <DropZone
                    setValue={field.onChange}
                    fileValue={field.value as unknown as FileWithPreview[]}
                    helperText="*Catatan: File yang diizinkan berupa pdf. Dengan maksimal 2MB"
                    accept={{ 'application/pdf': ['.pdf'] }}
                    maxFiles={1}
                    id="indigencyCertificateApplication"
                    Icon={HiDocumentArrowUp}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-12">
            <div className="pt-7">
              <FormField
                name="salarySlip"
                control={forms.control}
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="text-xl">Scan Fotocopy Slip Gaji</FormLabel>
                    <FormControl className="w-[522px]">
                      <DropZone
                        setValue={field.onChange}
                        fileValue={field.value as unknown as FileWithPreview[]}
                        helperText="*Catatan: File yang diizinkan berupa pdf. Dengan maksimal 2MB"
                        accept={{ 'application/pdf': ['.pdf'] }}
                        maxFiles={1}
                        id="salarySlip"
                        Icon={HiDocumentArrowUp}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              name="localsApprovalLetter"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-xl">
                    Scan Surat Keterangan Dari Kepling Apabila Tinggal Menumpang/Sewa ditandatangani pakai materai
                    Rp.10.000
                  </FormLabel>
                  <FormControl className="w-[522px]">
                    <DropZone
                      setValue={field.onChange}
                      fileValue={field.value as unknown as FileWithPreview[]}
                      helperText="*Catatan: File yang diizinkan berupa pdf. Dengan maksimal 2MB"
                      accept={{ 'application/pdf': ['.pdf'] }}
                      maxFiles={1}
                      id="localsApprovalLetter"
                      Icon={HiDocumentArrowUp}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-12">
            <FormField
              name="lowIncomeLetter"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-xl">
                    Surat Pernyataan Berpenghasilan di bawah UMR (±Rp.3000.000) ditandatangani Lurah
                  </FormLabel>
                  <FormControl className="w-[522px]">
                    <DropZone
                      setValue={field.onChange}
                      fileValue={field.value as unknown as FileWithPreview[]}
                      helperText="*Catatan: File yang diizinkan berupa pdf. Dengan maksimal 2MB"
                      accept={{ 'application/pdf': ['.pdf'] }}
                      maxFiles={1}
                      id="lowIncomeLetter"
                      Icon={HiDocumentArrowUp}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="schoolLetter"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-xl">
                    Surat permohonan Surat Keterangan Dari Sekolah / Surat Pengumuman dari pihak Universitas
                  </FormLabel>
                  <FormControl className="w-[522px]">
                    <DropZone
                      setValue={field.onChange}
                      fileValue={field.value as unknown as FileWithPreview[]}
                      helperText="*Catatan: File yang diizinkan berupa pdf. Dengan maksimal 2MB"
                      accept={{ 'application/pdf': ['.pdf'] }}
                      maxFiles={1}
                      id="schoolLetter"
                      Icon={HiDocumentArrowUp}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <p className="py-5 text-xl font-semibold">Foto Rumah</p>
          <div className="grid grid-cols-2 gap-12 pb-10">
            <FormField
              name="frontViewHouse"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-xl">Tampak Depan</FormLabel>
                  <FormControl className="w-[522px]">
                    <DropZone
                      setValue={field.onChange}
                      fileValue={field.value as unknown as FileWithPreview[]}
                      helperText="*Catatan: File yang diizinkan berupa pdf. Dengan maksimal 2MB"
                      accept={{ 'application/pdf': ['.pdf'] }}
                      maxFiles={1}
                      id="frontViewHouse"
                      Icon={HiDocumentArrowUp}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="sittingViewHouse"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-xl">Ruang Tamu</FormLabel>
                  <FormControl className="w-[522px]">
                    <DropZone
                      setValue={field.onChange}
                      fileValue={field.value as unknown as FileWithPreview[]}
                      helperText="*Catatan: File yang diizinkan berupa pdf. Dengan maksimal 2MB"
                      accept={{ 'application/pdf': ['.pdf'] }}
                      maxFiles={1}
                      id="sittingViewHouse"
                      Icon={HiDocumentArrowUp}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="chamberViewHouse"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-xl">Kamar</FormLabel>
                  <FormControl className="w-[522px]">
                    <DropZone
                      setValue={field.onChange}
                      fileValue={field.value as unknown as FileWithPreview[]}
                      helperText="*Catatan: File yang diizinkan berupa pdf. Dengan maksimal 2MB"
                      accept={{ 'application/pdf': ['.pdf'] }}
                      maxFiles={1}
                      id="chamberViewHouse"
                      Icon={HiDocumentArrowUp}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="kitchenViewHouse"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-xl">Dapur</FormLabel>
                  <FormControl className="w-[522px]">
                    <DropZone
                      setValue={field.onChange}
                      fileValue={field.value as unknown as FileWithPreview[]}
                      helperText="*Catatan: File yang diizinkan berupa pdf. Dengan maksimal 2MB"
                      accept={{ 'application/pdf': ['.pdf'] }}
                      maxFiles={1}
                      id="kitchenViewHouse"
                      Icon={HiDocumentArrowUp}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end gap-7 items-center">
            <Button variant="outline" className="border-primary text-primary w-[165px] h-[60px]" type="button">
              <p className="text-xl font-semibold">Kembali</p>
            </Button>
            <Button className="w-[275px] h-[60px]" type="submit" loading={isLoadingCreate}>
              <p className="text-xl font-semibold">Kirim Pengajuan</p>
              <HiPaperAirplane className="w-6 h-6 ml-2" />
            </Button>
          </div>
        </form>
      </Form>
    </ContainerUser>
  )
}
