import {
  getIndigencyCertificateFn,
  getTuitionAssistanceByEventId,
  showTuitionAssistanceEventFn,
  type getTuitionAssistanceParams
} from '@/api/service.api'
import { useQuery } from 'react-query'

export const useGetTuitionAssistanceByEventId = ({
  eventId,
  applicationStatus,
  search,
  page
}: getTuitionAssistanceParams) => {
  return useQuery(
    ['tuition-assistance', eventId, applicationStatus, search, page],
    async () => await getTuitionAssistanceByEventId({ eventId, applicationStatus, search, page }),
    {
      enabled: !(eventId === '')
    }
  )
}

export const useGetIndigencyCertificate = (status: any, search: any) => {
  return useQuery(['indigency-centificate-2'], async () => await getIndigencyCertificateFn(status, search), {
    enabled: true
  })
}
export const useGetTuitionAssistanceEventById = (id: string) => {
  return useQuery(['tuition-assistance', id], async () => await showTuitionAssistanceEventFn(id), { enabled: !!id })
}
