import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import useTitle from '@/hooks/useTitle'
import { storeDjpm } from '@/api/dayasos.api'
import { useCreateDjpm } from '@/store/server/useDayasos'

const Djp = () => {
  useTitle('Dana Jasa Pelayanan Masyarakat')

  interface FormValues {
    nik: string
    noKk: string
    nama: string
    tempatLahir: string
    tanggalLahir: string
    statusDtks: string
    kota: string
    kecamatan: string
    kelurahan: string
    alamatLengkap: string
    jenisLayanan: string
    tempatTugas: string
    statusPencairan: string
    alamatTugas: string
    noRekening: string
    namaRekening: string
    kantorCabang: string
    nominalBantuan: string
    tahunAnggaran: number
    noHp: string
    jenisKelamin: string
  }

  const forms = useForm<FormValues>({
    mode: 'onTouched'
  })
  const formsCari = useForm<FormValues>({
    mode: 'onTouched'
  })
  const { mutate: save, isLoading } = useCreateDjpm()

  const onSubmitCari = async (values: FormValues) => {
    console.log(values);

  }
  const onSubmit = async (values: FormValues) => {
    // const { nik, noHp ,jenisLayanan}
    const { nik: beneficiary, noHp: phoneNumber, jenisLayanan: serviceType, tempatTugas: dutyPlace, alamatTugas: dutyAddress, noRekening: bankAccountNumber, namaRekening: bankAccountName, kantorCabang: bankBranchName, statusPencairan: status, tahunAnggaran: budgetYear } = values
    // console.log()
    const data = { beneficiary, phoneNumber, serviceType, dutyPlace, dutyAddress, bankAccountNumber, bankAccountName, bankBranchName, status, budgetYear }
    save(data)
  }

  return (
    <div className="container bg-white py-5">
      <div className="w-full text-center">
        <p className="text-2xl font-bold">Data Personal</p>
      </div>
      <Form {...formsCari}>
        <form onSubmit={formsCari.handleSubmit(onSubmitCari)} className="flex flex-col gap-6">
          <div className="flex flex-row justify-between gap-3">
            <div className="w-11/12">
              <FormField
                name="nik"
                control={formsCari.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">NIK</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" placeholder="Masukkan NIK Masyarakat" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="w-1/12 flex items-end justify-end">
              <Button className="w-full">Cari</Button>
            </div>
          </div>

          <div className="w-full text-center">
            <p className="text-2xl font-bold">Data Bank</p>
          </div>
        </form>
      </Form>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-row gap-4">
            <div className="w-4/12">
              <FormField
                name="noRekening"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">No. Rekening Bank Sumut</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan No. Rekening" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="w-4/12">
              <FormField
                name="namaRekening"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Nama Rekening Bank Sumut</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Nama Rekening" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="w-4/12">
              <FormField
                name="kantorCabang"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Kantor Cabang Bank Sumut</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Kantor Cabang  " />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="w-4/12">
              <FormField
                name="statusPencairan"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Status Pencairan</FormLabel>

                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Status Pencairan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="m@example.com">Krisna Asu</SelectItem>
                          <SelectItem value="m@google.com">Krisna Cuki</SelectItem>
                          <SelectItem value="m@support.com">The Little Krishna</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="w-4/12">
              <FormField
                name="nominalBantuan"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Nominal Bantuan</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Nominal Bantuan" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="w-4/12">
              <FormField
                name="tahunAnggaran"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Tahun Anggaran </FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Tahun Anggaran   " />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="w-full text-center">
            <p className="text-2xl font-bold">Data Tugas</p>
          </div>
          <div className="flex flex-row gap-4">

            <div className="w-4/12">
              <FormField
                name="tempatTugas"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Tempat Tugas</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Tempat Tugas" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="w-4/12">
              <FormField
                name="alamatTugas"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Alamat Tugas </FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Alamat Tugas   " />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="w-4/12">
              <FormField
                name="jenisLayanan"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Jenis Layanan</FormLabel>

                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Jenis Layanan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="m@example.com">Krisna Asu</SelectItem>
                          <SelectItem value="m@google.com">Krisna Cuki</SelectItem>
                          <SelectItem value="m@support.com">The Little Krishna</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex justify-end gap-5">
            <Button variant="cancel">Cancel</Button>
            <Button>Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
export default Djp
