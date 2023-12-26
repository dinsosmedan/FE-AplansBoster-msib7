import {
  type updateIndigencyCertificateServiceFields,
  type updateTuitionAssistanceFields
} from '@/lib/validations/linjamsos.validation'
import api from './axiosInstance'
import {
  type IDTKSApplication,
  type IDTKSApplications,
  type IIndigencyCertificate,
  type IIndigencyCertificates,
  type ITuitionAssistanceEvent,
  type ITuitionAssistanceEvents
} from '@/lib/types/service.type'
import axiosPublic from './axiosPublicInstance'
import { formatDateToString } from '@/lib/services/formatDate'

export interface getTuitionAssistanceParams {
  eventId: string
  search?: string
  applicationStatus?: string
  page?: number
}

export const getTuitionAssistanceByEventId = async ({
  eventId,
  search,
  applicationStatus,
  page
}: getTuitionAssistanceParams): Promise<ITuitionAssistanceEvents> => {
  const response = await api.get(
    `service/tuition-assistance-application/event/${eventId}?application_status=${applicationStatus}&q=${search}&page=${page}`
  )
  return response.data
}

export const getIndigencyCertificateFn = async (
  status: string,
  search: string,
  page: number
): Promise<IIndigencyCertificates> => {
  const response = await api.get(`/service/indigency-certificate?application_status=${status}&q=${search}&page=${page}`)
  return response.data
}

export const showTuitionAssistanceEventFn = async (id: string): Promise<ITuitionAssistanceEvent> => {
  const response = await api.get(`/service/tuition-assistance-application/${id}`)
  return response.data?.data
}

interface updateTuitionAssistanceEventParams {
  id: string
  fields: updateTuitionAssistanceFields
}

export const updateTuitionAssistanceEventFn = async ({ id, fields }: updateTuitionAssistanceEventParams) => {
  await api.put(`/service/tuition-assistance-application/${id}`, fields)
}

interface dtksStatusParams {
  id: string
  fields: { dtksStatus: string }
}

export const updateTuitionAssistanceEventStatusFn = async ({ id, fields }: dtksStatusParams) => {
  await api.put(`/service/tuition-assistance-application/${id}/dtks-status`, fields)
}

interface indigencyStatusParams {
  id: string
  fields: { statusDtks: string }
}

export const updateIndigencyCertificateStatusFn = async ({ id, fields }: indigencyStatusParams) => {
  await api.put(`/service/indigency-certificate/dtks-status/${id}`, fields)
}

interface updateApplicationStatusParams {
  id: string
  fields: {
    applicationStatus?: string
    message?: string
    assistanceAmount?: number
    budgetYear?: number
  }
}

export const updateApplicationStatusFn = async ({ id, fields }: updateApplicationStatusParams) => {
  let data = {}

  if (fields.applicationStatus === 'approved') {
    data = {
      applicationStatus: fields.applicationStatus,
      assistanceAmount: fields.assistanceAmount,
      budgetYear: fields.budgetYear
    }
  } else if (fields.applicationStatus === 'rejected' || fields.applicationStatus === 'revision') {
    data = {
      applicationStatus: fields.applicationStatus,
      message: fields.message
    }
  } else if (fields.applicationStatus === 'processed') {
    data = {
      applicationStatus: fields.applicationStatus
    }
  }

  await api.put(`service/tuition-assistance-application/${id}/status`, data)
}

export const getFetchRiwayatSktmFn = async (filter: any): Promise<any> => {
  const url =
    filter === 'SKTM'
      ? 'public/application/indigency-certificate/history'
      : 'public/application/tuition-assistance/history'
  const response = await axiosPublic.get(url)
  return response.data?.data
}
interface updateIndigencyStatusParams {
  id: string
  fields: {
    applicationStatus?: string
    message?: string
    issueDate?: Date
    issuedCertificate?: File[]
  }
}

export const updateIndigencyStatusFn = async ({ id, fields }: updateIndigencyStatusParams) => {
  const formData = new FormData()

  formData.append('applicationStatus', fields.applicationStatus as string)
  formData.append('_method', 'PUT')
  if (fields.applicationStatus === 'approved') {
    formData.append('issueDate', formatDateToString(fields.issueDate as Date))
    formData.append('issuedCertificate', fields.issuedCertificate?.[0] as File)
  } else if (fields.applicationStatus === 'rejected' || fields.applicationStatus === 'revision') {
    formData.append('message', fields.message as string)
  }

  await api.post(`/service/indigency-certificate/status/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const showIndigencyCertificateApplicationFn = async (id: string): Promise<IIndigencyCertificate> => {
  const response = await api.get(`/service/indigency-certificate/${id}`)
  return response.data?.data
}

export const getDTKSApplicationFn = async (
  page: number,
  status: boolean,
  search: string
): Promise<IDTKSApplications> => {
  const response = await api.get(`/service/dtks-application?page=${page}&status=${status}&q=${search}`)
  return response.data
}

interface updateIndigencyCertificateApplicationParams {
  id: string
  fields: updateIndigencyCertificateServiceFields
}

export const updateIndigencyCertificateApplicationFn = async ({
  id,
  fields
}: updateIndigencyCertificateApplicationParams) => {
  await api.put(`/service/indigency-certificate/${id}`, fields)
}

export const showDTKSApplicationFn = async (id: string): Promise<IDTKSApplication> => {
  const response = await api.get(`/service/dtks-application/${id}`)
  return response.data?.data
}

interface updateDTKSApplicationParams {
  id: string
  fields: { status: boolean }
}

export const updateDTKSApplicationFn = async ({ id, fields }: updateDTKSApplicationParams) => {
  await api.put(`/service/dtks-application/${id}`, fields)
}
