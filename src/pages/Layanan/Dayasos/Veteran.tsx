/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as React from 'react'

import { useTitle } from '@/hooks'
import { Container } from '@/components'
import { veteranValidation, type veteranFields } from '@/lib/validations/dayasos.validation'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useGetBeneficaryByNIK } from '@/store/server'
import { useToast } from '@/components/ui/use-toast'

const Veteran = () => {
  useTitle('Veteran')
  const { toast } = useToast()

  const [NIK, setNIK] = React.useState('')

  const forms = useForm<veteranFields>({
    mode: 'onTouched',
    resolver: yupResolver(veteranValidation),
    defaultValues: {
      veteranIdentityNumber: '',
      veteranUnit: '',
      uniformSize: ''
    }
  })

  const { data: beneficiary, refetch, isLoading, isError } = useGetBeneficaryByNIK(NIK, false)

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

  const onSubmit = async (values: veteranFields) => {
    console.log(values)
  }

  return (
    <Container className="py-10">
      <section className="w-9/12 mx-auto">
        <p className="text-2xl font-bold text-center">Data Veteran</p>
        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col">
            <div className="flex flex-row justify-between gap-3">
              <FormItem className="w-full">
                <FormLabel className="font-semibold dark:text-white">NIK</FormLabel>
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
                <Button className="w-full" loading={isLoading}>
                  Cari
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-5 mt-5">
              <FormField
                name="veteranIdentityNumber"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">NPV</FormLabel>
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
                render={({ field }) => <Input {...field} type="text" placeholder="Masukkan NPV" hidden />}
              />
              <FormField
                name="veteranUnit"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Satuan</FormLabel>
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
                    <FormLabel className="font-semibold dark:text-white">Ukuran Baju Celana</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Ukuran Baju Celana " />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <Button variant="cancel" className="font-bold" onClick={() => forms.reset()}>
                Cancel
              </Button>
              <Button className="font-bold">Submit</Button>
            </div>
          </form>
        </Form>
      </section>
    </Container>
  )
}

export default Veteran
