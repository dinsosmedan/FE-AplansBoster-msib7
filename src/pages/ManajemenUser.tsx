import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Modal from '@/components/organisms/Modal'
import * as React from 'react'
import { HiOutlinePencilAlt, HiUserAdd } from 'react-icons/hi'
import useTitle from '@/hooks/useTitle'
import { Pagination, Search } from '@/components'

interface FormValues {
  nip: string
  email: string
  nama: string
  noHp: string
  username: string
  role: string
  status: string
}

const ManajemenUser = () => {
  useTitle('Manajemen User ')

  const [isShow, setIsShow] = React.useState(false)
  const [currentPage, setCurrentPage] = React.useState(1)
  const forms = useForm<FormValues>({ mode: 'onTouched' })

  const onSubmit = async (values: any) => {
    console.log(values)
  }

  return (
    <section className="container bg-white py-5 min-h-[calc(100vh-40px-96px)] relative">
      <div className="flex items-center mb-[18px]">
        <Search placeholder="Search" className="w-[398px] py-[23px]" />
        <Button className="w-fit py-6 px-4 ml-auto bg-primary" onClick={() => setIsShow(true)}>
          <HiUserAdd className="w-6 h-6 text-white" />
          <p className="text-white font-semibold text-sm pl-2 w-max">Tambah User</p>
        </Button>
      </div>

      <Table>
        <TableHeader className="bg-primary">
          <TableRow>
            <TableHead className="text-white">NIP</TableHead>
            <TableHead className="text-white">Nama</TableHead>
            <TableHead className="text-white">Username</TableHead>
            <TableHead className="text-white">Email</TableHead>
            <TableHead className="text-white">No. HP</TableHead>
            <TableHead className="text-white">Role</TableHead>
            <TableHead className="text-white">Status</TableHead>
            <TableHead className="text-white">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-semibold">198608212009012001</TableCell>
            <TableCell className="font-semibold">198608212009012001</TableCell>
            <TableCell className="text-center">Syamsul</TableCell>
            <TableCell className="text-center">elytha79sipayung@gmail.com</TableCell>
            <TableCell className="text-center">081376331191</TableCell>
            <TableCell className="text-center">Admin</TableCell>
            <TableCell>
              <div className="bg-[#E9FFEF] rounded-full flex items-center w-fit gap-2 py-1 px-2 mx-auto">
                <div className="w-2 h-2 rounded-full bg-[#409261]" />
                <p className="text-[#409261] text-xs">Active</p>
              </div>
            </TableCell>
            <TableCell className="flex items-center justify-center">
              <Button
                size="icon"
                variant="base"
                className="bg-[#959595] text-white hover:bg-[#828282] hover:text-white"
              >
                <HiOutlinePencilAlt className="text-lg" />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Pagination
        className="absolute bottom-5 right-5"
        currentPage={currentPage}
        totalCount={100}
        pageSize={10}
        onPageChange={(page) => setCurrentPage(page)}
      />

      <Modal isShow={isShow}>
        <Modal.Header setIsShow={setIsShow} className="gap-1 flex flex-col">
          <h3 className="text-base font-bold leading-6 text-title md:text-2xl">Tambah Role</h3>
          <p className="text-sm text-[#A1A1A1]">Masukkan Data Role Baru</p>
        </Modal.Header>
        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
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
          </form>
        </Form>

        <Modal.Footer>
          <Button variant="outline" className="rounded-lg text-primary border-primary" onClick={() => setIsShow(false)}>
            Cancel
          </Button>
          <Button className="rounded-lg">Tambah Data</Button>
        </Modal.Footer>
      </Modal>
    </section>
  )
}

export default ManajemenUser
