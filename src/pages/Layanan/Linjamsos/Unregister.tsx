import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import useTitle from '@/hooks/useTitle'
import Container from '@/components/atoms/Container'
import { unregisterValidation, type unregisterFields } from '@/lib/validations/linjamsos.validation'
import { DatePicker, Loading } from '@/components'
import { yupResolver } from '@hookform/resolvers/yup'
import { useCreateUnregister, useGetDetailUnregister, useUpdateUnregister } from '@/store/server'
import { formatDateToString, formatStringToDate } from '@/lib/formatDate'
import { useNavigate, useParams } from 'react-router-dom'
import * as React from 'react'

const Unregister = () => {
  useTitle('Unregister)')

  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { mutate: createUnregister, isLoading } = useCreateUnregister()
  const { data: unregister, isLoading: isLoadingDetail, isSuccess } = useGetDetailUnregister(id as string)
  const { mutate: updateUnregister, isLoading: isLoadingUpdate } = useUpdateUnregister()

  const forms = useForm<unregisterFields>({
    mode: 'onTouched',
    resolver: yupResolver(unregisterValidation)
  })

  const onSuccess = () => {
    forms.reset()
    navigate('/data-penerima/linjamsos/data-unregister')
  }

  const onSubmit = async (values: unregisterFields) => {
    const newData = {
      ...values,
      dinsosLetterDate: formatDateToString(values.dinsosLetterDate as Date),
      hospitalEntryDate: formatDateToString(values.hospitalEntryDate as Date),
      hospitalLetterDate: formatDateToString(values.hospitalLetterDate as Date)
    }

    if (!id) return createUnregister(newData, { onSuccess })
    updateUnregister({ id, fields: newData }, { onSuccess })
  }

  React.useEffect(() => {
    if (isSuccess) {
      forms.reset({
        name: unregister.name,
        age: unregister.age,
        gender: unregister.gender,
        dinsosLetterNumber: unregister.dinsosLetterNumber,
        dinsosLetterDate: formatStringToDate(unregister.dinsosLetterDate),
        deseaseDiagnosis: unregister.deseaseDiagnosis,
        hospitalEntryDate: formatStringToDate(unregister.hospitalEntryDate),
        hospitalLetterNumber: unregister.hospitalLetterNumber,
        hospitalLetterDate: formatStringToDate(unregister.hospitalLetterDate)
      })
    }
  }, [isSuccess])

  if (isLoadingDetail) {
    return <Loading />
  }

  return (
    <Container className="px-[47px]">
      <div className="w-full text-center">
        <p className="text-2xl font-bold">Data Masyarakat</p>
      </div>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-row gap-4 mt-5">
            <div className="w-6/12">
              <FormField
                name="name"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Nama</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} type="text" placeholder=" Masukkan Nama" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="w-6/12">
              <FormField
                name="age"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Umur</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} type="text" placeholder="Masukkan Umur" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="w-6/12">
              <FormField
                name="gender"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Jenis Kelamin</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value ?? ''}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Jenis Kelamin" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="LAKI-LAKI">Laki-laki</SelectItem>
                          <SelectItem value="PEREMPUAN">Perempuan</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="w-6/12">
              <FormField
                name="dinsosLetterNumber"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Nomor Surat Dinsos</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ''}
                        type="text"
                        placeholder="Masukkan Nomor Surat Dinsos"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="w-6/12">
              <FormField
                name="dinsosLetterDate"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Tanggal Surat Dinsos</FormLabel>
                    <FormControl>
                      <DatePicker selected={field.value as Date} onChange={field.onChange} placeholder="dd/mm/yyyy" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="w-6/12">
              <FormField
                name="deseaseDiagnosis"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Diagnosa Penyakit</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ''}
                        type="text"
                        placeholder="Masukkan Diagnosa Penyakit"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="w-6/12">
              <FormField
                name="hospitalEntryDate"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Tanggal Masuk Rumah Sakit</FormLabel>
                    <FormControl>
                      <DatePicker selected={field.value as Date} onChange={field.onChange} placeholder="dd/mm/yyyy" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="w-6/12">
              <FormField
                name="hospitalLetterNumber"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">
                      Nomor Surat Pengantar dari Rumah Sakit
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ''}
                        type="text"
                        placeholder="Masukkan Nomor Surat Pengantar dari Rumah Sakit"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="w-6/12">
              <FormField
                name="hospitalLetterDate"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">
                      Tanggal Surat Pengantar dari Rumah Sakit
                    </FormLabel>
                    <FormControl>
                      <DatePicker selected={field.value as Date} onChange={field.onChange} placeholder="dd/mm/yyyy" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex justify-end gap-5">
            <Button variant="cancel" type="button">
              Cancel
            </Button>
            <Button type="submit" loading={isLoading || isLoadingUpdate}>
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </Container>
  )
}

export default Unregister
