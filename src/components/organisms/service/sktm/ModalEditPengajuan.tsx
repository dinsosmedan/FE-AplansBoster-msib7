import { HiDocumentArrowUp } from 'react-icons/hi2'
import { Modal } from '../..'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { type updateTuitionAssistanceServiceFields } from '@/lib/validations/linjamsos.validation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { useGetIndigencyCertificateEventById, useUpdateIndigencyStatus } from '@/store/server/useService'
import { Berkas, DatePicker } from '@/components'
import DropZone, { type FileWithPreview } from '@/components/atoms/DropZone'
import * as React from 'react'

interface ModalEditPengajuanBBPProps {
  isShow: boolean
  setIsShow: (value: boolean) => void
  indigencyId?: string
}

interface FormValues extends updateTuitionAssistanceServiceFields {
  issueDate?: Date
  issuedCertificate?: File[] | string[]
}

export default function ModalEditPengajuanSKTM({ isShow, setIsShow, indigencyId }: ModalEditPengajuanBBPProps) {
  const forms = useForm<FormValues>()
  const status = forms.watch('applicationStatus')

  const { data, isLoading, isSuccess } = useGetIndigencyCertificateEventById(indigencyId as string)
  const { mutate: update, isLoading: isLoadingUpdate } = useUpdateIndigencyStatus()

  React.useEffect(() => {
    if (isSuccess) {
      forms.setValue('applicationStatus', data?.applicationStatus)
      forms.setValue('message', data?.note ?? '')
      if (data.indigencyCertificate?.issueDate) {
        forms.setValue('issueDate', new Date(data?.indigencyCertificate?.issueDate))
      }

      if (data.indigencyCertificate?.issuedCertificate?.originalName) {
        forms.setValue('issuedCertificate', [data.indigencyCertificate?.issuedCertificate?.originalName])
      }
    }
  }, [isSuccess])

  const onSubmit = async (values: FormValues) => {
    const newData = {
      id: indigencyId as string,
      fields: { ...values, issuedCertificate: values.issuedCertificate as File[] }
    }

    update(newData, {
      onSuccess: () => {
        setIsShow(false)
        forms.reset()
      }
    })
  }

  return (
    <Modal isShow={isShow} className="md:max-w-3xl max-h-[calc(100vh-50px)] overflow-y-auto" isLoading={isLoading}>
      <Modal.Header setIsShow={setIsShow} className="gap-1 flex flex-col">
        <h3 className="text-base font-bold leading-6 text-title md:text-2xl">Edit Data Pengajuan</h3>
        <p className="text-sm text-[#A1A1A1]">Data Pengajuan SKTM</p>
      </Modal.Header>
      <section className="flex flex-col">
        <p className="w-full text-center py-4 bg-primary text-white font-bold">Berkas Pemohon</p>
        {data?.petitionLetterPath?.url && <Berkas title="SURAT PERMOHONAN" url={data?.petitionLetterPath?.url} />}
        {data?.domicileLetterPath?.url && (
          <Berkas title="SCAN FOTO COPY SURAT DOMISILI DARI KELURAHAN SETEMPAT" url={data?.domicileLetterPath?.url} />
        )}
        {data?.familyCardPath?.url && <Berkas title="KARTU KELUARGA" url={data?.familyCardPath?.url} />}
        {data?.idCardPath?.url && <Berkas title="KTP" url={data?.idCardPath?.url} />}
        {data?.schoolLetterPath?.url && (
          <Berkas
            title="SURAT KETERANGAN DARI SEKOLAH/SURAT PENGUMUMAN DARI PIHAK UNIVERSITAS"
            url={data?.schoolLetterPath?.url}
          />
        )}
        {/* <Berkas
          title="SCAN FOTO COPY SURAT DOMISILI DARI KELURAHAN SETEMPAT"
          url={data?. as string}
        /> */}
        {data?.salarySlipPath?.url && <Berkas title="SCAN FOTOCOPY SLIP GAJI" url={data?.salarySlipPath?.url} />}
        {data?.localsApprovalLetterPath?.url && (
          <Berkas
            title="SCAN SURAT KETERANGAN DARI KEPLING APABILA TINGGAL MENUMPANG/SEWA DITANDATANGAI PAKAI MATERAI RP.10.000"
            url={data?.localsApprovalLetterPath?.url}
          />
        )}
        {data?.lowIncomeLetterPath?.url && (
          <Berkas
            title="SURAT PERNYATAAN BERPENGHASILAN DI BAWAH UMR (±Rp.3000.000) DITANDATANGAI LURAH"
            url={data?.lowIncomeLetterPath?.url}
          />
        )}
        {data?.frontViewHousePath?.url && <Berkas title="RUMAH TAMPAK DEPAN" url={data?.frontViewHousePath?.url} />}
        {data?.sittingViewPath?.url && <Berkas title="RUMAH RUANG TAMU" url={data?.sittingViewPath?.url} />}
        {data?.chamberViewHousePath?.url && <Berkas title="RUMAH RUANG KAMAR" url={data?.chamberViewHousePath?.url} />}
        {data?.kitchenViewHousePath?.url && <Berkas title="RUMAH RUANG DAPUR" url={data?.kitchenViewHousePath?.url} />}
      </section>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <FormField
            name="applicationStatus"
            control={forms.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="font-semibold dark:text-white">Status</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="processed">Processed</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          {status === 'approved' && (
            <>
              <FormField
                name="issuedCertificate"
                control={forms.control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="font-semibold dark:text-white">Surat terbit SKTM</FormLabel>
                    <FormControl>
                      <DropZone
                        setValue={field.onChange}
                        fileValue={field.value as unknown as FileWithPreview[]}
                        helperText="*Catatan: File yang diizinkan berupa pdf. Dengan maksimal 2MB"
                        accept={{ 'application/pdf': ['.pdf'] }}
                        maxFiles={1}
                        id="issuedCertificate"
                        Icon={HiDocumentArrowUp}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="issueDate"
                control={forms.control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="font-semibold dark:text-white">Tanggal surat terbit SKTM</FormLabel>
                    <FormControl>
                      <DatePicker selected={field.value as Date} onChange={field.onChange} placeholder="dd/mm/yyyy" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </>
          )}
          {(status === 'revision' || status === 'rejected') && (
            <FormField
              name="message"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="font-semibold dark:text-white">Keterangan</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} placeholder="Masukkan Keterangan" />
                  </FormControl>
                </FormItem>
              )}
            />
          )}

          <Modal.Footer className="mt-4">
            <Button
              variant="cancel"
              className="rounded-lg text-[#898989] bg-[#E4E4E4]"
              onClick={() => setIsShow(false)}
              type="button"
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
