import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import useTitle from '@/hooks/useTitle'

const Bpnt = () => {
  useTitle('Bantuan Pangan Non Tunai')

  interface FormValues {
    nik: string
    noKk: string
    nama: string
    kota: string
    kecamatan: string
    kelurahan: string
    alamatLengkap: string
  }

  const forms = useForm<FormValues>({
    mode: 'onTouched'
  })

  const onSubmit = async () => {}

  return (
    <div className="container bg-white py-5">
      <div className="w-full text-center">
        <p className="text-2xl font-bold">Data Personal</p>
      </div>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-row justify-between gap-4">
            <div className="w-11/12">
              <FormField
                name="nik"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">NIK</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} type="number" placeholder="Masukkan NIK Masyarakat" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="w-1/12 flex items-end justify-end">
              <Button className="w-full">Cari</Button>
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="w-6/12">
              <FormField
                name="noKk"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">No KK</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} type="text" placeholder="Masukkan No KK Masyarakat" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="w-6/12">
              <FormField
                name="nama"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Nama</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} type="text" placeholder="Masukkan Nama Masyarakat" />
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
            <div className="w-4/12">
              <FormField
                name="kota"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Kota/Kabupaten</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Kota/Kabupaten" />
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
                name="nama"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Kecamatan</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Kecamatan" />
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
                name="kelurahan"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Kelurahan</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Kelurahan" />
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
          <div>
            <FormField
              name="alamatLengkap"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Alamat Lengkap</FormLabel>
                  <FormControl>
                    <Textarea {...field} value={field.value ?? ''} placeholder="Masukkan Alamat Lengkap Masyarakat." />
                  </FormControl>
                </FormItem>
              )}
            />
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
export default Bpnt
