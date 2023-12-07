import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { type vulnerableGroupHandlingFields } from '@/lib/validations/linjamsos.validation'
import { useCreateVulnerableGroupHandling, useGetBeneficaryByNIK } from '@/store/server'
import { Container, DatePicker } from '@/components'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useTitle from '@/hooks/useTitle'
import { useToastNik } from '@/hooks'

import * as React from 'react'
import { useForm } from 'react-hook-form'

const Pkr = () => {
  useTitle('Penanganan Kelompok Rentan (PKR)')
  const [NIK, setNIK] = React.useState('')

  const { mutate: createVulnerableGroupHandling, isLoading: isLoadingCreate } = useCreateVulnerableGroupHandling()
  const { data: beneficiary, refetch, isLoading, isError } = useGetBeneficaryByNIK(NIK, false)

  const forms = useForm<vulnerableGroupHandlingFields>({
    mode: 'onTouched'
  })

  const onSubmit = async (values: vulnerableGroupHandlingFields) => {
    createVulnerableGroupHandling(values, {
      onSuccess: () => forms.reset()
    })
  }

  useToastNik({
    successCondition: !isLoading && beneficiary != null,
    onSuccess: () => forms.setValue('beneficiary', beneficiary?.id as string),
    notFoundCondition: isError,
    notRegisteredCondition: forms.getValues('beneficiary') === '' && NIK !== '' && forms.formState.isSubmitted
  })

  return (
    <Container className="py-7">
      <section className="w-9/12 mx-auto">
        <p className="text-2xl font-bold text-center">Data Personal</p>
        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="flex flex-row justify-between gap-3">
              <div className="w-11/12">
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">NIK</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      value={NIK}
                      onChange={(e) => setNIK(e.target.value)}
                      placeholder="Masukkan NIK Masyarakat"
                    />
                  </FormControl>
                </FormItem>
              </div>
              <div className="w-1/12 flex items-end justify-end">
                <Button className="w-full" type="button" onClick={async () => await refetch()} loading={isLoading}>
                  Cari
                </Button>
              </div>
            </div>
            <div className="w-full text-center">
              <p className="text-2xl font-bold">Alamat</p>
            </div>
            <div className="flex flex-row gap-4">
              <div className="w-6/12">
                <FormField
                  name="incidentDate"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold dark:text-white">Tanggal Kejadian</FormLabel>
                      <FormControl>
                        <DatePicker selected={field.value as Date} onChange={field.onChange} placeholder="dd/mm/yyyy" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="beneficiary"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} value={field.value ?? ''} type="text" hidden className="hidden" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-6/12">
                <FormField
                  name="incidentAddress"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold dark:text-white">Alamat Kejadian</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value ?? ''}
                          type="text"
                          placeholder="Masukkan Alamat Kejadian"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="w-full text-center">
              <p className="text-2xl font-bold">Data Bank</p>
            </div>
            <div className="flex flex-row gap-4">
              <div className="w-6/12">
                <FormField
                  name="bankAccountNumber"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold dark:text-white">No Rekening</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value ?? ''} type="text" placeholder="Masukkan No Rekening" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-6/12">
                <FormField
                  name="bankName"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold dark:text-white">Masukkan Nama Bank</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value ?? ''} type="text" placeholder="Masukkan Nama Bank" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-row gap-4">
              <div className="w-6/12">
                <FormField
                  name="assistanceAmount"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold dark:text-white">Jumlah Dibantu</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value ?? ''} type="text" placeholder="Masukkan Jumlah Dibantu" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-6/12">
                <FormField
                  name="budgetYear"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold dark:text-white">Tahun</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value ?? ''} type="text" placeholder="Masukkan Tahun" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex justify-end gap-5">
              <Button variant="cancel" type="button" onClick={() => forms.reset()}>
                Cancel
              </Button>
              <Button type="submit" loading={isLoadingCreate}>
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </section>
    </Container>
  )
}

export default Pkr
