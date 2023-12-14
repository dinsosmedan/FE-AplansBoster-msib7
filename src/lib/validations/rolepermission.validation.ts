import * as Yup from 'yup'

export const rolePermissionValidation = Yup.object({
  name: Yup.string().required('Role name is required'),
  permissions: Yup.array(Yup.string()).required('At least one permission is required')
})

export type rolePermissionFields = Yup.InferType<typeof rolePermissionValidation>
