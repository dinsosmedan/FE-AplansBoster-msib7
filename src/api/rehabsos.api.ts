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

import { type IElderlyCashSocialAssistance, type IElderlyCashSocialAssistanceDetail } from '@/lib/types/rehabsos.type'
import api from './axiosInstance'

import { type elderlyCashSocialAssistanceFields } from '@/lib/validations/rehabsos.validation'
export interface ElderlyCashSocialAssistanceQuery {
  page?: number
  kecamatan?: string
  kelurahan?: string
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
// BST Lansia //
export const getElderlyCashSocialAssistanceFn = async ({
  page,
  kecamatan,
  kelurahan,
  q,
  year
}: ElderlyCashSocialAssistanceQuery): Promise<IElderlyCashSocialAssistance> => {
  const response = await api.get(`/getElderly?page=${page}&kecamatan=${kecamatan}&kelurahan=${kelurahan}&nik=${q}tahun=${year}`)
  return response.data
}

export const storeElderlyCashSocialAssistanceFn = async (data: elderlyCashSocialAssistanceFields) => {
  await api.post('/lansia', data)
}

export const showDetailElderlyCashSocialAssistanceFn = async (
  id: string
): Promise<IElderlyCashSocialAssistanceDetail> => {
  const response = await api.get(`/lansia/${id}`)
  return response.data?.data
}

export const deleteBstLansiaFn = async (id: string) => {
  await api.delete(`/lansia/${id}`)
}
interface IElderlyCashSocialAssistanceUpdate {
  id: string
  fields: elderlyCashSocialAssistanceFields
}

export const updateElderlyCashSocialAssistanceFn = async ({ id, fields }: IElderlyCashSocialAssistanceUpdate) => {
  await api.put(`/lansia/${id}`, fields)
}

export const exportElderlyCashSocialAssistanceFn = async (
  type: 'xlsx' | 'csv',
  { page, kecamatan, kelurahan, q, year }: ElderlyCashSocialAssistanceQuery
) => {
  const response = await api.get(
    `/lansia/export/${type}?page=${page}&area_level_3=${kecamatan}&area_level_4=${kelurahan}&q=${q}&budget_year=${year}`
  )
  return response.data
}
export const getElderlyAssistanceByIdFn = async (id: string): Promise<IElderlyCashSocialAssistanceDetail> => {
  const response = await api.get(`/getElderlybyID/${id}`)
  return response.data?.data
}
