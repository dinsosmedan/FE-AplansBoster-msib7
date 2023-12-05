import {
  showAssistanceHistoryFn,
  type BeneficiaryQuery,
  getBeneficiaryFn,
  showBeneficaryByNIKFn,
  showIdentityCheckFn,
  showDTKS,
  showBeneficaryByIdFn
} from '@/api/beneficary.api'
import { type DtksParams } from '@/lib/types/beneficary.type'
import { useQuery } from 'react-query'

export const useGetBeneficaryByNIK = (nik: string, enabled: boolean) => {
  return useQuery(['beneficary', nik], async () => await showBeneficaryByNIKFn(nik), {
    enabled
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
      staleTime: 5000
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
      staleTime: 5000
    }
  )
}
