import { showAssistanceCheck } from '@/api/public.api'
import { useQuery } from 'react-query'

export const useGetAssistanceCheck = (nik: string, enabled: boolean) => {
  return useQuery(['assistance-check', nik], async () => await showAssistanceCheck(nik), {
    enabled
  })
}
