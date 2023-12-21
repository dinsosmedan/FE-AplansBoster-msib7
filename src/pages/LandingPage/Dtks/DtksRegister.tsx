import ContainerUser from '@/components/organisms/landingPage/ContainerUser'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { HiDocumentArrowUp, HiPaperAirplane } from 'react-icons/hi2'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from '@/components/ui/select'
import DropZone, { type FileWithPreview } from '../../../components/atoms/DropZone'
import DatePicker from './../../../components/atoms/DatePicker'
import { useGetKecamatan, useGetKelurahan, usePublicEventDTKS } from '@/store/server'
import { type PublicDTKSFields, publicEventDTKS } from '@/lib/validations/landingPage/public.validation'
import { yupResolver } from '@hookform/resolvers/yup'
import { formatDateToString } from '@/lib/services/formatDate'
import { useAlert } from '@/store/client'
import { useNavigate } from 'react-router-dom'
import { SearchSelect } from '@/components'

export default function DtksRegister() {
  const navigate = useNavigate()
  const { alert } = useAlert()
  const forms = useForm<PublicDTKSFields>({
    mode: 'onTouched',
    resolver: yupResolver(publicEventDTKS)
  })
  const { mutate: dtks, isLoading } = usePublicEventDTKS()
  const areaLevel3 = forms.watch('areaLevel3')
  const { data: listKecamatan } = useGetKecamatan()
  const { data: listKelurahan } = useGetKelurahan(areaLevel3)
  const onSubmit = async (data: PublicDTKSFields) => {
    const newData = {
      ...data,
      birthDate: formatDateToString(data.birthDate as Date),
      pregnantDate: formatDateToString(data.pregnantDate as Date)
    }

    dtks(newData, {
      onSuccess: () => {
        void alert({
          title: 'Pengajuan Berhasil Dibuat',
          description: 'Lihat Riwayat Pengajuan!',
          submitText: 'Oke',
          variant: 'success'
        })
      }
    })
  }

  return (
    <ContainerUser title={'Form Pengajuan DTKS (Data Terpadu Kesejahteraan Sosial) '}>
      <p className="text-[18px] font-semibold mt-5">Data Individu</p>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6 pt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <FormField
              name="name"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Nama</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      type="text"
                      placeholder="Masukkan Nama Anda"
                      className="rounded-md"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="identityNumber"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">NIK </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      className="rounded-md"
                      type="number"
                      placeholder="Cari NIK"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="familyCardNumber"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">No. KK</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      className="rounded-md"
                      type="text"
                      placeholder="Masukkan No. KK "
                    />
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
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      className="rounded-md"
                      type="text"
                      placeholder="Masukkan Tempat Lahir "
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="birthDate"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tanggal Lahir</FormLabel>
                  <DatePicker
                    className="rounded-md"
                    selected={field.value as Date}
                    onChange={field.onChange}
                    placeholder="dd/mm/yyy"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="motherName"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Nama Ibu Kandung</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      className="rounded-md"
                      type="text"
                      placeholder="Masukan Nama Ibu Kandung"
                    />
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
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="rounded-md">
                      <SelectValue placeholder="Pilih Jenis Kelamin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LAKI-LAKI">Laki-laki</SelectItem>
                      <SelectItem value="PEREMPUAN">Perempuan</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              name="occupation"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Jenis Perkerjaan</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-md">
                          <SelectValue placeholder="Pilih Jenis Perkerjaan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {/* <SelectItem value="m@example.com">Krisna Asu</SelectItem>
                        <SelectItem value="m@google.com">Krisna Cuki</SelectItem>
                        <SelectItem value="m@support.com">The Little Krishna</SelectItem> */}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="maritalStatus"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Status Pernikahan</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-md">
                          <SelectValue placeholder="Pilih Status Pernikahan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="BELUM MENIKAH">BELUM MENIKAH</SelectItem>
                        <SelectItem value="CERAI HIDUP">CERAI HIDUP</SelectItem>
                        <SelectItem value="CERAI MATI">CERAI MATI</SelectItem>
                        <SelectItem value="MENIKAH">MENIKAH</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormField
              name="areaLevel3"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Kecamatan</FormLabel>
                  <FormControl>
                    <SearchSelect
                      selected={field.value}
                      onChange={field.onChange}
                      width="md:w-[300px] lg:w-[700px]"
                      className="rounded-md"
                      placeholder="Pilih Kecamatan"
                      options={
                        listKecamatan?.map((kecamatan) => ({ label: kecamatan.name, value: kecamatan.id })) ?? []
                      }
                    />
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
                    <SearchSelect
                      selected={field.value}
                      onChange={field.onChange}
                      disabled={!areaLevel3}
                      width="md:w-[300px] lg:w-[700px]"
                      className="rounded-md"
                      placeholder="Pilih Kelurahan"
                      options={
                        listKelurahan?.map((kelurahan) => ({ label: kelurahan.name, value: kelurahan.id })) ?? []
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField
            name="address"
            control={forms.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold dark:text-white">Alamat Lengkap</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value ?? ''}
                    className="rounded-md"
                    placeholder="Masukan Alamat Lengkap Anda"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <p className="font-semibold text-[18px] mt-5">Survey Kriteria</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormField
              name="question1"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">
                    1. Apakah memiliki tempat berteduh tetap sehari-hari?
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-md">
                          <SelectValue placeholder="Pilih Jawaban" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">YA</SelectItem>
                        <SelectItem value="0">TIDAK</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="question2"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">
                    2. Apakah target survey tinggal bersama anggota keluarga?
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-md">
                          <SelectValue placeholder="Pilih Jawaban" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">YA</SelectItem>
                        <SelectItem value="0">TIDAK</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="question3"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">
                    3. Apakah kepala keluarga atau pengurus keluarga masih bekerja?
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-md">
                          <SelectValue placeholder="Pilih Jawaban" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">YA</SelectItem>
                        <SelectItem value="0">TIDAK</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="question4"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">
                    4. Apakah pernah khawatir atau pernah tidak makan dalam setahun terakhir?
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-md">
                          <SelectValue placeholder="Pilih Jawaban" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">YA</SelectItem>
                        <SelectItem value="0">TIDAK</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="question5"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">
                    5. Apakah pengeluaran pangan lebih besar (&gt70%) dari total pengeluaran?
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-md">
                          <SelectValue placeholder="Pilih Jawaban" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">YA</SelectItem>
                        <SelectItem value="0">TIDAK</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="question6"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">
                    6. Apakah ada pengeluaran untuk pakaian selama 1 (satu) tahun terakhir?
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-md">
                          <SelectValue placeholder="Pilih Jawaban" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">YA</SelectItem>
                        <SelectItem value="0">TIDAK</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="question7"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">
                    7. Apakah tempat tinggal sebagian besar berlantai tanah dan/atau plesteran?{' '}
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-md">
                          <SelectValue placeholder="Pilih Jawaban" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">YA</SelectItem>
                        <SelectItem value="0">TIDAK</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="question8"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">
                    8. Apakah tempat tinggal sebagian besar berdinding batu / kawat / kayu?
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-md">
                          <SelectValue placeholder="Pilih Jawaban" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">YA</SelectItem>
                        <SelectItem value="0">TIDAK</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="question9"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">
                    9. Apakah tempat tinggal memiliki fasilitas buang air kecil / besar sendiri?{' '}
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-md">
                          <SelectValue placeholder="Pilih Jawaban" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">YA</SelectItem>
                        <SelectItem value="0">TIDAK</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="question10"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">
                    10. Apakah sumber penerangan berasal dari listrik PLN 450 watt atau bukan listrik?{' '}
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-md">
                          <SelectValue placeholder="Pilih Jawaban" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">YA</SelectItem>
                        <SelectItem value="0">TIDAK</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <p className="font-semibold text-[18px] mt-5">
            Pengusulan BANSOS
            <p className="text-sm text-primary font-medium">
              *Catatan: File yang diizinkan berupa jpg atau pdf. Dengan maksimal 2MB
            </p>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <FormField
              name="assistanceProgram"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Program BANSOS</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-md">
                          <SelectValue placeholder="Pilih Program Bansos" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="PKH">PKH</SelectItem>
                        <SelectItem value="BPNT">BPNT</SelectItem>
                        <SelectItem value="NON BANSOS">NON BANSOS</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="disabilityStatus"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Status Disabilitas</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-md">
                          <SelectValue placeholder="Pilih Status Disabilitas" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Penyandang Disabilitas Fisik">Penyandang Disabilitas Fisik</SelectItem>
                        <SelectItem value="Penyandang Disabilitas Intelektual">
                          Penyandang Disabilitas Intelektual
                        </SelectItem>
                        <SelectItem value="Penyandang Disabilitas Mental">Penyandang Disabilitas Mental</SelectItem>
                        <SelectItem value="Penyandang Disabilitas Sensorik">Penyandang Disabilitas Sensorik</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="pregnantDate"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tanggal Hamil</FormLabel>
                  <DatePicker
                    selected={field.value as Date}
                    onChange={field.onChange}
                    placeholder="dd/mm/yyy"
                    className="rounded-md"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="familyRelationship"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Status Orang Tua</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="rounded-md">
                        <SelectValue placeholder="Status Orang Tua" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="KEPALA KELUARGA">KEPALA KELUARGA</SelectItem>
                      <SelectItem value="SUAMI">SUAMI</SelectItem>
                      <SelectItem value="ISTRI">ISTRI</SelectItem>
                      <SelectItem value="ANAK">ANAK</SelectItem>
                      <SelectItem value="FAMILI LAIN">FAMILI LAIN</SelectItem>
                      <SelectItem value="CUCU">CUCU</SelectItem>
                      <SelectItem value="MERTUA">MERTUA</SelectItem>
                      <SelectItem value="ORANG TUA">ORANG TUA</SelectItem>
                      <SelectItem value="BLM DITENTUKAN">BELUM DITENTUKAN</SelectItem>
                      <SelectItem value="MENANTU">MENANTU</SelectItem>
                      <SelectItem value="PEMBANTU">PEMBANTU</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              name="remoteIndigenousStatus"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Status Adat Terpencil</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-md">
                          <SelectValue placeholder="Status Adat Terpencil" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">Ya</SelectItem>
                        <SelectItem value="0">Tidak</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="tribeName"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Nama Suku</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      className="rounded-md"
                      type="text"
                      placeholder="Masukan Nama Suku"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-12">
            <FormField
              name="indentityPath"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-md">Foto KTP/KK</FormLabel>
                  <FormControl className="w-[522px]">
                    <DropZone
                      setValue={field.onChange}
                      fileValue={field.value as unknown as FileWithPreview[]}
                      helperText="*Catatan: File yang diizinkan berupa jpg atau pdf. Dengan maksimal 2MB"
                      accept={{ 'image/jpeg': ['.jpg', '.jpeg'], 'application/pdf': ['.pdf'] }}
                      maxFiles={1}
                      id="indentityPath"
                      Icon={HiDocumentArrowUp}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="housePath"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-md">Foto Rumah</FormLabel>
                  <FormControl className="w-[522px]">
                    <DropZone
                      setValue={field.onChange}
                      fileValue={field.value as unknown as FileWithPreview[]}
                      helperText="*Catatan: File yang diizinkan berupa jpg atau pdf. Dengan maksimal 2MB"
                      accept={{ 'image/jpeg': ['.jpg', '.jpeg'], 'application/pdf': ['.pdf'] }}
                      maxFiles={1}
                      id="housePath"
                      Icon={HiDocumentArrowUp}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="md:flex justify-end gap-7 items-center pt-10">
            <Button
              variant="outline"
              className="border-primary text-primary px-8 py-6 rounded-lg md:w-fit w-full"
              type="button"
              onClick={() => navigate(-1)}
            >
              <p className="text-base font-semibold">Kembali</p>
            </Button>
            <Button
              className="px-8 py-6 rounded-lg items-center gap-3 md:w-fit w-full mt-5 md:mt-0"
              loading={isLoading}
              type="submit"
            >
              <p className="text-base font-semibold flex-1">Kirim Pengajuan</p>
              <HiPaperAirplane className="w-5 h-5" />
            </Button>
          </div>
        </form>
      </Form>
    </ContainerUser>
  )
}
