import { getBankListFn, getStudyProgramsFn, getUniversitiesFn, showAssistanceCheckFn } from '@/api/public.api'
import { useQuery } from 'react-query'

export const useGetAssistanceCheck = (nik: string, enabled: boolean) => {
  return useQuery(['assistance-check', nik], async () => await showAssistanceCheckFn(nik), {
    enabled
  })
}

export const useGetUniversities = () => {
  return useQuery('universities', async () => await getUniversitiesFn())
}

export const useGetStudyPrograms = (universityId: string) => {
  return useQuery(['study-programs', universityId], async () => await getStudyProgramsFn(universityId), {
    enabled: !!universityId
  })
}

export const useGetBank = () => {
  return useQuery('banks', async () => await getBankListFn())
}
