import { HiOutlineEye } from 'react-icons/hi2'
import { Modal } from '../..'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { type updateTuitionAssistanceServiceFields } from '@/lib/validations/linjamsos.validation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'

interface ModalEditPengajuanBBPProps {
  isShow: boolean
  setIsShow: (value: boolean) => void
}

interface FormValues extends updateTuitionAssistanceServiceFields {
  grantAmount?: string
}

export default function ModalEditPengajuanBBP({ isShow, setIsShow }: ModalEditPengajuanBBPProps) {
  const forms = useForm<FormValues>()

  const status = forms.watch('status')

  const onSubmit = async (values: FormValues) => {
    console.log(values)
  }

  return (
    <Modal isShow={isShow} className="md:max-w-3xl max-h-[calc(100vh-50px)] overflow-y-auto">
      <Modal.Header setIsShow={setIsShow} className="gap-1 flex flex-col">
        <h3 className="text-base font-bold leading-6 text-title md:text-2xl">Edit Data Pengajuan</h3>
        <p className="text-sm text-[#A1A1A1]">Data Pengajuan BBP</p>
      </Modal.Header>
      <section className="flex flex-col">
        <p className="w-full text-center py-4 bg-primary text-white font-bold">Berkas Mahasiswa</p>
        <Berkas title="Surat Permohonan" />
        <Berkas title="PAS FOTO" />
        <Berkas title="KARTU KELUARGA" />
        <Berkas title="KTP" />
        <Berkas title="KTM" />
        <Berkas title="SURAT AKTIF KULIAH" />
        <Berkas title="SCAN PRINTOUT DTKS" />
        <Berkas title="SURAT PERNYATAAN TIDAK MENDAPATKAN BEASISWA" />
        <Berkas title="SURAT PERNYATAAN BUKAN ASN" />
        <Berkas title="TRANSKRIP NILAI" />
        <Berkas title="SCAN BUKU TABUNGAN" />
        <Berkas title="BUKTI PEMBAYARAN UKT TERAKHIR" />
      </section>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <FormField
            name="status"
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
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          {status === 'approved' ? (
            <FormField
              name="grantAmount"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="font-semibold dark:text-white">Jumlah bantuan</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value} />
                  </FormControl>
                </FormItem>
              )}
            />
          ) : (
            <FormField
              name="note"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="font-semibold dark:text-white">Keterangan</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value} placeholder="Masukkan Keterangan" />
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
            >
              Cancel
            </Button>
            <Button className="rounded-lg" type="submit">
              <p className="text-white font-bold">Update</p>
            </Button>
          </Modal.Footer>
        </form>
      </Form>
    </Modal>
  )
}

interface BerkasProps {
  title: string
  action?: () => void
}

const Berkas = ({ title, action }: BerkasProps) => {
  return (
    <div className="py-[18px] px-3 flex justify-between items-center border-b border-zinc-200">
      <p className="uppercase w-max">{title}</p>
      <Button className="gap-2 rounded-lg ml-24 items-center" onClick={() => action && action()}>
        <HiOutlineEye />
        <p className="text-xs">View</p>
      </Button>
    </div>
  )
}
