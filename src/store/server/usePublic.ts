import {
  getBankListFn,
  getIndigencyCertificateApplicationPublicFn,
  getPublicEventTuitionFn,
  getStudyProgramsFn,
  getTuitionApplicationPublicFn,
  getUniversitiesFn,
  showAssistanceCheckFn,
  storePublicEventDtksFn,
  storeDTKSCourtPublicFn,
  storeDTKSSchoolFn,
  storeNonDtksCourtsFn,
  storePublicEventTuitionFn,
  storeIndigencyCertificateApplicationNoDTKS,
  getDTKSApplicationPublicFn,
  showTuitionApplicationPublicFn,
  updatePublicEventTuitionFn
} from '@/api/public.api'
import { toast } from '@/components/ui/use-toast'
import { type IErrorResponse } from '@/lib/types/user.type'
import { useNavigate } from 'react-router-dom'
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

export const useUpdatePublicEventTuition = () => {
  const queryClient = useQueryClient()

  return useMutation(updatePublicEventTuitionFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('public-event-tuition')
      void queryClient.invalidateQueries('tuition-application-public')
      handleMessage({ title: 'Pengajuan BBP', variant: 'update' })
    },
    onError: (error: AxiosError) => {
      handleOnError(error)
    }
  })
}

export const useGetTuitionApplicationPublic = () => {
  return useQuery('tuition-application-public', async () => await getTuitionApplicationPublicFn())
}

export const useCreateDTKSCourtPublic = () => {
  const queryClient = useQueryClient()

  return useMutation(storeDTKSCourtPublicFn, {
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
      handleMessage({
        title: 'Pengajuan  SKTM Untuk Pelayanan ke Pengadilan Agama / LBH (Tidak Terdaftar DTKS)',
        variant: 'create'
      })
    },
    onError: (error: AxiosError) => {
      handleOnError(error)
    }
  })
}

export const useGetIndigencyCertificateApplicationPublic = () => {
  return useQuery('indigency-centificate-2', async () => await getIndigencyCertificateApplicationPublicFn())
}

export const useCreateIndigencyCertificateApplicationNoDTKS = () => {
  const queryClient = useQueryClient()

  return useMutation(storeIndigencyCertificateApplicationNoDTKS, {
    onSuccess: () => {
      void queryClient.invalidateQueries('indigency-centificate-2')
      handleMessage({
        title: 'Pengajuan SKTM',
        variant: 'create'
      })
    },
    onError: (error: AxiosError) => {
      handleOnError(error)
    }
  })
}

export const useGetDTKSApplicationPublic = () => {
  return useQuery('dtks-application-public', async () => await getDTKSApplicationPublicFn())
}

export const useGetTuitionApplicationPublicDetail = (id?: string) => {
  return useQuery(
    ['tuition-application-public-detail', id],
    async () => await showTuitionApplicationPublicFn(id as string),
    {
      enabled: !!id
    }
  )
}
