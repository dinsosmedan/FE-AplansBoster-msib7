import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import useTitle from '@/hooks/useTitle'
import { type veteranFields } from '@/lib/validations/dayasos.validation'
import { Container } from '@/components'

interface FormFields extends veteranFields {
  nik: string
}

const Veteran = () => {
  useTitle('Veteran')

  const forms = useForm<FormFields>({
    mode: 'onTouched'
  })

  const onSubmit = async (values: FormFields) => {
    console.log(values)
  }

  return (
    <Container className="py-10">
      <section className="w-9/12 mx-auto">
        <p className="text-2xl font-bold text-center">Data Veteran</p>
        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col">
            <div className="flex flex-row justify-between gap-3">
              <FormField
                name="nik"
                control={forms.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="font-semibold dark:text-white">NIK</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" placeholder="Masukkan NIK Masyarakat" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="w-fit flex items-end justify-end">
                <Button className="w-full">Cari</Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-5 mt-5">
              <FormField
                name="beneficiary"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Nama</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Nama" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="veteranIdentityNumber"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">NPV</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan NPV" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="veteranUnit"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Satuan</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Satuan" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="uniformSize"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Ukuran Baju Celana</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Ukuran Baju Celana " />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <p className="text-2xl font-bold text-center mb-5 mt-12">Alamat</p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-5">
              <FormField
                name="areaLevel3"
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
              <FormField
                name="areaLevel4"
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
            <div className="mt-5">
              <FormField
                name="address"
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
            <div className="flex justify-end gap-4 mt-8">
              <Button variant="cancel" className="font-bold" onClick={() => forms.reset()}>
                Cancel
              </Button>
              <Button className="font-bold">Submit</Button>
            </div>
          </form>
        </Form>
      </section>
    </Container>
  )
}

export default Veteran
