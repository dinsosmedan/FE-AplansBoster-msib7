import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Modal } from '../..'
import { useForm } from 'react-hook-form'
import {
  updateTuitionAssistanceValidation,
  type updateTuitionAssistanceFields
} from '@/lib/validations/linjamsos.validation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import * as React from 'react'
import { useGetTuitionAssistanceEventById, useUpateTuitionAssistanceEvent } from '@/store/server/useService'
import { useGetBank, useGetEvent, useGetStudyPrograms, useGetUniversities } from '@/store/server'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { yupResolver } from '@hookform/resolvers/yup'
import { SearchSelect } from '@/components'

interface FormValuesEditData extends updateTuitionAssistanceFields {
  nik?: string
  name?: string
  gender?: string
  birthPlace?: string
  birthDate?: string
  address?: string
  kecamatan?: string
  kelurahan?: string
}

interface ModalEditDataBBPProps {
  isShow: boolean
  setIsShow: (value: boolean) => void
  tuitionAssistanceId: string
  eventId: string
}

export default function ModalEditDataBBP({ isShow, setIsShow, tuitionAssistanceId, eventId }: ModalEditDataBBPProps) {
  const forms = useForm<FormValuesEditData>({
    mode: 'onTouched',
    resolver: yupResolver(updateTuitionAssistanceValidation)
  })

  const { data, isSuccess, isLoading } = useGetTuitionAssistanceEventById(tuitionAssistanceId)
  const { mutate: update, isLoading: isLoadingUpdate } = useUpateTuitionAssistanceEvent()

  const bank = forms.watch('bank')

  const { data: events } = useGetEvent()
  const { data: bankLists } = useGetBank()
  const { data: universities } = useGetUniversities()


  React.useEffect(() => {
    if (isSuccess) {
      forms.reset({
        nik: data?.beneficiary.identityNumber,
        name: data?.beneficiary.name,
        email: data.email ?? '',
        gpa: data.gpa as number,
     
        universityName: data.university.name,
 
        studyProgramName: data.studyProgram.name,
        phoneNumber: data.phoneNumber as string,
        gender: data.beneficiary.gender,
        birthPlace: data.beneficiary.birthPlace,
        birthDate: data.beneficiary.birthDate,
        address: data.beneficiary.address.fullAddress,
        semester: data.semester as number,
        kecamatan: data.beneficiary.address.areaLevel3?.name,
        kelurahan: data.beneficiary.address.areaLevel4?.name,
        tuitionFee: data.tuitionFee as number,
        event: eventId,
        bankAccountNumber: data.bankAccNumber as string,
        bankAccountName: data.bankAccName as string,
        bank: data.bank.id
      })
    }
  }, [isSuccess])

  React.useEffect(() => {
    if (bank) {
      forms.setValue('bankAccountName', bankLists?.find((item) => item.id === bank)?.name as string)
    }
   
  }, [bank])

  const onSubmit = (values: FormValuesEditData) => {
    const { nik, name, gender, birthPlace, birthDate, address, kecamatan, kelurahan, ...rest } = values
    const newData = { id: tuitionAssistanceId, fields: rest }

    update(newData, {
      onSuccess: () => {
        forms.reset()
        setIsShow(false)
      }
    })
  }
console.log(data)
  return (
    <Modal isShow={isShow} className="md:max-w-3xl max-h-[calc(100vh-50px)] overflow-y-auto" isLoading={isLoading}>
      <Modal.Header setIsShow={setIsShow} className="flex flex-col gap-1">
        <h3 className="text-base font-bold leading-6 text-title md:text-2xl">Edit Data</h3>
        <p className="text-sm text-[#A1A1A1]">Data Pengajuan BBP</p>
      </Modal.Header>

      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <FormField
              name="nik"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="font-semibold dark:text-white">NIK</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} disabled />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="name"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="font-semibold dark:text-white">Nama</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} disabled />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="font-semibold dark:text-white">Email</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} placeholder="Masukkan Email" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="gpa"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="font-semibold dark:text-white">IPK</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} placeholder="Masukkan IPK" />
                  </FormControl>
                </FormItem>
              )}
            />
         <FormField
              name="universityName"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Perguruan Tinggi</FormLabel>
                  <FormControl>
                  <Input
                      {...field}
                      value={field.value ?? ''}
                      className="rounded-md"
                      type="text"
                      disabled
                      
                    />
                  </FormControl>
                </FormItem>
              )}
            />
           <FormField
              name="studyProgramName"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Prodi</FormLabel>
                  <FormControl>
                  <Input
                      {...field}
                      value={field.value ?? ''}
                      className="rounded-md"
                      type="text"
                      placeholder="Masukan Program Studi"
                      disabled
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="phoneNumber"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="font-semibold dark:text-white">No. HP</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} placeholder="Masukkkan nomor handphone" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="gender"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="font-semibold dark:text-white">Jenis Kelamin</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} disabled />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="birthPlace"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="font-semibold dark:text-white">Tempat Lahir</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} disabled />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="birthDate"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="font-semibold dark:text-white">Tanggal Lahir</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} disabled />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="address"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="font-semibold dark:text-white">Alamat</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} disabled />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="semester"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="font-semibold dark:text-white">Semester</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} placeholder="Masukkan semester" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="kecamatan"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="font-semibold dark:text-white">Kecamatan</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} disabled />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="kelurahan"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="font-semibold dark:text-white">Kelurahan</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} disabled />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="tuitionFee"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="font-semibold dark:text-white">UKT</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} placeholder="Masukkan UKT" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="event"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Batch</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value} disabled>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Batch" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {events?.data.map((event) => (
                        <SelectItem key={event.id} value={event.id}>
                          {event.batch}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <p className="py-5 text-2xl font-bold text-center">Data Bank</p>
          <div className="grid grid-cols-2 gap-3">
            <FormField
              name="bankAccountNumber"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="font-semibold dark:text-white">No Rekening/Bank</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} type="number" placeholder="Masukkan nomor rekening" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="bank"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Nama Bank</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Bank" />
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
          <Modal.Footer className="mt-4">
            <Button
              variant="cancel"
              className="rounded-lg text-[#898989] bg-[#E4E4E4]"
              onClick={() => setIsShow(false)}
            >
              Cancel
            </Button>
            <Button className="rounded-lg" type="submit" loading={isLoadingUpdate}>
              <p className="font-bold text-white">Update</p>
            </Button>
          </Modal.Footer>
        </form>
      </Form>
    </Modal>
  )
}
