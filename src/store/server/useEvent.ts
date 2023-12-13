import { deleteEventFn, getEventFn, getEventTypeFn, showEventFn, storeEventFn } from '@/api/event.api'
import { handleMessage } from '@/lib/services/handleMessage'
import { handleOnError } from '@/lib/utils'
import { type AxiosError } from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'

export const useGetEvent = () => {
  return useQuery('events', getEventFn)
}

export const useGetEventType = () => {
  return useQuery('eventTypes', getEventTypeFn)
}

export const useCreateEvent = () => {
  const queryClient = useQueryClient()

  return useMutation(storeEventFn, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('events')
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
