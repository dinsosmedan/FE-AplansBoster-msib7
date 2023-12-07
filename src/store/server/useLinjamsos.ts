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
  storeUnregisterFn
} from '@/api/linjamsos.api'
import { toast } from '@/components/ui/use-toast'
import { type IErrorResponse } from '@/lib/types/user.type'
import { type AxiosError } from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'

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
    ['indigency-certificates', page, idKecamatan, idKelurahan, q, type],
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
