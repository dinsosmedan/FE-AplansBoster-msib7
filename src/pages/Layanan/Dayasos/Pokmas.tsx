import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Container, DatePicker, Loading, SearchSelect } from '@/components'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import * as React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { HiTrash, HiPlus } from 'react-icons/hi2'
import { yupResolver } from '@hookform/resolvers/yup'
import { useFieldArray, useForm } from 'react-hook-form'

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
import { formatDateToString, formatStringToDate } from '@/lib/services/formatDate'
import { type pokmasFields, pokmasValidation } from '@/lib/validations/dayasos.validation'

import { useToastNik, useTitle, useNotFound } from '@/hooks'
import { useTitleHeader } from '@/store/client'

const Pokmas = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  useTitle(`${id ? 'Update' : 'Tambah'} Data`)
  const setBreadcrumbs = useTitleHeader((state) => state.setBreadcrumbs)

  React.useEffect(() => {
    setBreadcrumbs([
      { url: '/data-penerima', label: 'Data Penerima' },
      { url: '/data-penerima/dayasos', label: 'Dayasos & PFM' },
      { url: '/data-penerima/dayasos/pokmas', label: 'Pokmas' }
    ])
  }, [])

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

  const { data: communityGroup, isSuccess, isLoading: isLoadingGet, isError: isErrorGet } = useGetCommunityGroup(id)
  const { mutate: updateCommunityGroup, isLoading: isLoadingUpdate } = useUpdateCommunityGroups()

  useNotFound(isErrorGet)

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

  const onSuccess = () => {
    forms.reset()
    navigate('/data-penerima/dayasos/pokmas')
  }

  const onSubmit = async (values: pokmasFields) => {
    const newData = {
      ...values,
      members: values?.members?.map((member) => {
        const { nik, ...newMember } = member
        return newMember
      }),
      executionDate: formatDateToString(values.executionDate as Date)
    }

    if (!id) return createPokmas(newData, { onSuccess })
    updateCommunityGroup({ id, fields: newData }, { onSuccess })
  }

  React.useEffect(() => {
    if (isSuccess) {
      forms.reset({
        applicantPhoneNumber: communityGroup?.applicantPhoneNumber as string,
        communityName: communityGroup?.communityName,
        communityAddress: communityGroup?.address.fullAddress,
        communityActivityCode: communityGroup?.communityActivityCode,
        communityActivityTypeDescription: communityGroup.communityActivityTypeDescription,
        communityAssistanceType: communityGroup?.communityAssistanceType,
        areaLevel3: communityGroup.address?.areaLevel3?.id,
        areaLevel4: communityGroup.address?.areaLevel4?.id,
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
          return {
            nik: member.beneficiary.identityNumber,
            position: member.position,
            beneficiary: member.beneficiary.id
          }
        })
      })
    }
  }, [isSuccess, communityGroup])

  if (isLoadingGet) return <Loading />

  return (
    <Container className="py-10 px-16">
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-7">
          <p className="text-2xl font-bold text-center">Data Personal</p>
          <section className="grid grid-cols-2 gap-6">
            <FormField
              name="communityName"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Kelompok Masyarakat</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      type="text"
                      placeholder="Masukkan Nama Kelompok Masyarakat"
                    />
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
                  <FormLabel>No. HP Pemohon</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} type="number" placeholder="Masukkan No. HP Pemohon" />
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
                  <FormLabel>Kecamatan</FormLabel>
                  <FormControl>
                    <SearchSelect
                      selected={field.value ?? ''}
                      onChange={field.onChange}
                      width="w-[540px]"
                      placeholder="Pilih Kecamatan"
                      options={kecamatan?.map((kecamatan) => ({ label: kecamatan.name, value: kecamatan.id })) ?? []}
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
                  <FormLabel>Kelurahan</FormLabel>
                  <FormControl>
                    <SearchSelect
                      selected={field.value ?? ''}
                      onChange={field.onChange}
                      disabled={areaLevel3 === '' || isLoadingKelurahan}
                      width="w-[540px]"
                      placeholder="Pilih Kelurahan"
                      options={kelurahan?.map((kelurahan) => ({ label: kelurahan.name, value: kelurahan.id })) ?? []}
                    />
                  </FormControl>
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
                <FormLabel>Alamat Lengkap</FormLabel>
                <FormControl>
                  <Textarea {...field} value={field.value ?? ''} placeholder="Masukkan Alamat Lengkap Masyarakat." />
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
                  <FormLabel>Kode Kegiatan</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Kode Kegiatan" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {COMMUNITY_ACTIVITY_CODE.map((item, index) => (
                        <SelectItem value={item.label} key={index}>
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
                  <FormLabel>Jenis Kegiatan</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} type="text" placeholder="Masukkan Jenis Kegiatan" />
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
                  <FormLabel>Jenis Bantuan</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Jenis Bantuan" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {COMMUNITY_ASSISTANCE_TYPE.map((item, index) => (
                        <SelectItem value={item.label} key={index}>
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
                  <FormLabel>Jumlah Permohonan RAB</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value as number} type="number" placeholder="Rp. " />
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
                  <FormLabel>Jumlah Permohonan Bansos</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value as number} type="number" placeholder="Rp. " />
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
                  <FormLabel>Jumlah Dana Disetujui</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value as number} type="number" placeholder="Rp. " />
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
                  <FormLabel>Jadwal Pelaksaaan</FormLabel>
                  <DatePicker selected={field.value as Date} onChange={field.onChange} placeholder="dd/mm/yyy" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="executionPlace"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tempat Pelaksanaan</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} type="text" placeholder="Masukkan Tempat Pelaksanaan" />
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
                  <FormLabel>Tahun Permohonan</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} type="text" placeholder="Masukkan Tahun Permohonan" />
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
                  <FormLabel>Nama Bank</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} type="text" placeholder="Bank Sumut" />
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
                  <FormLabel>Nama Rekening</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} type="text" placeholder="Masukkan Nama Rekening" />
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
                  <FormLabel>Nomor Rekening</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} type="number" placeholder="Masukkan Nomor Rekening" />
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
                  <FormLabel>Alamat Rekening</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} type="text" placeholder="Masukkan Alamat Rekening" />
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
                  <FormLabel>Status Pencairan</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Masukkan Status Pencairan" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="TIDAK BERHASIL">TIDAK BERHASIL</SelectItem>
                      <SelectItem value="TERTUNDA">TERTUNDA</SelectItem>
                      <SelectItem value="BERHASIL">BERHASIL</SelectItem>
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
                  <FormLabel>Keterangan</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} type="text" placeholder="Masukkan Keterangan" />
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
                render={({ field }) => (
                  <Input {...field} value={field.value ?? ''} type="text" hidden className="hidden" />
                )}
              />
              <FormField
                name={`members.${index}.nik`}
                control={forms.control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>NIK</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} type="number" placeholder="Masukkan NIK" />
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
                    <FormLabel>Jabatan</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Jabatan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ketua">Ketua</SelectItem>
                        <SelectItem value="sekretaris">Sekretaris</SelectItem>
                        <SelectItem value="bendahara">Bendahara</SelectItem>
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
