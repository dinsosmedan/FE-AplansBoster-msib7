import api from './axiosInstance'
import { type userUpdateFields, type userFields } from '@/lib/validations/user.validation'
import { type rolePermissionFields } from '@/lib/validations/rolepermission.validation'

export const getAdminFn = async (page?: string, q?: string): Promise<any> => {
  const response = await api.get(`/management/admin?page=${page}&q=${q}`)
  return response.data
}

export const deleteAdminFn = async (id: string): Promise<any> => {
  const response = await api.delete(`/management/admin/${id}`)
  return response.data
}

interface UpdateAdminParams {
  id: string
  fields: userUpdateFields
}

export const updateAdminFn = async ({ id, fields }: UpdateAdminParams) => {
  await api.put(`/management/admin/${id}`, fields)
}

export const getAdminDetailFn = async (id: string, q?: string) => {
  const response = await api.get(`/management/admin/${id}?q=${q}`)
  return response.data?.data
}

// ROLE PERMISSION

export const storeAdminFn = async (fields: userFields) => {
  await api.post('/management/admin', fields)
}

export const getRoleFn = async (q?: string): Promise<any> => {
  const response = await api.get(`/user-access/role?q=${q}`)
  return response.data
}

export const getPermissionFn = async (): Promise<any> => {
  const response = await api.get('/user-access/permission')
  return response.data
}

export const storeRolePermissionFn = async (fields: rolePermissionFields) => {
  await api.post('/user-access/role', fields)
}
interface UpdateRoleParams {
  id: string
  fields: rolePermissionFields
}
export const updateRolePermissionFn = async ({ id, fields }: UpdateRoleParams) => {
  await api.put(`/user-access/role/${id}`, fields)
}
export const getRolePermissionDetailFn = async (id: string) => {
  const response = await api.get(`/user-access/role/${id}`)
  return response.data?.data
}
export const deleteRolePermissionFn = async (id: string): Promise<any> => {
  const response = await api.delete(`/user-access/role/${id}`)
  return response.data
}

// User

export const getUsersFn = async (page?: string, q?: string): Promise<any> => {
  const response = await api.get(`/management/user?page=${page}&q=${q}`)
  return response.data
}

export const deleteUserFn = async (id: string): Promise<any> => {
  const response = await api.delete(`/management/user/${id}`)
  return response.data
}

interface UpdateUserParams {
  id: string
  fields: userUpdateFields
}

export const updateUserFn = async ({ id, fields }: UpdateUserParams) => {
  const body = {
    ...fields,
    isActive: fields.isActive === 'true'
  }

  await api.put(`/management/user/${id}`, body)
}

export const getUserDetailFn = async (id: string) => {
  const response = await api.get(`/management/user/${id}`)
  return response.data?.data
}

export const storeUserFn = async (fields: userFields) => {
  await api.post('/management/user', fields)
}
