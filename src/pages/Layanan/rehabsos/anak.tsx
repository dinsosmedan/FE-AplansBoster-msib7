import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import useTitle from '@/hooks/useTitle'
import Container from '@/components/atoms/Container'
import { useNavigate, useParams } from 'react-router-dom'
import { useTitleHeader } from '@/store/client'

import * as React from 'react'
import { tuitionAssistanceValidation, type tuitionAssistanceFields } from '@/lib/validations/linjamsos.validation'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import {
  useCreateTuitionAssistance,
  useGetBank,
  useGetBeneficaryByNIK,
  useGetEvent,
  useGetStudyPrograms,
  useGetTuitionAssistanceID,
  useGetUniversities,
  useUpdateTuitionAssistance
} from '@/store/server'
import { useNotFound, useToastNik } from '@/hooks'
import { Loading, SearchSelect } from '@/components'
import { yupResolver } from '@hookform/resolvers/yup'

const Anak = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  useTitle(`${id ? ' Ubah' : 'Tambah'} Data`)
  const setBreadcrumbs = useTitleHeader((state) => state.setBreadcrumbs)

  React.useEffect(() => {
    setBreadcrumbs([
      { url: '/data-penerima', label: 'Data Penerima' },
      { url: '/data-penerima/rehabsos', label: 'Rehabsos' },
      { url: '/data-penerima/rehabsos/anak', label: 'BST Anak Di Luar Panti' }
    ])
  }, [])
  const [NIK, setNIK] = React.useState('')

  const forms = useForm<tuitionAssistanceFields>({
    mode: 'onTouched',
    resolver: yupResolver(tuitionAssistanceValidation)
  })

  const university = forms.watch('universityId')
  const studyProgram = forms.watch('studyProgramId')
  const bank = forms.watch('bank')

  const { data: beneficiary, refetch, isLoading, isError } = useGetBeneficaryByNIK(NIK, false)
  const { data: events } = useGetEvent()
  const { data: universities } = useGetUniversities()
  const { data: studyPrograms } = useGetStudyPrograms(university)
  const { data: bankLists } = useGetBank()

  const { mutate: updateTuitionAssistance, isLoading: isLoadingUpdate } = useUpdateTuitionAssistance()
  const { mutate: createTuitionAssistance, isLoading: isLoadingCreate } = useCreateTuitionAssistance()
  const {
    data: tuitionAssistance,
    isLoading: isLoadingGet,
    isError: isErrorGet,
    isSuccess: isSuccessGet
  } = useGetTuitionAssistanceID(id as string)

  useNotFound(isErrorGet)

  useToastNik({
    successCondition: !isLoading && beneficiary != null,
    onSuccess: () => forms.setValue('beneficiary', beneficiary?.id as string),
    notFoundCondition: isError,
    notRegisteredCondition: forms.getValues('beneficiary') === '' && NIK !== '' && forms.formState.isSubmitted
  })

  React.useEffect(() => {
    if (bank) {
      forms.setValue('bankAccountName', bankLists?.find((item) => item.id === bank)?.name as string)
    }
    if (studyProgram) {
      forms.setValue('studyProgramName', studyPrograms?.find((item) => item.id === studyProgram)?.name as string)
    }
    if (university) {
      forms.setValue('universityName', universities?.find((item) => item.id === university)?.name as string)
    }
  }, [bank, studyProgram, university])

  React.useEffect(() => {
    if (isSuccessGet) {
      forms.reset({
        beneficiary: tuitionAssistance.application.beneficiary.id,
        event: tuitionAssistance.application.event.id,
        phoneNumber: tuitionAssistance.application.phoneNumber,
        email: tuitionAssistance.application.email,
        universityId: tuitionAssistance.application.university.id,
        universityName: tuitionAssistance.application.university.name,
        studyProgramId: tuitionAssistance.application.studyProgram.id,
        studyProgramName: tuitionAssistance.application.studyProgram.name,
        semester: tuitionAssistance.application.semester,
        gpa: tuitionAssistance.application.gpa,
        tuitionFee: tuitionAssistance.application.tuitionFee as number,
        bankAccountNumber: tuitionAssistance.application.bankAccNumber,
        bankAccountName: tuitionAssistance.application.bankAccName,
        bank: tuitionAssistance.application.id
      })
    }
  }, [isSuccessGet])

  const onSuccess = () => {
    forms.reset()
    setNIK('')
    navigate('/data-penerima/rehabsos/anak')
  }

  const onSubmit = async (values: tuitionAssistanceFields) => {
    if (!id) return createTuitionAssistance(values, { onSuccess })
    updateTuitionAssistance({ id, fields: values }, { onSuccess })
  }

  if (isLoadingGet) return <Loading />

  return (
    <Container className="px-[47px]">
      <div className="w-full text-center">
        <p className="text-3xl font-bold">Data Personal</p>
      </div>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {!id && (
            <div className="flex flex-row gap-x-2 gap-y-2">
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
              <div className="wgrid grid-cols-3 gap-5">
                <Button
                  className="w-full gap-3"
                  type="button"
                  loading={isLoading}
                  onClick={async () => await refetch()}
                >
                  <HiMagnifyingGlass className="text-lg" />
                  <span>Cari</span>
                </Button>
              </div>
            </div>
          )}
          <div className="flex flex-row gap-4">
          <div className=" w-6/12">
          <FormField
                name="bankAccountNumber"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">No. Kartu Keluarga</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} type="number" placeholder="No. Kartu Keluarga" />
                    </FormControl>
                  </FormItem>
                )}
              />
              </div>
              <div className=" w-6/12"><FormField
                name="beneficiary"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} hidden className="hidden" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="gpa"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Nama</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} type="text" placeholder="Nama" />
                    </FormControl>
                  </FormItem>
                )}
              /></div>
              <div className=" w-6/12">
              <FormField
                name="beneficiary"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} hidden className="hidden" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="gpa"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Tempat Lahir</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} type="text" placeholder="Tempat Lahir" />
                    </FormControl>
                  </FormItem>
                )}
              />
              </div>
          </div>
          <div className="flex flex-row gap-4">
          <div className=" w-6/12">
          <FormField
                name="email"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Tanggal Lahir</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} type="date" placeholder="Tanggal Lahir" />
                    </FormControl>
                  </FormItem>
                )}
              />
              </div>
              <div className=" w-6/12">
                <FormField
                name="beneficiary"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} hidden className="hidden" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="gpa"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Nama Ayah Kandung</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} type="text" placeholder="Nama Ayah Kandung" />
                    </FormControl>
                  </FormItem>
                )}
              /></div>
              <div className=" w-6/12">
              <FormField
                name="beneficiary"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} hidden className="hidden" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="gpa"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Nama Ibu Kandung</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} type="text" placeholder=" Nama Ibu Kandung" />
                    </FormControl>
                  </FormItem>
                )}
              />
              </div>
          </div>
          {/* <div className="flex flex-row gap-4">
            <div className="w-6/12">
              <FormField
                name="universityId"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Tanggal Lahir</FormLabel>
                    <FormControl>
                      <SearchSelect
                        selected={field.value}
                        onChange={field.onChange}
                        width="w-[560px]"
                        placeholder="Pilih Perguruan Tinggi"
                        options={
                          universities?.map((university) => ({ label: university.name, value: university.id })) ?? []
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="w-6/12">
              <FormField
                name="studyProgramId"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Program Studi</FormLabel>
                    <FormControl>
                      <SearchSelect
                        selected={field.value}
                        onChange={field.onChange}
                        width="w-[560px]"
                        disabled={!university || !studyPrograms}
                        placeholder="Pilih Prodi"
                        options={
                          studyPrograms?.map((studyProgram) => ({
                            label: studyProgram.name,
                            value: studyProgram.id
                          })) ?? []
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div> */}
          <div className="flex flex-row gap-4">
            <div className="w-full">
              <FormField
                name="semester"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Status DKS</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} type="number" placeholder="Status DKS" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="w-full text-center">
            <p className="text-2xl font-bold">Alamat</p>
          </div>
          <div className="flex flex-row gap-4">
            <div className="w-6/12">
              <FormField
                name="bank"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Kecamatan</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Kecamatan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {bankLists?.map((bank) => (
                          <SelectItem key={bank.id} value={bank.id}>
                            {bank.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <div className="w-6/12">
              <FormField
                name="bankAccountNumber"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Kelurahan</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} type="text" placeholder="Kelurahan" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
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
    </Container>
  )
}

export default Anak
