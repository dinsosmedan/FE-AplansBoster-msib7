import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useFieldArray, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import useTitle from '@/hooks/useTitle'
import { HiPlus } from 'react-icons/hi'
import { Container, Loading, SearchSelect } from '@/components'
import { kubeValidation, type kubeFields } from '@/lib/validations/dayasos.validation'
import {
  useCreateBusinessGroup,
  useGetBeneficaryByNIK,
  useGetBusinessGroupById,
  useGetKecamatan,
  useGetKelurahan,
  useUpdateJointBusiness
} from '@/store/server'
import { yupResolver } from '@hookform/resolvers/yup'
import { HiTrash } from 'react-icons/hi2'
import { cn } from '@/lib/utils'
import * as React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTitleHeader } from '@/store/client'
import { useNotFound, useToastNik } from '@/hooks'

const Kube = () => {
  const navigate = useNavigate()

  const { id } = useParams<{ id: string }>()
  useTitle(`${id ? 'Ubah' : 'Tambah'} Data`)
  const setBreadcrumb = useTitleHeader((state) => state.setBreadcrumbs)

  React.useEffect(() => {
    setBreadcrumb([
      { url: '/data-penerima/dayasos', label: 'Dayasos & PFM' },
      { label: 'Dayasos & PFM', url: '/data-penerima/dayasos' },
      { label: 'Kube', url: '/data-penerima/dayasos/kube' }
    ])
  }, [])

  const [NIK, setNIK] = React.useState('')
  const [index, setIndex] = React.useState(0)

  const forms = useForm<kubeFields>({
    mode: 'onTouched',
    resolver: yupResolver(kubeValidation),
    defaultValues: {
      businessName: '',
      businessType: '',
      businessAddress: '',
      areaLevel3: '',
      areaLevel4: '',
      assistanceAmount: 0,
      budgetYear: '',
      status: '',
      note: '',
      members: [{ beneficiary: '', position: '', nik: '' }]
    }
  })

  const { fields, append, remove } = useFieldArray({
    control: forms.control,
    name: 'members'
  })

  const areaLevel3 = forms.watch('areaLevel3')
  const { data: kecamatan } = useGetKecamatan()
  const { data: kelurahan } = useGetKelurahan(areaLevel3 ?? '')
  const { data: beneficiary, refetch, isLoading, isError: isErrorBeneficary } = useGetBeneficaryByNIK(NIK, false)
  const { mutate: createKube, isLoading: isLoadingCreate } = useCreateBusinessGroup()
  const { mutate: UpdateJointBusiness, isLoading: isLoadingUpdate } = useUpdateJointBusiness()
  const { data: BusinessGroup, isSuccess, isLoading: isLoadingBusinessGroupById, isError } = useGetBusinessGroupById(id)

  useNotFound(isError)

  useToastNik({
    successCondition: !isLoading && beneficiary != null,
    onSuccess: () => forms.setValue(`members.${index}.beneficiary`, beneficiary?.id as string),
    notFoundCondition: isErrorBeneficary,
    notRegisteredCondition:
      forms.getValues(`members.${index}.beneficiary`) === '' && NIK !== '' && forms.formState.isSubmitted
  })

  React.useEffect(() => {
    if (NIK !== '') void refetch()
  }, [NIK])

  React.useEffect(() => {
    if (isSuccess) {
      forms.reset({
        businessName: BusinessGroup?.businessName,
        businessType: BusinessGroup?.businessType,
        areaLevel3: BusinessGroup?.businessAddress?.areaLevel3?.id as string,
        areaLevel4: BusinessGroup?.businessAddress?.areaLevel4?.id as string,
        budgetYear: BusinessGroup?.budgetYear,
        note: BusinessGroup?.note,
        status: BusinessGroup?.status,
        businessAddress: BusinessGroup?.businessAddress.fullAddress,
        members: BusinessGroup?.members?.map((member: any) => {
          return { beneficiary: member.id, nik: member.identityNumber, position: member.position }
        })
      })
    }
  }, [isSuccess, BusinessGroup])

  const onSuccess = () => {
    forms.reset()
    navigate('/data-penerima/dayasos/kube')
  }

  const onSubmit = async (values: kubeFields) => {
    const newData = {
      ...values,
      members: values?.members?.map((member) => {
        const { nik, ...newMember } = member
        return newMember
      })
    }

    if (!id) return createKube(newData, { onSuccess })
    UpdateJointBusiness({ id, fields: newData }, { onSuccess })
  }

  const handleFetchNik = async (index: number) => {
    const nik = forms.getValues(`members.${index}.nik`)
    if (nik != null) {
      setNIK(nik)
      setIndex(index)
    }
  }

  if (isLoadingBusinessGroupById) return <Loading />

  return (
    <Container className="py-10 px-[47px]">
      <div className="w-full text-center">
        <p className="text-2xl font-bold">Data Kelompok Usaha Bersama</p>
      </div>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-row gap-4 pt-5">
            <div className="w-6/12">
              <FormField
                name="businessName"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Nama KUBE</FormLabel>
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
            </div>
            <div className="w-6/12">
              <FormField
                name="businessType"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Jenis Usaha</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} type="text" placeholder="Masukkan Jenis Usaha" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="w-full text-center">
            <p className="text-2xl font-bold">Alamat KUBE</p>
          </div>
          <div className="flex flex-row gap-4">
            <div className="w-6/12">
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
                        width="w-[560px]"
                        placeholder="Pilih Kecamatan"
                        options={kecamatan?.map((kecamatan) => ({ label: kecamatan.name, value: kecamatan.id })) ?? []}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-6/12">
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
                        disabled={!areaLevel3 || !kelurahan}
                        width="w-[560px]"
                        placeholder="Pilih Kelurahan"
                        options={kelurahan?.map((kelurahan) => ({ label: kelurahan.name, value: kelurahan.id })) ?? []}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div>
            <FormField
              name="businessAddress"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Alamat Lengkap</FormLabel>
                  <FormControl>
                    <Textarea {...field} value={field.value ?? ''} placeholder="Masukkan Alamat Lengkap Masyarakat." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full text-center">
            <p className="text-2xl font-bold">Data Pengurus</p>
          </div>
          {fields.map((field, index) => (
            <div className="flex flex-row gap-4" key={field.id}>
              <FormField
                name={`members.${index}.beneficiary`}
                control={forms.control}
                render={({ field }) => (
                  <Input {...field} value={field.value ?? ''} type="text" hidden className="hidden" />
                )}
              />
              <div className="w-6/12">
                <FormField
                  name={`members.${index}.nik`}
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold dark:text-white">NIK</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value ?? ''} type="number" placeholder="Masukkan NIK" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-6/12">
                <FormField
                  name={`members.${index}.position`}
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold dark:text-white">Jabatan</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Jabatan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ketua">Ketua</SelectItem>
                          <SelectItem value="anggota">Anggota</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className={cn('flex items-end justify-end gap-2', index > 0 ? 'w-auto' : 'w-[11%]')}>
                <Button
                  className="w-full"
                  type="button"
                  onClick={async () => await handleFetchNik(index)}
                  loading={isLoading}
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

          <div className="w-full text-center">
            <p className="text-2xl font-bold">Bantuan</p>
          </div>
          <div className="flex flex-row gap-4">
            <div className="w-4/12">
              <FormField
                name="budgetYear"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Tahun Anggaran</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} type="number" placeholder="Masukkan Tahun Anggaran" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-4/12">
              <FormField
                name="status"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Status Verifikasi</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Status Verifikasi" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="aktif">Aktif</SelectItem>
                        <SelectItem value="tidak aktif">Tidak Aktif</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-4/12">
              <FormField
                name="note"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Keterangan</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} type="text" placeholder="Masukkan Keterangan" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-8">
            <Button variant="cancel" className="font-bold" onClick={() => forms.reset()} type="button">
              Cancel
            </Button>
            <Button className="font-bold" type="submit" loading={isLoadingCreate || isLoadingUpdate}>
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </Container>
  )
}

export default Kube
