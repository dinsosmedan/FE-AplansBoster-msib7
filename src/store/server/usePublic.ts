import {
  getBankListFn,
  getPublicEventTuitionFn,
  getStudyProgramsFn,
  getUniversitiesFn,
  showAssistanceCheckFn,
  storePublicEventTuitionFn
} from '@/api/public.api'
import { handleMessage } from '@/lib/services/handleMessage'
import { handleOnError } from '@/lib/utils'
import { type AxiosError } from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'

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

export const useGetPublicEventTuition = () => {
  return useQuery('public-event-tuition', async () => await getPublicEventTuitionFn())
}

export const useCreatePublicEventTuition = () => {
  const queryClient = useQueryClient()

  return useMutation(storePublicEventTuitionFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('public-event-tuition')
      handleMessage({ title: 'Pengajuan BBP', variant: 'create' })
    },
    onError: (error: AxiosError) => {
      handleOnError(error)
    }
  })
}
