import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { HiBadgeCheck, HiTrash, HiUserAdd, HiX } from 'react-icons/hi'
import { useForm } from 'react-hook-form'
import * as React from 'react'

import { Container, Loading, Modal, MultiSelect, Search } from '@/components'
import useTitle from '@/hooks/useTitle'
import {
  useCreateRolePermission,
  useDeleteRolePermission,
  useGetPermission,
  useGetRole
} from '@/store/server/useUserManagement'
import { useNavigate } from 'react-router-dom'
import { type rolePermissionFields } from '@/lib/validations/rolepermission.validation'
import { useAlert } from '@/store/client'
import { useCreateParams, useDeleteParams, useGetParams } from '@/hooks'

const ManajemenRole = () => {
  useTitle('Manajemen Role ')
  const navigate = useNavigate()
  const { alert } = useAlert()

  const deleteParams = useDeleteParams()
  const createParams = useCreateParams()
  const { q } = useGetParams(['q'])

  const [isShow, setIsShow] = React.useState(false)
  const { mutate: RolePermission, isLoading: isLoadingCreate } = useCreateRolePermission()
  const { data: role, isLoading: isLoadingRole, refetch } = useGetRole(q)
  const { data: permission, isLoading: isLoadingPermission } = useGetPermission()
  const { mutateAsync: deleteRolePermission, isLoading: isLoadingDelete } = useDeleteRolePermission()
  const PERMISSION =
    permission?.data?.map((item: any) => ({
      value: item.id,
      label: item.name
    })) || []

  const formsCreate = useForm<rolePermissionFields>({
    mode: 'onTouched',
    defaultValues: {
      name: 'Admin',
      permissions: []
    }
  })

  const formsSearch = useForm<{ q: string }>()

  React.useEffect(() => {
    if (q) formsSearch.setValue('q', q)
  }, [q])

  const handleSearch = async (values: { q: string }) => {
    if (values.q) {
      createParams({ key: 'q', value: values.q })
      await refetch()
    } else {
      deleteParams('q')
      await refetch()
    }
  }

  const handleDeleteRolePermission = (id: string) => {
    void alert({
      title: 'Hapus User',
      description: 'Apakah kamu yakin ingin menghapus data ini?',
      variant: 'danger',
      submitText: 'Delete'
    }).then(async () => {
      await deleteRolePermission(id)
    })
  }

  const onSubmit = async (values: rolePermissionFields) => {
    const validPermissions: string[] = values.permissions.filter((p: any): p is string => p !== undefined)
    const newData = {
      ...values,
      permissions: validPermissions
    }
    RolePermission(newData, { onSuccess })
  }

  const onSuccess = () => {
    setIsShow(false)
    navigate('/manajemen-role')
  }

  if (isLoadingDelete || isLoadingCreate || isLoadingRole || isLoadingPermission) {
    return <Loading />
  }

  return (
    <Container className="relative pt-[34px] pb-[22px] px-7">
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
        <Button className="w-fit py-6 px-4 ml-auto bg-primary" onClick={() => setIsShow(true)}>
          <HiUserAdd className="w-6 h-6 text-white" />
          <p className="text-white font-semibold text-sm pl-2 w-max">Tambah Role</p>
        </Button>
      </div>
      <Table>
        <TableHeader className="bg-primary">
          <TableRow>
            <TableHead className="text-center text-white">Role</TableHead>
            {PERMISSION.map((permissionItem: any) => (
              <TableHead className="text-center text-white" key={permissionItem.value}>
                {permissionItem.label}
              </TableHead>
            ))}
            <TableHead className="text-center text-white">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {role?.data.map((item: any) => (
            <TableRow key={item.id}>
              <TableCell className="text-center">{item.name}</TableCell>
              {PERMISSION.map((permissionItem: any) => {
                const rolePermission = item.permissions.find((p: any) => p.id === permissionItem.value)
                const isPermitted = rolePermission?.isPermitted ?? false

                return (
                  <TableCell className="center" position="center" key={permissionItem.value}>
                    {isPermitted ? (
                      <div className="flex justify-center items-center w-full mx-auto">
                        <HiBadgeCheck className="text-center text-2xl text-green-500" />
                      </div>
                    ) : (
                      <HiX className="text-center text-2xl text-red-500" />
                    )}
                  </TableCell>
                )
              })}
              <TableCell className="flex justify-center items-center">
                <Button
                  size="icon"
                  variant="base"
                  className="bg-red-500 text-white hover:bg-red-300 hover:text-white ms-2"
                  onClick={() => handleDeleteRolePermission(item.id)}
                >
                  <HiTrash className="text-lg" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
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
              name="name"
              control={formsCreate.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="font-semibold dark:text-white">Role</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={formsCreate.control}
              name="permissions"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="font-semibold dark:text-white">Permission</FormLabel>
                  <MultiSelect
                    onChange={field.onChange}
                    selected={(field.value ?? []).filter((v): v is string => v !== undefined)}
                    options={PERMISSION}
                    placeholder="Pilih Akses"
                    className="flex-1"
                    width="min-w-[580px]"
                  />
                  <FormMessage />
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
              <Button className="rounded-lg" type="submit" loading={isLoadingCreate}>
                Tambah Data
              </Button>
            </Modal.Footer>
          </form>
        </Form>
      </Modal>
    </Container>
  )
}

export default ManajemenRole
