import {
  getBankListFn,
  getPublicEventTuitionFn,
  getStudyProgramsFn,
  getTuitionApplicationPublicFn,
  getUniversitiesFn,
  showAssistanceCheckFn,
  storeDTKSSchoolFn,
  storeNonDtksCourtsFn,
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
      void queryClient.invalidateQueries('tuition-application-public')
      handleMessage({ title: 'Pengajuan BBP', variant: 'create' })
    },
    onError: (error: AxiosError) => {
      handleOnError(error)
    }
  })
}

export const useGetTuitionApplicationPublic = () => {
  return useQuery('tuition-application-public', async () => await getTuitionApplicationPublicFn())
}

export const useCreateDTKSSchool = () => {
  const queryClient = useQueryClient()

  return useMutation(storeDTKSSchoolFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('public-event-tuition')
      void queryClient.invalidateQueries('tuition-application-public')
      handleMessage({ title: 'Pengajuan SKTM Untuk Sekolah/Universitas (Terdaftar DTKS)', variant: 'create' })
    },
    onError: (error: AxiosError) => {
      handleOnError(error)
    }
  })
}

export const useCreateNonDTKSCourts = () => {
  const queryClient = useQueryClient()

  return useMutation(storeNonDtksCourtsFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('public-event-tuition')
      void queryClient.invalidateQueries('tuition-application-public')
      handleMessage({ title: 'Pengajuan  SKTM Untuk Pelayanan ke Pengadilan Agama / LBH (Tidak Terdaftar DTKS)', variant: 'create' })
    },
    onError: (error: AxiosError) => {
      handleOnError(error)
    }
  })
}
