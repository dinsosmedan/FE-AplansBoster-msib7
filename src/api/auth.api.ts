import ENV from '@/lib/environment'
import { type IAuthResponse } from '@/lib/types/user.type'
import { type LoginInput } from '@/lib/validations/auth.validation'
import axios from 'axios'

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
