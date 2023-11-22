import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { CiSearch } from 'react-icons/ci'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Modal from '@/components/organisms/Modal'
import * as React from 'react'
import { HiUserAdd } from 'react-icons/hi'
import useTitle from '@/hooks/useTitle'

const ManajemenUser = () => {
  useTitle('Manajemen User ')

  interface FormValues {
    nip: string
    email: string
    nama: string
    noHp: string
    username: string
    role: string
    status: string
  }
  const [isShow, setIsShow] = React.useState(false)
  const forms = useForm<FormValues>({
    mode: 'onTouched'
  })

  const onSubmit = async (values: any) => {
    console.log(values)
  }
  return (
    <div className="container bg-white py-5 flex flex-col ">
      <div className="flex items-center mb-4">
        <div className="w-[400px] h-14 border rounded-xl flex flex-row items-center">
          <CiSearch className="w-6 h-6 my-4 mx-[18px]" />
          <Input className="border-0 bg-transparent text-base font-bold" type="text" placeholder="Cari" />
        </div>
        <Button onClick={() => setIsShow(true)} className="w-[160px] h-14 ml-auto bg-primary">
          <HiUserAdd className="w-6 h-6 text-white" />
          <p className=" text-white font-semibold text-sm pl-2">Tambah Role</p>
        </Button>
        <Modal isShow={isShow}>
          <Modal.Header setIsShow={setIsShow} className="gap-1 flex flex-col">
            <h3 className="text-base font-bold leading-6 text-title md:text-2xl">Tambah Role</h3>
            <p className="text-sm text-[#A1A1A1]">Masukkan Data Role Baru</p>
          </Modal.Header>
          <Form {...forms}>
            <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-2">
                <FormField
                  name="nip"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white">NIP</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Masukkan NIP" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="email"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white">Email</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Masukkan Email" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <FormField
                  name="nama"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white">Nama</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Masukkan Nama" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="noHp"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white">No. HP</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Masukkan No. HP" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <FormField
                  name="username"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white">Username</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Masukkan Username" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex flex-col gap-2">
                  <FormField
                    name="role"
                    control={forms.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold dark:text-white">Role</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih Role" />
                            </SelectTrigger>
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
              </div>
              <div className="flex flex-col gap-2">
                <FormField
                  name="role"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold dark:text-white">Status</FormLabel>
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
              </div>
            </form>
          </Form>
          <Modal.Footer>
            <Button
              variant="outline"
              className="rounded-lg text-primary border-primary"
              onClick={() => setIsShow(false)}
            >
              Cancel
            </Button>
            <Button className="rounded-lg">Tambah Data</Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader className="bg-primary">
          <TableRow>
            <TableHead className="text-white">NIP</TableHead>
            <TableHead className="text-white">Nama</TableHead>
            <TableHead className="text-white">Username</TableHead>
            <TableHead className="text-white">Email</TableHead>
            <TableHead className="text-white">No. HP</TableHead>
            <TableHead className="text-white">Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* {invoices.map((invoice) => ( */}
          <TableRow>
            <TableCell className="font-medium">198608212009012001</TableCell>
            <TableCell>198608212009012001</TableCell>
            <TableCell>Syamsul</TableCell>
            <TableCell className="text-right">elytha79sipayung@gmail.com</TableCell>
            <TableCell className="text-right">081376331191</TableCell>
            <TableCell className="text-right">Admin</TableCell>
          </TableRow>
          {/* ))} */}
        </TableBody>
      </Table>
    </div>
  )
}

export default ManajemenUser
