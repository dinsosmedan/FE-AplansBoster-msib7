import { showBeneficaryByNIKFn } from '@/api/beneficary.api'
import { useQuery } from 'react-query'

export const useGetBeneficaryByNIK = (nik: string, enabled: boolean) => {
  return useQuery(['beneficary', nik], async () => await showBeneficaryByNIKFn(nik), {
    enabled
  })
}
