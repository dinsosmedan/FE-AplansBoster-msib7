import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Modal } from '../..'
import { useForm } from 'react-hook-form'
import {
  type updateIndigencyCertificateServiceFields,
  updateIndigencyCertificateServiceValidation
} from '@/lib/validations/linjamsos.validation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import * as React from 'react'
import { useGetIndigencyCertificateEventById, useUpdateIndigencyApplication } from '@/store/server/useService'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { yupResolver } from '@hookform/resolvers/yup'

interface ModalEditDataBBPProps {
  isShow: boolean
  setIsShow: (value: boolean) => void
  indigencyId: string
}

export default function ModalEditDataSKTM({ isShow, setIsShow, indigencyId }: ModalEditDataBBPProps) {
  const forms = useForm<updateIndigencyCertificateServiceFields>({
    mode: 'onTouched',
    resolver: yupResolver(updateIndigencyCertificateServiceValidation)
  })

  const { data, isSuccess, isLoading } = useGetIndigencyCertificateEventById(indigencyId)
  const { mutate: update, isLoading: isLoadingUpdate } = useUpdateIndigencyApplication()

  React.useEffect(() => {
    if (isSuccess) {
      forms.reset({
        applicantPhoneNumber: data?.applicantPhoneNumber,
        certificateDestination: data?.certificateDestination,
        categoryApplication: data?.applicationCategory
      })
    }
  }, [isSuccess])

  const onSubmit = (values: updateIndigencyCertificateServiceFields) => {
    const newData = { id: indigencyId, fields: values }
    update(newData, {
      onSuccess: () => {
        forms.reset()
        setIsShow(false)
      }
    })
  }

  return (
    <Modal isShow={isShow} className="md:max-w-3xl max-h-[calc(100vh-50px)] overflow-y-auto" isLoading={isLoading}>
      <Modal.Header setIsShow={setIsShow} className="gap-1 flex flex-col">
        <h3 className="text-base font-bold leading-6 text-title md:text-2xl">Edit Data</h3>
        <p className="text-sm text-[#A1A1A1]">Data Pengajuan SKTM</p>
      </Modal.Header>

      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <FormField
              name="applicantPhoneNumber"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="font-semibold dark:text-white">No Hp Pemohon</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} type="number" placeholder="Masukkan No Hp pemohon" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="certificateDestination"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="font-semibold dark:text-white">Tujuan surat</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} placeholder="Masukkan tujuan surat" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="categoryApplication"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="font-semibold dark:text-white">Kategori Layanan</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori layanan" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="dtks-schools">DTKS Schools</SelectItem>
                      <SelectItem value="non-dtks-schools">Non DTKS Schools</SelectItem>
                      <SelectItem value="dtks-courts">DTKS Courts</SelectItem>
                      <SelectItem value="non-dtks-courts">Non DTKS Courts</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <Modal.Footer className="mt-4">
            <Button
              variant="cancel"
              type="button"
              className="rounded-lg text-[#898989] bg-[#E4E4E4]"
              onClick={() => setIsShow(false)}
            >
              Cancel
            </Button>
            <Button className="rounded-lg" type="submit" loading={isLoadingUpdate}>
              <p className="text-white font-bold">Update</p>
            </Button>
          </Modal.Footer>
        </form>
      </Form>
    </Modal>
  )
}
