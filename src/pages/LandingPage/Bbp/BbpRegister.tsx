import ContainerUser from '@/components/organisms/landingPage/ContainerUser'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { HiDocumentArrowUp, HiMagnifyingGlass, HiPaperAirplane } from 'react-icons/hi2'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from '@/components/ui/select'
import DropZone, { type FileWithPreview } from '../../../components/atoms/DropZone'
import DatePicker from './../../../components/atoms/DatePicker'

interface FormValues {
  nik: string
  prodi: string
  identityCard: FileWithPreview[]
}

export default function BbpRegister() {
  const forms = useForm<FormValues>({
    mode: 'onTouched'
  })
  const onSubmit = async (values: FormValues) => {
    console.log(values)
  }

  return (
    <ContainerUser title={'Form Pengajuan Bantuan Biaya Pendidikan Gelombang I 2023 '}>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6 pt-16">
          <p className="text-[20px] font-semibold mt-5">Informasi Pribadi</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="flex">
              <div className="w-full">
                <FormField
                  name="nik"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold dark:text-white">NIK </FormLabel>
                      <FormControl>
                        <Input className="rounded-r-none" {...field} type="number" placeholder="Cari NIK" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-end ">
                <Button className="rounded-l-none">
                  <HiMagnifyingGlass className="h-8 w-8" />
                </Button>
              </div>
            </div>
            <FormField
              name="nik"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Nama</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Masukkan Nama Anda" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="nik"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Tempat Lahir</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Masukkan Tempat Lahir " />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <FormField
              name="datpicker"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jadwal Pelaksaaan</FormLabel>
                  <DatePicker selected={field.value as Date} onChange={field.onChange} placeholder="dd/mm/yyy" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="nik"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Jenis Kelamin</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Jenis Kelamin" />
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
              name="nik"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Masukan Email" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormField
              name="nik"
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
              name="nik"
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
          <div className="grid grid-cols-1 gap-5">
            <FormField
              name="nik"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Alamat Lengkap</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Masukan Alamat Lengkap Anda" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <p className="font-semibold text-[20px] mt-5">Akademis</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormField
              name="nik"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Perguruan Tinggi</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Perguruan Tinggi" />
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
              name="prodi"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Prodi</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Prodi" />
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormField
              name="nik"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">IPK</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Masukan IPK" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="prodi"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Semester</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Semester" />
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
              name="nik"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">UKT</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Rp. Masukan UKT Semester" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <p className="font-semibold text-[20px] mt-5">Rekening</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormField
              name="nik"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Nama Bank</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Nama Bank" />
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
              name="nik"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">No Rekening</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Masukan No Rekening" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField
            name="nik"
            control={forms.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold dark:text-white">Nama Pemilik Rekening</FormLabel>
                <FormControl>
                  <Input {...field} type="text" placeholder="Masukan Nama" />
                </FormControl>
              </FormItem>
            )}
          />
          <p className="text-[12px] text-primary font-medium">
            *Catatan: File yang diizinkan berupa jpg, png atau pdf. Dengan maksimal 2MB
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2  gap-12 mt-5">
            <FormField
              name="identityCard"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-md">Scan Surat Permohonan</FormLabel>
                  <FormControl className="w-[522px]">
                    <DropZone
                      setValue={field.onChange}
                      fileValue={field.value as unknown as FileWithPreview[]}
                      helperText="*Catatan: File yang diizinkan berupa jpg, png atau pdf. Dengan maksimal 2MB"
                      accept={{ 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'], 'application/pdf': ['.pdf'] }}
                      maxFiles={1}
                      id="fotoKtp"
                      Icon={HiDocumentArrowUp}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="identityCard"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-md">Pass Foto</FormLabel>
                  <FormControl className="w-[522px]">
                    <DropZone
                      setValue={field.onChange}
                      fileValue={field.value as unknown as FileWithPreview[]}
                      helperText="*Catatan: File yang diizinkan berupa jpg, png atau pdf. Dengan maksimal 2MB"
                      accept={{ 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'], 'application/pdf': ['.pdf'] }}
                      maxFiles={1}
                      id="fotoKtp"
                      Icon={HiDocumentArrowUp}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="identityCard"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-md">Scan Kartu Keluarga</FormLabel>
                  <FormControl className="w-[522px]">
                    <DropZone
                      setValue={field.onChange}
                      fileValue={field.value as unknown as FileWithPreview[]}
                      helperText="*Catatan: File yang diizinkan berupa jpg, png atau pdf. Dengan maksimal 2MB"
                      accept={{ 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'], 'application/pdf': ['.pdf'] }}
                      maxFiles={1}
                      id="fotoKtp"
                      Icon={HiDocumentArrowUp}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="identityCard"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-md">KTP</FormLabel>
                  <FormControl className="w-[522px]">
                    <DropZone
                      setValue={field.onChange}
                      fileValue={field.value as unknown as FileWithPreview[]}
                      helperText="*Catatan: File yang diizinkan berupa jpg, png atau pdf. Dengan maksimal 2MB"
                      accept={{ 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'], 'application/pdf': ['.pdf'] }}
                      maxFiles={1}
                      id="fotoKtp"
                      Icon={HiDocumentArrowUp}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="identityCard"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-md">KTM</FormLabel>
                  <FormControl className="w-[522px]">
                    <DropZone
                      setValue={field.onChange}
                      fileValue={field.value as unknown as FileWithPreview[]}
                      helperText="*Catatan: File yang diizinkan berupa jpg, png atau pdf. Dengan maksimal 2MB"
                      accept={{ 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'], 'application/pdf': ['.pdf'] }}
                      maxFiles={1}
                      id="fotoKtp"
                      Icon={HiDocumentArrowUp}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="identityCard"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-md">Surat Aktif Kuliah</FormLabel>
                  <FormControl className="w-[522px]">
                    <DropZone
                      setValue={field.onChange}
                      fileValue={field.value as unknown as FileWithPreview[]}
                      helperText="*Catatan: File yang diizinkan berupa jpg, png atau pdf. Dengan maksimal 2MB"
                      accept={{ 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'], 'application/pdf': ['.pdf'] }}
                      maxFiles={1}
                      id="fotoKtp"
                      Icon={HiDocumentArrowUp}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="identityCard"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-md">Scan Printout DTKS/PRELIST</FormLabel>
                  <FormControl className="w-[522px]">
                    <DropZone
                      setValue={field.onChange}
                      fileValue={field.value as unknown as FileWithPreview[]}
                      helperText="*Catatan: File yang diizinkan berupa jpg, png atau pdf. Dengan maksimal 2MB"
                      accept={{ 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'], 'application/pdf': ['.pdf'] }}
                      maxFiles={1}
                      id="fotoKtp"
                      Icon={HiDocumentArrowUp}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="identityCard"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-md">Surat Pernyataan Tidak Mendapatkan Mahasiswa</FormLabel>
                  <FormControl className="w-[522px]">
                    <DropZone
                      setValue={field.onChange}
                      fileValue={field.value as unknown as FileWithPreview[]}
                      helperText="*Catatan: File yang diizinkan berupa jpg, png atau pdf. Dengan maksimal 2MB"
                      accept={{ 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'], 'application/pdf': ['.pdf'] }}
                      maxFiles={1}
                      id="fotoKtp"
                      Icon={HiDocumentArrowUp}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="identityCard"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-md">Surat Pernyataan Bukan ASN</FormLabel>
                  <FormControl className="w-[522px]">
                    <DropZone
                      setValue={field.onChange}
                      fileValue={field.value as unknown as FileWithPreview[]}
                      helperText="*Catatan: File yang diizinkan berupa jpg, png atau pdf. Dengan maksimal 2MB"
                      accept={{ 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'], 'application/pdf': ['.pdf'] }}
                      maxFiles={1}
                      id="fotoKtp"
                      Icon={HiDocumentArrowUp}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="identityCard"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-md">Transkrip Nilai (Legalisir)</FormLabel>
                  <FormControl className="w-[522px]">
                    <DropZone
                      setValue={field.onChange}
                      fileValue={field.value as unknown as FileWithPreview[]}
                      helperText="*Catatan: File yang diizinkan berupa jpg, png atau pdf. Dengan maksimal 2MB"
                      accept={{ 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'], 'application/pdf': ['.pdf'] }}
                      maxFiles={1}
                      id="fotoKtp"
                      Icon={HiDocumentArrowUp}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="identityCard"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-md">Scan Buku Tabungan</FormLabel>
                  <FormControl className="w-[522px]">
                    <DropZone
                      setValue={field.onChange}
                      fileValue={field.value as unknown as FileWithPreview[]}
                      helperText="*Catatan: File yang diizinkan berupa jpg, png atau pdf. Dengan maksimal 2MB"
                      accept={{ 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'], 'application/pdf': ['.pdf'] }}
                      maxFiles={1}
                      id="fotoKtp"
                      Icon={HiDocumentArrowUp}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="identityCard"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-md">Bukti Pembayaran UKT Terakhir</FormLabel>
                  <FormControl className="w-[522px]">
                    <DropZone
                      setValue={field.onChange}
                      fileValue={field.value as unknown as FileWithPreview[]}
                      helperText="*Catatan: File yang diizinkan berupa jpg, png atau pdf. Dengan maksimal 2MB"
                      accept={{ 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'], 'application/pdf': ['.pdf'] }}
                      maxFiles={1}
                      id="fotoKtp"
                      Icon={HiDocumentArrowUp}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end gap-7 items-center pt-10">
            <Button variant="outline" className="border-primary text-primary w-[165px] h-[60px]">
              <p className="text-lg font-semibold">Kembali</p>
            </Button>
            <Button className="w-[275px] h-[60px]">
              <p className="text-lg font-semibold">Kirim Pengajuan</p>
              <HiPaperAirplane className="w-6 h-6 ml-2" />
            </Button>
          </div>
        </form>
      </Form>
    </ContainerUser>
  )
}
