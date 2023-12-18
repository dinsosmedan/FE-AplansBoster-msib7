import {
  getBankListFn,
  getPublicEventTuitionFn,
  getStudyProgramsFn,
  getUniversitiesFn,
  showAssistanceCheckFn,
  storePublicEventDtksFn
} from '@/api/public.api'
import { toast } from '@/components/ui/use-toast'
import { type IErrorResponse } from '@/lib/types/user.type'
import { type AxiosError } from 'axios'
import { useMutation, useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'

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
export const usePublicEventDTKS = () => {
  const navigate = useNavigate()

  return useMutation(storePublicEventDtksFn, {
    onSuccess: async () => {
      toast({
        title: 'Pengajuan DTKS Berhasil didaftarkan',
        description: 'Anda telah berhasil melakukan Pengajuan DTKS.'
      })
      navigate('/')
    },
    onError: (error: AxiosError) => {
      const errorResponse = error.response?.data as IErrorResponse

      if (errorResponse !== undefined) {
        toast({
          variant: 'destructive',
          title: errorResponse.message,
          description: 'Terjadi masalah dengan permintaan Anda.'
        })
      }
    }
  })
}
