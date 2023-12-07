import {
  type IPremiumAssistanceBenefit,
  type IIndigencyCertificate,
  type IUnregister,
  type IVulnerableGroupHandling,
  type IFamilyHope,
  type IPremiumAssistanceBenefitById,
  type IFamilyHopeId,
  type IVulnerableGroupHandlingDetail,
  type IUnregisterDetail,
  type IIndigencyCertificateByID
} from '@/lib/types/linjamsos.type'
import api from './axiosInstance'
import { type unregisterFields, type vulnerableGroupHandlingFields } from '@/lib/validations/linjamsos.validation'

export interface VulnerableGroupHandlingQuery {
  page?: number
  idKecamatan?: string
  idKelurahan?: string
  q?: string
  year?: string
}
export interface UnregisterQuery {
  page?: number
  date?: string
  letterNumber?: string
  q?: string
  year?: string
}
export interface IndigencyCertificateQuery {
  page?: number
  idKecamatan?: string
  idKelurahan?: string
  q?: string
  year?: string
  statusDtks: string
}
export interface PremiumAssistanceBenefitQuery {
  page?: number
  q?: string
  type?: string
  idKecamatan?: string
  idKelurahan?: string
}
export interface FamilyHopeQuery {
  page?: number
  q?: string
  type?: string
  idKecamatan?: string
  idKelurahan?: string
}
// Penanganan Kelompok Renta //
export const getVulnerableGroupHandlingFn = async ({
  page,
  idKecamatan,
  idKelurahan,
  q,
  year
}: VulnerableGroupHandlingQuery): Promise<IVulnerableGroupHandling> => {
  const response = await api.get(
    `/vulnerable-group-handling?page=${page}&area_level_3=${idKecamatan}&area_level_4=${idKelurahan}&q=${q}&budget_year=${year}&limit=10`
  )
  return response.data
}

export const storeVulnerableGroupHandlingFn = async (data: vulnerableGroupHandlingFields) => {
  await api.post('/vulnarable-group-handling', data)
}

export const showDetailVulnerableGroupHandlingFn = async (id: string): Promise<IVulnerableGroupHandlingDetail> => {
  const response = await api.get(`/vulnerable-group-handling/${id}`)
  return response.data?.data
}

export const deleteSktmFn = async (id: string) => {
  await api.delete(`/indigency-certificate/${id}`)
}
export const deleteUnregisterFn = async (id: string) => {
  await api.delete(`/unregister/${id}`)
}
export const deletePkrFn = async (id: string) => {
  await api.delete(`/vulnerable-group-handling/${id}`)
}
interface IVulnerableGroupHandlingUpdate {
  id: string
  fields: vulnerableGroupHandlingFields
}

export const updateVulnerableGroupHandlingFn = async ({ id, fields }: IVulnerableGroupHandlingUpdate) => {
  await api.put(`/vulnerable-group-handling/${id}`, fields)
}

// Unregister //
export const getUnregisterFn = async ({ page, date, letterNumber, q, year }: UnregisterQuery): Promise<IUnregister> => {
  const response = await api.get(
    `/unregister?page=${page}&hospital_entry_date=${date}&dinsos_letter_number=${letterNumber}&q=${q}&year=${year}&limit=10`
  )
  return response.data
}

export const storeUnregisterFn = async (data: unregisterFields) => {
  await api.post('/unregister', data)
}

export const showDetailUnregisterFn = async (id: string): Promise<IUnregisterDetail> => {
  const response = await api.get(`/unregister/${id}`)
  return response.data?.data
}

interface IUnregisterUpdate {
  id: string
  fields: unregisterFields
}

export const updateUnregisterFn = async ({ id, fields }: IUnregisterUpdate) => {
  await api.put(`/unregister/${id}`, fields)
}

// SKTM //
export const getIndigencyCertificateFn = async ({
  page,
  idKecamatan,
  idKelurahan,
  q,
  year,
  statusDtks
}: IndigencyCertificateQuery): Promise<IIndigencyCertificate> => {
  const response = await api.get(
    `/indigency-certificate?page=${page}&area_level_3=${idKecamatan}&area_level_4=${idKelurahan}&q=${q}&issue_year=${year}&status_dtks=${statusDtks}&limit=10`
  )
  return response.data
}
export const showDetailIndigencyCertificateFn = async (id: string): Promise<IIndigencyCertificateByID> => {
  const response = await api.get(`/indigency-certificate/${id}`)
  return response.data?.data
}
// PBI //
export const getPremiumAssistanceBenefitFn = async ({
  page,
  type,
  idKecamatan,
  idKelurahan,
  q
}: PremiumAssistanceBenefitQuery): Promise<IPremiumAssistanceBenefit> => {
  const response = await api.get(
    `/premium-assistance-beneficiary?page=${page}&type=${type}&area_level_3=${idKecamatan}&area_level_4=${idKelurahan}&q=${q}&limit=10`
  )
  return response.data
}
export const getPremiumAssistanceBenefitByIdFn = async (id: string): Promise<IPremiumAssistanceBenefitById> => {
  const response = await api.get(`/premium-assistance-beneficiary/${id}`)
  return response.data?.data
}
// PKH //
export const getFamilyHopeFn = async ({
  page,
  q,
  idKecamatan,
  idKelurahan,
  type
}: FamilyHopeQuery): Promise<IFamilyHope> => {
  const response = await api.get(
    `/family-hope-program?page=${page}&q=${q}&area_level_3=${idKecamatan}&area_level_4=${idKelurahan}&type=${type}&limit=10`
  )
  return response.data
}
export const getFamilyHopeByIdFn = async (id: string): Promise<IFamilyHopeId> => {
  const response = await api.get(`/family-hope-program/${id}`)
  return response.data?.data
}
