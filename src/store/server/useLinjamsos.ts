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
  deletePkrFn,
  deleteSktmFn,
  deleteUnregisterFn
} from '@/api/linjamsos.api'
import { toast } from '@/components/ui/use-toast'
import { type IErrorResponse } from '@/lib/types/user.type'
import { type AxiosError } from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getPremiumAssistanceBenefitByIdFn } from '../../api/linjamsos.api'

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
      staleTime: 5000
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

// Unregister //
export const useUnregisters = ({ page, date, letterNumber, q, year }: UnregisterQuery) => {
  return useQuery(
    ['unregisters', page, date, letterNumber, q, year],
    async () => await getUnregisterFn({ page, date, letterNumber, q, year }),
    {
      keepPreviousData: true,
      staleTime: 5000
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
  return useQuery(['unregister', id], async () => await showDetailUnregisterFn(id), {
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

export const useDeleteSktm = () => {
  const queryClient = useQueryClient()

  return useMutation(deleteSktmFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('sktm')
      toast({
        variant: 'default',
        duration: 1500,
        title: 'Proses Berhasil',
        description: 'Data Sktm Berhasil Dihapus'
      })
    }
  })
}
export const useDeleteUnregister = () => {
  const queryClient = useQueryClient()

  return useMutation(deleteUnregisterFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('sktm')
      toast({
        variant: 'default',
        duration: 1500,
        title: 'Proses Berhasil',
        description: 'Data Sktm Berhasil Dihapus'
      })
    }
  })
}
export const useDeletePkr = () => {
  const queryClient = useQueryClient()

  return useMutation(deletePkrFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('pkr')
      toast({
        variant: 'default',
        duration: 1500,
        title: 'Proses Berhasil',
        description: 'Data PKR Berhasil Dihapus'
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
  status
}: IndigencyCertificateQuery) => {
  return useQuery(
    ['indigency-certificates', page, idKecamatan, idKelurahan, q, year, status],
    async () =>
      await getIndigencyCertificateFn({
        page,
        idKecamatan,
        idKelurahan,
        q,
        year,
        status
      }),
    {
      keepPreviousData: true,
      staleTime: 5000
    }
  )
}

// PBI //
export const useGetPremiumAssistanceBenefitFn = ({
  page,
  idKecamatan,
  idKelurahan,
  q,
  type
}: PremiumAssistanceBenefitQuery) => {
  return useQuery(
    ['premium-assistances', page, idKecamatan, idKelurahan, q, type],
    async () =>
      await getPremiumAssistanceBenefitFn({
        page,
        idKecamatan,
        idKelurahan,
        q,
        type
      }),
    {
      keepPreviousData: true,
      staleTime: 5000
    }
  )
}
export const useGetPremiumAssistanceBenefitByID = (id?: string) => {
  return useQuery(['worship-place', id], async () => await getPremiumAssistanceBenefitByIdFn(id as string), {
    enabled: !!id
  })
}
// PKH //
export const useGetFamilyHopeFn = ({ page, type, idKecamatan, idKelurahan, q }: FamilyHopeQuery) => {
  return useQuery(
    ['family-hopes', page, idKecamatan, idKelurahan, q, type],
    async () =>
      await getFamilyHopeFn({
        page,
        idKecamatan,
        idKelurahan,
        q,
        type
      }),
    {
      keepPreviousData: true,
      staleTime: 5000
    }
  )
}
export const useGetFamilyHopeByID = (id?: string) => {
  return useQuery(['family-hopes', id], async () => await getFamilyHopeByIdFn(id as string), {
    enabled: !!id
  })
}
