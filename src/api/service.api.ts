import api from './axiosInstance'
import { type ITuitionAssistanceEvents } from '@/lib/types/service.type'

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
