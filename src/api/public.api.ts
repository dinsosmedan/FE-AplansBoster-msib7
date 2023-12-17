import ENV from '@/lib/environment'
import { type IUniversity } from '@/lib/types/linjamsos.type'
import { type IBank, type IAssistanceCheck, type IPublicEventTuition } from '@/lib/types/public.type'
import axios from 'axios'

const apiPublic = axios.create({
  baseURL: ENV.apiUrl,
  headers: { Accept: 'application/json' }
})

apiPublic.defaults.headers.post['Content-Type'] = 'application/json'

export const showAssistanceCheckFn = async (nik: string): Promise<IAssistanceCheck> => {
  const response = await apiPublic.get(`/public/assistance-check/${nik}`)
  return response.data?.data
}

export const getUniversitiesFn = async (): Promise<IUniversity[]> => {
  const response = await apiPublic.get('/public/university')
  return response.data?.data
}

export const getStudyProgramsFn = async (universityId: string): Promise<IUniversity[]> => {
  const response = await apiPublic.get(`/public/university/${universityId}/study-program`)
  return response.data?.data
}

export const getBankListFn = async (): Promise<IBank[]> => {
  const response = await apiPublic.get('/bank')
  return response.data?.data
}

export const getPublicEventTuitionFn = async (): Promise<IPublicEventTuition[]> => {
  const response = await apiPublic.get('/public/event/tuition-assistance')
  return response.data?.data
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
