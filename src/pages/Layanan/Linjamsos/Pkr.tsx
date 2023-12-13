import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import {
  vulnerableGroupHandlingValidation,
  type vulnerableGroupHandlingFields
} from '@/lib/validations/linjamsos.validation'
import {
  useCreateVulnerableGroupHandling,
  useGetBeneficaryByNIK,
  useGetDetailVulnerableGroupHandling,
  useUpdateVulnerableGroupHandling
} from '@/store/server'
import { Container, DatePicker, Loading } from '@/components'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useTitle from '@/hooks/useTitle'
import { useToastNik } from '@/hooks'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { formatDateToString, formatStringToDate } from '@/lib/services/formatDate'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import { useTitleHeader } from '@/store/client'

const Pkr = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  useTitle(`${id ? ' Ubah' : 'Tambah'} Data`)
  const setBreadcrumbs = useTitleHeader((state) => state.setBreadcrumbs)

  React.useEffect(() => {
    setBreadcrumbs([
      { url: '/data-penerima/linjamsos', label: 'Linjamsos' },
      { url: '/data-penerima/dayasos/pkr', label: 'PKR' }
    ])
  }, [])

  const [NIK, setNIK] = React.useState('')

  const { mutate: createVulnerableGroupHandling, isLoading: isLoadingCreate } = useCreateVulnerableGroupHandling()
  const { data: beneficiary, refetch, isLoading, isError } = useGetBeneficaryByNIK(NIK, false)
  const {
    data: vulnerableGroupHandling,
    isLoading: isLoadingDetail,
    isSuccess
  } = useGetDetailVulnerableGroupHandling(id as string)

  const { mutate: updateVulnerableGroupHandling, isLoading: isLoadingUpdate } = useUpdateVulnerableGroupHandling()

  const forms = useForm<vulnerableGroupHandlingFields>({
    mode: 'onTouched',
    resolver: yupResolver(vulnerableGroupHandlingValidation)
  })

  const onSuccess = () => {
    forms.reset()
    navigate('/data-penerima/linjamsos/pkr')
  }

  const onSubmit = async (values: vulnerableGroupHandlingFields) => {
    const newData = {
      ...values,
      incidentDate: formatDateToString(values.incidentDate as Date)
    }
    if (!id) return createVulnerableGroupHandling(newData, { onSuccess })
    updateVulnerableGroupHandling({ id, fields: newData }, { onSuccess })
  }

  useToastNik({
    successCondition: !isLoading && beneficiary != null,
    onSuccess: () => forms.setValue('beneficiary', beneficiary?.id as string),
    notFoundCondition: isError,
    notRegisteredCondition: forms.getValues('beneficiary') === '' && NIK !== '' && forms.formState.isSubmitted
  })

  React.useEffect(() => {
    if (isSuccess) {
      forms.reset({
        beneficiary: vulnerableGroupHandling.beneficiary.id,
        assistanceAmount: vulnerableGroupHandling.assistanceAmount,
        bankAccountNumber: vulnerableGroupHandling.bankAccountNumber,
        bankName: vulnerableGroupHandling.bankName,
        budgetYear: vulnerableGroupHandling.budgetYear,
        incidentAddress: vulnerableGroupHandling.incidentAddress,
        incidentDate: vulnerableGroupHandling.incidentDate
          ? formatStringToDate(vulnerableGroupHandling.incidentDate)
          : ''
      })
    }
  }, [vulnerableGroupHandling])

  if (isLoadingDetail) {
    return <Loading />
  }

  return (
    <Container className="py-7">
      <section className="w-9/12 mx-auto">
        {!id && <p className="text-2xl font-bold text-center">Data Personal</p>}
        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
            {!id && (
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
                <div className="w-fit flex items-end justify-end" onClick={async () => await refetch()}>
                  <Button className="w-full gap-2" loading={isLoading} type="button">
                    <HiMagnifyingGlass className="text-lg" />
                    <span>Cari</span>
                  </Button>
                </div>
              </div>
            )}
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
                        <Input {...field} value={field.value ?? ''} type="number" placeholder="Masukkan No Rekening" />
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
                        <Input
                          {...field}
                          value={field.value ?? ''}
                          type="number"
                          placeholder="Masukkan Jumlah Dibantu"
                        />
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
                        <Input {...field} value={field.value ?? ''} type="number" placeholder="Masukkan Tahun" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex justify-end gap-4">
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

export default Pkr
