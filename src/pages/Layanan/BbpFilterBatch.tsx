import { Container } from '@/components'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'
import { useForm } from 'react-hook-form'
import { HiOutlineExclamationCircle } from 'react-icons/hi2'
import { Link } from 'react-router-dom'

export default function BbpFilterBatch() {
  interface FormValues {
    nik: string
  }

  const forms = useForm<FormValues>({
    mode: 'onTouched'
  })

  const onSubmit = async (values: FormValues) => {
    console.log(values)
  }
  return (
    <Container>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-row justify-between gap-3 py-6">
            <div className="w-11/12">
              <FormField
                name="nik"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
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
        </form>
      </Form>
      <section className="border rounded-xl mt-5 overflow-hidden">
        <Table>
          <TableHeader className="bg-[#FFFFFF]">
            <TableRow>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Batch</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Kuota</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Tanggal Dibuka</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Tanggal Tutup</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Status</TableHead>
              <TableHead className="text-[#534D59] font-bold text-[15px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-left bg-[#F9FAFC]">Batch 3</TableCell>
              <TableCell className="text-left bg-[#F9FAFC]">100/100</TableCell>
              <TableCell className="text-left bg-[#F9FAFC]">11-11-2022</TableCell>
              <TableCell className="text-left bg-[#F9FAFC]">11-11-2022</TableCell>
              <TableCell className="text-center bg-[#F9FAFC]">
                <div className="bg-[#E9FFEF] rounded-full flex items-center w-fit gap-2 py-1 px-2 mx-auto">
                  <div className="w-2 h-2 rounded-full bg-[#409261]" />
                  <p className="text-[#409261] text-xs">Aktif</p>
                </div>
              </TableCell>
              <TableCell className="flex items-center justify-center text-left bg-[#F9FAFC] ">
                <Link to={'/layanan/layanan-bbp'}>
                  <Button className="py-6">
                    <p className="text-base font-bold pr-3">Action</p>
                    <HiOutlineExclamationCircle className="h-6 w-6" />
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-left bg-[#F9FAFC]">Batch 3</TableCell>
              <TableCell className="text-left bg-[#F9FAFC]">100/100</TableCell>
              <TableCell className="text-left bg-[#F9FAFC]">11-11-2022</TableCell>
              <TableCell className="text-left bg-[#F9FAFC]">11-11-2022</TableCell>
              <TableCell className="text-center bg-[#F9FAFC]">
                <div className="bg-[#FFD6E1] rounded-full flex items-center w-fit gap-2 py-1 px-2 mx-auto">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <p className="text-primary text-xs">Tidak Aktif</p>
                </div>
              </TableCell>
              <TableCell className="flex items-center justify-center text-left bg-[#F9FAFC] ">
                <Button className="py-6">
                  <p className="text-base font-bold pr-3">Action</p>
                  <HiOutlineExclamationCircle className="h-6 w-6" />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>
    </Container>
  )
}
