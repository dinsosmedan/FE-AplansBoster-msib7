import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as React from 'react'

import { useTitle, useToastNik } from '@/hooks'
import { Container, Loading } from '@/components'
import { veteranValidation, type veteranFields } from '@/lib/validations/dayasos.validation'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useCreateVeteran, useGetBeneficaryByNIK, useGetVeteranById, useUpdateVeteran } from '@/store/server'
import { useParams } from 'react-router-dom'

const Veteran = () => {
  useTitle('Veteran')

  const { id } = useParams<{ id: string }>()
  const [NIK, setNIK] = React.useState('')

  const forms = useForm<veteranFields>({
    mode: 'onTouched',
    resolver: yupResolver(veteranValidation),
    defaultValues: {
      veteranIdentityNumber: '',
      veteranUnit: '',
      uniformSize: '',
      beneficiary: ''
    }
  })

  const { data: beneficiary, refetch, isLoading, isError } = useGetBeneficaryByNIK(NIK, false)
  const { mutate: createVeteran, isLoading: isLoadingCreate } = useCreateVeteran()

  const { data: veteran, isLoading: isLoadingVeteran, isSuccess } = useGetVeteranById(id)
  const { mutate: updateVeteran, isLoading: isLoadingUpdate } = useUpdateVeteran()

  useToastNik({
    successCondition: !isLoading && beneficiary != null,
    onSuccess: () => forms.setValue('beneficiary', beneficiary?.id as string),
    notFoundCondition: isError,
    notRegisteredCondition: forms.getValues('beneficiary') === '' && NIK !== '' && forms.formState.isSubmitted
  })

  React.useEffect(() => {
    if (isSuccess) {
      forms.reset({
        beneficiary: veteran.beneficiary.id,
        veteranIdentityNumber: veteran.veteranIdentityNumber,
        veteranUnit: veteran.veteranUnit,
        uniformSize: veteran.uniformSize as string,
        isActive: Boolean(veteran.isActive)
      })
    }
  }, [isSuccess])

  const onSubmit = async (values: veteranFields) => {
    if (!id) {
      createVeteran(values, { onSuccess: () => forms.reset() })
      return
    }

    const data = { id, fields: values }
    updateVeteran(data, {
      onSuccess: () => forms.reset()
    })
  }

  if (isLoadingVeteran) {
    return <Loading />
  }

  return (
    <Container className="py-10">
      <section className="w-9/12 mx-auto">
        <p className="text-2xl font-bold text-center">Data Veteran</p>
        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col">
            {!id && (
              <div className="flex flex-row justify-between gap-3">
                <FormItem className="w-full">
                  <FormLabel>NIK</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Masukkan NIK Masyarakat"
                      value={NIK}
                      onChange={(e) => setNIK(e.target.value)}
                    />
                  </FormControl>
                </FormItem>
                <div className="w-fit flex items-end justify-end" onClick={async () => await refetch()}>
                  <Button className="w-full" loading={isLoading} type="button">
                    Cari
                  </Button>
                </div>
              </div>
            )}
            <div className="grid grid-cols-2 gap-x-8 gap-y-5 mt-5">
              <FormField
                name="veteranIdentityNumber"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NPV</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan NPV" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="beneficiary"
                control={forms.control}
                render={({ field }) => <Input {...field} type="text" className="hidden" hidden />}
              />
              <FormField
                name="veteranUnit"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Satuan</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Satuan" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="uniformSize"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ukuran Baju Celana</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Ukuran Baju Celana " />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <Button
                variant="cancel"
                className="font-bold"
                type="button"
                onClick={() => {
                  forms.reset()
                  setNIK('')
                }}
              >
                Cancel
              </Button>
              <Button className="font-bold" type="submit" loading={isLoadingCreate || isLoadingUpdate}>
                {id ? 'Update' : 'Submit'}
              </Button>
            </div>
          </form>
        </Form>
      </section>
    </Container>
  )
}

export default Veteran
