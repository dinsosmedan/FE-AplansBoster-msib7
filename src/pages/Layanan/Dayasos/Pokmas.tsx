import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useFieldArray, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import useTitle from '@/hooks/useTitle'
import { HiPlus } from 'react-icons/hi'
import { type pokmasFields, pokmasValidation } from '@/lib/validations/dayasos.validation'
import { yupResolver } from '@hookform/resolvers/yup'
import { Container } from '@/components'
import { useCreateCommunityGroups, useGetBeneficaryByNIK, useGetKecamatan, useGetKelurahan } from '@/store/server'
import * as React from 'react'
import { useToast } from '@/components/ui/use-toast'
import { HiTrash } from 'react-icons/hi2'
import { cn } from '@/lib/utils'
import DatePicker from './../../../components/atoms/DatePicker'

const COMMUNITY_ACTIVITY_CODE = [
  { label: 'Muslim', value: 'COMMUNITY_ACTIVITY_CODE_1' },
  { label: 'Nasrani', value: 'COMMUNITY_ACTIVITY_CODE_2' },
  { label: 'Hindu', value: 'COMMUNITY_ACTIVITY_CODE_3' },
  { label: 'Budha', value: 'COMMUNITY_ACTIVITY_CODE_4' },
  { label: 'Khonghucu', value: 'COMMUNITY_ACTIVITY_CODE_5' },
  { label: 'Umum', value: 'COMMUNITY_ACTIVITY_CODE_6' }
]

const COMMUNITY_ASSISTANCE_TYPE = [
  { label: 'Paket Sembako', value: 'COMMUNITY_ASSISTANCE_TYPE_1' },
  { label: 'Santunan', value: 'COMMUNITY_ASSISTANCE_TYPE_2' },
  { label: 'Sandang', value: 'COMMUNITY_ASSISTANCE_TYPE_3' }
]

const Pokmas = () => {
  useTitle('Kelompok Masyarakat (Pokmas)')
  const { toast } = useToast()
  const [NIK, setNIK] = React.useState('')
  const [index, setIndex] = React.useState(0)

  const forms = useForm<pokmasFields>({
    mode: 'onTouched',
    resolver: yupResolver(pokmasValidation),
    defaultValues: {
      applicantPhoneNumber: '',
      communityName: '',
      communityAddress: '',
      communityActivityCode: '',
      communityActivityTypeDescription: '',
      communityAssistanceType: '',
      areaLevel3: '',
      areaLevel4: '',
      // requestedRabAmount: '',
      // requestedBansosAmount: '',
      // approvedFundAmount: '',
      applicationYear: '',
      bankName: '',
      bankAccName: '',
      bankAccNumber: '',
      bankAccAddress: '',
      statusDisimbursement: '',
      note: '',
      executionDate: '',
      executionPlace: '',
      members: [
        {
          nik: '',
          position: '',
          beneficiary: ''
        }
      ]
    }
  })

  const { fields, append, remove } = useFieldArray({
    control: forms.control,
    name: 'members'
  })

  const areaLevel3 = forms.watch('areaLevel3')
  const { data: kecamatan } = useGetKecamatan()
  const { data: kelurahan, isLoading: isLoadingKelurahan } = useGetKelurahan(areaLevel3 ?? '')
  const { data: beneficiary, refetch, isFetching, isError } = useGetBeneficaryByNIK(NIK, false)
  const { mutate: createPokmas, isLoading: isLoadingCreate } = useCreateCommunityGroups()

  React.useEffect(() => {
    if (NIK !== '') void refetch()
  }, [NIK])

  React.useEffect(() => {
    if (isError) {
      toast({
        title: 'NIK tidak terdaftar',
        description: 'Maaf NIK tidak terdaftar silahkan daftarkan NIK pada menu Data Master',
        variant: 'destructive'
      })
    }
  }, [isError])

  React.useEffect(() => {
    if (beneficiary != null) {
      forms.setValue(`members.${index}.beneficiary`, beneficiary?.id)
      toast({
        title: 'NIK terdaftar',
        description: 'NIK terdaftar, silahkan isi form berikut'
      })
    }
  }, [beneficiary])

  const handleFetchNik = async (index: number) => {
    const nik = forms.getValues(`members.${index}.nik`)
    if (nik != null) {
      setNIK(nik)
      setIndex(index)
    }
  }

  const onSubmit = async (values: pokmasFields) => {
    console.log(values)

    const newData = {
      ...values,
      members: values?.members?.map((member) => {
        const { nik, ...newMember } = member
        return newMember
      })
    }

    createPokmas(newData, {
      onSuccess: () => forms.reset()
    })
  }

  return (
    <Container className="py-10">
      <div className="w-full text-center">
        <p className="text-2xl font-bold">Data Personal</p>
      </div>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-row gap-4 pt-5">
            <div className="w-6/12">
              <FormField
                name="communityName"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Nama Kelompok Masyarakat</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Nama Kelompok Masyarakat" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-6/12">
              <FormField
                name="applicantPhoneNumber"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">No. HP Pemohon</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan No. HP Pemohon" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="w-full text-center">
            <p className="text-2xl font-bold">Alamat POKMAS</p>
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={areaLevel3 === '' || isLoadingKelurahan}
                    >
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
              name="communityAddress"
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
            <p className="text-2xl font-bold">Data Lembaga</p>
          </div>
          <div className="flex flex-row gap-4">
            <div className="w-4/12">
              <FormField
                name="communityActivityCode"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Kode Kegiatan</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Kode Kegiatan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {COMMUNITY_ACTIVITY_CODE.map((item, index) => (
                          <SelectItem value={item.value} key={index}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-4/12">
              <FormField
                name="communityActivityTypeDescription"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Jenis Kegiatan</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Jenis Kegiatan" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-4/12">
              <FormField
                name="communityAssistanceType"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Jenis Bantuan</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Jenis Bantuan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {COMMUNITY_ASSISTANCE_TYPE.map((item, index) => (
                          <SelectItem value={item.value} key={index}>
                            {item.label}
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
          <div className="flex flex-row gap-4">
            <div className="w-4/12">
              <FormField
                name="requestedRabAmount"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Jumlah Permohonan RAB</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" placeholder="Rp. " />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-4/12">
              <FormField
                name="requestedBansosAmount"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Jumlah Permohonan Bansos</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" placeholder="Rp. " />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-4/12">
              <FormField
                name="approvedFundAmount"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Jumlah Dana Disetujui</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" placeholder="Rp. " />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="w-4/12">
              <FormField
                name="executionDate"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Jadwal Pelaksaaan</FormLabel>
                    <FormControl>
                      <DatePicker onChange={field.onChange} selected={field.value} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-4/12">
              <FormField
                name="executionPlace"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Tempat Pelaksanaan</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Tempat Pelaksanaan" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-4/12">
              <FormField
                name="applicationYear"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Tahun Permohonan</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Tahun Permohonan" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="w-4/12">
              <FormField
                name="bankName"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Nama Bank</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Bank Sumut" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-4/12">
              <FormField
                name="bankAccName"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Nama Rekening</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Nama Rekening" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-4/12">
              <FormField
                name="bankAccNumber"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Nomor Rekening</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Masukkan Nomor Rekening" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="w-4/12">
              <FormField
                name="bankAccAddress"
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
            <div className="w-4/12">
              <FormField
                name="statusDisimbursement"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Status Pencairan</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Masukkan Status Pencairan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="STATUS_PROCESSED">Diproses</SelectItem>
                        <SelectItem value="STATUS_RECEIVED">Diterima</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="w-full text-center">
            <p className="text-2xl font-bold">Data Pengurus</p>
          </div>
          {fields.map((field, index) => (
            <div className="flex flex-row gap-4" key={field.id}>
              <FormField
                name={`members.${index}.beneficiary`}
                control={forms.control}
                render={({ field }) => <Input {...field} type="text" hidden className="hidden" />}
              />
              <div className="w-6/12">
                <FormField
                  name={`members.${index}.nik`}
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold dark:text-white">NIK</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" placeholder="Masukkan NIK" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-6/12">
                <FormField
                  name={`members.${index}.position`}
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold dark:text-white">Jabatan</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Jabatan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="POSITION_CHAIRMAN">Ketua</SelectItem>
                          <SelectItem value="POSITION_SECRETARY">Sekretaris</SelectItem>
                          <SelectItem value="POSITION_TREASURER">Bendahara</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className={cn('flex items-end justify-end gap-2', index > 0 ? 'w-auto' : 'w-[11%]')}>
                <Button
                  className="w-full"
                  type="button"
                  onClick={async () => await handleFetchNik(index)}
                  loading={isFetching}
                >
                  Cari
                </Button>
                {index > 0 && (
                  <Button
                    className="w-full bg-white border border-zinc-500 hover:bg-zinc-200"
                    type="button"
                    onClick={() => remove(index)}
                  >
                    <HiTrash className="text-lg text-zinc-800" />
                  </Button>
                )}
              </div>
            </div>
          ))}
          <Button
            className="bg-primary flex w-fit mx-auto rounded-xl py-6 gap-2"
            type="button"
            onClick={() => append({ beneficiary: '', position: '', nik: '' })}
          >
            <HiPlus className="w-6 h-6 text-white" />
            <p className="font-bold text-sm text-white">Tambah Anggota</p>
          </Button>
          <div className="flex justify-end gap-4 mt-8">
            <Button variant="cancel" className="font-bold" onClick={() => forms.reset()} type="button">
              Cancel
            </Button>
            <Button className="font-bold" type="submit" loading={isLoadingCreate}>
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </Container>
  )
}

export default Pokmas
