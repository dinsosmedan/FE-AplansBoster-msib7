import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import useTitle from '@/hooks/useTitle'
import { HiPlus } from 'react-icons/hi'
import { Container } from '@/components'
import { type kubeFields } from '@/lib/validations/dayasos.validation'

const Kube = () => {
  useTitle('Kelompok Usaha Bersama (KUBE)')

  const forms = useForm<kubeFields>({
    mode: 'onTouched',
    defaultValues: {
      businessName: '',
      businessType: '',
      businessAddress: '',
      areaLevel3: '',
      areaLevel4: '',
      assistanceAmount: 0,
      budgetYear: '',
      status: '',
      note: '',
      members: [{ beneficiary: '', position: '' }]
    }
  })

  const onSubmit = async (values: kubeFields) => {
    console.log(values)
  }

  return (
    <Container className="py-10">
      <div className="w-full text-center">
        <p className="text-2xl font-bold">Data Kelompok Usaha Bersama</p>
      </div>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-row gap-4 pt-5">
            <div className="w-4/12">
              <FormField
                name="businessName"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Nama KUBE</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Nama Kelompok Masyarakat" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="w-4/12">
              <FormField
                name="businessType"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Jenis Usaha</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Jenis Usaha" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            {/* <div className="w-4/12">
              <FormField
                name="batch"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Batch</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Batch" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div> */}
          </div>
          <div className="w-full text-center">
            <p className="text-2xl font-bold">Alamat KUBE</p>
          </div>
          <div className="flex flex-row gap-4">
            {/* <div className="w-4/12">
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
            </div> */}
            <div className="w-4/12">
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
            </div>
            <div className="w-4/12">
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
          </div>
          <div>
            <FormField
              name="businessAddress"
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
            <p className="text-2xl font-bold">Data Pengurus</p>
          </div>
          <div className="flex flex-row gap-4">
            {/* <div className="w-4/12">
              <FormField
                name="nik"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">NIK</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan NIK" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div> */}
            {/* <div className="w-4/12">
              <FormField
                name="namaPengurus"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Nama Pengurus</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Nama Pengurus" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div> */}
            <div className="w-4/12">
              <FormField
                name="members.0.position"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Jabatan</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Jabatan" />
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
            <div className="w-1/12 flex items-end justify-end">
              <Button className="w-full">Cari</Button>
            </div>
          </div>
          <Button className="bg-primary flex w-fit mx-auto rounded-xl py-6 gap-2 ">
            <HiPlus className="w-6 h-6 text-white" />
            <p className="font-bold text-sm text-white">Tambah Anggota</p>
          </Button>
          <div className="w-full text-center">
            <p className="text-2xl font-bold">Bantuan</p>
          </div>
          <div className="flex flex-row gap-4">
            <div className="w-4/12">
              <FormField
                name="budgetYear"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Tahun Anggaran</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Tahun Anggaran" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="w-4/12">
              <FormField
                name="status"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Status Verifikasi</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Status Verifikasi" />
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
                name="note"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Keterangan</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Keterangan" />
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
    </Container>
  )
}

export default Kube
