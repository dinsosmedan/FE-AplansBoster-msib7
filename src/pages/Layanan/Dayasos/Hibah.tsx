import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import useTitle from '@/hooks/useTitle'
import { hibahValidation, type hibahFields } from '@/lib/validations/dayasos.validation'
import { useCreateOrganizationGrantAssistance, useGetKecamatan, useGetKelurahan } from '@/store/server'
import { yupResolver } from '@hookform/resolvers/yup'

const Hibah = () => {
  useTitle('Bansos Hibah Organisasi/Lembaga (BHO)')

  const forms = useForm<hibahFields>({
    mode: 'onTouched',
    resolver: yupResolver(hibahValidation),
    defaultValues: {
      name: '',
      contactNumber: '',
      areaLevel3: '',
      areaLevel4: '',
      address: '',
      chairmanIdentityNumber: '',
      chairmanName: '',
      secretaryIdentityNumber: '',
      secretaryName: '',
      treasurerIdentityNumber: '',
      treasurerName: '',
      bankAccountNumber: '',
      bankName: '',
      bankAccountAddress: '',
      // approvedAmount: '' | 0,
      budgetYear: '',
      note: ''
    }
  })

  const areaLevel3 = forms.watch('areaLevel3')
  const { data: kecamatan } = useGetKecamatan()
  const { data: kelurahan } = useGetKelurahan(areaLevel3 ?? '')
  const { mutate: createHibah, isLoading } = useCreateOrganizationGrantAssistance()

  const onSubmit = async (values: hibahFields) => {
    createHibah(values, {
      onSuccess: () => forms.reset()
    })
  }

  return (
    <div className="container bg-white py-5">
      <div className="w-full text-center">
        <p className="text-2xl font-bold">Data Organisasi/Lembaga</p>
      </div>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-row gap-4 pt-5">
            <div className="w-6/12">
              <FormField
                name="name"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Nama Lembaga/Organisasi</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Nama Pemohon" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-6/12">
              <FormField
                name="contactNumber"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">No. Telepon Lembaga/Organisasi</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" placeholder="Masukkan No. Telepon Pemohon " />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="w-full text-center">
            <p className="text-2xl font-bold">Alamat</p>
          </div>
          <div className="flex flex-row gap-4">
            <div className="w-6/12">
              <FormField
                name="areaLevel3"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Kecamatan</FormLabel>
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-6/12">
              <FormField
                name="areaLevel4"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Kelurahan</FormLabel>
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div>
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
          <div className="w-full text-center">
            <p className="text-2xl font-bold">Data Anggota</p>
          </div>
          <div className="flex flex-row gap-4">
            <div className="w-6/12">
              <FormField
                name="chairmanIdentityNumber"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">NIK Ketua</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" placeholder="Masukkan NIK Ketua" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-6/12">
              <FormField
                name="chairmanName"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Nama Ketua</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Nama Ketua " />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="w-6/12">
              <FormField
                name="secretaryIdentityNumber"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Nama Sekretaris</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" placeholder="Masukkan Nama Sekretaris" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-6/12">
              <FormField
                name="secretaryName"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Nama Sekretaris</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Nama Sekretaris " />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="w-6/12">
              <FormField
                name="treasurerIdentityNumber"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">NIK Bendahara</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" placeholder="Masukkan NIK Bendahara" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-6/12">
              <FormField
                name="treasurerName"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Nama Bendahara</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Nama Bendahara " />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="w-full text-center">
            <p className="text-2xl font-bold">Lainnya</p>
          </div>
          <div className="flex flex-row gap-4">
            <div className="w-6/12">
              <FormField
                name="bankAccountNumber"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">No. Rekening</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" placeholder="Masukkan No. Rekening " />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-6/12">
              <FormField
                name="bankName"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Nama Bank</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Nama Bank" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="w-6/12">
              <FormField
                name="bankAccountAddress"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Alamat Rekening</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Alamat Rekening" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-6/12">
              <FormField
                name="approvedAmount"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Jumlah Bantuan</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" placeholder="Masukkan Jumlah Bantuan " />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="w-6/12">
              <FormField
                name="budgetYear"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Tahun Anggaran</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Tahun Anggaran" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-6/12">
              <FormField
                name="note"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Keterangan</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Keterangan " />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-8">
            <Button variant="cancel" className="font-bold" onClick={() => forms.reset()} type="button">
              Cancel
            </Button>
            <Button className="font-bold" loading={isLoading} type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default Hibah
