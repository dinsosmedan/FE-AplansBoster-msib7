import Container from '@/components/atoms/Container'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import useTitle from '@/hooks/useTitle'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Pagination from './../../../components/atoms/Pagination'
import * as React from 'react'

const DataPkr = () => {
  useTitle('Data Penerima / Linjamsos / Penanganan Kelompok Rentan (PKR) ')

  interface FormValues {
    nama: string
    kode: string
    pencairan: string
    kecamatan: string
    kelurahan: string
    tahun: string
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
        <h1 className="font-bold text-[32px] ">Penanganan Kelompok Rentan (PKR)</h1>
        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="grid grid-cols-3 gap-x-10 gap-y-5 pt-10">
              <FormField
                name="nama"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Nama Kelompok Masyarakat" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="kode"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Kode Kegiatan " />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="pencairan"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Status Pencarian" />
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
              <FormField
                name="tahun"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Tahun Pencairan" />
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
              <TableHead className="text-black">Kode Kegiatan</TableHead>
              <TableHead className="text-black">Nama Kelompok Masyarakat</TableHead>
              <TableHead className="text-black">Kecamatan</TableHead>
              <TableHead className="text-black">Kelurahan</TableHead>
              <TableHead className="text-black">Jenis Kegiatan</TableHead>
              <TableHead className="text-black">Jenis Bantuan</TableHead>
              <TableHead className="teJxt-black">Jumlah Bantuan Disetujui</TableHead>
              <TableHead className="text-black">Tahun Pencairan</TableHead>
              <TableHead className="text-black">Status Pencairan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-center">1271092350010008</TableCell>
              <TableCell className="text-center">Oza Kristen</TableCell>
              <TableCell className="text-center">Perempuan</TableCell>
              <TableCell className="text-center">1945</TableCell>
              <TableCell className="text-center">Medan</TableCell>
              <TableCell className="text-center">Medan</TableCell>
              <TableCell className="text-center">Santunan</TableCell>
              <TableCell className="text-center">10.000.000</TableCell>
              <TableCell className="text-center">Berhasil</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-center">1271092350010008</TableCell>
              <TableCell className="text-center">Oza Kristen</TableCell>
              <TableCell className="text-center">Perempuan</TableCell>
              <TableCell className="text-center">1945</TableCell>
              <TableCell className="text-center">Medan</TableCell>
              <TableCell className="text-center">Medan</TableCell>
              <TableCell className="text-center">Santunan</TableCell>
              <TableCell className="text-center">10.000.000</TableCell>
              <TableCell className="text-center">Berhasil</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-center">1271092350010008</TableCell>
              <TableCell className="text-center">Oza Kristen</TableCell>
              <TableCell className="text-center">Perempuan</TableCell>
              <TableCell className="text-center">1945</TableCell>
              <TableCell className="text-center">Medan</TableCell>
              <TableCell className="text-center">Medan</TableCell>
              <TableCell className="text-center">Santunan</TableCell>
              <TableCell className="text-center">10.000.000</TableCell>
              <TableCell className="text-center">Berhasil</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-center">1271092350010008</TableCell>
              <TableCell className="text-center">Oza Kristen</TableCell>
              <TableCell className="text-center">Perempuan</TableCell>
              <TableCell className="text-center">1945</TableCell>
              <TableCell className="text-center">Medan</TableCell>
              <TableCell className="text-center">Medan</TableCell>
              <TableCell className="text-center">Santunan</TableCell>
              <TableCell className="text-center">10.000.000</TableCell>
              <TableCell className="text-center">Berhasil</TableCell>
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
export default DataPkr
