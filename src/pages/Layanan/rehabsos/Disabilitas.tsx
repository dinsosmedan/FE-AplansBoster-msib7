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
import { HiMagnifyingGlass, HiTrash } from 'react-icons/hi2'
import { cn } from '@/lib/utils'
import * as React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTitleHeader } from '@/store/client'
import { useNotFound, useToastNik } from '@/hooks'

const Disabilitas = () => {
  const navigate = useNavigate()

  const { id } = useParams<{ id: string }>()
  useTitle(`${id ? 'Ubah' : 'Tambah'} Data`)
  const setBreadcrumb = useTitleHeader((state) => state.setBreadcrumbs)

  React.useEffect(() => {
    setBreadcrumb([
      { url: '/data-penerima', label: 'Data Penerima' },
      { url: '/data-penerima/rehabos', label: 'Rehabsos' },
      { url: '/data-penerima/rehabsos/bstdisab', label: 'BST Disabilitas' }
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
    navigate('/data-penerima/rehabsos/lansia')
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
      <section className="w-full mx-auto">
        <p className="text-2xl font-bold text-center mb-3">Data Personal</p>
        <div className="flex flex-row gap-4">
            <div className="w-6/12">
            </div>
            </div>
        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col">
            {!id && (
              <div className="flex flex-row justify-between gap-3">
                <FormItem className="w-full">
                  <FormLabel className="font-semibold dark:text-white">NIK</FormLabel>
                  <Input
                    type="number"
                    placeholder="Masukkan NIK Masyarakat"
                    value={NIK}
                    onChange={(e) => setNIK(e.target.value)}
                  />
                </FormItem>
                <div className="w-fit flex items-end justify-end" onClick={async () => await refetch()}>
                  <Button className="w-full gap-2" loading={isLoading} type="button">
                    <HiMagnifyingGlass className="text-lg" />
                    <span>Cari</span>
                  </Button>
                </div>
              </div>
            )}
            <div className="grid grid-cols-2 gap-6">
              <FormField
                name="businessName"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">No. Kartu Keluarga</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} type="number" placeholder="Masukkan No. KK Masyarakat" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
              <FormField
                name="businessName"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Nama</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} type="text" placeholder="Masukkan Nama Masyarakat" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
               <div className="grid grid-cols-2 gap-5">
              <FormField
                name="businessName"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Tempat Lahir</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} type="text" placeholder="Masukkan Tempat Lahir" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
              <FormField
                name="budgetYear"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Tanggal Lahir</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} type="date" placeholder="Masukkan Tanggal Lahir" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-5">
            <FormField
                name="status"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Jenis Kelamin</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Jenis Kelamin" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="aktif">Perempuan</SelectItem>
                        <SelectItem value="non_aktif">Laki-laki</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
                 <FormField
                name="status"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Status Pencairan</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Status Pencairan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="aktif">Aktif</SelectItem>
                        <SelectItem value="non_aktif">Non Aktif</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              </div>
          <div className="w-full text-center">
            <p className="text-2xl font-bold mt-3">Alamat</p>
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

            <div className="flex justify-end gap-4 mt-8">
              <Button variant="cancel" className="font-bold" onClick={() => forms.reset()} type="button">
                Cancel
              </Button>
              <Button className="font-bold" type="submit" loading={isLoadingCreate || isLoadingUpdate}>
                {id ? 'Ubah Data' : 'Submit'}
              </Button>
            </div>
          </form>
        </Form>
      </section>
    </Container>
  )
}

export default Disabilitas
