import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Container } from '@/components'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { useTitle } from '@/hooks'
import { worshipPlaceValidation, type worshipPlaceFields } from '@/lib/validations/dayasos.validation'

import { useGetKecamatan, useGetKelurahan } from '@/store/server'
import { useCreateWorshipPlace } from '@/store/server/useDayasos'

export const JENIS_RUMAH_IBADAH = [
  'MESJID',
  'MUSHOLLA',
  'GEREJA',
  'GEREJA KATOLIK',
  'KUIL BUDHA',
  'KUIL HINDU',
  'KONG HU CHU'
]

const Ri = () => {
  const { toast } = useToast()
  useTitle('Rumah Ibadah ')

  const forms = useForm<worshipPlaceFields>({
    mode: 'onTouched',
    resolver: yupResolver(worshipPlaceValidation),
    defaultValues: {
      name: '',
      type: '',
      picName: '',
      picPhoneNumber: '',
      areaLevel3: '',
      areaLevel4: '',
      address: '',
      status: '',
      note: ''
    }
  })

  const areaLevel3 = forms.watch('areaLevel3')
  const { data: kecamatan } = useGetKecamatan()
  const { data: kelurahan } = useGetKelurahan(areaLevel3)
  const { mutate: storeWorshipPlace, isLoading } = useCreateWorshipPlace()

  const onSubmit = (values: worshipPlaceFields) => {
    console.log(values)

    storeWorshipPlace(values, {
      onSuccess: () => {
        forms.reset()
        toast({
          title: 'Proses Berhasil!!',
          description: 'Data Rumah Ibadah Berhasil Ditambahkan'
        })
      }
    })
  }

  return (
    <Container className="py-10">
      <section className="w-9/12 mx-auto">
        <p className="text-2xl font-bold text-center mb-6">Data Rumah Ibadah</p>
        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col">
            <div className="grid grid-cols-2 gap-x-8 gap-y-5">
              <FormField
                name="name"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Nama Rumah Ibadah</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Nama Rumah Ibadah" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="type"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Jenis Rumah Ibadah</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Jenis Rumah Ibadah" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {JENIS_RUMAH_IBADAH.map((item, index) => (
                            <SelectItem value={item} key={index}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="picName"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Nama Penanggung Jawab</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Nama Penanggung Jawab" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="picPhoneNumber"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">No. Telepon</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan No. Telepon " />
                    </FormControl>
                    <FormMessage />
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
                          {kecamatan?.map((item, index) => (
                            <SelectItem value={item.id} key={index}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
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
                      <Select onValueChange={field.onChange} defaultValue={field.value} disabled={areaLevel3 === ''}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Kelurahan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {kelurahan?.map((item, index) => (
                            <SelectItem value={item.id} key={index}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <p className="text-2xl font-bold text-center mb-5 mt-12">Lainnya</p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-5">
              <FormField
                name="status"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Status</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="aktif">Aktif</SelectItem>
                          <SelectItem value="tidak aktif">Tidak Aktif</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="note"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Keterangan</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Keterangan" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end gap-4 mt-8">
              <Button variant="cancel" className="font-bold" onClick={() => forms.reset()}>
                Cancel
              </Button>
              <Button className="font-bold" loading={isLoading}>
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </section>
    </Container>
  )
}

export default Ri
