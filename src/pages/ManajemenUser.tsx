import { Container, Modal, Pagination, Password, Search } from '@/components'
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
  useCreateUser,
  useDeleteUser,
  useGetRole,
  useGetUser,
  useGetUserById,
  useUpdateUser
} from '@/store/server/useUserManagement'
import { userValidation, type userFields } from '@/lib/validations/user.validation'
// import { toast } from '@/components/ui/use-toast'
import { useAlert } from '@/store/client'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'

const ManajemenUser = () => {
  useTitle('Manajemen User ')
  const navigate = useNavigate()
  // const { id } = useParams<{ id: string }>()

  const { alert } = useAlert()

  const { data: role } = useGetRole()
  const { data: users, isLoading } = useGetUser()

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
  const { mutate: Register, isLoading: isLoadingCreate } = useCreateUser()

  const [currentPage, setCurrentPage] = React.useState(1)
  const { mutateAsync: deleteUser, isLoading: isLoadingDelete } = useDeleteUser()

  const [userId, setUserId] = React.useState('')
  const { data: user, isSuccess, isLoading: isLoadingUser } = useGetUserById(userId)
  const { mutate: updateUser, isLoading: isLoadingUpdate } = useUpdateUser()

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
    navigate('/manajemen-user')
  }

  if (isLoading && isLoadingDelete && isLoadingUser) {
    return <Loading />
  }
  return (
    <Container>
      <div className="flex items-center mb-[18px]">
        <Search placeholder="Search" className="w-[398px] py-[23px]" />
      </div>

      <Table>
        <TableHeader className="bg-primary">
          <TableRow>
            <TableHead className="text-center text-white">NIK</TableHead>
            <TableHead className="text-center text-white">Nama</TableHead>
            <TableHead className="text-center text-white">Email</TableHead>
            <TableHead className="text-center text-white">No. HP</TableHead>
            <TableHead className="text-center text-white">Status</TableHead>
            <TableHead className="text-center text-white">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="text-left">aaaaaa</TableCell>
            <TableCell className="text-left">aaaaaa</TableCell>
            <TableCell className="text-left">aaaaaa</TableCell>
            <TableCell className="text-left">aaaaaa</TableCell>
            <TableCell className="text-left">Active</TableCell>
            <TableCell className="flex justify-center items-center">
              <Button
                size="icon"
                variant="base"
                className="bg-[#959595] text-white hover:bg-[#828282] hover:text-white"
                onClick={() => setIsShowEdit(true)}
              >
                <HiOutlinePencilAlt className="text-lg" />
              </Button>
              {/* <Button
                size="icon"
                variant="base"
                className="bg-red-500 text-white hover:bg-red-300 hover:text-white ms-2"
                onClick={() => handleDeleteUser(item.id)}
              >
                <HiTrash className="text-lg" />
              </Button> */}
            </TableCell>
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

      <Modal isShow={isShow} className="max-h-[calc(100vh-200px)] overflow-y-auto">
        <Modal.Header setIsShow={setIsShow} className="gap-1 flex flex-col">
          <h3 className="text-base font-bold leading-6 text-title md:text-2xl">
            {userId ? 'Perbaharui' : 'Tambah'} Pengguna
          </h3>
          <p className="text-sm text-[#A1A1A1]">
            {userId ? 'Perbaharui data pengguna.' : 'Masukkan data pengguna baru.'}
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
            </div>
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
