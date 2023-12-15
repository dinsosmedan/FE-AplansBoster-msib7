import {
  getIndigencyCertificateFn,
  getTuitionAssistanceByEventId,
  showTuitionAssistanceEventFn,
  type getTuitionAssistanceParams,
  updateTuitionAssistanceEventFn
} from '@/api/service.api'
import { handleMessage } from '@/lib/services/handleMessage'
import { handleOnError } from '@/lib/utils'
import { type AxiosError } from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'

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

export const useUpateTuitionAssistanceEvent = () => {
  const queryClient = useQueryClient()

  return useMutation(updateTuitionAssistanceEventFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('tuition-assistance')
      handleMessage({ title: 'Data BBP', variant: 'update' })
    },
    onError: (error: AxiosError) => {
      handleOnError(error)
    }
  })
}
