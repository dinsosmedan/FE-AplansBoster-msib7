import { Loading, Modal, MultiSelect } from '@/components'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  useCreateRolePermission,
  useGetPermission,
  useGetRoleById,
  useUpdateRole
} from '@/store/server/useUserManagement'
import { useForm } from 'react-hook-form'
import { type rolePermissionFields } from '@/lib/validations/rolepermission.validation'
import { useNavigate } from 'react-router-dom'
import React from 'react'

interface CreateRoleProps {
  isShow: boolean
  setIsShow: (value: boolean) => void
  roleId?: string
}

const CreateManagementRole = ({ isShow, setIsShow, roleId }: CreateRoleProps) => {
  const navigate = useNavigate()
  const { mutate: RolePermission, isLoading: isLoadingCreate } = useCreateRolePermission()
  const { data: permission, isLoading: isLoadingPermission } = useGetPermission()
  const { mutate: updateRole, isLoading: isLoadingUpdate } = useUpdateRole()
  const { data: role, isSuccess, isLoading: isLoadingDetail } = useGetRoleById(roleId as string)
  const formsCreate = useForm<rolePermissionFields>({
    mode: 'onTouched',
    defaultValues: {
      name: 'Admin',
      permissions: []
    }
  })

  const PERMISSION =
    permission?.data?.map((item: any) => ({
      value: item.id,
      label: item.name
    })) || []

  const onSubmit = async (values: rolePermissionFields) => {
    const validPermissions: string[] = values.permissions.filter((p: any): p is string => p !== undefined)
    const newData = {
      ...values,
      permissions: validPermissions
    }
    if (!roleId) return RolePermission(newData, { onSuccess })
    updateRole({ id: roleId, fields: newData }, { onSuccess })
  }
  const onSuccess = () => {
    setIsShow(false)
    navigate('/manajemen-role')
  }
  React.useEffect(() => {
    if (!roleId) {
      formsCreate.reset({
        name: '',
        permissions: []
      })
    }
  }, [roleId])

  React.useEffect(() => {
    if (roleId && isSuccess) {
      formsCreate.setValue('name', role.name)
      formsCreate.setValue(
        'permissions',
        role.permissions.map((permission: any) => {
          return permission.id
        })
      )
    }
  }, [roleId, isSuccess])
  if (isLoadingPermission) {
    return <Loading />
  }
  return (
    <Modal isShow={isShow}>
      <Modal.Header setIsShow={setIsShow} className="gap-1 flex flex-col">
        <h3 className="text-base font-bold leading-6 text-title md:text-2xl">Tambah Role</h3>
        <p className="text-sm text-[#A1A1A1]">Masukkan Data Role Baru</p>
      </Modal.Header>
      {isLoadingDetail ? (
        <Loading />
      ) : (
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
              <Button className="rounded-lg" type="submit" loading={isLoadingCreate || isLoadingUpdate}>
                {roleId ? 'Update' : 'Submit'}
              </Button>
            </Modal.Footer>
          </form>
        </Form>
      )}
    </Modal>
  )
}

export default CreateManagementRole
