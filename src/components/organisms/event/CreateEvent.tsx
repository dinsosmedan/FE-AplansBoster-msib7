import { Modal } from '..'

import { FormControl, FormField, FormItem, FormLabel, Form, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import DropZone, { type FileWithPreview } from '@/components/atoms/DropZone'
import { DatePicker, TextEditor } from '@/components'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { HiDocumentArrowUp } from 'react-icons/hi2'
import { yupResolver } from '@hookform/resolvers/yup'

import { eventValidation, type eventFields } from '@/lib/validations/event.validation'
import { useCreateEvent, useGetEventById, useGetEventType, useUpdateEvent } from '@/store/server'
import { formatDateToString } from '@/lib/services/formatDate'
import { ImSpinner2 } from 'react-icons/im'

interface CreateEventProps {
  isShow: boolean
  setIsShow: (value: boolean) => void
  eventId?: string
}

export default function CreateEvent({ isShow, setIsShow, eventId }: CreateEventProps) {
  const { data: eventTypes } = useGetEventType()
  const { mutate: createEvent, isLoading } = useCreateEvent()
  const { mutate: updateEvent, isLoading: isLoadingUpdate } = useUpdateEvent()
  const { data: event, isSuccess, isLoading: isLoadingDetail } = useGetEventById(eventId as string)

  const forms = useForm<eventFields>({
    mode: 'onTouched',
    resolver: yupResolver(eventValidation)
  })

  React.useEffect(() => {
    if (!eventId) {
      forms.reset({
        eventType: '',
        startDate: '',
        endDate: '',
        quota: '' as unknown as number,
        batch: '',
        isActive: '' as unknown as boolean,
        eventDescription: '',
        scholarshipAnnouncementLetter: '',
        biodata: '',
        scholarshipApplicationLetter: '',
        nonReceiptOfScholarshipLetter: '',
        nonGovernmentEmployeeLetter: ''
      })
    }
  }, [eventId])

  React.useEffect(() => {
    if (eventId && isSuccess) {
      const { startDate, endDate, requiredDocuments } = event
      forms.setValue('eventType', event.type.id)
      forms.setValue('quota', event.quota)
      forms.setValue('batch', event.batch)
      forms.setValue('isActive', event.isActive)
      forms.setValue('eventDescription', event.eventDescription)

      if (requiredDocuments?.biodata?.originalName) {
        forms.setValue('biodata', [requiredDocuments.biodata.originalName])
      }

      if (requiredDocuments?.scholarshipApplicationLetter?.originalName) {
        forms.setValue('scholarshipApplicationLetter', [requiredDocuments.scholarshipApplicationLetter.originalName])
      }

      if (requiredDocuments?.nonReceiptOfScholarshipLetter?.originalName) {
        forms.setValue('nonReceiptOfScholarshipLetter', [requiredDocuments.nonReceiptOfScholarshipLetter.originalName])
      }

      if (requiredDocuments?.nonGovernmentEmployeeLetter?.originalName) {
        forms.setValue('nonGovernmentEmployeeLetter', [requiredDocuments.nonGovernmentEmployeeLetter.originalName])
      }

      if (requiredDocuments?.scholarshipAnnouncementLetter?.originalName) {
        forms.setValue('scholarshipAnnouncementLetter', [requiredDocuments.scholarshipAnnouncementLetter.originalName])
      }

      if (startDate) forms.setValue('startDate', new Date(startDate))
      if (endDate) forms.setValue('endDate', new Date(endDate))
    }
  }, [eventId, isSuccess])

  const onSuccess = () => {
    forms.reset()
    setIsShow(false)
  }

  const onSubmit = async (values: eventFields) => {
    const newData: eventFields = {
      ...values,
      startDate: formatDateToString(values.startDate as Date),
      endDate: formatDateToString(values.endDate as Date)
    }

    if (!eventId) return createEvent(newData, { onSuccess })
    updateEvent({ id: eventId, fields: newData }, { onSuccess })
  }

  return (
    <Modal isShow={isShow} className="md:max-w-3xl max-h-[calc(100vh-50px)] overflow-y-auto">
      <Modal.Header setIsShow={setIsShow} className="gap-1 flex flex-col">
        <h3 className="text-base font-bold leading-6 text-title md:text-2xl">Tambah Event</h3>
        <p className="text-sm text-[#A1A1A1]">Tambah Data Event</p>
      </Modal.Header>
      {isLoadingDetail ? (
        <Loading />
      ) : (
        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-3">
            <FormField
              name="eventType"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Jenis Event</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Jenis Event" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {eventTypes?.map((type) => (
                        <SelectItem value={type.id} key={type.id}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-3">
              <FormField
                name="startDate"
                control={forms.control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="font-semibold dark:text-white">Jadwal Awal</FormLabel>
                    <FormControl>
                      <DatePicker selected={field.value as Date} onChange={field.onChange} placeholder="dd/mm/yyyy" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="endDate"
                control={forms.control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="font-semibold dark:text-white">Jadwal Akhir</FormLabel>
                    <FormControl>
                      <DatePicker selected={field.value as Date} onChange={field.onChange} placeholder="dd/mm/yyyy" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="quota"
                control={forms.control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="font-semibold dark:text-white">Jumlah Peserta</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} type="number" placeholder="0/100" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="batch"
                control={forms.control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="font-semibold dark:text-white">Masukkan Batch</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} placeholder="Masukkan Batch" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="isActive"
                control={forms.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col mt-2">
                    <FormLabel className="font-semibold">Status Event</FormLabel>
                    <div className="flex items-center space-x-3">
                      <FormControl>
                        <Switch checked={Boolean(field.value)} onCheckedChange={field.onChange} />
                      </FormControl>
                      <p className="text-zinc-400 text-sm">Aktif</p>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              name="eventDescription"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="flex flex-col mt-2">
                  <FormControl>
                    <TextEditor id="eventDescription" value={field.value as string} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full text-center mt-5 mb-5">
              <p className="text-2xl font-bold">Berkas BBP</p>
            </div>
            <div className="flex flex-col gap-6 mb-5">
              <FormField
                name="scholarshipAnnouncementLetter"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center justify-between">Pengumuman Beasiswa</FormLabel>
                    <FormControl className="w-[522px]">
                      <DropZone
                        setValue={field.onChange}
                        fileValue={field.value as unknown as FileWithPreview[]}
                        helperText="*Catatan: File yang diizinkan berupa pdf. Dengan maksimal 2MB"
                        maxFiles={1}
                        id="scholarshipAnnouncementLetter"
                        accept={{ 'application/pdf': ['.pdf'] }}
                        Icon={HiDocumentArrowUp}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="biodata"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center justify-between">
                      Biodata Mahasiswa Calon Penerima Bantuan Biaya Pendidikan
                    </FormLabel>
                    <FormControl className="w-[522px]">
                      <DropZone
                        setValue={field.onChange}
                        fileValue={field.value as unknown as FileWithPreview[]}
                        helperText="*Catatan: File yang diizinkan berupa pdf. Dengan maksimal 2MB"
                        maxFiles={1}
                        id="biodata"
                        accept={{ 'application/pdf': ['.pdf'] }}
                        Icon={HiDocumentArrowUp}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="scholarshipApplicationLetter"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center justify-between">
                      Template Surat Permohonan ditujukan kepada Bapak Wali Kota Medan Cq. Kepala Dinas Sosial Kota
                      Medan
                    </FormLabel>
                    <FormControl className="w-[522px]">
                      <DropZone
                        setValue={field.onChange}
                        fileValue={field.value as unknown as FileWithPreview[]}
                        helperText="*Catatan: File yang diizinkan berupa pdf. Dengan maksimal 2MB"
                        maxFiles={1}
                        id="scholarshipApplicationLetter"
                        accept={{ 'application/pdf': ['.pdf'] }}
                        Icon={HiDocumentArrowUp}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="nonReceiptOfScholarshipLetter"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center justify-between">
                      Template Surat Pernyataan Tidak Menerima Beasiswa/Bantuan Biaya Pendidikan dari Sumber Lain
                    </FormLabel>
                    <FormControl className="w-[522px]">
                      <DropZone
                        setValue={field.onChange}
                        fileValue={field.value as unknown as FileWithPreview[]}
                        helperText="*Catatan: File yang diizinkan berupa pdf. Dengan maksimal 2MB"
                        maxFiles={1}
                        id="nonReceiptOfScholarshipLetter"
                        accept={{ 'application/pdf': ['.pdf'] }}
                        Icon={HiDocumentArrowUp}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="nonGovernmentEmployeeLetter"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center justify-between">
                      Template Surat Pernyataan Tidak berstatus sebagai Aparatur Sipil Negara (ASN)
                    </FormLabel>
                    <FormControl className="w-[522px]">
                      <DropZone
                        setValue={field.onChange}
                        fileValue={field.value as unknown as FileWithPreview[]}
                        helperText="*Catatan: File yang diizinkan berupa pdf. Dengan maksimal 2MB"
                        maxFiles={1}
                        id="nonGovernmentEmployeeLetter"
                        accept={{ 'application/pdf': ['.pdf'] }}
                        Icon={HiDocumentArrowUp}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <Modal.Footer>
              <Button
                variant="outline"
                className="rounded-lg text-primary border-primary"
                type="button"
                onClick={() => setIsShow(false)}
              >
                Cancel
              </Button>
              <Button className="rounded-lg" type="submit" loading={isLoading || isLoadingUpdate}>
                {eventId ? 'Update' : 'Submit'}
              </Button>
            </Modal.Footer>
          </form>
        </Form>
      )}
    </Modal>
  )
}

const Loading = () => {
  return (
    <div className="min-h-[calc(100vh-500px)] flex">
      <ImSpinner2 className="animate-spin m-auto text-3xl text-primary" />
    </div>
  )
}
