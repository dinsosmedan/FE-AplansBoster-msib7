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
