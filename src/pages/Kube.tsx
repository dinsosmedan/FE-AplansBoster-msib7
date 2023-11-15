import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { HiOutlineDocumentArrowUp } from 'react-icons/hi2'

const Kube = () => {
  interface FormValues {
    nik: string
    kota: string
    kecamatan: string
    kelurahan: string
    alamatLengkap: string
    nikSekretaris: string
    namaSekretaris: string
    nikBendahara: string
    namaBendahara: string
    namaKube: string
    jenisUsaha: string
    namaKetua: string
    nikKetua: string
    keterangan: string
    jumlahBantuan: string
    tahunAnggaran: string
    statusVerifikasi: string
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
          <div className="flex flex-row gap-4 py-5">
            <div className="w-6/12">
              <FormField
                name="nikKetua"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">NIK Ketua</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan NIK Ketua" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="w-6/12">
              <FormField
                name="namaKetua"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Nama Ketua</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Nama Ketua" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="w-6/12">
              <FormField
                name="nikSekretaris"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">NIK Sekretaris</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan NIK Serketaris" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="w-6/12">
              <FormField
                name="namaSekretaris"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Nama Sekretaris</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Nama Sekretaris" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="w-6/12">
              <FormField
                name="nikBendahara"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">NIK Bendahara</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan NIK Bendahara" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="w-6/12">
              <FormField
                name="namaBendahara"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Nama Bendahara</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Nama Bendahara" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="w-6/12">
              <FormField
                name="namaKube"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Nama Kube</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Nama Kube" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="w-6/12">
              <FormField
                name="jenisUsaha"
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
                name="kecamatan"
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
                    <Textarea {...field} placeholder="Masukkan Alamat Lengkap Masyarakat." />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="w-full text-center">
            <p className="text-2xl font-bold">Data Anggota</p>
          </div>
          <Table>
            <TableHeader className="bg-primary text-base ">
              <TableRow>
                <TableHead className="w-[225px] text-center text-white">NIK Anggota</TableHead>
                <TableHead className="w-[225px] text-center text-white">Nama Anggota</TableHead>
                <TableHead className="w-[225px] text-center text-white">DTKS</TableHead>
                <TableHead className="w-[225px] text-center text-white">NON DTKS</TableHead>
                <TableHead className="w-[225px] text-center text-white">File DTKS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-base text-center">Oza Puki</TableCell>
                <TableCell className="text-base text-center">Oza Cabul</TableCell>
                <TableCell className="text-center">
                  <Checkbox />
                </TableCell>
                <TableCell className="text-center">
                  <Checkbox />
                </TableCell>
                <TableCell className="text-center">
                  <Button className="w-[150px] h-[25]  bg-primary color text-white ">
                    <HiOutlineDocumentArrowUp className="w-5 h-5 " />
                    <p className="text-sm ml-2">Upload DTKS</p>
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-base text-center">Oza Taik</TableCell>
                <TableCell className="text-base text-center">Oza Cupu</TableCell>
                <TableCell className="text-center">
                  <Checkbox />
                </TableCell>
                <TableCell className="text-center">
                  <Checkbox />
                </TableCell>
                <TableCell className="text-center">
                  <Button className="w-[150px] h-[25] bg-primary color text-white ">
                    <HiOutlineDocumentArrowUp className="w-5 h-5" />
                    <p className="text-sm ml-2">Upload DTKS</p>
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-primary text-center w-[100%] border-t border-b py-2">100% Peserta DKTS</p>
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
          <div className="w-full text-center">
            <p className="text-2xl font-bold">Bantuan</p>
          </div>
          <div className="flex flex-row gap-4">
            <div className="w-4/12">
              <FormField
                name="jumlahBantuan"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Jumlah Bantuan</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Jumlah Bantuan" />
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
                name="statusVerifikasi"
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
export default Kube
