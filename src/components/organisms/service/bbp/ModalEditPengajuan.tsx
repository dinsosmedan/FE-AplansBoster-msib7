import { Modal } from '../..'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { type updateTuitionAssistanceServiceFields } from '@/lib/validations/linjamsos.validation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { useGetTuitionAssistanceEventById, useUpdateApplicationStatus } from '@/store/server/useService'
import * as React from 'react'
import { Berkas } from '@/components'

interface ModalEditPengajuanBBPProps {
  isShow: boolean
  setIsShow: (value: boolean) => void
  tuitionAssistanceId?: string
}

interface FormValues extends updateTuitionAssistanceServiceFields {
  assistanceAmount?: number
  budgetYear?: number
}

export default function ModalEditPengajuanBBP({ isShow, setIsShow, tuitionAssistanceId }: ModalEditPengajuanBBPProps) {
  const forms = useForm<FormValues>()
  const status = forms.watch('applicationStatus')

  const { data, isLoading } = useGetTuitionAssistanceEventById(tuitionAssistanceId as string)
  const { mutate: update, isLoading: isLoadingUpdate } = useUpdateApplicationStatus()

  React.useEffect(() => {
    if (data) {
      forms.setValue('applicationStatus', data?.application_status as string)
      forms.setValue('message', data?.message ?? '')
      forms.setValue('assistanceAmount', data.tuitionAssistance?.assistanceAmount as number)
      forms.setValue('budgetYear', data.tuitionAssistance?.budgetYear as number)
    }
  }, [data])

  const onSubmit = async (values: FormValues) => {
    const newData = {
      id: tuitionAssistanceId as string,
      fields: values
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
        <p className="text-sm text-[#A1A1A1]">Data Pengajuan BBP</p>
      </Modal.Header>
      <section className="flex flex-col">
        <p className="w-full text-center py-4 bg-primary text-white font-bold">Berkas Mahasiswa</p>
        <Berkas title="Surat Permohonan" url={data?.documents.applicationLetter?.url as string} />
        <Berkas title="PAS FOTO" url={data?.documents.photo?.url as string} />
        <Berkas title="KARTU KELUARGA" url={data?.documents.familyCard?.url as string} />
        <Berkas title="KTP" url={data?.documents.identityCard?.url as string} />
        <Berkas title="KTM" url={data?.documents.studentCard?.url as string} />
        <Berkas title="SURAT AKTIF KULIAH" url={data?.documents.activeStudentCertificate?.url as string} />
        <Berkas title="SCAN PRINTOUT DTKS" url={data?.documents.dtksPrintout?.url as string} />
        <Berkas
          title="SURAT PERNYATAAN TIDAK MENDAPATKAN BEASISWA"
          url={data?.documents.noScholarshipStatement?.url as string}
        />
        <Berkas title="SURAT PERNYATAAN BUKAN ASN" url={data?.documents.noGovernmentEmployeeStatement?.url as string} />
        <Berkas title="TRANSKRIP NILAI" url={data?.documents.gradeTranscript?.url as string} />
        <Berkas title="SCAN BUKU TABUNGAN" url={data?.documents.passBook?.url as string} />
        <Berkas title="BUKTI PEMBAYARAN UKT TERAKHIR" url={data?.documents.tuitionReceipt?.url as string} />
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
                    <SelectItem value="revision">Revision</SelectItem>
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
                name="assistanceAmount"
                control={forms.control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="font-semibold dark:text-white">Jumlah bantuan</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} placeholder="Masukkan jumlah bantuan" type="number" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="budgetYear"
                control={forms.control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="font-semibold dark:text-white">Tahun Anggaran</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} placeholder="Masukkan tahun anggaran" />
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
              type="button"
              variant="cancel"
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
