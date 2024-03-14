import {
  type VulnerableGroupHandlingQuery,
  getVulnerableGroupHandlingFn,
  getUnregisterFn,
  type UnregisterQuery,
  getIndigencyCertificateFn,
  type IndigencyCertificateQuery,
  getPremiumAssistanceBenefitFn,
  type PremiumAssistanceBenefitQuery,
  storeVulnerableGroupHandlingFn,
  storeUnregisterFn,
  getFamilyHopeFn,
  type FamilyHopeQuery,
  getFamilyHopeByIdFn,
  showDetailUnregisterFn,
  updateVulnerableGroupHandlingFn,
  updateUnregisterFn,
  showDetailVulnerableGroupHandlingFn,
  showDetailIndigencyCertificateFn,
  deletePkrFn,
  deleteSktmFn,
  deleteUnregisterFn,
  getTuitionAssistanceFn,
  type TuitionAssistanceQuery,
  getTuitionAssistanceByIdFn,
  storeTuitionAssistanceFn,
  storeIndigencyCertificateFn,
  getCountIndigencyCertificateFn,
  getCountTuitionAssistanceFn,
  updateTuitionsAssistanceFn
} from '@/api/linjamsos.api'
import { toast } from '@/components/ui/use-toast'
import { type IErrorResponse } from '@/lib/types/user.type'
import { type AxiosError } from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getPremiumAssistanceBenefitByIdFn } from '../../api/linjamsos.api'
import { handleMessage } from '@/lib/services/handleMessage'
import { handleOnError } from '@/lib/utils'

// Penanganan Kelompok Rentan//
export const useVulnerableGroupHandlings = ({
  page,
  idKecamatan,
  idKelurahan,
  q,
  year
}: VulnerableGroupHandlingQuery) => {
  return useQuery(
    ['vulnerable', page, idKecamatan, idKelurahan, q, year],
    async () => await getVulnerableGroupHandlingFn({ page, idKecamatan, idKelurahan, q, year }),
    {
      keepPreviousData: true,
      staleTime: 10 * 60 * 1000
    }
  )
}

export const useCreateVulnerableGroupHandling = () => {
  const queryClient = useQueryClient()
  return useMutation(storeVulnerableGroupHandlingFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('vulnerable')
      toast({
        title: 'Proses Berhasil',
        description: 'Data Penanganan Kelompok Rentan (PKR) berhasil ditambahkan'
      })
    },
    onError: (error: AxiosError) => {
      const errorResponse = error.response?.data as IErrorResponse

      if (errorResponse !== undefined) {
        toast({
          variant: 'destructive',
          title: errorResponse.message ?? 'Gagal',
          description: 'Terjadi masalah dengan permintaan Anda.'
        })
      }
    }
  })
}

export const useGetDetailVulnerableGroupHandling = (id: string) => {
  return useQuery(['vulnerable', id], async () => await showDetailVulnerableGroupHandlingFn(id), {
    enabled: !!id
  })
}

export const useUpdateVulnerableGroupHandling = () => {
  const queryClient = useQueryClient()
  return useMutation(updateVulnerableGroupHandlingFn, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('vulnerable')
      toast({
        title: 'Proses Berhasil',
        description: 'Data Penanganan Kelompok Rentan (PKR) berhasil diubah'
      })
    },
    onError: (error: AxiosError) => {
      const errorResponse = error.response?.data as IErrorResponse

      if (errorResponse !== undefined) {
        toast({
          variant: 'destructive',
          title: errorResponse.message ?? 'Gagal',
          description: 'Terjadi masalah dengan permintaan Anda.'
        })
      }
    }
  })
}
export const useDeletePkr = () => {
  const queryClient = useQueryClient()

  return useMutation(deletePkrFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('vulnerable')
      toast({
        variant: 'default',
        duration: 1500,
        title: 'Proses Berhasil',
        description: 'Data PKR Berhasil Dihapus'
      })
    }
  })
}
// Unregister //
export const useUnregisters = ({ page, letterNumber, q, month, year }: UnregisterQuery) => {
  return useQuery(
    ['unregisters', page, letterNumber, q, month, year],
    async () => await getUnregisterFn({ page, letterNumber, q, month, year }),
    {
      keepPreviousData: true,
      staleTime: 10 * 60 * 1000
    }
  )
}

export const useCreateUnregister = () => {
  const queryClient = useQueryClient()

  return useMutation(storeUnregisterFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('unregisters')
      toast({
        title: 'Proses Berhasil',
        description: 'Data Tidak terdaftar (Unregister) berhasil ditambahkan'
      })
    },
    onError: (error: AxiosError) => {
      const errorResponse = error.response?.data as IErrorResponse

      if (errorResponse !== undefined) {
        toast({
          variant: 'destructive',
          title: errorResponse.message ?? 'Gagal',
          description: 'Terjadi masalah dengan permintaan Anda.'
        })
      }
    }
  })
}

export const useGetDetailUnregister = (id: string) => {
  return useQuery(['unregisters', id], async () => await showDetailUnregisterFn(id), {
    enabled: !!id
  })
}

export const useUpdateUnregister = () => {
  const queryClient = useQueryClient()
  return useMutation(updateUnregisterFn, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('unregisters')
      toast({
        title: 'Proses Berhasil',
        description: 'Data Tidak terdaftar (Unregister) berhasil diubah'
      })
    },
    onError: (error: AxiosError) => {
      const errorResponse = error.response?.data as IErrorResponse

      if (errorResponse !== undefined) {
        toast({
          variant: 'destructive',
          title: errorResponse.message ?? 'Gagal',
          description: 'Terjadi masalah dengan permintaan Anda.'
        })
      }
    }
  })
}
export const useDeleteUnregister = () => {
  const queryClient = useQueryClient()

  return useMutation(deleteUnregisterFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('unregisters')
      toast({
        variant: 'default',
        duration: 1500,
        title: 'Proses Berhasil',
        description: 'Data Sktm Berhasil Dihapus'
      })
    }
  })
}
// SKTM //
export const useGetIndigencyCertificateFn = ({
  page,
  idKecamatan,
  idKelurahan,
  q,
  year,
  statusDtks
}: IndigencyCertificateQuery) => {
  return useQuery(
    ['indigency-certificates', page, idKecamatan, idKelurahan, q, year, statusDtks],
    async () =>
      await getIndigencyCertificateFn({
        page,
        idKecamatan,
        idKelurahan,
        q,
        year,
        statusDtks
      }),
    {
      keepPreviousData: true,
      staleTime: 10 * 60 * 1000
    }
  )
}
export const useGetIndigencyCertificateByID = (id?: string) => {
  return useQuery(['indigency-certificates', id], async () => await showDetailIndigencyCertificateFn(id as string), {
    enabled: !!id
  })
}
export const useDeleteSktm = () => {
  const queryClient = useQueryClient()

  return useMutation(deleteSktmFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('indigency-certificates')
      toast({
        variant: 'default',
        duration: 1500,
        title: 'Proses Berhasil',
        description: 'Data Sktm Berhasil Dihapus'
      })
    }
  })
}
// PBI //
export const useGetPremiumAssistanceBenefitFn = ({
  page,
  idKecamatan,
  idKelurahan,
  q,
  budget
}: PremiumAssistanceBenefitQuery) => {
  return useQuery(
    ['premium-assistances', page, idKecamatan, idKelurahan, q, budget],
    async () =>
      await getPremiumAssistanceBenefitFn({
        page,
        idKecamatan,
        idKelurahan,
        q,
        budget
      }),
    {
      keepPreviousData: true,
      staleTime: 10 * 60 * 1000
    }
  )
}
export const useGetPremiumAssistanceBenefitByID = (id?: string) => {
  return useQuery(['worship-place', id], async () => await getPremiumAssistanceBenefitByIdFn(id as string), {
    enabled: !!id
  })
}
// PKH //
export const useGetFamilyHopeFn = ({ page, member, idKecamatan, idKelurahan, q }: FamilyHopeQuery) => {
  return useQuery(
    ['family-hopes', page, idKecamatan, idKelurahan, q, member],
    async () =>
      await getFamilyHopeFn({
        page,
        idKecamatan,
        idKelurahan,
        q,
        member
      }),
    {
      keepPreviousData: true,
      staleTime: 10 * 60 * 1000
    }
  )
}
export const useGetFamilyHopeByID = (id?: string) => {
  return useQuery(['family-hopes', id], async () => await getFamilyHopeByIdFn(id as string), {
    enabled: !!id
  })
}
// PBB //
export const useGetTuitionAssistanceFn = ({
  page,
  q,
  event,
  idKecamatan,
  idKelurahan,
  year,
  status,
  university
}: TuitionAssistanceQuery) => {
  return useQuery(
    ['tuition-assistances', page, idKecamatan, idKelurahan, q, event, year, status, university],
    async () =>
      await getTuitionAssistanceFn({
        page,
        q,
        event,
        idKecamatan,
        idKelurahan,
        year,
        status,
        university
      }),
    {
      keepPreviousData: true,
      staleTime: 10 * 60 * 1000
    }
  )
}
export const useGetTuitionAssistanceID = (id?: string) => {
  return useQuery(['tuition-assistances', id], async () => await getTuitionAssistanceByIdFn(id as string), {
    enabled: !!id
  })
}

export const useCreateTuitionAssistance = () => {
  const queryClient = useQueryClient()

  return useMutation(storeTuitionAssistanceFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('tuition-assistances')
      handleMessage({ title: 'Data BBP', variant: 'create' })
    },
    onError: (error: AxiosError) => handleOnError(error)
  })
}

export const useCreateIndegencyCertificate = () => {
  const queryClient = useQueryClient()

  return useMutation(storeIndigencyCertificateFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('indigency-certificates')
      handleMessage({ title: 'Data SKTM', variant: 'create' })
    },
    onError: (error: AxiosError) => handleOnError(error)
  })
}

export const useCountIndigencyCertificate = () => {
  return useQuery(['count-indigency-fn'], async () => await getCountIndigencyCertificateFn(), { enabled: true })
}
export const useCountTuitionAssistance = () => {
  return useQuery(['tuition-assistance-fn'], async () => await getCountTuitionAssistanceFn(), { enabled: true })
}
export const useUpdateTuitionAssistance = () => {
  const queryClient = useQueryClient()

  return useMutation(updateTuitionsAssistanceFn, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('tuition-assistances')
      handleMessage({ title: 'Data BBP', variant: 'update' })
    },
    onError: (error: AxiosError) => handleOnError(error)
  })
}
