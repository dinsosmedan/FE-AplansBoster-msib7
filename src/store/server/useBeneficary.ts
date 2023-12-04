import {
  showAssistanceHistoryFn,
  type BeneficiaryQuery,
  getBeneficiaryFn,
  showBeneficaryByNIKFn,
  showIdentityCheckFn
} from '@/api/beneficary.api'
import { useQuery } from 'react-query'

export const useGetBeneficaryByNIK = (nik: string, enabled: boolean) => {
  return useQuery(['beneficary', nik], async () => await showBeneficaryByNIKFn(nik), {
    enabled
  })
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
