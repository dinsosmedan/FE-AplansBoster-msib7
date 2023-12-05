import Container from '@/components/atoms/Container'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import useTitle from '@/hooks/useTitle'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { HiArrowPath, HiMagnifyingGlass } from 'react-icons/hi2'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Pagination from './../../../components/atoms/Pagination'
import * as React from 'react'
import { Action } from '@/components'

const DataPbi = () => {
  useTitle('Data Penerima / Linjamsos / PBI ')

  interface FormValues {
    nik: string
    kelurahan: string
    kecamatan: string
    batch: string
  }
  const forms = useForm<FormValues>({
    mode: 'onTouched'
  })
  const [currentPage, setCurrentPage] = React.useState(1)

  const onSubmit = async (values: FormValues) => {
    console.log(values)
  }

  // const handleReset = () => {
  //   navigate('/data-penerima/dayasos/data-djp')
  //   forms.reset()
  // }

  return (
    <Container>
      <h1 className="font-bold text-2xl ">Penerima Bantuan Iuran (PBI)</h1>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-x-5 gap-y-5 mt-6 ">
            <FormField
              name="nik"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} type="number" placeholder="Masukkan Nama/ NIK" />
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
                          <SelectValue placeholder="Jenis Keanggotaan" />
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
          <section className="flex items-center justify-between">
            <Select>
              <SelectTrigger className="border-primary flex gap-5 rounded-lg font-bold w-fit bg-white text-primary focus:ring-0">
                <SelectValue placeholder="Export" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value=".clsx">.clsx</SelectItem>
                <SelectItem value=".csv">.csv</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-3">
              <Button type="button" variant="outline" className="gap-3 text-primary rounded-lg">
                <HiArrowPath className="text-lg" />
                <span>Reset</span>
              </Button>
              <Button className="gap-2 border-none rounded-lg" type="submit">
                <HiMagnifyingGlass className="text-lg" />
                <span>Cari Data</span>
              </Button>
            </div>
          </section>
        </form>
      </Form>
      <section className="border rounded-xl mt-5 overflow-hidden">
        <Table>
          <TableHeader className="bg-[#FFFFFF]">
            <TableRow>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Nomor</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Nama</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">NIK</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Jenis Keanggotaan</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-left  bg-[#F9FAFC]">1</TableCell>
              <TableCell className="text-left  bg-[#F9FAFC]">Oza Kristen</TableCell>
              <TableCell className="text-left  bg-[#F9FAFC]">Perempuan</TableCell>
              <TableCell className="text-left  bg-[#F9FAFC]">1945</TableCell>
              <TableCell className="flex items-center justify-center bg-[#F9FAFC]">
                <Action
                  onDetail={() => showDetail(item.id)}
                  onDelete={() => handleDelete(item.id)}
                  onEdit={() => navigate(`/layanan/dayasos/Djp/${item.id}`)}
                />
              </TableCell>{' '}
            </TableRow>
          </TableBody>
        </Table>
      </section>
      <Pagination
        className="px-5 py-5 flex justify-end"
        currentPage={currentPage}
        totalCount={100}
        pageSize={10}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </Container>
  )
}
export default DataPbi
