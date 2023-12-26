import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import useTitle from '@/hooks/useTitle'
import { hibahValidation, type hibahFields } from '@/lib/validations/dayasos.validation'
import {
  useCreateOrganizationGrantAssistance,
  useGetKecamatan,
  useGetKelurahan,
  useGetOrganizationGrantAssistanceById,
  useUpdateOrganizationGrantAssistance
} from '@/store/server'
import { yupResolver } from '@hookform/resolvers/yup'
import { Container, Loading, SearchSelect } from '@/components'
import { useNavigate, useParams } from 'react-router-dom'
import * as React from 'react'
import { useTitleHeader } from '@/store/client'
import { useNotFound } from '@/hooks'

const Hibah = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  useTitle(`${id ? 'Ubah' : 'Tambah'} Data`)
  const setBreadcrumb = useTitleHeader((state) => state.setBreadcrumbs)

  React.useEffect(() => {
    setBreadcrumb([
      { url: '/data-penerima', label: 'Data Penerima' },
      { label: 'Dayasos & PFM', url: '/data-penerima/dayasos' },
      { label: 'BHO', url: '/data-penerima/dayasos/bho' }
    ])
  }, [])

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
      budgetYear: '',
      note: ''
    }
  })

  const areaLevel3 = forms.watch('areaLevel3')
  const { data: kecamatan } = useGetKecamatan()
  const { data: kelurahan } = useGetKelurahan(areaLevel3 ?? '')
  const { mutate: createHibah, isLoading } = useCreateOrganizationGrantAssistance()

  const { data: hibah, isSuccess, isLoading: isLoadingHibah, isError } = useGetOrganizationGrantAssistanceById(id)
  const { mutate: updateHibah, isLoading: isLoadingUpdate } = useUpdateOrganizationGrantAssistance()

  useNotFound(isError)

  React.useEffect(() => {
    if (isSuccess) {
      forms.reset({
        name: hibah.name,
        address: hibah.address.fullAddress,
        areaLevel3: hibah.address.areaLevel3?.id,
        areaLevel4: hibah.address.areaLevel4?.id,
        chairmanName: hibah.chairmanName,
        chairmanIdentityNumber: hibah.chairmanIdentityNumber,
        secretaryName: hibah.secretaryName,
        secretaryIdentityNumber: hibah.secretaryIdentityNumber,
        treasurerName: hibah.treasurerName,
        treasurerIdentityNumber: hibah.treasurerIdentityNumber,
        contactNumber: hibah.contactNumber,
        bankAccountNumber: hibah.bankAccountNumber,
        bankName: hibah.bankName,
        bankAccountName: hibah.bankAccountName,
        bankAccountAddress: hibah.bankAccountAddress,
        requestedAmount: hibah.requestedAmount,
        approvedAmount: hibah.aprrovedAmount,
        firstDisbursementAmount: hibah.firstDisbursementAmount,
        secondDisbursementAmount: hibah.secondDisbursementAmount,
        note: hibah.note,
        budgetYear: hibah.budgetYear
      })
    }
  }, [isSuccess])

  const onSuccess = () => {
    forms.reset()
    navigate('/data-penerima/dayasos/bho')
  }

  const onSubmit = async (values: hibahFields) => {
    if (!id) return createHibah(values, { onSuccess })
    updateHibah({ id, fields: values }, { onSuccess })
  }

  if (isLoadingHibah) return <Loading />

  console.log(kecamatan, kelurahan)

  return (
    <Container className="px-[47px]">
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
                      <Input {...field} value={field.value ?? ''} type="text" placeholder="Masukkan Nama Pemohon" />
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
                      <Input
                        {...field}
                        value={field.value ?? ''}
                        type="number"
                        placeholder="Masukkan No. Telepon Pemohon "
                      />
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
                    <FormControl>
                      <SearchSelect
                        selected={field.value as string}
                        onChange={field.onChange}
                        width="w-[560px]"
                        placeholder="Pilih Kecamatan"
                        options={kecamatan?.map((kecamatan) => ({ label: kecamatan.name, value: kecamatan.id })) ?? []}
                      />
                    </FormControl>
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
                    <FormControl>
                      <SearchSelect
                        selected={field.value as string}
                        onChange={field.onChange}
                        disabled={!areaLevel3 || !kelurahan}
                        width="w-[560px]"
                        placeholder="Pilih Kelurahan"
                        options={kelurahan?.map((kelurahan) => ({ label: kelurahan.name, value: kelurahan.id })) ?? []}
                      />
                    </FormControl>
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
                    <Textarea {...field} value={field.value ?? ''} placeholder="Masukkan Alamat Lengkap Masyarakat." />
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
                      <Input {...field} value={field.value ?? ''} type="number" placeholder="Masukkan NIK Ketua" />
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
                      <Input {...field} value={field.value ?? ''} type="text" placeholder="Masukkan Nama Ketua " />
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
                    <FormLabel className="font-semibold dark:text-white">NIK Sekretaris</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} type="number" placeholder="Masukkan NIK Sekretaris" />
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
                      <Input {...field} value={field.value ?? ''} type="text" placeholder="Masukkan Nama Sekretaris " />
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
                      <Input {...field} value={field.value ?? ''} type="number" placeholder="Masukkan NIK Bendahara" />
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
                      <Input {...field} value={field.value ?? ''} type="text" placeholder="Masukkan Nama Bendahara " />
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
                      <Input {...field} value={field.value ?? ''} type="number" placeholder="Masukkan No. Rekening " />
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
                      <Input {...field} value={field.value ?? ''} type="text" placeholder="Masukkan Nama Bank" />
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
                      <Input {...field} value={field.value ?? ''} type="text" placeholder="Masukkan Alamat Rekening" />
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
                      <Input
                        {...field}
                        value={field.value ?? ''}
                        type="number"
                        placeholder="Masukkan Jumlah Bantuan "
                      />
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
                      <Input {...field} value={field.value ?? ''} type="number" placeholder="Masukkan Tahun Anggaran" />
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
                      <Input {...field} value={field.value ?? ''} type="text" placeholder="Masukkan Keterangan " />
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
            <Button className="font-bold" loading={isLoading || isLoadingUpdate} type="submit">
              {id ? 'Update' : 'Submit'}
            </Button>
          </div>
        </form>
      </Form>
    </Container>
  )
}

export default Hibah
