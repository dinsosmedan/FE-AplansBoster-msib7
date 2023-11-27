import * as React from 'react'
import { useForm } from 'react-hook-form'
import { HiMagnifyingGlass } from 'react-icons/hi2'

import { Container, Pagination } from '@/components'
import { useCreateParams, useGetParams, useTitle } from '@/hooks'
import { JENIS_RUMAH_IBADAH } from '@/pages/Layanan/Dayasos/RumahIbadah'

import { useGetWorshipPlaces } from '@/store/server/useDayasos'
import { useGetKecamatan, useGetKelurahan } from '@/store/server'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface FormValues {
  nama: string
  jenisrumahibadah: string
  status: string
  kecamatan: string
  kelurahan: string
}

const DataRumahIbadah = () => {
  useTitle('Data Penerima / Dayasos / Rumah Ibadah (RI) ')
  const createParams = useCreateParams()
  const { nama, kecamatan, kelurahan, status, jenisrumahibadah } = useGetParams([
    'nama',
    'jenisrumahibadah',
    'status',
    'kecamatan',
    'kelurahan'
  ])

  const forms = useForm<FormValues>({
    defaultValues: {
      nama: '',
      jenisrumahibadah: '',
      status: '',
      kecamatan: '',
      kelurahan: ''
    }
  })

  const [currentPage, setCurrentPage] = React.useState(1)
  const areaLevel3 = forms.watch('kecamatan')

  const { data: listKecamatan } = useGetKecamatan()
  const { data: listKelurahan } = useGetKelurahan(areaLevel3 ?? kecamatan)
  const { data, isSuccess } = useGetWorshipPlaces({
    page: currentPage,
    name: nama,
    idKecamatan: kecamatan,
    idKelurahan: kelurahan
  })

  React.useEffect(() => {
    if (nama !== '' || kecamatan !== '' || kelurahan !== '' || status !== '' || jenisrumahibadah !== '') {
      forms.setValue('nama', nama)
      forms.setValue('jenisrumahibadah', jenisrumahibadah)
      forms.setValue('status', status)
      forms.setValue('kecamatan', kecamatan)
      forms.setValue('kelurahan', kelurahan)
    }
  }, [nama, kecamatan, kelurahan, status, jenisrumahibadah])

  const onSubmit = async (values: FormValues) => {
    console.log(values)

    Object.keys(values).forEach((key) => {
      createParams({ key, value: values[key as keyof FormValues] })
    })
  }

  return (
    <div>
      <Container>
        <h1 className="font-bold text-[32px] ">Rumah Ibadah (RI)</h1>
        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="grid grid-cols-3 gap-x-10 gap-y-5 pt-10">
              <FormField
                name="nama"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Nama Rumah Ibadah" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="jenisrumahibadah"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Jenis Rumah Ibadah" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {JENIS_RUMAH_IBADAH.map((item, index) => (
                            <SelectItem key={index} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="status"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="kecamatan"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Kecamatan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {listKecamatan?.map((item, index) => (
                            <SelectItem key={index} value={item.id}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="kelurahan"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={areaLevel3 === '' || kecamatan === ''}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Kelurahan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {listKelurahan?.map((item, index) => (
                            <SelectItem key={index} value={item.id}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="w-[140px] h-[50px] ml-auto rounded-xl">
              <Button className="py-6">
                <HiMagnifyingGlass className="w-6 h-6 py" />
                <p className="font-bold text-sm text-white ml-3">Cari Data</p>
              </Button>
            </div>
          </form>
        </Form>
        <Table className="mt-5">
          <TableHeader className="bg-[#FFFFFF]">
            <TableRow>
              <TableHead className="text-black">Nama Rumah Ibadah</TableHead>
              <TableHead className="text-black">Jenis Rumah Ibadah</TableHead>
              <TableHead className="text-black">Alamat</TableHead>
              <TableHead className="text-black">Kelurahan</TableHead>
              <TableHead className="text-black">Kecamatan</TableHead>
              <TableHead className="text-black">Nama Penanggung jawab</TableHead>
              <TableHead className="teJxt-black">Nomor Handphone</TableHead>
              <TableHead className="teJxt-black">Status</TableHead>
              <TableHead className="text-black">Keterangan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-center">GKI SUMUT</TableCell>
              <TableCell className="text-center">Gereja</TableCell>
              <TableCell className="text-center">Perempuan</TableCell>
              <TableCell className="text-center">Jl KL Yos Sudarso Gg. Keluarga No. 30</TableCell>
              <TableCell className="text-center">Titi Papan</TableCell>
              <TableCell className="text-center">Albert Luckass</TableCell>
              <TableCell className="text-center">081390089193</TableCell>
              <TableCell className="text-center">Aktif</TableCell>
              <TableCell className="text-center">Renovasi</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-center">GKI SUMUT</TableCell>
              <TableCell className="text-center">Gereja</TableCell>
              <TableCell className="text-center">Perempuan</TableCell>
              <TableCell className="text-center">Jl KL Yos Sudarso Gg. Keluarga No. 30</TableCell>
              <TableCell className="text-center">Titi Papan</TableCell>
              <TableCell className="text-center">Albert Luckass</TableCell>
              <TableCell className="text-center">081390089193</TableCell>
              <TableCell className="text-center">Aktif</TableCell>
              <TableCell className="text-center">Renovasi</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-center">GKI SUMUT</TableCell>
              <TableCell className="text-center">Gereja</TableCell>
              <TableCell className="text-center">Perempuan</TableCell>
              <TableCell className="text-center">Jl KL Yos Sudarso Gg. Keluarga No. 30</TableCell>
              <TableCell className="text-center">Titi Papan</TableCell>
              <TableCell className="text-center">Albert Luckass</TableCell>
              <TableCell className="text-center">081390089193</TableCell>
              <TableCell className="text-center">Aktif</TableCell>
              <TableCell className="text-center">Renovasi</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Pagination
          className="px-5 py-5 flex justify-end"
          currentPage={currentPage}
          totalCount={500}
          pageSize={30}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </Container>
    </div>
  )
}
export default DataRumahIbadah
