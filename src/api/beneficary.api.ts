import { type IBeneficary } from '@/lib/types/beneficary.type'
import api from './axiosInstance'

export const showBeneficaryByNIKFn = async (nik: string): Promise<IBeneficary> => {
  const response = await api.get(`/beneficiary/identity-number/${nik}`)
  return response.data?.data
}
