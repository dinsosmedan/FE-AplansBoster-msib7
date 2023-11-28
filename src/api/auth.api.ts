import ENV from '@/lib/environment'
import { IUser, type IAuthResponse } from '@/lib/types/user.type'
import { type LoginInput } from '@/lib/validations/auth.validation'
import axios from 'axios'
import api from './axiosInstance'

const apiPublic = axios.create({
  baseURL: ENV.apiUrl,
  headers: { Accept: 'application/json' }
})

apiPublic.defaults.headers.post['Content-Type'] = 'application/json'

// example
export const loginFn = async (fields: LoginInput): Promise<IAuthResponse> => {
  const response = await apiPublic.post('/auth/login', fields)
  return response.data
}
export const logoutFn = async (): Promise<IAuthResponse> => {
  const response = await api.post('/auth/logout')
  return response.data
}
export const getMeFn = async (): Promise<IUser> => {
  const response = await api.get('/auth/me')
  return response.data
}