import { Container, Loading, Modal, Pagination, Search, Status } from '@/components'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useForm } from 'react-hook-form'
import * as React from 'react'
import { HiOutlinePencilAlt, HiTrash } from 'react-icons/hi'
import useTitle from '@/hooks/useTitle'
import { useDeleteUser, useGetUserById, useGetUsers, useUpdateUser } from '@/store/server/useUserManagement'
import { type userUpdateFields, userUpdateValidation } from '@/lib/validations/user.validation'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAlert } from '@/store/client'
import { useCreateParams, useDeleteParams, useDisableBodyScroll, useGetParams } from '@/hooks'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useNavigate } from 'react-router-dom'

const ManajemenUser = () => {
  useTitle('Manajemen User ')
  const navigate = useNavigate()
  const { alert } = useAlert()

  const forms = useForm<userUpdateFields>({
    mode: 'onTouched',
    resolver: yupResolver(userUpdateValidation)
  })

  const formsSearch = useForm<{ q: string }>()

  const deleteParams = useDeleteParams()
  const createParams = useCreateParams()
  const { page, q } = useGetParams(['page', 'q'])

  const [userId, setUserId] = React.useState('')
  const [isShow, setIsShow] = React.useState(false)

  const { data: users, isLoading, isFetching, refetch } = useGetUsers(page, q)
  const { data: user, isSuccess, isLoading: isLoadingUser } = useGetUserById(userId)

  const { mutateAsync: deleteUser, isLoading: isLoadingDelete } = useDeleteUser()
  const { mutate: updateUser, isLoading: isLoadingUpdate } = useUpdateUser()

  React.useEffect(() => {
    if (!userId) {
      forms.setValue('role', '')
      forms.setValue('isActive', '')
      forms.setValue('employeeIdentityNumber', '')
      forms.setValue('email', '')
      forms.setValue('name', '')
    }
  }, [userId])

  React.useEffect(() => {
    if (isSuccess && userId) {
      forms.reset({
        employeeIdentityNumber: user?.identityNumber,
        email: user?.email,
        name: user?.name,
        role: user?.role?.id ?? '',
        isActive: user?.isActive ? 'true' : 'false'
      })
    }
  }, [isSuccess, userId])

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

  const handleEditUser = (id: string) => {
    setUserId(id)
    setIsShow(true)
  }

  const onSubmit = async (values: userUpdateFields) => {
    const newData = {
      isActive: values.isActive ? '1' : '0'
    }
    updateUser({ id: userId, fields: newData }, { onSuccess })
  }
  const onSuccess = () => {
    forms.reset()
    setIsShow(false)
    navigate('/manajemen-user')
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
      </div>
      <Table>
        <TableHeader className="bg-primary">
          <TableRow>
            <TableHead className="text-white">NIK</TableHead>
            <TableHead className="text-white">Nama</TableHead>
            <TableHead className="text-white">Email</TableHead>
            <TableHead className="text-white">No. HP</TableHead>
            <TableHead className="text-white">Role</TableHead>
            <TableHead className="text-white">Status</TableHead>
            <TableHead className="text-white">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.data?.length !== 0 ? (
            users?.data.map((item: any) => (
              <TableRow key={item?.id}>
                <TableCell className="font-semibold">{item?.identityNumber || '-'}</TableCell>
                <TableCell className="font-semibold">{item?.name}</TableCell>
                <TableCell className="text-center">{item?.email || '-'}</TableCell>
                <TableCell className="text-center">{item?.phoneNumber || '-'}</TableCell>
                <TableCell className="text-center" position="center">
                  {item?.role?.name || 'Guest'}
                </TableCell>
                <TableCell position="center">
                  <Status label={item?.isActive ? 'Active' : 'Inactive'} isSuccess="Active" isDanger="Inactive" />
                </TableCell>
                <TableCell className="flex items-center justify-center">
                  <Button
                    size="icon"
                    variant="base"
                    className="bg-[#959595] text-white hover:bg-[#828282] hover:text-white"
                    onClick={() => handleEditUser(item?.id)}
                  >
                    <HiOutlinePencilAlt className="text-lg" />
                  </Button>
                  <Button
                    size="icon"
                    variant="base"
                    className="bg-red-500 text-white hover:bg-red-300 hover:text-white ms-2"
                    onClick={() => handleDeleteUser(item?.id)}
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

      {(users?.meta?.total as number) > 30 ? (
        <Pagination
          currentPage={page !== '' ? parseInt(page) : 1}
          totalCount={users?.meta.total as number}
          pageSize={30}
          onPageChange={(page) => createParams({ key: 'page', value: page.toString() })}
        />
      ) : null}

      <Modal isShow={isShow} isLoading={isLoadingUser}>
        <Modal.Header setIsShow={setIsShow} className="gap-1 flex flex-col">
          <h3 className="text-base font-bold leading-6 text-title md:text-2xl">
            {userId ? 'Edit' : 'Tambah'} data user
          </h3>
          <p className="text-sm text-[#A1A1A1]">{userId ? 'Perbaharui' : 'Menambahkan'} data user.</p>
        </Modal.Header>
        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-5">
              <FormField
                name="employeeIdentityNumber"
                control={forms.control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="font-semibold dark:text-white">NIK</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ''}
                        readOnly={Boolean(userId)}
                        disabled={Boolean(userId)}
                        placeholder="Masukkan NIK"
                      />
                    </FormControl>
                    <FormMessage />
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
                      <Input
                        {...field}
                        value={field.value ?? ''}
                        readOnly={Boolean(userId)}
                        disabled={Boolean(userId)}
                        placeholder="Masukkan Email"
                      />
                    </FormControl>
                    <FormMessage />
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
                      <Input
                        {...field}
                        value={field.value ?? ''}
                        placeholder="Masukkan Nama"
                        readOnly={Boolean(userId)}
                        disabled={Boolean(userId)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="isActive"
                control={forms.control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="font-semibold dark:text-white">Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Active</SelectItem>
                        <SelectItem value="false">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Modal.Footer>
              <Button
                variant="outline"
                className="rounded-lg text-primary border-primary"
                onClick={() => setIsShow(false)}
                type="button"
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
export default ManajemenUser
