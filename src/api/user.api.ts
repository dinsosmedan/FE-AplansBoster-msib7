import ENV from '@/lib/environment'
import axios from 'axios'
import api from './axiosInstance'
import { type userFields } from '@/lib/validations/user.validation'

const apiPublic = axios.create({
  baseURL: ENV.apiUrl,
  headers: { Accept: 'application/json' }
})

apiPublic.defaults.headers.post['Content-Type'] = 'application/json'

export const getUsersFn = async (): Promise<any> => {
  const response = await api.get('/management/user')
  return response.data
}

export const storeUserFn = async (fields: userFields) => {
    await api.post('/management/user', fields)
  }

export const getRoleFn = async (): Promise<any> => {
    const response = await api.get('/user-access/role')
    return response.data
}
