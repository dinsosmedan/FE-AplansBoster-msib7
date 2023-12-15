import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Modal from '@/components/organisms/Modal'
import * as React from 'react'
import { HiOutlinePencilAlt, HiUserAdd, HiTrash } from 'react-icons/hi'
import useTitle from '@/hooks/useTitle'
import { Container, Loading, Pagination, Search } from '@/components'
import {
  useCreateAdmin,
  useDeleteAdmin,
  useGetRole,
  useGetAdmin,
  useGetAdminById,
  useUpdateAdmin
} from '@/store/server/useUserManagement'
import { userValidation, type userFields } from '@/lib/validations/user.validation'
// import { toast } from '@/components/ui/use-toast'
import { useAlert } from '@/store/client'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'

const ManajemenAdmin = () => {
  useTitle('Manajemen Admin ')
  const navigate = useNavigate()
  // const { id } = useParams<{ id: string }>()

  const { alert } = useAlert()

  const { data: role } = useGetRole()
  const { data: admins, isLoading } = useGetAdmin()

  const forms = useForm<userFields>({
    mode: 'onTouched',
    resolver: yupResolver(userValidation),
    defaultValues: {
      employeeIdentityNumber: '',
      email: '',
      name: '',
      phoneNumber: '',
      password: '',
      role: '',
      isActive: ''
    }
  })
  const [isShow, setIsShow] = React.useState(false)
  const { mutate: Register, isLoading: isLoadingCreate } = useCreateAdmin()

  const [currentPage, setCurrentPage] = React.useState(1)
  const { mutateAsync: deleteUser, isLoading: isLoadingDelete } = useDeleteAdmin()

  const [userId, setUserId] = React.useState('')
  const { data: user, isSuccess, isLoading: isLoadingUser } = useGetAdminById(userId)
  const { mutate: updateUser, isLoading: isLoadingUpdate } = useUpdateAdmin()

  React.useEffect(() => {
    if (isSuccess && user) {
      forms.reset({
        employeeIdentityNumber: user?.employeeIdentityNumber,
        email: user?.email,
        name: user?.name,
        phoneNumber: user?.phoneNumber,
        password: '',
        role: user?.role.id,
        isActive: user?.isActive
      })
    }
  }, [isSuccess, user])

  const handleUpdateUser = (id: string) => {
    setUserId(id)
    setIsShow(true)
  }

  const handleDeleteUser = (id: string) => {
    void alert({
      title: 'Hapus User',
      description: 'Apakah kamu yakin ingin menghapus data ini?',
      variant: 'danger',
      submitText: 'Delete'
    }).then(async () => {
      await deleteUser(id)
    })
  }
  const onSubmit = async (values: userFields) => {
    const newData = {
      ...values,
      isActive: values.isActive ? '1' : '0'
    }
    if (!userId) {
      return Register(newData, { onSuccess })
    }
    updateUser({ id: userId, fields: newData }, { onSuccess })
  }
  const onSuccess = () => {
    forms.reset()
    setIsShow(false)
    navigate('/manajemen-admin')
  }

  if (isLoading || isLoadingDelete || isLoadingUser) {
    return <Loading />
  }
  return (
    <Container>
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
          {admins?.data?.length !== 0 ? (
            admins?.data.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell className="font-semibold">{item.employeeIdentityNumber || '-'}</TableCell>
                <TableCell className="font-semibold">{item.name}</TableCell>
                <TableCell className="text-center">{item.email || '-'}</TableCell>
                <TableCell className="text-center">{item.phoneNumber || '-'}</TableCell>
                <TableCell className="text-center">{item.role?.name || 'Guest'}</TableCell>
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
                    onClick={() => {
                      handleUpdateUser(item.id)
                    }}
                  >
                    <HiOutlinePencilAlt className="text-lg" />
                  </Button>
                  <Button
                    size="icon"
                    variant="base"
                    className="bg-red-500 text-white hover:bg-red-300 hover:text-white ms-2"
                    onClick={() => handleDeleteUser(item.id)}
                  >
                    <HiTrash className="text-lg" />
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
          <h3 className="text-base font-bold leading-6 text-title md:text-2xl">
            {userId ? 'Perbaharui' : 'Tambah'} Admin
          </h3>
          <p className="text-sm text-[#A1A1A1]">
            {userId ? 'Perbaharui data Admin.' : 'Masukkan data Admin baru.'}
          </p>
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
                      <Input {...field} value={field.value ?? ''} placeholder="Masukkan NIP" />
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
                      <Input {...field} value={field.value ?? ''} placeholder="Masukkan Email" />
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
                      <Input {...field} value={field.value ?? ''} placeholder="Masukkan Nama" />
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
                      <Input {...field} value={field.value} placeholder="Masukkan No. HP" />
                    </FormControl>
                  </FormItem>
                )}
              />
              {!userId ? (
                <FormField
                  name="password"
                  control={forms.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold dark:text-white">Password</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value ?? ''} placeholder="Masukkan Password (default)" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ) : null}
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
              <FormField
                name="isActive"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Status</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="true">Aktif</SelectItem>
                          <SelectItem value="false">Tidak Aktif</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <Modal.Footer>
              <Button
                variant="outline"
                className="rounded-lg text-primary border-primary"
                onClick={() => setIsShow(false)}
              >
                Cancel
              </Button>
              <Button className="rounded-lg" type="submit" loading={isLoadingCreate || isLoadingUpdate}>
                {userId ? 'Ubah' : 'Tambah'}
              </Button>
            </Modal.Footer>
          </form>
        </Form>
      </Modal>
    </Container>
  )
}

export default ManajemenAdmin
