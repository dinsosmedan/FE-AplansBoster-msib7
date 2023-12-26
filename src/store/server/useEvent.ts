import {
  deleteEventFn,
  getEventFn,
  getEventTuitionAssistanceFn,
  getEventTypeFn,
  showEventFn,
  storeEventFn,
  updateEventFn
} from '@/api/event.api'
import { handleMessage } from '@/lib/services/handleMessage'
import { handleOnError } from '@/lib/utils'
import { type AxiosError } from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'

export const useGetEvent = (status?: string, year?: string, page?: string) => {
  return useQuery(['events', status, year, page], async () => await getEventFn(status, year, page))
}

export const useGetEventType = () => {
  return useQuery('eventTypes', getEventTypeFn)
}

export const useCreateEvent = () => {
  const queryClient = useQueryClient()

  return useMutation(storeEventFn, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('events')
      await queryClient.invalidateQueries('eventTuitionAssistance')
      handleMessage({ title: 'Data Event', variant: 'create' })
    },
    onError: (error: AxiosError) => handleOnError(error)
  })
}

export const useDeleteEvent = () => {
  const queryClient = useQueryClient()

  return useMutation(deleteEventFn, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('events')
      handleMessage({ title: 'Data Event', variant: 'delete' })
    },
    onError: (error: AxiosError) => handleOnError(error)
  })
}

export const useGetEventById = (id: string) => {
  return useQuery(['event', id], async () => await showEventFn(id), {
    enabled: !!id
  })
}

export const useGetEventTuitionAssistance = (year: string, status: string) => {
  return useQuery(['eventTuitionAssistance', year, status], async () => await getEventTuitionAssistanceFn(year, status))
}

export const useUpdateEvent = () => {
  const queryClient = useQueryClient()

  return useMutation(updateEventFn, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('events')
      handleMessage({ title: 'Data Event', variant: 'update' })
    },
    onError: (error: AxiosError) => handleOnError(error)
  })
}
