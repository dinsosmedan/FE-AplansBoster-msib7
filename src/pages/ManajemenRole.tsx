import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Form, FormField } from '@/components/ui/form'
import { Button } from '@/components/ui/button'

import { HiBadgeCheck, HiUserAdd, HiX } from 'react-icons/hi'
import { useForm } from 'react-hook-form'
import * as React from 'react'

import { Action, Container, Loading, Search } from '@/components'
import useTitle from '@/hooks/useTitle'
import { useDeleteRolePermission, useGetPermission, useGetRole } from '@/store/server/useUserManagement'
import { useAlert } from '@/store/client'
import { useCreateParams, useDeleteParams, useGetParams } from '@/hooks'
import CreateManagementRole from '@/components/organisms/managementRole/CreateManagementRole'

const ManajemenRole = () => {
  useTitle('Manajemen Role ')
  const { alert } = useAlert()
  const [roleId, setRoleId] = React.useState('')

  const deleteParams = useDeleteParams()
  const createParams = useCreateParams()
  const { q } = useGetParams(['q'])
  const handleEdit = (id: string) => {
    setRoleId(id)
    setIsShow(true)
  }

  const handleCreate = () => {
    setRoleId('')
    setIsShow(true)
  }
  const [isShow, setIsShow] = React.useState(false)
  const { data: role, isLoading: isLoadingRole, refetch } = useGetRole(q)
  const { data: permission, isLoading: isLoadingPermission } = useGetPermission()
  const { mutateAsync: deleteRolePermission, isLoading: isLoadingDelete } = useDeleteRolePermission()
  const PERMISSION =
    permission?.data?.map((item: any) => ({
      value: item.id,
      label: item.name
    })) || []

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

  if (isLoadingDelete || isLoadingRole || isLoadingPermission) {
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
        <Button className="w-fit py-6 px-4 ml-auto bg-primary" onClick={() => handleCreate()}>
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
              <TableCell className="flex items-center justify-center bg-[#F9FAFC]">
                <Action onDelete={() => handleDeleteRolePermission(item.id)} onEdit={() => handleEdit(item.id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CreateManagementRole isShow={isShow} setIsShow={setIsShow} roleId={roleId} />
    </Container>
  )
}

export default ManajemenRole
