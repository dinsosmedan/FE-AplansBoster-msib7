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
