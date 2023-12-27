import { beneficaryValidation, type beneficaryFields } from '@/lib/validations/beneficary.validation'
import { useForm } from 'react-hook-form'
import { Modal } from '..'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DatePicker, SearchSelect } from '@/components'
import { useCreateBeneficary, useGetBeneficaryByNIK, useGetKecamatan, useGetKelurahan } from '@/store/server'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import * as React from 'react'
import { formatDateToString, formatStringToDate } from '@/lib/services/formatDate'
import { citizenshipLists, lastEducationLists, relationshipLists, religionLists } from '@/lib/data'
import { yupResolver } from '@hookform/resolvers/yup'

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
    mode: 'onTouched',
    resolver: yupResolver(beneficaryValidation)
  })

  const nik = forms.watch('identityNumber')
  const areaLevel3 = forms.watch('areaLevel3')
  const { data: listKecamatan } = useGetKecamatan()
  const { data: listKelurahan } = useGetKelurahan(areaLevel3)
  const { data: beneficary, isLoading, isSuccess, refetch } = useGetBeneficaryByNIK(nik, false)
  const { mutate: createBeneficary, isLoading: isLoadingCreate } = useCreateBeneficary()

  React.useEffect(() => {
    forms.reset({
      identityNumber: beneficary?.identityNumber,
      familyCardNumber: beneficary?.familyCardNumber,
      name: beneficary?.name,
      address: beneficary?.address.fullAddress,
      areaLevel3: beneficary?.address.areaLevel3?.id as string,
      areaLevel4: beneficary?.address.areaLevel4?.id as string,
      birthPlace: beneficary?.birthPlace,
      birthDate: beneficary?.birthDate && formatStringToDate(beneficary?.birthDate),
      gender: beneficary?.gender,
      lastEducation: beneficary?.lastEducation as string,
      religion: beneficary?.religion,
      occupation: beneficary?.occupation,
      martialStatus: beneficary?.maritalStatus as string,
      citizenship: beneficary?.citizenship as string,
      familyRelationship: beneficary?.familyRelationship,
      bloodType: beneficary?.bloodType as string,
      fatherName: beneficary?.fatherName as string,
      motherName: beneficary?.motherName as string,
      isDtks: beneficary?.isDtks
    })
  }, [isSuccess])

  const onSubmit = async (values: beneficaryFields) => {
    const newData = {
      ...values,
      birthDate: formatDateToString(values.birthDate as Date),
      isDtks: values.isDtks === 'true'
    }

    createBeneficary(newData, {
      onSuccess: () => {
        forms.reset()
        setIsShow(false)
      }
    })
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
                      <Input {...field} value={field.value ?? ''} type="number" placeholder="Masukkan NIK Masyarakat" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-fit flex items-end justify-end" onClick={async () => await refetch()}>
              <Button className="w-full gap-2" loading={isLoading} type="button">
                <HiMagnifyingGlass className="text-lg" />
                <span>Cari</span>
              </Button>
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
                    <Input {...field} value={field.value ?? ''} type="number" placeholder="Masukkan No.KK" />
                  </FormControl>
                  <FormMessage />
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
                    <Input {...field} value={field.value ?? ''} type="text" placeholder="Masukkan Nama" />
                  </FormControl>
                  <FormMessage />
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
                    <Input {...field} value={field.value ?? ''} type="text" placeholder="Masukkan Alamat" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                      width="w-[390px]"
                      placeholder="Pilih Kecamatan"
                      options={
                        listKecamatan?.map((kecamatan) => ({ label: kecamatan.name, value: kecamatan.id })) ?? []
                      }
                    />
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
                    <SearchSelect
                      selected={field.value}
                      onChange={field.onChange}
                      disabled={!areaLevel3 || !listKelurahan}
                      width="w-[390px]"
                      placeholder="Pilih Kelurahan"
                      options={
                        listKelurahan?.map((kelurahan) => ({ label: kelurahan.name, value: kelurahan.id })) ?? []
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="religion"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Agama</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Agama" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {religionLists.map((religion, index) => (
                        <SelectItem key={index} value={religion.value}>
                          {religion.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
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
                    <Input {...field} value={field.value ?? ''} type="text" placeholder="Masukkan Tempat Lahir" />
                  </FormControl>
                  <FormMessage />
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
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="gender"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Jenis Kelamin</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Jenis Kelamin" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="LAKI-LAKI">Laki-laki</SelectItem>
                      <SelectItem value="PEREMPUAN">Perempuan</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="lastEducation"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Pendidikan Terakhir</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Pendidikan Terakhir" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {lastEducationLists.map((lastEducation, index) => (
                        <SelectItem key={index} value={lastEducation.value}>
                          {lastEducation.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
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
                    <Input {...field} value={field.value ?? ''} type="text" placeholder="Masukkan Pekerjaan" />
                  </FormControl>
                  <FormMessage />
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
                    <Input {...field} value={field.value ?? ''} type="text" placeholder="Masukkan Golongan Darah" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="martialStatus"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Status Kawin</FormLabel>
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
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="familyRelationship"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Status Keluarga</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Status Keluarga" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {relationshipLists.map((relationship, index) => (
                        <SelectItem key={index} value={relationship} className="capitalize">
                          {relationship}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="citizenship"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Kewarganegaraan</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Kewarganegaraan" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {citizenshipLists.map((citizenship, index) => (
                        <SelectItem key={index} value={citizenship.value}>
                          {citizenship.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
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
                    <Input {...field} value={field.value ?? ''} type="text" placeholder="Masukkan Nama Ibu" />
                  </FormControl>
                  <FormMessage />
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
                    <Input {...field} value={field.value ?? ''} type="text" placeholder="Masukkan Nama Bapak" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="isDtks"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Status DTKS</FormLabel>

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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Modal.Footer>
            <Button
              variant="outline"
              className="rounded-lg text-primary border-primary"
              onClick={() => setIsShow(false)}
              type="button"
            >
              Cancel
            </Button>
            <Button className="rounded-lg" type="submit" loading={isLoadingCreate}>
              Tambah Data
            </Button>
          </Modal.Footer>
        </form>
      </Form>
    </Modal>
  )
}
