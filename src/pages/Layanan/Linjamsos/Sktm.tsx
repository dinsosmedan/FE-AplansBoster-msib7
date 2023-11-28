import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import useTitle from '@/hooks/useTitle'
import { Container } from '@/components'

const Pkr = () => {
  useTitle('Surat Keterangan Tidak Mampu (SKTM)')

  interface FormValues {
    nik: string
    hubunganKeluarga: string
    nik2: string
    hubunganKeluarga2: string
    tujuan: string
    bulanPembuatan: string
    tahunPembuatan: string
  }

  const forms = useForm<FormValues>({
    mode: 'onTouched'
  })

  const onSubmit = async (values: FormValues) => {
    console.log(values)
  }

  return (
    <Container className="py-10">
      <section className="w-9/12 mx-auto">
        <p className="text-2xl font-bold text-center">Data Pemohon</p>
        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="flex flex-row justify-between gap-3">
              <div className="w-11/12">
                <FormField
                  name="nik"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold dark:text-white">NIK Pemohon 1</FormLabel>
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
            <div className="w-12/12">
              <FormField
                name="hubunganKeluarga"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Hubungan Keluarga Pemohon 1</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Masukkan Hubungan Keluarga Pemohon 1" />
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
            <div className="flex flex-row justify-between gap-3">
              <div className="w-11/12">
                <FormField
                  name="nik2"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold dark:text-white">NIK Pemohon 2</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" placeholder="Masukkan NIK " />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-1/12 flex items-end justify-end">
                <Button className="w-full">Cari</Button>
              </div>
            </div>
            <div className="w-12/12">
              <FormField
                name="hubunganKeluarga2"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Hubungan Keluarga Pemohon 1</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Masukkan Hubungan Keluarga Pemohon 2" />
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
              <p className="text-2xl font-bold">Lainnya</p>
            </div>
            <div className="flex flex-row gap-4">
              <div className="w-4/12">
                <FormField
                  name="tujuan"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold dark:text-white">Tujuan SKTM</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" placeholder="Masukkan Tujuan SKTM" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-4/12">
                <FormField
                  name="bulanPembuatan"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold dark:text-white">Bulan Pembuatan</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" placeholder="Masukkan Bulan Pembuatan" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-4/12">
                <FormField
                  name="tahunPembuatan"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold dark:text-white">Tahun Pembuatan</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" placeholder="Masukkan Tahun Pembuatan" />
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
      </section>
    </Container>
  )
}

export default Pkr
