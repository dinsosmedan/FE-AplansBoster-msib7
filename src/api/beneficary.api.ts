import { type IAssistanceHistory, type IBeneficary } from '@/lib/types/beneficary.type'
import api from './axiosInstance'

export const showBeneficaryByNIKFn = async (nik: string): Promise<IBeneficary> => {
  const response = await api.get(`/beneficiary/identity-number/${nik}`)
  return response.data?.data
}

export const showAssistanceHistoryFn = async (nik: string): Promise<IAssistanceHistory[]> => {
  const response = await api.get(`/beneficiary/identity-number/${nik}/assistance-histories`)
  return response.data?.data
}
