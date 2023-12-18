import ENV from '@/lib/environment'
import { type IUniversity } from '@/lib/types/linjamsos.type'
import { type IBank, type IAssistanceCheck, type IPublicEventTuition } from '@/lib/types/public.type'
import { type PublicDTKSFields } from '@/lib/validations/landingPage/public.validation'
import axios from 'axios'
import axiosPublic from './axiosPublicInstance'

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
export const storePublicEventDtksFn = async (fields: PublicDTKSFields) => {
  const formData = new FormData()
  formData.append('identityNumber', fields.identityNumber)
  formData.append('familyCardNumber', fields.identityNumber)
  formData.append('name', fields.name)
  formData.append('birthPlace', fields.birthPlace)
  formData.append('birthDate', fields.birthDate as unknown as string)
  formData.append('motherName', fields.motherName)
  formData.append('gender', fields.gender)
  formData.append('occupation', fields.occupation)
  formData.append('maritalStatus', fields.maritalStatus)
  formData.append('areaLevel3', fields.areaLevel3)
  formData.append('areaLevel4', fields.areaLevel4)
  formData.append('address', fields.address)
  formData.append('question1', fields.question1.toString())
  formData.append('question2', fields.question2.toString())
  formData.append('question3', fields.question3.toString())
  formData.append('question4', fields.question4.toString())
  formData.append('question5', fields.question5.toString())
  formData.append('question6', fields.question6.toString())
  formData.append('question7', fields.question7.toString())
  formData.append('question8', fields.question8.toString())
  formData.append('question9', fields.question9.toString())
  formData.append('question10', fields.question9.toString())
  formData.append('assistanceProgram', fields.assistanceProgram)
  formData.append('disabilityStatus', fields.disabilityStatus)
  formData.append('pregnantDate', fields.pregnantDate as unknown as string)
  formData.append('familyRelationship', fields.familyRelationship)
  formData.append('remoteIndigenousStatus', fields.remoteIndigenousStatus)
  formData.append('tribeName', fields.tribeName)

  if (Array.isArray(fields.indentityPath) && fields.indentityPath.length > 0) {
    formData.append('indentityPath', fields.indentityPath[0])
  }

  if (Array.isArray(fields.housePath) && fields.housePath.length > 0) {
    formData.append('housePath', fields.housePath[0])
  }

  await axiosPublic.post('/public/application/dtks', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
