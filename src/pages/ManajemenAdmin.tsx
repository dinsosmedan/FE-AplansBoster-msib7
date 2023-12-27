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
import { Container, Loading, Pagination, Search, Status } from '@/components'
import {
  useCreateAdmin,
  useDeleteAdmin,
  useGetRole,
  useGetAdmin,
  useGetAdminById,
  useUpdateAdmin
} from '@/store/server/useUserManagement'
import {
  userValidation,
  type userFields,
  type userUpdateFields,
  userUpdateValidation
} from '@/lib/validations/user.validation'
// import { toast } from '@/components/ui/use-toast'
import { useAlert } from '@/store/client'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useCreateParams, useDeleteParams, useDisableBodyScroll, useGetParams } from '@/hooks'

const ManajemenAdmin = () => {
  useTitle('Manajemen Admin')
  const navigate = useNavigate()
  const { alert } = useAlert()

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

  const formsUpdate = useForm<userUpdateFields>({
    mode: 'onTouched',
    resolver: yupResolver(userUpdateValidation),
    defaultValues: {
      employeeIdentityNumber: '',
      email: '',
      name: '',
      phoneNumber: '',
      role: '',
      isActive: ''
    }
  })

  const formsSearch = useForm<{ q: string }>()

  const [userId, setUserId] = React.useState('')
  const [isShow, setIsShow] = React.useState(false)
  const [isShowUpdate, setIsShowUpdate] = React.useState(false)

  const deleteParams = useDeleteParams()
  const createParams = useCreateParams()
  const { page, q } = useGetParams(['page', 'q'])

  const { mutate: Register, isLoading: isLoadingCreate } = useCreateAdmin()
  const { mutate: updateUser, isLoading: isLoadingUpdate } = useUpdateAdmin()
  const { mutateAsync: deleteUser, isLoading: isLoadingDelete } = useDeleteAdmin()

  const { data: role } = useGetRole('')
  const { data: admins, isLoading, isFetching, refetch } = useGetAdmin(page, q)
  const { data: user, isSuccess, isLoading: isLoadingUser } = useGetAdminById(userId)

  React.useEffect(() => {
    if (isSuccess && user) {
      formsUpdate.reset({
        employeeIdentityNumber: user?.employeeIdentityNumber,
        email: user?.email,
        name: user?.name,
        phoneNumber: user?.phoneNumber,
        role: user?.role?.id,
        isActive: user?.isActive
      })
    }
  }, [isSuccess, user])

  React.useEffect(() => {
    if (q) formsSearch.setValue('q', q)
  }, [q])

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
    Register(newData, { onSuccess })
  }

  const onSubmitUpdate = async (values: userUpdateFields) => {
    const newData = {
      ...values,
      isActive: values.isActive ? '1' : '0'
    }
    updateUser({ id: userId, fields: newData }, { onSuccess })
  }

  const handleModalButtonClick = (userId: any) => {
    setUserId(userId)
    if (userId) {
      setIsShowUpdate(true)
    } else {
      setIsShow(true)
    }
  }

  const onSuccess = () => {
    forms.reset()
    setIsShow(false)
    navigate('/manajemen-admin')
  }

  const handleSearch = async (values: { q: string }) => {
    if (values.q) {
      createParams({ key: 'q', value: values.q })
      await refetch()
    } else {
      deleteParams('q')
      await refetch()
    }
  }

  useDisableBodyScroll(isFetching || isLoading || isLoadingDelete)

  return (
    <Container>
      {(isFetching || isLoading || isLoadingDelete) && <Loading />}
      <div className="flex items-center mb-[18px]">
        <Form {...formsSearch}>
          <form onSubmit={formsSearch.handleSubmit(handleSearch)}>
            <FormField
              control={formsSearch.control}
              name="q"
              render={({ field }) => (
                <Search
                  placeholder="Search"
                  value={field.value ?? ''}
                  onChange={field.onChange}
                  className="w-[398px] py-[23px]"
                />
              )}
            />
          </form>
        </Form>

        <Button className="w-fit py-6 px-4 ml-auto bg-primary" onClick={() => handleModalButtonClick(userId)}>
          <HiUserAdd className="w-6 h-6 text-white" />
          <p className="text-white font-semibold text-sm pl-2 w-max">Tambah Admin</p>
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
                <TableCell position="center">
                  <Status label={item?.isActive ? 'Active' : 'Inactive'} isSuccess="Active" isDanger="Inactive" />
                </TableCell>
                <TableCell className="flex items-center justify-center">
                  <Button
                    size="icon"
                    variant="base"
                    className="bg-[#959595] text-white hover:bg-[#828282] hover:text-white"
                    onClick={() => handleModalButtonClick(item.id)}
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

      {(admins?.meta?.total as number) > 30 ? (
        <Pagination
          currentPage={page !== '' ? parseInt(page) : 1}
          totalCount={admins?.meta.total as number}
          pageSize={30}
          onPageChange={(page) => createParams({ key: 'page', value: page.toString() })}
        />
      ) : null}

      <Modal isShow={isShow} className="max-h-[calc(100vh-200px)] overflow-y-auto" isLoading={isLoadingUser}>
        <Modal.Header setIsShow={setIsShow} className="gap-1 flex flex-col">
          <h3 className="text-base font-bold leading-6 text-title md:text-2xl">Tambah</h3>
          <p className="text-sm text-[#A1A1A1]">Masukkan data Admin baru.</p>
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
                      <Input {...field} value={field.value ?? ''} placeholder="Masukkan No. HP" />
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
                      <Input {...field} value={field.value ?? ''} placeholder="Masukkan Password (default)" />
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
                  </FormItem>
                )}
              />
              <FormField
                name="isActive"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
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
                  </FormItem>
                )}
              />
            </div>
            <Modal.Footer>
              <Button
                variant="outline"
                className="rounded-lg text-primary border-primary"
                onClick={() => setIsShow(false)}
                loading={isLoading}
              >
                Cancel
              </Button>
              <Button className="rounded-lg" type="submit" loading={isLoadingCreate}>
                Tambah
              </Button>
            </Modal.Footer>
          </form>
        </Form>
      </Modal>

      <Modal isShow={isShowUpdate} className="max-h-[calc(100vh-200px)] overflow-y-auto">
        <Modal.Header setIsShow={setIsShowUpdate} className="gap-1 flex flex-col">
          <h3 className="text-base font-bold leading-6 text-title md:text-2xl">Perbaharui</h3>
          <p className="text-sm text-[#A1A1A1]">Perbaharui data Admin.</p>
        </Modal.Header>
        <Form {...formsUpdate}>
          <form onSubmit={formsUpdate.handleSubmit(onSubmitUpdate)} className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <FormField
                name="employeeIdentityNumber"
                control={formsUpdate.control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="font-semibold dark:text-white">NIP</FormLabel>
                    <FormControl>
                      <Input readOnly {...field} value={field.value ?? ''} placeholder="Masukkan NIP" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                control={formsUpdate.control}
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
                control={formsUpdate.control}
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
                control={formsUpdate.control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="font-semibold dark:text-white">No. HP</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} placeholder="Masukkan No. HP" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="role"
                control={formsUpdate.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Role</FormLabel>
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
                  </FormItem>
                )}
              />
              <FormField
                name="isActive"
                control={formsUpdate.control}
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
                onClick={() => setIsShowUpdate(false)}
                loading={isLoading}
              >
                Cancel
              </Button>
              <Button className="rounded-lg" type="submit" loading={isLoadingUpdate}>
                Ubah
              </Button>
            </Modal.Footer>
          </form>
        </Form>
      </Modal>
    </Container>
  )
}

export default ManajemenAdmin
