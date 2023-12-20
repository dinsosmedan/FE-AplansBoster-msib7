import { type updateTuitionAssistanceFields } from '@/lib/validations/linjamsos.validation'
import api from './axiosInstance'
import {
  type IIndigencyCertificates,
  type ITuitionAssistanceEvent,
  type ITuitionAssistanceEvents
} from '@/lib/types/service.type'
import axiosPublic from './axiosPublicInstance'

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

export const updateIndigencyCertificateStatusFn = async ({ id, fields }: dtksStatusParams) => {
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
  const url = filter == 'SKTM' ? 'public/application/indigency-certificate/history' : 'public/application/tuition-assistance/history'
  const response = await axiosPublic.get(url)
  return response.data?.data
}