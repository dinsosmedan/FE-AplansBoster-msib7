import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import * as React from 'react'
import { useParams } from 'react-router-dom'
import { HiTrash, HiPlus } from 'react-icons/hi2'
import { yupResolver } from '@hookform/resolvers/yup'
import { useFieldArray, useForm } from 'react-hook-form'

import { type pokmasFields, pokmasValidation } from '@/lib/validations/dayasos.validation'
import { Container, DatePicker } from '@/components'
import { useToastNik, useTitle } from '@/hooks'

import {
  useCreateCommunityGroups,
  useGetBeneficaryByNIK,
  useGetCommunityGroup,
  useGetKecamatan,
  useGetKelurahan,
  useUpdateCommunityGroups
} from '@/store/server'

import { cn } from '@/lib/utils'
import { POKMAS_DEFAULT_VALUES } from '@/lib/defaultValues'
import { COMMUNITY_ACTIVITY_CODE, COMMUNITY_ASSISTANCE_TYPE } from '@/lib/data'
import { formatStringToDate } from '@/lib/formatDate'

const Pokmas = () => {
  useTitle('Kelompok Masyarakat (Pokmas)')
  const { id } = useParams<{ id: string }>()
  const [NIK, setNIK] = React.useState('')
  const [index, setIndex] = React.useState(0)

  const forms = useForm<pokmasFields>({
    mode: 'onTouched',
    resolver: yupResolver(pokmasValidation),
    defaultValues: POKMAS_DEFAULT_VALUES
  })

  const { fields, append, remove } = useFieldArray({
    control: forms.control,
    name: 'members'
  })

  const areaLevel3 = forms.watch('areaLevel3')
  const { data: kecamatan } = useGetKecamatan()
  const { data: kelurahan, isLoading: isLoadingKelurahan } = useGetKelurahan(areaLevel3 ?? '')
  const { data: beneficiary, refetch, isFetching, isError, isLoading } = useGetBeneficaryByNIK(NIK, false)
  const { mutate: createPokmas, isLoading: isLoadingCreate } = useCreateCommunityGroups()

  const { data: communityGroup, isSuccess } = useGetCommunityGroup(id)
  const { mutate: updateCommunityGroup, isLoading: isLoadingUpdate } = useUpdateCommunityGroups()

  useToastNik({
    successCondition: !isLoading && beneficiary != null,
    notFoundCondition: isError,
    notRegisteredCondition: Object.keys(forms.formState.errors).length > 0 && forms.formState.isSubmitted,
    onSuccess: () => forms.setValue(`members.${index}.beneficiary`, beneficiary?.id as string)
  })

  React.useEffect(() => {
    if (NIK !== '') void refetch()
  }, [NIK])

  const handleFetchNik = async (index: number) => {
    const nik = forms.getValues(`members.${index}.nik`)
    if (nik != null) {
      setNIK(nik)
      setIndex(index)
    }
  }

  const onSubmit = async (values: pokmasFields) => {
    const newData = {
      ...values,
      members: values?.members?.map((member) => {
        const { nik, ...newMember } = member
        return newMember
      })
    }

    if (!id) {
      createPokmas(newData, { onSuccess: () => forms.reset() })
      return
    }

    const data = { id, fields: newData }
    updateCommunityGroup(data, {
      onSuccess: () => forms.reset()
    })
  }

  React.useEffect(() => {
    if (isSuccess) {
      forms.reset({
        applicantPhoneNumber: communityGroup?.applicantPhoneNumber as string,
        communityName: communityGroup?.communityName,
        communityAddress: communityGroup?.communityAddress as string,
        communityActivityCode: communityGroup?.communityActivityCode,
        communityActivityTypeDescription: communityGroup.communityActivityTypeDescription,
        communityAssistanceType: communityGroup?.communityAssistanceType,
        areaLevel3: communityGroup.address?.areaLevel3?.name,
        areaLevel4: communityGroup.address?.areaLevel4?.name,
        requestedRabAmount: communityGroup.requestedRabAmount,
        requestedBansosAmount: communityGroup.requestedBansosAmount,
        approvedFundAmount: communityGroup.approvedFundAmount,
        applicationYear: communityGroup.applicationYear,
        bankName: communityGroup.bankName,
        bankAccName: communityGroup?.bankAccName as string,
        bankAccNumber: communityGroup.bankAccNumber,
        bankAccAddress: communityGroup.bankAccAddress as string,
        statusDisimbursement: communityGroup?.statusDisimbursement as string,
        note: communityGroup?.note,
        executionDate: formatStringToDate(communityGroup?.executionDate as string),
        executionPlace: communityGroup?.executionPlace as string,
        members: communityGroup?.members?.map((member) => {
          const { id, ...newMember } = member
          return { ...newMember, nik: member.beneficiaryId }
        })
      })
    }
  }, [isSuccess, communityGroup])

  return (
    <Container className="py-10 px-12">
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-7">
          <p className="text-2xl font-bold text-center">Data Personal</p>
          <section className="grid grid-cols-2 gap-6">
            <FormField
              name="communityName"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Nama Kelompok Masyarakat</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Masukkan Nama Kelompok Masyarakat" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="applicantPhoneNumber"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">No. HP Pemohon</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Masukkan No. HP Pemohon" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
          <p className="text-2xl text-center font-bold">Alamat POKMAS</p>
          <section className="grid grid-cols-2 gap-6">
            <FormField
              name="areaLevel3"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Kecamatan</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Kecamatan" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {kecamatan?.map((item, index) => (
                        <SelectItem value={item.id} key={index}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={areaLevel3 === '' || isLoadingKelurahan}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Kelurahan" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {kelurahan?.map((item, index) => (
                        <SelectItem value={item.id} key={index}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
          <FormField
            name="communityAddress"
            control={forms.control}
            render={({ field }) => (
              <FormItem className="-mt-3">
                <FormLabel className="font-semibold dark:text-white">Alamat Lengkap</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Masukkan Alamat Lengkap Masyarakat." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="text-2xl font-bold text-center">Data Lembaga</p>
          <section className="grid grid-cols-3 gap-6">
            <FormField
              name="communityActivityCode"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Kode Kegiatan</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Kode Kegiatan" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {COMMUNITY_ACTIVITY_CODE.map((item, index) => (
                        <SelectItem value={item.value} key={index}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="communityActivityTypeDescription"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Jenis Kegiatan</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Masukkan Jenis Kegiatan" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="communityAssistanceType"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Jenis Bantuan</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Jenis Bantuan" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {COMMUNITY_ASSISTANCE_TYPE.map((item, index) => (
                        <SelectItem value={item.value} key={index}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="requestedRabAmount"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Jumlah Permohonan RAB</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="Rp. " />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="requestedBansosAmount"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Jumlah Permohonan Bansos</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="Rp. " />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="approvedFundAmount"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Jumlah Dana Disetujui</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="Rp. " />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="executionDate"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Jadwal Pelaksaaan</FormLabel>
                  <FormControl>
                    <DatePicker onChange={field.onChange} selected={field.value as Date} placeholder="dd/mm/yyyy" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="executionPlace"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Tempat Pelaksanaan</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Masukkan Tempat Pelaksanaan" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="applicationYear"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Tahun Permohonan</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Masukkan Tahun Permohonan" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="bankName"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Nama Bank</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Bank Sumut" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="bankAccName"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Nama Rekening</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Masukkan Nama Rekening" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="bankAccNumber"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Nomor Rekening</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Masukkan Nomor Rekening" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="bankAccAddress"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Alamat Rekening</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Masukkan Alamat Rekening" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="statusDisimbursement"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Status Pencairan</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Masukkan Status Pencairan" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="STATUS_PROCESSED">Diproses</SelectItem>
                      <SelectItem value="STATUS_RECEIVED">Diterima</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="note"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Keterangan</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Masukkan Keterangan" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
          <p className="text-2xl font-bold text-center">Data Pengurus</p>
          {fields.map((field, index) => (
            <div className="flex flex-row gap-4" key={field.id}>
              <FormField
                name={`members.${index}.beneficiary`}
                control={forms.control}
                render={({ field }) => <Input {...field} type="text" hidden className="hidden" />}
              />
              <FormField
                name={`members.${index}.nik`}
                control={forms.control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="font-semibold dark:text-white">NIK</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan NIK" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name={`members.${index}.position`}
                control={forms.control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="font-semibold dark:text-white">Jabatan</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Jabatan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="POSITION_CHAIRMAN">Ketua</SelectItem>
                        <SelectItem value="POSITION_SECRETARY">Sekretaris</SelectItem>
                        <SelectItem value="POSITION_TREASURER">Bendahara</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className={cn('flex items-end justify-end gap-2', index > 0 ? 'w-auto' : 'w-[11%]')}>
                <Button
                  className="w-full"
                  type="button"
                  onClick={async () => await handleFetchNik(index)}
                  loading={isFetching}
                >
                  Cari
                </Button>
                {index > 0 && (
                  <Button
                    className="w-full bg-white border border-zinc-500 hover:bg-zinc-200"
                    type="button"
                    onClick={() => remove(index)}
                  >
                    <HiTrash className="text-lg text-zinc-800" />
                  </Button>
                )}
              </div>
            </div>
          ))}
          <Button
            className="bg-primary flex w-fit mx-auto rounded-xl py-6 gap-2"
            type="button"
            onClick={() => append({ beneficiary: '', position: '', nik: '' })}
          >
            <HiPlus className="w-6 h-6 text-white" />
            <p className="font-bold text-sm text-white">Tambah Anggota</p>
          </Button>
          <div className="flex justify-end gap-4 mt-8">
            <Button variant="cancel" className="font-bold" onClick={() => forms.reset()} type="button">
              Cancel
            </Button>
            <Button className="font-bold" type="submit" loading={isLoadingCreate || isLoadingUpdate}>
              {id ? 'Update' : 'Submit'}
            </Button>
          </div>
        </form>
      </Form>
    </Container>
  )
}

export default Pokmas
