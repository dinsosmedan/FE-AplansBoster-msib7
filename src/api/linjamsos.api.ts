import {
  type IPremiumAssistanceBenefit,
  type IIndigencyCertificate,
  type IUnregister,
  type IVulnerableGroupHandling,
  type IFamilyHope
} from '@/lib/types/linjamsos.type'
import api from './axiosInstance'

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
  status?: string
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

// Unregister //
export const getUnregisterFn = async ({ page, date, letterNumber, q, year }: UnregisterQuery): Promise<IUnregister> => {
  const response = await api.get(
    `/unregister?page=${page}&hospital_entry_date=${date}&dinsos_letter_number=${letterNumber}&q=${q}&year=${year}&limit=10`
  )
  return response.data
}
// SKTM //
export const getIndigencyCertificateFn = async ({
  page,
  idKecamatan,
  idKelurahan,
  q,
  year,
  status
}: IndigencyCertificateQuery): Promise<IIndigencyCertificate> => {
  const response = await api.get(
    `/indigency-certificate?page=${page}&area_level_3=${idKecamatan}&area_level_4=${idKelurahan}&q=${q}&issue_year=${year}&is_dtks=${status}&limit=10`
  )
  return response.data
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

// PKH //
export const getFamilyHopeFn = async ({ page, q }: FamilyHopeQuery): Promise<IFamilyHope> => {
  const response = await api.get(`/family-hope-program?page=${page}&q=${q}&limit=10`)
  return response.data
}
