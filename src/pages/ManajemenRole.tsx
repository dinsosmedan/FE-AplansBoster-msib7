import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { HiPencilSquare } from 'react-icons/hi2'
import { HiUserAdd } from 'react-icons/hi'
import { CiSearch } from 'react-icons/ci'
import { useForm } from 'react-hook-form'
import * as React from 'react'

import { Modal, MultiSelect } from '@/components'
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
    <div className="container bg-white py-5 flex flex-col">
      <div className="flex items-center mb-4">
        <div className="w-[398px] h-14 border rounded-xl flex flex-row items-center">
          <CiSearch className="w-6 h-6 my-4 mx-[18px]" />
          <Input className="border-0 bg-transparent text-base font-bold" type="text" placeholder="Cari" />
        </div>
        <Button className="w-fit py-6 px-4 ml-auto bg-primary" onClick={() => setIsShow(true)}>
          <HiUserAdd className="w-6 h-6 text-white" />
          <p className=" text-white font-semibold text-sm pl-2">Tambah Role</p>
        </Button>
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
                      <Input {...field} disabled />
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
        <TableHeader className="bg-primary text-base ">
          <TableRow>
            <TableHead className="text-center text-white">Role</TableHead>
            <TableHead className="text-center text-white">Akses Menu</TableHead>
            <TableHead className="text-center text-white">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="text-base text-center">Oza Puki</TableCell>
            <TableCell className="text-base text-center">
              Dashboard,layanan,Data Penerima,Profiling Masyarakat,Data DTKS,Data Pengajuan
            </TableCell>
            <TableCell className="text-center">
              <Button variant="ghost" className="bg-transparent" onClick={() => setIsShow(true)}>
                <HiPencilSquare className="w-6 h-6" />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default ManajemenRole
