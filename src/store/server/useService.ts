import {
  getIndigencyCertificateFn,
  getTuitionAssistanceByEventId,
  showTuitionAssistanceEventFn,
  type getTuitionAssistanceParams,
  updateTuitionAssistanceEventFn,
  updateTuitionAssistanceEventStatusFn,
  updateIndigencyCertificateStatusFn,
  updateApplicationStatusFn,
  getFetchRiwayatSktmFn,
  updateIndigencyStatusFn,
  showIndigencyCertificateApplicationFn,
  getDTKSApplicationFn,
  updateIndigencyCertificateApplicationFn,
  showDTKSApplicationFn,
  updateDTKSApplicationFn
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
  return useQuery(
    ['indigency-centificate-2', status, search, page],
    async () => await getIndigencyCertificateFn(status, search, page),
    {
      enabled: true
    }
  )
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
      handleMessage({ title: 'Data Status DTKS Pada SKTM', variant: 'update' })
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
      void queryClient.invalidateQueries('tuition-assistance')
      handleMessage({ title: 'Data BBP Pengajuan', variant: 'update' })
    },
    onError: (error: AxiosError) => {
      handleOnError(error)
    }
  })
}
export const useFetchRiwayatSktm = (filter: any) => {
  return useQuery(['fetch-riwayat-sktm'], async () => await getFetchRiwayatSktmFn(filter), { enabled: true })
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

export const useGetDTKSApplication = (page: number, status: boolean, search: string) => {
  return useQuery(
    ['dtks-application', page, status, search],
    async () => await getDTKSApplicationFn(page, status, search)
  )
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

export const useGetDTKSApplicationById = (id: string) => {
  return useQuery(['dtks-application', id], async () => await showDTKSApplicationFn(id), { enabled: !!id })
}

export const useUpdateDTKSApplication = () => {
  const queryClient = useQueryClient()

  return useMutation(updateDTKSApplicationFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('dtks-application')
      handleMessage({ title: 'Data DTKS Application', variant: 'update' })
    },
    onError: (error: AxiosError) => {
      handleOnError(error)
    }
  })
}
