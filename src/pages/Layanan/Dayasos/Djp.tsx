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

const Djpm = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  useTitle(`${id ? ' Ubah' : 'Tambah'} Data`)
  const setBreadcrumbs = useTitleHeader((state) => state.setBreadcrumbs)

  React.useEffect(() => {
    setBreadcrumbs([
      { url: '/data-penerima', label: 'Data Penerima' },
      { url: '/data-penerima/dayasos', label: 'Dayasos & PFM' },
      { url: '/data-penerima/dayasos/djpm', label: 'DJPM' }
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
    navigate('/data-penerima/dayasos/djpm')
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
            <FormField
              name="phoneNumber"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="mt-5 mb-8">
                  <FormLabel className="font-semibold dark:text-white">No. Telepon</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} type="number" placeholder="Masukkan No. Telepon" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="text-2xl font-bold text-center mb-6">Data Bank</p>
            <FormField
              name="beneficiary"
              control={forms.control}
              render={({ field }) => (
                <Input {...field} value={field.value ?? ''} type="text" hidden className="hidden" />
              )}
            />
            <div className="grid grid-cols-3 gap-5">
              <FormField
                name="bankAccountNumber"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">No. Rekening Bank Sumut</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} type="number" placeholder="Masukkan No. Rekening" />
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
                    <FormLabel className="font-semibold dark:text-white">Nama Rekening Bank Sumut</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} type="text" placeholder="Masukkan Nama Rekening" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="bankBranchName"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Kantor Cabang Bank Sumut</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ''}
                        type="text"
                        placeholder="Masukkan Kantor Cabang Rekening"
                      />
                    </FormControl>
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
              <FormField
                name="assistanceAmount"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Nominal Bantuan</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ''}
                        type="number"
                        placeholder="Masukkan Nominal Bantuan"
                      />
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
                    <FormLabel className="font-semibold dark:text-white">Tahun anggaran</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} type="number" placeholder="Masukkan Tahun Anggaran" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <p className="text-2xl font-bold text-center mb-5 mt-12">Data Tugas</p>
            <div className="grid grid-cols-3 gap-5">
              <FormField
                name="dutyPlace"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Tempat Tugas</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} type="text" placeholder="Masukkan Nama Rekening" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="dutyAddress"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Alamat Tugas</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ''}
                        type="text"
                        placeholder="Masukkan Alamat Lengkap Tugas"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="serviceType"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Jenis Layanan</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pliih Jenis Layanan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {serviceTypes?.map((serviceType) => (
                          <SelectItem value={serviceType.id} key={serviceType.id}>
                            {serviceType.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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

export default Djpm
