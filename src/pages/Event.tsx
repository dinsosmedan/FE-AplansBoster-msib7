import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import useTitle from '@/hooks/useTitle'

const Event = () => {
  useTitle('Event')

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
    programBansos: string
    keterangan: string
    rt: string
    rw: string
    statusDisabilitas: string
    jenisDisabilitas: string
    rekomendasi: string
  }

  const forms = useForm<FormValues>({
    mode: 'onTouched'
  })

  const onSubmit = async (values: FormValues) => {
    console.log(values)
  }

  return (
    <div className="container bg-white py-5">
      <div className="w-full text-center">
        <p className="text-2xl font-bold">Data Personal</p>
      </div>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-row justify-between gap-3">
            <div className="w-11/12">
              <FormField
                name="nik"
                control={forms.control}
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
          <div className="flex flex-row gap-4">
            <div className="w-4/12">
              <FormField
                name="noKk"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">No KK</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan No KK Masyarakat" />
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
                    <FormLabel className="font-semibold dark:text-white">Nama</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Nama Masyarakat" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="w-4/12">
              <FormField
                name="tempatLahir"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Tempat Lahir</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Tempat Lahir" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="grid gap-4 grid-cols-3">
            <FormField
              name="tanggalLahir"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Tanggal Lahir</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Masukkan Tanggal Lahir" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="statusDtks"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Status DTKS</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Status DTKS" />
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
          <div className="grid gap-4 grid-cols-3">
            <FormField
              name="rt"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">RT</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Masukkan RT" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="rw"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">RW</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Masukkan RW" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              name="alamatLengkap"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Alamat Lengkap</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Masukkan Alamat Lengkap Masyarakat." />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="w-full text-center">
            <p className="text-2xl font-bold">Lainnya</p>
          </div>
          <div className="flex flex-row gap-4">
            <div className="w-4/12">
              <FormField
                name="statusDisabilitas"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Status Disabilitas</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Status Disabilitas" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="w-4/12">
              <FormField
                name="jenisDisabilitas"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Jenis Disabilitas</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Jenis Disabilitas" />
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
                name="rekomendasi"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Rekomendasi</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Rekomendasi" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div>
            <FormField
              name="keterangan"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Keterangan</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Masukkan Keterangan." />
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
export default Event