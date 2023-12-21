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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useCreateDTKSCourtPublic, useGetIdentityCheck, useGetKecamatan, useGetKelurahan } from '@/store/server'
import * as React from 'react'
import { useNavigate } from 'react-router'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from '@/components/ui/use-toast'

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
                  <FormMessage />
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
          <div className="grid grid-cols-2 gap-5">
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
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end gap-7 items-center pt-10">
            <Button variant="outline" className="border-primary text-primary w-[165px] h-[60px]">
              <p className="text-xl font-semibold">Kembali</p>
            </Button>
            <Button className="w-[275px] h-[60px]" onClick={forms.handleSubmit(onSubmit)} loading={isLoadingCreate}>
              <p className="text-xl font-semibold">Kirim Pengajuan</p>
              <HiPaperAirplane className="w-6 h-6 ml-2" />
            </Button>
          </div>
        </div>
      </Form>
    </ContainerUser>
  )
}
