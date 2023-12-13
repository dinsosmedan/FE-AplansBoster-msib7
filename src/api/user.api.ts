import ENV from '@/lib/environment'
import axios from 'axios'
import api from './axiosInstance'
import { type userFields } from '@/lib/validations/user.validation'
import { type rolePermissionFields } from '@/lib/validations/rolepermission.validation'

const apiPublic = axios.create({
  baseURL: ENV.apiUrl,
  headers: { Accept: 'application/json' }
})

apiPublic.defaults.headers.post['Content-Type'] = 'application/json'

export const getUsersFn = async (): Promise<any> => {
  const response = await api.get('/management/admin')
  return response.data
}

export const deleteUsersFn = async (id: string): Promise<any> => {
  const response = await api.delete(`/management/admin/${id}`)
  return response.data
}

interface UpdateUserParams {
  id: string
  fields: userFields
}

export const updateUserFn = async ({ id, fields }: UpdateUserParams) => {
  await api.put(`/management/admin/${id}`, fields)
}

export const getUserDetailFn = async (id: string) => {
  const response = await api.get(`/management/admin/${id}`)
  return response.data?.data
}

export const storeUserFn = async (fields: userFields) => {
    await api.post('/management/admin', fields)
}

export const getRoleFn = async (): Promise<any> => {
    const response = await api.get('/user-access/role')
    return response.data
}

export const getPermissionFn = async (): Promise<any> => {
  const response = await api.get('/user-access/permission')
  return response.data
}

export const storeRolePermissionFn = async (fields: rolePermissionFields) => {
  await api.post('/user-access/role', fields)
}
