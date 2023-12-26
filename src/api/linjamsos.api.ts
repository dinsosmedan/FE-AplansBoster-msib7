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
  type ITuitionAssistance,
  type ITuitionAssistanceID,
  type IIndigencyCertificateDetail
} from '@/lib/types/linjamsos.type'
import api from './axiosInstance'
import {
  type indigencyCertificateFields,
  type tuitionAssistanceFields,
  type unregisterFields,
  type vulnerableGroupHandlingFields
} from '@/lib/validations/linjamsos.validation'

export interface VulnerableGroupHandlingQuery {
  page?: number
  idKecamatan?: string
  idKelurahan?: string
  q?: string
  year?: string
}
export interface UnregisterQuery {
  page?: number
  month?: string
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
  budget?: string
  idKecamatan?: string
  idKelurahan?: string
}
export interface FamilyHopeQuery {
  page?: number
  q?: string
  member?: string
  idKecamatan?: string
  idKelurahan?: string
}
export interface TuitionAssistanceQuery {
  page?: number
  q?: string
  event?: string
  status?: string
  year?: string
  idKecamatan?: string
  idKelurahan?: string
  university?: string
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
    `/vulnerable-group-handling?page=${page}&area_level_3=${idKecamatan}&area_level_4=${idKelurahan}&q=${q}&budget_year=${year}`
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

export const exportVulnerableGroupHandlingFn = async (
  type: 'xlsx' | 'csv',
  { page, idKecamatan, idKelurahan, q, year }: VulnerableGroupHandlingQuery
) => {
  const response = await api.get(
    `/vulnerable-group-handling/export/${type}?page=${page}&area_level_3=${idKecamatan}&area_level_4=${idKelurahan}&q=${q}&budget_year=${year}`
  )
  return response.data
}
// Unregister //
export const getUnregisterFn = async ({
  page,
  month,
  letterNumber,
  q,
  year
}: UnregisterQuery): Promise<IUnregister> => {
  const response = await api.get(
    `/unregister?page=${page}&month=${month}&dinsos_letter_number=${letterNumber}&q=${q}&year=${year}`
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
export const deleteUnregisterFn = async (id: string) => {
  await api.delete(`/unregister/${id}`)
}
interface IUnregisterUpdate {
  id: string
  fields: unregisterFields
}

export const updateUnregisterFn = async ({ id, fields }: IUnregisterUpdate) => {
  await api.put(`/unregister/${id}`, fields)
}
export const exportUnregisterFn = async (type: 'xlsx' | 'csv', { month, letterNumber, q, year }: UnregisterQuery) => {
  const response = await api.get(
    `/unregister/export/${type}?month=${month}&dinsos_letter_number=${letterNumber}&q=${q}&year=${year}`
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
  statusDtks
}: IndigencyCertificateQuery): Promise<IIndigencyCertificate> => {
  const response = await api.get(
    `/indigency-certificate?page=${page}&area_level_3=${idKecamatan}&area_level_4=${idKelurahan}&q=${q}&issue_year=${year}&status_dtks=${statusDtks}`
  )
  return response.data
}
export const showDetailIndigencyCertificateFn = async (id: string): Promise<IIndigencyCertificateDetail> => {
  const response = await api.get(`/indigency-certificate/${id}`)
  return response.data?.data
}
export const deleteSktmFn = async (id: string) => {
  await api.delete(`/indigency-certificate/${id}`)
}
export const exportIndigencyCertificateFn = async (
  type: 'xlsx' | 'csv',
  { idKecamatan, idKelurahan, q, year, statusDtks }: IndigencyCertificateQuery
) => {
  const response = await api.get(
    `/indigency-certificate/export/${type}?area_level_3=${idKecamatan}&area_level_4=${idKelurahan}&q=${q}&issue_year=${year}&status_dtks=${statusDtks}`
  )
  return response.data
}

// PBI //
export const getPremiumAssistanceBenefitFn = async ({
  page,
  budget,
  idKecamatan,
  idKelurahan,
  q
}: PremiumAssistanceBenefitQuery): Promise<IPremiumAssistanceBenefit> => {
  const response = await api.get(
    `/premium-assistance-beneficiary?page=${page}&type=${budget}&area_level_3=${idKecamatan}&area_level_4=${idKelurahan}&q=${q}`
  )
  return response.data
}
export const getPremiumAssistanceBenefitByIdFn = async (id: string): Promise<IPremiumAssistanceBenefitById> => {
  const response = await api.get(`/premium-assistance-beneficiary/${id}`)
  return response.data?.data
}
export const exportPremiumAssistanceBenefitFn = async (
  type: 'xlsx' | 'csv',
  { budget, idKecamatan, idKelurahan, q }: PremiumAssistanceBenefitQuery
) => {
  const response = await api.get(
    `/premium-assistance-beneficiary/export/${type}?&type=${budget}&area_level_3=${idKecamatan}&area_level_4=${idKelurahan}&q=${q}`
  )
  return response.data
}
// PKH //
export const getFamilyHopeFn = async ({
  page,
  q,
  idKecamatan,
  idKelurahan,
  member
}: FamilyHopeQuery): Promise<IFamilyHope> => {
  const response = await api.get(
    `/family-hope-program?page=${page}&q=${q}&area_level_3=${idKecamatan}&area_level_4=${idKelurahan}&type=${member}`
  )
  return response.data
}
export const getFamilyHopeByIdFn = async (id: string): Promise<IFamilyHopeId> => {
  const response = await api.get(`/family-hope-program/${id}`)
  return response.data?.data
}
export const exportFamilyHopeFn = async (
  type: 'xlsx' | 'csv',
  { page, q, idKecamatan, idKelurahan, member }: FamilyHopeQuery
) => {
  const response = await api.get(
    `/family-hope-program/export/${type}?page=${page}&q=${q}&area_level_3=${idKecamatan}&area_level_4=${idKelurahan}&type=${member}`
  )
  return response.data
}
// BBP //
export const getTuitionAssistanceFn = async ({
  page,
  q,
  event,
  idKecamatan,
  idKelurahan,
  year,
  status,
  university
}: TuitionAssistanceQuery): Promise<ITuitionAssistance> => {
  const response = await api.get(
    `/tuition-assistance?q=${q}&page=${page}&event=${event}&area_level_4=${idKelurahan}&area_level_3=${idKecamatan}&budget_year=${year}&disbursement_status=${status}${
      university ? `&university=${university}` : ''
    }`
  )
  return response.data
}
export const getTuitionAssistanceByIdFn = async (id: string): Promise<ITuitionAssistanceID> => {
  const response = await api.get(`/tuition-assistance/${id}`)
  return response.data?.data
}

export const storeTuitionAssistanceFn = async (fields: tuitionAssistanceFields) => {
  await api.post('/service/tuition-assistance-application', fields)
}

export const exportTuitionAssistanceFn = async (
  type: 'xlsx' | 'csv',
  { q, event, idKecamatan, idKelurahan, year, status }: TuitionAssistanceQuery
) => {
  const response = await api.get(
    `/tuition-assistance/export/${type}?q=${q}&event=${event}&area_level_4=${idKelurahan}&area_level_3=${idKecamatan}&budget_year=${year}&disbursement_status=${status}`
  )
  return response.data
}

export const storeIndigencyCertificateFn = async (fields: indigencyCertificateFields) => {
  await api.post('/service/indigency-certificate', fields)
}

export const getCountIndigencyCertificateFn = async () => {
  const response = await api.get('/dashboard/linjamsos/chart/indigency-certificates')
  return response.data?.data
}
export const getCountTuitionAssistanceFn = async () => {
  const response = await api.get('/dashboard/linjamsos/chart/tuition-assistance')
  return response.data?.data
}
interface updateTuitionsAssistanceParams {
  id: string
  fields: tuitionAssistanceFields
}

export const updateTuitionsAssistanceFn = async ({ id, fields }: updateTuitionsAssistanceParams) => {
  await api.put(`/service/tuition-assistance-application/${id}`, fields)
}
