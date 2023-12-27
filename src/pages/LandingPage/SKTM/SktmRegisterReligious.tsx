import ContainerUser from '@/components/organisms/landingPage/ContainerUser'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { HiDocumentArrowUp, HiMagnifyingGlass, HiPaperAirplane } from 'react-icons/hi2'
import { Textarea } from '@/components/ui/textarea'
import DropZone, { type FileWithPreview } from '../../../components/atoms/DropZone'
import { DtksCourtsValidation, type DtksCourtsFields } from '@/lib/validations/landingPage/public.validation'
import { useCreateDTKSCourtPublic, useGetIdentityCheck, useGetKecamatan, useGetKelurahan } from '@/store/server'
import * as React from 'react'
import { useNavigate } from 'react-router'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from '@/components/ui/use-toast'
import { SearchSelect } from '@/components'

export default function SktmUnregisterReligious() {
  const navigate = useNavigate()
  const forms = useForm<DtksCourtsFields>({
    mode: 'onTouched',
    resolver: yupResolver(DtksCourtsValidation)
  })

  const areaLevel3 = forms.watch('peopleConcernedAreaLevel3')
  const identityNumber = forms.watch('peopleConcernedIdentityNumber')

  const { data: kecamatanLists } = useGetKecamatan()
  const { data: kelurahanLists } = useGetKelurahan(areaLevel3)

  const { mutate: create, isLoading: isLoadingCreate } = useCreateDTKSCourtPublic()
  const {
    data: assistance,
    isLoading: isLoadingAssistance,
    refetch,
    isError
  } = useGetIdentityCheck(identityNumber, false)

  React.useEffect(() => {
    if (assistance) {
      forms.setValue('peopleConcernedName', assistance.name)
      forms.setValue('peopleConcernedAddress', assistance.address.fullAddress)
      forms.setValue('peopleConcernedAreaLevel3', assistance.address.areaLevel3?.id as string)
      forms.setValue('peopleConcernedAreaLevel4', assistance.address.areaLevel4?.id as string)
    }
  }, [assistance])

  React.useEffect(() => {
    if (isError) {
      toast({
        title: 'NIK tidak terdaftar',
        variant: 'destructive',
        description: 'Silahkan cek kembali NIK anda'
      })
    }
  }, [isError])

  const onSubmit = async (values: DtksCourtsFields) => {
    create(values, {
      onSuccess: () => {
        forms.reset()
        navigate('/user/sktm/dtks-courts')
      }
    })
  }

  return (
    <ContainerUser title={'Form Pengajuan SKTM Untuk Pelayanan ke Pengadilan Agama / LBH  (Terdaftar DTKS)'}>
      <Form {...forms}>
        <div className="flex flex-col gap-6 pt-14">
          <div className="grid md:grid-cols-2 gap-5">
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <FormField
              name="peopleConcernedAreaLevel3"
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
              name="peopleConcernedAreaLevel4"
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
          <FormField
            name="peopleConcernedAddress"
            control={forms.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold dark:text-white">Alamat Lengkap</FormLabel>
                <FormControl>
                  <Textarea {...field} value={field.value ?? ''} placeholder="Masukkan Alamat" className="rounded-md" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid md:grid-cols-2 gap-5">
            <FormField
              name="applicantPhoneNumber"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">No. Hp</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      type="number"
                      placeholder="Masukan No.Hp Anda"
                      className="rounded-md"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="certificateDestination"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Tujuan Surat</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      type="text"
                      placeholder="Masukan Tujuan Surat"
                      className="rounded-md"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <p className="text-[12px] text-primary">*Catatan: File yang diizinkan berupa pdf. Dengan maksimal 2MB</p>
          <div className="grid md:grid-cols-2 gap-12">
            <FormField
              name="petitionLetter"
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
                      id="petitionLetter"
                      Icon={HiDocumentArrowUp}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="domicileLetter"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-sm">Scan Foto Copy Surat Domisili Dari Kelurahan Setempat</FormLabel>
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
              name="idCard"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-sm">Scan Kartu Tanda Penduduk (KTP)</FormLabel>
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
                </FormItem>
              )}
            />
          </div>
          <div className="md:flex justify-end gap-7 items-center pt-10">
            <Button
              variant="outline"
              className="border-primary text-primary px-8 py-6 rounded-lg md:w-[50%] lg:w-[15%] w-full"
              type="button"
              onClick={() => navigate(-1)}
            >
              <p className="text-base font-semibold">Kembali</p>
            </Button>
            <Button
              className="px-8 py-6 rounded-lg items-center gap-3 md:w-[50%] lg:w-[15%] w-full mt-5 md:mt-0"
              onClick={forms.handleSubmit(onSubmit)}
              loading={isLoadingCreate}
            >
              <p className="text-base font-semibold">Kirim Pengajuan</p>
              <HiPaperAirplane className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </Form>
    </ContainerUser>
  )
}
