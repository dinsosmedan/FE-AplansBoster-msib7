import ENV from '@/lib/environment'
import {
  type IUser,
  type IAuthResponse,
  type IResetPassword,
  type IUserPublic,
  type IChangePassword,
  type IChangeProfile
} from '@/lib/types/user.type'
import { type ForgetPasswordInput, type LoginInput } from '@/lib/validations/auth.validation'
import axios from 'axios'
import api from './axiosInstance'
import axiosPublic from './axiosPublicInstance'
import {
  type ForgotPasswordUserFields,
  type LoginUserFields,
  type RegisterUserFields
} from '@/lib/validations/landingPage/auth.validation'

const apiPublic = axios.create({
  baseURL: ENV.apiUrl,
  headers: { Accept: 'application/json' }
})

apiPublic.defaults.headers.post['Content-Type'] = 'application/json'

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
export const forgetPasswordFn = async (fields: ForgetPasswordInput) => {
  const response = await apiPublic.post('/auth/forget', fields)
  return response.data
}
export const resetPasswordFn = async (fields: IResetPassword) => {
  const response = await axiosPublic.post('/auth/reset', fields)
  return response.data
}
// LANDING PAGE
export const loginUserFn = async (fields: LoginUserFields): Promise<IAuthResponse> => {
  const response = await apiPublic.post('/public/auth/login', fields)
  return response.data
}

export const getMePublicFn = async (): Promise<IUserPublic> => {
  const response = await axiosPublic.get('/auth/me')
  return response.data
}

export const logoutUserFn = async () => {
  await axiosPublic.post('/public/auth/logout')
}

export const registerUserFn = async (fields: RegisterUserFields) => {
  const formData = new FormData()
  formData.append('name', fields.name)
  formData.append('email', fields.email)
  formData.append('identityNumber', fields.identityNumber)
  formData.append('phoneNumber', fields.phoneNumber)
  formData.append('password', fields.password)
  if (Array.isArray(fields.identityCard) && fields.identityCard.length > 0) {
    formData.append('identityCard', fields.identityCard[0] as File)
  }

  if (Array.isArray(fields.selfie) && fields.selfie.length > 0) {
    formData.append('selfie', fields.selfie[0] as File)
  }

  await apiPublic.post('/public/auth/register', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const forgetPasswordUserFn = async (fields: ForgotPasswordUserFields) => {
  const response = await axiosPublic.post('/public/auth/forget', fields)
  return response.data
}
export const resetPasswordUserFn = async (fields: IResetPassword) => {
  const response = await axiosPublic.post('/public/auth/reset', fields)
  return response.data
}
export const changePasswordUserFn = async (fields: IChangePassword) => {
  const response = await axiosPublic.put('/public/account/change-password', fields)
  return response.data
}
export const changeProfileUserFn = async (fields: IChangeProfile) => {
  const response = await axiosPublic.put('/public/account', fields)
  return response.data
}
