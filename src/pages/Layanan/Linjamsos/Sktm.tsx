import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import useTitle from '@/hooks/useTitle'
import { Container } from '@/components'
import { HiMagnifyingGlass } from 'react-icons/hi2'

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
                      <FormLabel className="font-semibold dark:text-white">NIK Pemohon</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" placeholder="Masukkan NIK Masyarakat" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-fit flex items-end justify-end">
                <Button className="w-full gap-2" type="button">
                  <HiMagnifyingGlass className="text-lg" />
                  <span>Cari</span>
                </Button>
              </div>
            </div>

            <div className="flex flex-row justify-between gap-3">
              <div className="w-11/12">
                <FormField
                  name="nik2"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold dark:text-white">NIK Yang Bersangkutan</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" placeholder="Masukkan NIK " />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-fit flex items-end justify-end">
                <Button className="w-full gap-2" type="button">
                  <HiMagnifyingGlass className="text-lg" />
                  <span>Cari</span>
                </Button>
              </div>
            </div>
            <div className="w-12/12">
              <FormField
                name="hubunganKeluarga2"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Status DTKS</FormLabel>
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
              <div className="w-6/12">
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
              <div className="w-6/12">
                <FormField
                  name="bulanPembuatan"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold dark:text-white">Tanggal Pembuatan</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" placeholder="Masukkan Bulan Pembuatan" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <Button variant="cancel" className="font-bold">
                Cancel
              </Button>
              <Button className="font-bold" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </section>
    </Container>
  )
}

export default Pkr
