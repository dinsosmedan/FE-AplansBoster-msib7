import {
  showAssistanceHistoryFn,
  type BeneficiaryQuery,
  getBeneficiaryFn,
  showBeneficaryByNIKFn,
  showIdentityCheckFn,
  showDTKS,
  showBeneficaryByIdFn,
  storeDataMaster
} from '@/api/beneficary.api'
import { toast } from '@/components/ui/use-toast'
import { type DtksParams } from '@/lib/types/beneficary.type'
import { type IErrorResponse } from '@/lib/types/user.type'
import { type AxiosError } from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'

export const useGetBeneficaryByNIK = (nik: string, enabled: boolean) => {
  return useQuery(['beneficary', nik], async () => await showBeneficaryByNIKFn(nik), {
    enabled,
    onError: (error: AxiosError) => {
      const errorResponse = error.response?.data as IErrorResponse
      if (errorResponse !== undefined) {
        toast({
          variant: 'destructive',
          title: 'NIK tidak ditemukan',
          description: 'Terjadi masalah dengan permintaan Anda.'
        })
      }
    }
  })
}
export const useGetBeneficaryById = (id?: string) => {
  return useQuery(['beneficary', id], async () => await showBeneficaryByIdFn(id as string))
}

export const useGetBeneficiary = ({ page, q, idKecamatan, idKelurahan, isDtks }: BeneficiaryQuery) => {
  return useQuery(
    ['beneficiary', page, q, idKecamatan, idKelurahan, isDtks],
    async () =>
      await getBeneficiaryFn({
        page,
        q,
        idKecamatan,
        idKelurahan,
        isDtks
      }),
    {
      keepPreviousData: true,
      staleTime: 10 * 60 * 1000
    }
  )
}

export const useGetAssistanceHistory = (nik: string, enabled: boolean) => {
  return useQuery(['assistance-history', nik], async () => await showAssistanceHistoryFn(nik), {
    enabled
  })
}

export const useGetIdentityCheck = (nik: string, enabled: boolean) => {
  return useQuery(['identity-check', nik], async () => await showIdentityCheckFn(nik), {
    enabled
  })
}

export const useGetDTKS = ({ kecamatan, kelurahan, nama, nik, kk, bpnt, blt, pbi, pkh, page }: DtksParams) => {
  return useQuery(
    ['dtks', kecamatan, kelurahan, nama, nik, kk, bpnt, blt, pbi, pkh, page],
    async () => await showDTKS({ kecamatan, kelurahan, nama, nik, kk, bpnt, blt, pbi, pkh, page }),
    {
      keepPreviousData: true,
      staleTime: 10 * 60 * 1000
    }
  )
}

export const useCreateBeneficary = () => {
  const queryClient = useQueryClient()

  return useMutation(storeDataMaster, {
    onSuccess: () => {
      void queryClient.invalidateQueries('veterans')
      toast({
        title: 'Proses Berhasil',
        description: 'Data Master yang baru berhasil ditambahkan'
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
