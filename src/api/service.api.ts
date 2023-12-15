import { type updateTuitionAssistanceFields } from '@/lib/validations/linjamsos.validation'
import api from './axiosInstance'
import { type ITuitionAssistanceEvent, type ITuitionAssistanceEvents } from '@/lib/types/service.type'

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

export const getIndigencyCertificateFn = async (status: any, search: any): Promise<any> => {
  const response = await api.get(`/service/indigency-certificate?application_status=${status}&q=${search}`)
  return response.data?.data
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
