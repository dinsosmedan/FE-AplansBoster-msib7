import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Container, Loading } from '@/components'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import { useNavigate, useParams } from 'react-router-dom'

import {
  useCreateServiceFund,
  useGetBeneficaryByNIK,
  useGetServiceFund,
  useGetServiceTypes,
  useUpdateServiceFund
} from '@/store/server'
import { useTitleHeader } from '@/store/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNotFound, useToastNik, useTitle } from '@/hooks'
import { djpmValidation, type djpmFields } from '@/lib/validations/dayasos.validation'
import DataBSTdisab from '@/pages/DataPenerima/Rehabsos/DataBSTdisab'

const BSTdisab = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  useTitle(`${id ? ' Ubah' : 'Tambah'} Data`)
  const setBreadcrumbs = useTitleHeader((state) => state.setBreadcrumbs)

  React.useEffect(() => {
    setBreadcrumbs([
      { url: '/data-penerima', label: 'Data Penerima' },
      { url: '/data-penerima/rehabos', label: 'Rehabsos' },
      { url: '/data-penerima/rehabsos/bstdisab', label: 'BST Disabilitas' }
    ])
  }, [])

  const [NIK, setNIK] = React.useState('')

  const forms = useForm<djpmFields>({
    mode: 'onTouched',
    resolver: yupResolver(djpmValidation),
    defaultValues: {
      bankAccountNumber: '',
      bankAccountName: '',
      bankBranchName: '',
      status: '',
      budgetYear: '',
      dutyAddress: '',
      serviceType: '',
      beneficiary: '',
      phoneNumber: '',
      dutyPlace: ''
    }
  })

  const { mutate: createServiceFund, isLoading: isLoadingCreate } = useCreateServiceFund()
  const { data: beneficiary, refetch, isLoading, isError } = useGetBeneficaryByNIK(NIK, false)
  const { mutateAsync: updateServiceFund, isLoading: isLoadingUpdate } = useUpdateServiceFund()
  const { data: serviceTypes } = useGetServiceTypes()
  const {
    data: serviceFund,
    isSuccess,
    isLoading: isLoadingServiceFund,
    isError: isErrorServiceFund
  } = useGetServiceFund(id)

  useNotFound(isErrorServiceFund)

  useToastNik({
    successCondition: !isLoading && beneficiary != null,
    onSuccess: () => forms.setValue('beneficiary', beneficiary?.id as string),
    notFoundCondition: isError,
    notRegisteredCondition: forms.getValues('beneficiary') === '' && NIK !== '' && forms.formState.isSubmitted
  })

  React.useEffect(() => {
    if (isSuccess) {
      forms.setValue('beneficiary', serviceFund?.beneficiary?.id)
      forms.setValue('phoneNumber', serviceFund?.phoneNumber)
      forms.setValue('serviceType', serviceFund?.serviceType?.id)
      forms.setValue('dutyPlace', serviceFund?.dutyPlace)
      forms.setValue('dutyAddress', serviceFund?.dutyAddress)
      forms.setValue('bankAccountNumber', serviceFund?.bankAccountNumber)
      forms.setValue('bankAccountName', serviceFund?.bankAccountName)
      forms.setValue('bankBranchName', serviceFund?.bankBranchName)
      forms.setValue('status', serviceFund?.status as string)
      forms.setValue('budgetYear', serviceFund?.budgetYear)
      forms.setValue('assistanceAmount', serviceFund?.assistanceAmount as number)
    }
  }, [isSuccess, serviceFund])

  const onSuccess = () => {
    forms.reset()
    navigate('/data-penerima/rehabsos/bstdisab')
  }
  const onSubmit = async (values: djpmFields) => {
    if (!id) return createServiceFund(values, { onSuccess })
    await updateServiceFund({ id, fields: values }, { onSuccess })
  }

  if (isLoadingServiceFund) return <Loading />

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
                name="phoneNumber"
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
                name="bankAccountName"
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
                name="dutyAddress"
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
            <p className="text-2xl font-bold text-center mb-5 mt-12">Alamat</p>
            <div className="grid grid-cols-2 gap-5">
              <FormField
                name="dutyPlace"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Kecamatan</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} type="text" placeholder="kecamatan" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="beneficiary"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Kelurahan</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ''}
                        type="text"
                        placeholder="Kelurahan"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              </div>
              <div className="flex flex-row gap-4">
            <div className="w-full">
            <FormField
                name="bankAccountNumber"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Alamat Lengkap</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} type="text" placeholder="Masukkan Alamat Lengkap" />
                    </FormControl>
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
                {id ? 'Ubah Data' : 'Submit'}
              </Button>
            </div>
          </form>
        </Form>
      </section>
    </Container>
  )
}

export default BSTdisab
