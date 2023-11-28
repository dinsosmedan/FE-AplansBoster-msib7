import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import useTitle from '@/hooks/useTitle'
import { Container } from '@/components'

const Pkr = () => {
  useTitle('Penanganan Kelompok Rentan (PKR)')

  interface FormValues {
    nik: string
    tanggal: string
    kejadian: string
    noRekening: string
    namaBank: string
    jumlahDibantu: string
    tahun: string
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
        <p className="text-2xl font-bold text-center">Data Personal</p>
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
            <div className="w-full text-center">
              <p className="text-2xl font-bold">Alamat</p>
            </div>
            <div className="flex flex-row gap-4">
              <div className="w-6/12">
                <FormField
                  name="tanggal"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold dark:text-white">Tanggal Kejadian</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" placeholder="Masukkan Tanggal Kejadian" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-6/12">
                <FormField
                  name="kejadian"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold dark:text-white">Alamat Kejadian</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Masukkan Alamat Kejadian" />
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
            <div className="w-full text-center">
              <p className="text-2xl font-bold">Data Bank</p>
            </div>
            <div className="flex flex-row gap-4">
              <div className="w-6/12">
                <FormField
                  name="noRekening"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold dark:text-white">No Rekening</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" placeholder="Masukkan No Rekening" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-6/12">
                <FormField
                  name="namaBank"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold dark:text-white">Masukkan Nama Bank</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Masukkan Masukkan Nama Bank" />
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
            <div className="flex flex-row gap-4">
              <div className="w-6/12">
                <FormField
                  name="jumlahDibantu"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold dark:text-white">Jumlah Dibantu</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" placeholder="Masukkan Jumlah Dibantu" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-6/12">
                <FormField
                  name="tahun"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold dark:text-white">Tahun</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" placeholder="Masukkan Tahun" />
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
