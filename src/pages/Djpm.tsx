import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import useTitle from '@/hooks/useTitle'
import { djpmValidation, type djpmFields } from '@/lib/validations/dayasos.validation'
import { Container } from '@/components'
import * as React from 'react'
import { useCreateServiceFund, useGetBeneficaryByNIK, useGetServiceFund, useGetServiceTypes } from '@/store/server'
import { useToast } from '@/components/ui/use-toast'
import { yupResolver } from '@hookform/resolvers/yup'
import { useParams } from 'react-router-dom'

const Djpm = () => {
  const { toast } = useToast()
  const { id } = useParams<{ id: string }>()
  useTitle(`Dana Jasa Pelayanan Masyarakat${id ? '[Ubah Data]' : ''}`)

  const [NIK, setNIK] = React.useState('')

  const forms = useForm<djpmFields>({
    mode: 'onTouched',
    resolver: yupResolver(djpmValidation),
    defaultValues: {
      bankAccountNumber: '',
      bankAccountName: '',
      bankBranchName: '',
      status: '',
      assistanceAmount: 0,
      budgetYear: '',
      dutyAddress: '',
      serviceType: '',
      beneficiary: '',
      phoneNumber: '',
      dutyPlace: ''
    }
  })

  const onSubmit = (values: djpmFields) => {
    createServiceFund(values, {
      onSuccess: () => forms.reset()
    })
  }

  const { data: beneficiary, refetch, isLoading, isError } = useGetBeneficaryByNIK(NIK, false)
  const { data: serviceFund, isSuccess } = useGetServiceFund(id)
  const { data: serviceTypes } = useGetServiceTypes()

  const { mutate: createServiceFund, isLoading: isLoadingCreate } = useCreateServiceFund()

  React.useEffect(() => {
    if (!isLoading && beneficiary != null) {
      forms.setValue('beneficiary', beneficiary?.id)
      toast({
        title: 'NIK terdaftar',
        description: 'NIK terdaftar, silahkan isi form berikut'
      })
    }
  }, [isLoading, beneficiary])

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
    if (forms.getValues('beneficiary') === '' && NIK !== '' && forms.formState.isSubmitted) {
      toast({
        title: 'NIK wajib terdaftar',
        description: 'Anda belum tekan tombol cari untuk mencari NIK, apakah NIK Anda terdaftar atau belum',
        variant: 'destructive'
      })
    }
  }, [forms.getValues('beneficiary'), NIK, forms.formState.isSubmitted])

  React.useEffect(() => {
    if (isSuccess) {
      forms.setValue('bankAccountNumber', serviceFund?.bankAccountNumber)
      forms.setValue('bankAccountName', serviceFund?.bankAccountName)
      forms.setValue('bankBranchName', serviceFund?.bankBranchName)
      forms.setValue('status', serviceFund?.status as string)
      forms.setValue('assistanceAmount', serviceFund?.assistanceAmount as number)
      forms.setValue('budgetYear', serviceFund?.budgetYear)
      forms.setValue('dutyAddress', serviceFund?.dutyAddress)
      forms.setValue('dutyPlace', serviceFund?.dutyPlace)
      forms.setValue('serviceType', '9ab9e901-b996-4170-ae99-5ca29e519c27')
      forms.setValue('phoneNumber', serviceFund?.phoneNumber)
    }
  }, [isSuccess, serviceFund])

  return (
    <Container className="py-10">
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
                  <Button className="w-full" loading={isLoading} type="button">
                    Cari
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Status Pencairan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="disetujui">Disetujui</SelectItem>
                        <SelectItem value="diproses">Diproses</SelectItem>
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
                      <Input {...field} value={field.value ?? ''} type="text" placeholder="Masukkan Tahun Anggaran" />
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
              <Button variant="cancel" className="font-bold" onClick={() => forms.reset()}>
                Cancel
              </Button>
              <Button className="font-bold" type="submit" loading={isLoadingCreate}>
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
