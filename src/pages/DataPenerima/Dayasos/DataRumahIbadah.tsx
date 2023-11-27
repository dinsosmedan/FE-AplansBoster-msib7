import Container from '@/components/atoms/Container'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import useTitle from '@/hooks/useTitle'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Pagination from '../../../components/atoms/Pagination'
import * as React from 'react'

const DataRumahIbadah = () => {
  useTitle('Data Penerima / Dayasos / Rumah Ibadah (RI) ')

  interface FormValues {
    nama: string
    jenisrumahibadah: string
    status: string
    kecamatan: string
    kelurahan: string
  }
  const forms = useForm<FormValues>({
    mode: 'onTouched'
  })
  const [currentPage, setCurrentPage] = React.useState(1)

  const onSubmit = async (values: FormValues) => {
    console.log(values)
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
                name="kelurahan"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
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
          totalCount={100}
          pageSize={10}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </Container>
    </div>
  )
}
export default DataRumahIbadah
