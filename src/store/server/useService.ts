import {
  getIndigencyCertificateFn,
  getTuitionAssistanceByEventId,
  showTuitionAssistanceEventFn,
  type getTuitionAssistanceParams,
  updateTuitionAssistanceEventFn,
  updateTuitionAssistanceEventStatusFn,
  updateIndigencyCertificateStatusFn,
  updateApplicationStatusFn,
  updateIndigencyStatusFn,
  showIndigencyCertificateApplicationFn,
  getDTKSApplicationFn,
  updateIndigencyCertificateApplicationFn
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

export const useGetIndigencyCertificate = (status: string, search: string, page: number) => {
  return useQuery(['indigency-centificate-2'], async () => await getIndigencyCertificateFn(status, search, page), {
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

export const useUpdateTuitionAssistanceEventStatus = () => {
  const queryClient = useQueryClient()

  return useMutation(updateTuitionAssistanceEventStatusFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('tuition-assistance')
      handleMessage({ title: 'Data BBP', variant: 'update' })
    },
    onError: (error: AxiosError) => {
      handleOnError(error)
    }
  })
}

export const useUpdateIndigencyCertificateStatus = () => {
  const queryClient = useQueryClient()

  return useMutation(updateIndigencyCertificateStatusFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('indigency-centificate-2')
      handleMessage({ title: 'Data BBP', variant: 'update' })
    },
    onError: (error: AxiosError) => {
      handleOnError(error)
    }
  })
}

export const useUpdateApplicationStatus = () => {
  const queryClient = useQueryClient()

  return useMutation(updateApplicationStatusFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('indigency-centificate-2')
      handleMessage({ title: 'Data BBP Pengajuan', variant: 'update' })
    },
    onError: (error: AxiosError) => {
      handleOnError(error)
    }
  })
}

export const useUpdateIndigencyStatus = () => {
  const queryClient = useQueryClient()

  return useMutation(updateIndigencyStatusFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('indigency-centificate-2')
      handleMessage({ title: 'Data SKTM Pengajuan', variant: 'update' })
    },
    onError: (error: AxiosError) => {
      handleOnError(error)
    }
  })
}

export const useGetIndigencyCertificateEventById = (id: string) => {
  return useQuery(['indigency-centificate-2', id], async () => await showIndigencyCertificateApplicationFn(id), {
    enabled: !!id
  })
}

export const useGetDTKSApplication = (page: number, status: boolean) => {
  return useQuery(['dtks-application', page, status], async () => await getDTKSApplicationFn(page, status))
}

export const useUpdateIndigencyApplication = () => {
  const queryClient = useQueryClient()

  return useMutation(updateIndigencyCertificateApplicationFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('indigency-centificate-2')
      handleMessage({ title: 'Data BBP Application', variant: 'update' })
    },
    onError: (error: AxiosError) => {
      handleOnError(error)
    }
  })
}
