import { getEventFn } from '@/api/event.api'
import { useQuery } from 'react-query'

export const useGetEvent = () => {
  return useQuery('events', getEventFn)
}
