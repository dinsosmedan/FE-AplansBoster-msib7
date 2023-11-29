import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { HiOutlinePencilAlt, HiUserAdd } from 'react-icons/hi'
import { useForm } from 'react-hook-form'
import * as React from 'react'

import { Container, Modal, MultiSelect, Search } from '@/components'
import useTitle from '@/hooks/useTitle'

interface FormValues {
  role: string
  permission: string[]
}

const PERMISSION = [
  {
    value: 'dashboard',
    label: 'Dashboard'
  },
  {
    value: 'layanan',
    label: 'Layanan'
  },
  {
    value: 'profiling-masyarakat',
    label: 'Profiling Masyarakat'
  },
  {
    value: 'data-dtks',
    label: 'Data DTKS'
  },
  {
    value: 'data-pengajuan',
    label: 'Data Pengajuan'
  }
]

const ManajemenRole = () => {
  useTitle('Manajemen Role ')

  const [isShow, setIsShow] = React.useState(false)
  const formsCreate = useForm<FormValues>({
    mode: 'onTouched',
    defaultValues: {
      role: 'Admin',
      permission: []
    }
  })

  const onSubmit = async (values: any) => {
    console.log(values)
  }

  return (
    <Container className="relative pt-[34px] pb-[22px] px-7">
      <div className="flex items-center mb-[18px]">
        <Search placeholder="Search" className="w-[398px] py-[23px]" />
        <Button className="w-fit py-6 px-4 ml-auto bg-primary" onClick={() => setIsShow(true)}>
          <HiUserAdd className="w-6 h-6 text-white" />
          <p className="text-white font-semibold text-sm pl-2 w-max">Tambah Role</p>
        </Button>
      </div>
      <Table>
        <TableHeader className="bg-primary">
          <TableRow>
            <TableHead className="text-center text-white">Role</TableHead>
            <TableHead className="text-center text-white">Akses Menu</TableHead>
            <TableHead className="text-center text-white">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="text-center">Oza Puki</TableCell>
            <TableCell className="text-center">
              Dashboard, layanan, Data Penerima, Profiling Masyarakat, Data DTKS, Data Pengajuan
            </TableCell>
            <TableCell className="flex justify-center items-center">
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
      <Modal isShow={isShow}>
        <Modal.Header setIsShow={setIsShow} className="gap-1 flex flex-col">
          <h3 className="text-base font-bold leading-6 text-title md:text-2xl">Tambah Role</h3>
          <p className="text-sm text-[#A1A1A1]">Masukkan Data Role Baru</p>
        </Modal.Header>
        <Form {...formsCreate}>
          <form onSubmit={formsCreate.handleSubmit(onSubmit)} className="mt-2 flex-1 gap-3 flex flex-col">
            <FormField
              name="role"
              control={formsCreate.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="font-semibold dark:text-white">Role</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={formsCreate.control}
              name="permission"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="font-semibold dark:text-white">Permission</FormLabel>
                  <MultiSelect
                    onChange={field.onChange}
                    selected={field.value}
                    options={PERMISSION}
                    placeholder="Pilih Akses"
                    className="flex-1"
                    width="min-w-[580px]"
                  />
                  <FormMessage />
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
    </Container>
  )
}

export default ManajemenRole
