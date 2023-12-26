import * as React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate, useParams } from 'react-router-dom'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Container, Loading, SearchSelect } from '@/components'
import { Textarea } from '@/components/ui/textarea'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { JENIS_RUMAH_IBADAH } from '@/lib/data'
import { useNotFound, useTitle } from '@/hooks'
import { useTitleHeader } from '@/store/client'
import { useGetKecamatan, useGetKelurahan } from '@/store/server'
import { worshipPlaceValidation, type worshipPlaceFields } from '@/lib/validations/dayasos.validation'
import { useCreateWorshipPlace, useGetWorshipPlace, useUpdateWorshipPlace } from '@/store/server/useDayasos'

const Ri = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  useTitle(`${id ? 'Edit' : 'Tambah'} Data`)
  const setBreadcrumbs = useTitleHeader((state) => state.setBreadcrumbs)

  React.useEffect(() => {
    setBreadcrumbs([
      { url: '/data-penerima', label: 'Data Penerima' },
      { url: '/data-penerima/dayasos', label: 'Dayasos & PFM' },
      { url: '/data-penerima/dayasos/rumah-ibadah', label: 'RI' }
    ])
  }, [])

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
  const { mutate: UpdateWorshipPlace, isLoading: isLoadingUpdate } = useUpdateWorshipPlace()
  const { data: WorshipPlace, isSuccess, isLoading: isLoadingWorshipPlace, isError } = useGetWorshipPlace(id)

  useNotFound(isError)

  React.useEffect(() => {
    if (isSuccess) {
      forms.reset({
        name: WorshipPlace?.name,
        type: WorshipPlace?.type,
        picName: WorshipPlace?.picName,
        picPhoneNumber: WorshipPlace?.picPhone,
        areaLevel3: WorshipPlace?.areaLevel3?.id,
        areaLevel4: WorshipPlace?.areaLevel4?.id,
        address: WorshipPlace?.address,
        status: WorshipPlace?.status,
        note: WorshipPlace?.note
      })
    }
  }, [isSuccess, WorshipPlace])

  const onSuccess = () => {
    forms.reset()
    navigate('/data-penerima/dayasos/rumah-ibadah')
  }

  const onSubmit = (values: worshipPlaceFields) => {
    if (!id) return storeWorshipPlace(values, { onSuccess })
    UpdateWorshipPlace({ id, fields: values }, { onSuccess })
  }

  if (isLoadingUpdate || isLoadingWorshipPlace) return <Loading />

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
                      <Input
                        {...field}
                        value={field.value ?? ''}
                        type="text"
                        placeholder="Masukkan Nama Rumah Ibadah"
                      />
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
                    <Select onValueChange={field.onChange} value={field.value}>
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
                      <Input
                        {...field}
                        value={field.value ?? ''}
                        type="text"
                        placeholder="Masukkan Nama Penanggung Jawab"
                      />
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
                      <Input {...field} value={field.value ?? ''} type="number" placeholder="Masukkan No. Telepon " />
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
                      <SearchSelect
                        selected={field.value}
                        onChange={field.onChange}
                        width="w-[430px]"
                        placeholder="Pilih Kecamatan"
                        options={kecamatan?.map((kecamatan) => ({ label: kecamatan.name, value: kecamatan.id })) ?? []}
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
                        disabled={!areaLevel3 && !kelurahan}
                        width="w-[430px]"
                        placeholder="Pilih Kelurahan"
                        options={kelurahan?.map((kelurahan) => ({ label: kelurahan.name, value: kelurahan.id })) ?? []}
                      />
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
                      <Textarea
                        {...field}
                        value={field.value ?? ''}
                        placeholder="Masukkan Alamat Lengkap Masyarakat."
                      />
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
                    <Select onValueChange={field.onChange} value={field.value}>
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
                      <Input {...field} value={field.value ?? ''} type="text" placeholder="Keterangan" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end gap-4 mt-8">
              <Button variant="cancel" className="font-bold" onClick={() => forms.reset()} type="button">
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
