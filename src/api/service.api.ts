import { type ITuitionAssistance } from '@/lib/types/linjamsos.type'
import api from './axiosInstance'

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
}: getTuitionAssistanceParams): Promise<ITuitionAssistance> => {
  const response = await api.get(
    `service/tuition-assistance-application/event/${eventId}?q=${search}&application_status=${applicationStatus}&page=${page}`
  )
  return response.data
}


export const getIndigencyCertificateFn = async (status: any, search: any): Promise<any> => {
  const response = await api.get(`/service/indigency-certificate?application_status=${status}&q=${search}`)
  return response.data?.data
}
