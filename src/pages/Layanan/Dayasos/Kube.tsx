import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useFieldArray, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import useTitle from '@/hooks/useTitle'
import { HiPlus } from 'react-icons/hi'
import { Container, Loading } from '@/components'
import { kubeValidation, type kubeFields } from '@/lib/validations/dayasos.validation'
import { useCreateBusinessGroup, useGetBeneficaryByNIK, useGetBusinessGroupById, useGetKecamatan, useGetKelurahan, useUpdateJointBusiness } from '@/store/server'
import { yupResolver } from '@hookform/resolvers/yup'
import { HiTrash } from 'react-icons/hi2'
import { cn } from '@/lib/utils'
import * as React from 'react'
import { useToast } from '@/components/ui/use-toast'
import { useParams } from 'react-router-dom'

const Kube = () => {
  useTitle('Kelompok Usaha Bersama (KUBE)')
  const { id } = useParams<{ id: string }>()

  // console.log(id)
  const { toast } = useToast()
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
  const { data: beneficiary, refetch, isFetching, isError } = useGetBeneficaryByNIK(NIK, false)
  const { mutate: createKube, isLoading: isLoadingCreate } = useCreateBusinessGroup()
  const { mutate: UpdateJointBusiness, isLoading: isLoadingUpdate } = useUpdateJointBusiness()

  const { data: BusinessGroup, isSuccess, isLoading: isLoadingBusinessGroupById } = useGetBusinessGroupById(id)

  React.useEffect(() => {
    if (NIK !== '') void refetch()
  }, [NIK])
  React.useEffect(() => {
    if (isSuccess) {
      // console.log(BusinessGroup.status)
      // '245e8842-15cd-4ab5-8ef6-3e04892d602d'
      // console.log(kelurahan)
      forms.reset({
        businessName: BusinessGroup?.businessName,
        businessType: BusinessGroup?.businessType,
        areaLevel3: BusinessGroup?.businessAddress?.areaLevel3?.id as string,
        // areaLevel3: 'Medan Belawan',
        areaLevel4: BusinessGroup?.businessAddress?.areaLevel4?.id as string,
        // areaLevel4: '245e8842-15cd-4ab5-8ef6-3e04892d602d',
        budgetYear: BusinessGroup?.budgetYear,
        note: BusinessGroup?.note,
        status: BusinessGroup?.status,
        businessAddress: BusinessGroup?.businessAddress.fullAddress,
        members: BusinessGroup?.members?.map((member: any) => {
          // const { id } = member
          return { beneficiary: member.id, nik: member.identityNumber, position: member.position }
        })
      })
    }
  }, [isSuccess, BusinessGroup])

  React.useEffect(() => {
    if (isError) {
      toast({
        title: 'NIK tidak terdaftar',
        description: 'Maaf NIK tidak terdaftar silahkan daftarkan NIK pada menu Data Master',
        variant: 'destructive'
      })
    }
  }, [isError])

  React.useEffect(() => {
    if (beneficiary != null) {
      forms.setValue(`members.${index}.beneficiary`, beneficiary?.id)
      toast({
        title: 'NIK terdaftar',
        description: 'NIK terdaftar, silahkan isi form berikut'
      })
    }
  }, [beneficiary])

  // console.log(forms.formState.errors)
  const onSubmit = async (values: kubeFields) => {
    const newData = {
      ...values,
      members: values?.members?.map((member) => {
        const { nik, ...newMember } = member
        return newMember
      })
    }

    if (!id) {
      console.log('tes')
      createKube(newData, {
        onSuccess: () => forms.reset()
      })
      return
    }

    console.log('tes1')
    const results: any = { id, fields: newData }
    UpdateJointBusiness(results, { onSuccess: () => forms.reset() })
  }

  const handleFetchNik = async (index: number) => {
    const nik = forms.getValues(`members.${index}.nik`)
    if (nik != null) {
      setNIK(nik)
      setIndex(index)
    }
  }

  if (isLoadingUpdate || isLoadingBusinessGroupById) {
    return <Loading />
  }
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
                      <Input {...field} type="text" placeholder="Masukkan Nama Kelompok Masyarakat" />
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
                      <Input {...field} type="text" placeholder="Masukkan Jenis Usaha" />
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
            </div>
            <div className="w-6/12">
              <FormField
                name="areaLevel4"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Kelurahan</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value} disabled={areaLevel3 === ''}>
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
                    <Textarea {...field} placeholder="Masukkan Alamat Lengkap Masyarakat." />
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
                render={({ field }) => <Input {...field} type="text" hidden className="hidden" />}
              />
              <div className="w-6/12">
                <FormField
                  name={`members.${index}.nik`}
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold dark:text-white">NIK</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" placeholder="Masukkan NIK" />
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
                      <Input {...field} type="text" placeholder="Masukkan Tahun Anggaran" />
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
                      <Input {...field} type="text" placeholder="Masukkan Keterangan" />
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
