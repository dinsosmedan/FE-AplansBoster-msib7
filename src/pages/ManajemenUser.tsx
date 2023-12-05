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
import { Container, Loading, Pagination, Search } from '@/components'
import { useAlert } from '@/store/client'
import { useCreateUser, useGetRole, useGetUser } from '@/store/server/useUserManagement'
import { type userFields } from '@/lib/validations/user.validation'
import { toast } from '@/components/ui/use-toast'
import { type IErrorResponse } from '@/lib/types/user.type'
import { type AxiosError } from 'axios'

// interface FormValues {
//   employeeIdentityNumber: string
//   email: string
//   name: string
//   phoneNumber: string
//   password: string
//   role: string
//   status: string
// }

const ManajemenUser = () => {
  useTitle('Manajemen User ')
  const { alert } = useAlert()

  const { data: user, isLoading } = useGetUser()
  const { data: role } = useGetRole()
  const [isShow, setIsShow] = React.useState(false)
  const [currentPage, setCurrentPage] = React.useState(1)
  const forms = useForm<userFields>({ mode: 'onTouched' })
  const { mutate: Register } = useCreateUser()

  const onSubmit = async (values: userFields) => {
    // console.log(values)
    Register(values, {
      onError: (error: AxiosError) => {
        const errorResponse = error.response?.data as IErrorResponse

        if (errorResponse !== undefined) {
          toast({
            variant: 'destructive',
            title: errorResponse.message,
            description: 'There was a problem with your request.'
          })
        }
      },
      onSuccess: () => {
        toast({
          title: 'Registration Success',
          description: 'You have successfully Registered an account.'
        })
      }
    })
  }

  const showAlert = () => {
    void alert({
      title: 'User ditambahkan',
      description: 'User berhasil ditambahkan',
      submitText: 'Oke',
      variant: 'success'
    }).then(() => {
      console.log('oke')
    })
  }

  if (isLoading) {
    return <Loading />
  }
  return (
    <Container className="relative pt-[34px] pb-[22px] px-7">
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
            <TableHead className="text-white">Email</TableHead>
            <TableHead className="text-white">No. HP</TableHead>
            <TableHead className="text-white">Role</TableHead>
            <TableHead className="text-white">Status</TableHead>
            <TableHead className="text-white">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {user?.data?.length !== 0 ? (
            user?.data.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell className="font-semibold">{item.employeeIdentityNumber}</TableCell>
                <TableCell className="font-semibold">{item.name}</TableCell>
                <TableCell className="text-center">{item.email}</TableCell>
                <TableCell className="text-center">{item.phoneNumber}</TableCell>
                <TableCell className="text-center">{item.role.name}</TableCell>
                <TableCell>
                  <div
                    className={`${
                      item.isActive ? '[#E9FFEF]' : '[#FFD6E1]'
                    } rounded-full flex items-center w-fit gap-2 py-1 px-2 mx-auto`}
                  >
                    <div className={`w-2 h-2 rounded-full bg-${item.isActive ? '[#409261]' : 'red-500'}`} />
                    <p className={`text-${item.isActive ? '[#409261]' : 'red-500'} text-xs`}>
                      {item.isActive ? 'Active' : 'Inactive'}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="flex items-center justify-center">
                  <Button
                    size="icon"
                    variant="base"
                    className="bg-[#959595] text-white hover:bg-[#828282] hover:text-white"
                    onClick={showAlert}
                  >
                    <HiOutlinePencilAlt className="text-lg" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} className="text-center">
                Tidak ada data
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Pagination
        className="px-5 py-5 flex justify-end"
        currentPage={currentPage}
        totalCount={100}
        pageSize={10}
        onPageChange={(page) => setCurrentPage(page)}
      />

      <Modal isShow={isShow} className="max-h-[calc(100vh-200px)] overflow-y-auto">
        <Modal.Header setIsShow={setIsShow} className="gap-1 flex flex-col">
          <h3 className="text-base font-bold leading-6 text-title md:text-2xl">Tambah User</h3>
          <p className="text-sm text-[#A1A1A1]">Masukkan Data User Baru</p>
        </Modal.Header>
        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <FormField
                name="employeeIdentityNumber"
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
                name="name"
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
                name="phoneNumber"
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
                name="password"
                control={forms.control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="font-semibold dark:text-white">Password</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Masukkan Password (default)" />
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
                          {role?.data.map((item: any, index: any) => (
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
            <FormField
              name="isActive"
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
                        <SelectItem value="1">Aktif</SelectItem>
                        <SelectItem value="0">Tidak Aktif</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <Modal.Footer>
              <Button
                variant="outline"
                className="rounded-lg text-primary border-primary"
                onClick={() => setIsShow(false)}
              >
                Cancel
              </Button>
              <Button className="rounded-lg" type="submit" loading={isLoading}>
                Tambah Data
              </Button>
            </Modal.Footer>
          </form>
        </Form>
      </Modal>
    </Container>
  )
}

export default ManajemenUser
