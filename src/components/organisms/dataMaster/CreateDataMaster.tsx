import { type beneficaryFields } from '@/lib/validations/beneficary.validation'
import { useForm } from 'react-hook-form'
import { Modal } from '..'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DatePicker } from '@/components'
import { useGetKecamatan, useGetKelurahan } from '@/store/server'

interface CreateDataMasterProps {
  isShow: boolean
  setIsShow: (isShow: boolean) => void
}

// const lastEducationLists = [
//   { value: 'TIDAK/BLM SEKOLAH', label: 'Tidak/belum sekolah' },
//   { value: 'BELUM TAMAT SD/SEDERAJAT', label: 'BSD/sederajat' }
// ]

export default function CreateDataMaster({ isShow, setIsShow }: CreateDataMasterProps) {
  const forms = useForm<beneficaryFields>({
    mode: 'onTouched'
  })

  const areaLevel3 = forms.watch('areaLevel3')
  const { data: listKecamatan } = useGetKecamatan()
  const { data: listKelurahan } = useGetKelurahan(areaLevel3)

  const onSubmit = async (values: beneficaryFields) => {
    console.log(values)
  }

  return (
    <Modal isShow={isShow} className="md:max-w-4xl max-h-[calc(100vh-50px)] overflow-y-auto scroll-custom">
      <Modal.Header setIsShow={setIsShow} className="gap-1 flex flex-col">
        <h3 className="text-base font-bold leading-6 text-title md:text-2xl">Tambah Data Master</h3>
        <p className="text-sm text-[#A1A1A1]">Masukkan Data Master Baru</p>
      </Modal.Header>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="mt-2 flex-1 gap-3 flex flex-col">
          <div className="flex flex-row justify-between gap-3">
            <div className="w-11/12">
              <FormField
                name="identityNumber"
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
          <div className="flex-row flex-wrap grid grid-cols-2 gap-y-4 gap-x-8">
            <FormField
              name="familyCardNumber"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">No.KK</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="Masukkan No.KK" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="name"
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
              name="address"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Alamat</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Masukkan Alamat" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="areaLevel3"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Kecamatan</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Kecamatan" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {listKecamatan?.map((kecamatan) => (
                        <SelectItem key={kecamatan.id} value={kecamatan.id}>
                          {kecamatan.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                    <Select onValueChange={field.onChange} value={field.value} disabled={!areaLevel3}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Kelurahan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {listKelurahan?.map((kelurahan) => (
                          <SelectItem key={kelurahan.id} value={kelurahan.id}>
                            {kelurahan.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="religion"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Agama</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Masukkan Agama" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="birthPlace"
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

            <FormField
              name="birthDate"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Tanggal Lahir</FormLabel>
                  <FormControl>
                    <DatePicker selected={field.value as Date} onChange={field.onChange} placeholder="dd/mm/yyyy" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="gender"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Jenis Kelamin</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
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
              name="lastEducation"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Pendidikan Terakhir</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Pendidikan Terakhir" />
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
              name="occupation"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Pekerjaan</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Masukkan Pekerjaan" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="bloodType"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Golongan Darah</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Masukkan Golongan Darah" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="martialStatus"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Status Kawin</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Status Kawin" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="MENIKAH">Menikah</SelectItem>
                        <SelectItem value="BELUM MENIKAH">Belum menikah</SelectItem>
                        <SelectItem value="CERAI HIDUP">Cerai hidup</SelectItem>
                        <SelectItem value="CERAI MATI">Cerai mati</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="citizenship"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Kewarganegaraan</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Masukkan Kewarganegaraan" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="motherName"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Nama Ibu</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Masukkan Nama Ibu" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="fatherName"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Nama Bapak</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Masukkan Nama Bapak" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="isDtks"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Status DTKS</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value as string}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Status DTKS" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="true">DTKS</SelectItem>
                        <SelectItem value="false">Non DTKS</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
      <Modal.Footer>
        <Button
          variant="outline"
          className="rounded-lg text-primary border-primary"
          onClick={() => setIsShow(false)}
          type="button"
        >
          Cancel
        </Button>
        <Button className="rounded-lg" type="submit">
          Tambah Data
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
