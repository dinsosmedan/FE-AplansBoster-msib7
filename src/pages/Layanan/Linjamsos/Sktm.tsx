import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import useTitle from '@/hooks/useTitle'
import { Container } from '@/components'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import { useTitleHeader } from '@/store/client'
import * as React from 'react'
import { useCreateIndegencyCertificate, useMutationGetBeneficaryByNIK } from '@/store/server'
import { useToastNik } from '@/hooks'
import { indigencyCertificateValidation, type indigencyCertificateFields } from '@/lib/validations/linjamsos.validation'
import { yupResolver } from '@hookform/resolvers/yup'
import { CATEGORY_APPLICATION, STATUS_DTKS } from '@/lib/data'

const Pkr = () => {
  const navigate = useNavigate()
  useTitle('Tambah Data')
  const setBreadcrumbs = useTitleHeader((state) => state.setBreadcrumbs)

  React.useEffect(() => {
    setBreadcrumbs([
      { url: '/data-penerima', label: 'Data Penerima' },
      { url: '/data-penerima/linjamsos', label: 'Linjamsos' },
      { url: '/data-penerima/linjamsos/sktm', label: 'SKTM' }
    ])
  }, [])

  const forms = useForm<indigencyCertificateFields>({
    mode: 'onTouched',
    resolver: yupResolver(indigencyCertificateValidation)
  })

  const [beneficaryApplicant, setBeneficaryApplicant] = React.useState('')
  const [beneficaryPeopleConcerned, setBeneficaryPeopleConcerned] = React.useState('')
  const { mutate: searchNik, isLoading, isError, isSuccess } = useMutationGetBeneficaryByNIK()
  const { mutate: createIndegencyCertificate, isLoading: isLoadingCreate } = useCreateIndegencyCertificate()

  useToastNik({
    successCondition: !isLoading && isSuccess,
    notFoundCondition: isError,
    notRegisteredCondition:
      (forms.getValues('applicant') === '' || forms.getValues('peopleConcerned') === '') && forms.formState.isSubmitted
  })

  const handleApplicantSearch = () => {
    const applicant = forms.getValues('applicant')
    if (applicant !== '') {
      searchNik(applicant, {
        onError: () => {
          forms.setError('applicant', { type: 'manual', message: 'NIK tidak terdaftar' })
        },
        onSuccess: (data) => {
          forms.clearErrors('applicant')
          setBeneficaryApplicant(data.id)
        }
      })
    }
  }

  const handlePeopleConcernedSearch = () => {
    const peopleConcerned = forms.getValues('peopleConcerned')
    if (peopleConcerned !== '') {
      searchNik(peopleConcerned, {
        onError: () => {
          forms.setError('peopleConcerned', { type: 'manual', message: 'NIK tidak terdaftar' })
        },
        onSuccess: (data) => {
          forms.clearErrors('peopleConcerned')
          setBeneficaryPeopleConcerned(data.id)
        }
      })
    }
  }

  const onSuccess = () => {
    forms.reset()
    navigate('/data-penerima/linjamsos/sktm')
  }

  const onSubmit = async (values: indigencyCertificateFields) => {
    const newData = {
      ...values,
      applicant: beneficaryApplicant,
      peopleConcerned: beneficaryPeopleConcerned
    }

    createIndegencyCertificate(newData, { onSuccess })
  }

  return (
    <Container className="py-10">
      <section className="w-9/12 mx-auto">
        <p className="text-2xl font-bold text-center">Data Pemohon</p>
        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="flex flex-row justify-between gap-3">
              <div className="w-11/12">
                <FormField
                  name="applicant"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold dark:text-white">NIK Pemohon</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value ?? ''}
                          type="number"
                          placeholder="Masukkan NIK Masyarakat"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-fit flex items-end justify-end">
                <Button className="w-full gap-2" type="button" loading={isLoading} onClick={handleApplicantSearch}>
                  <HiMagnifyingGlass className="text-lg" />
                  <span>Cari</span>
                </Button>
              </div>
            </div>

            <div className="flex flex-row justify-between gap-3">
              <div className="w-11/12">
                <FormField
                  name="peopleConcerned"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold dark:text-white">NIK Yang Bersangkutan</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value ?? ''} type="number" placeholder="Masukkan NIK " />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-fit flex items-end justify-end">
                <Button
                  className="w-full gap-2"
                  type="button"
                  loading={isLoading}
                  onClick={handlePeopleConcernedSearch}
                >
                  <HiMagnifyingGlass className="text-lg" />
                  <span>Cari</span>
                </Button>
              </div>
            </div>
            <div className="w-12/12">
              <FormField
                name="statusDtks"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Status DTKS</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih status DTKS" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {STATUS_DTKS.map((status, index) => (
                          <SelectItem key={index} value={status.value} className="capitalize">
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full text-center">
              <p className="text-2xl font-bold">Lainnya</p>
            </div>
            <div className="flex flex-row gap-4">
              <div className="w-6/12">
                <FormField
                  name="certificateDestination"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold dark:text-white">Tujuan SKTM</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value ?? ''} type="text" placeholder="Masukkan Tujuan SKTM" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-6/12">
                <FormField
                  name="categoryApplication"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold dark:text-white">Kategori SKTM</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih kategori SKTM" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {CATEGORY_APPLICATION.map((category, index) => (
                            <SelectItem key={index} value={category.value} className="capitalize">
                              {category.value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <Button variant="cancel" className="font-bold" onClick={() => forms.reset()} type="button">
                Cancel
              </Button>
              <Button className="font-bold" type="submit" loading={isLoadingCreate}>
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
