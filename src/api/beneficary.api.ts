import {
  type IAssistanceHistory,
  type IBeneficary,
  type IAllBeneficary,
  type DtksParams,
  type IAllDtks
} from '@/lib/types/beneficary.type'
import api from './axiosInstance'
import { type beneficaryFields } from '@/lib/validations/beneficary.validation'
import axios from 'axios'
import ENV from '@/lib/environment'

export interface BeneficiaryQuery {
  page?: number
  idKecamatan?: string
  idKelurahan?: string
  q?: string
  isDtks: string
}

const apiPublic = axios.create({
  baseURL: ENV.apiUrl,
  headers: { Accept: 'application/json' }
})

apiPublic.defaults.headers.post['Content-Type'] = 'application/json'

export const getBeneficiaryFn = async ({
  page,
  q,
  idKecamatan,
  idKelurahan,
  isDtks
}: BeneficiaryQuery): Promise<IAllBeneficary> => {
  const response = await api.get(
    `/beneficiary?q=&is_dtks=${isDtks}&area_level_4=${idKelurahan}&area_level_3=${idKecamatan}&q=${q}&page=${page}&limit=30`
  )
  return response.data
}
export const showBeneficaryByNIKFn = async (nik: string): Promise<IBeneficary> => {
  const response = await api.get(`/beneficiary/identity-number/${nik}`)
  return response.data?.data
}
export const showBeneficaryByIdFn = async (id: string): Promise<IBeneficary> => {
  const response = await api.get(`/beneficiary/${id}`)
  return response.data?.data
}
export const showAssistanceHistoryFn = async (nik: string): Promise<IAssistanceHistory[]> => {
  const response = await api.get(`/beneficiary/identity-number/${nik}/assistance-histories`)
  return response.data?.data
}

export const showIdentityCheckFn = async (nik: string): Promise<IBeneficary> => {
  const response = await apiPublic.get(`/identity/check/nik/${nik}`)
  return response.data?.data
}

export const showDTKS = async ({
  kecamatan,
  kelurahan,
  nama,
  nik,
  kk,
  bpnt,
  blt,
  pbi,
  pkh,
  page
}: DtksParams): Promise<IAllDtks> => {
  const response = await api.get(
    `/dtks?area_level_3id=${kecamatan}&area_level_4=${kelurahan}&name=${nama}&identity_number=${nik}&family_card_number=${kk}&bpnt=${bpnt}&bltbbm=${blt}&pbi=${pbi}&pkh=${pkh}&page=${page}`
  )
  return response.data
}

export const storeDataMaster = async (fields: beneficaryFields) => {
  await api.post('/beneficiary', fields)
}
