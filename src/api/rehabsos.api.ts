import {
  INeedForSocialWelfareServices,
  type IElderlyCashSocialAssistance,
  type IElderlyCashSocialAssistanceDetail,
  INeedForSocialWelfareServicesDetail,
  IDisabilitySocialAssistance,
  IDisabilitySocialAssistanceDetail,
  IFinancialAssistanceForNonOrpahanges,
  IFinancialAssistanceForNonOrpahangesDetail,
  IOperationLicenseOfSocialInstitution,
  IOperationLicenseOfSocialInstitutionDetail
} from '@/lib/types/rehabsos.type'
import api from './axiosInstance'

import { type elderlyCashSocialAssistanceFields } from '@/lib/validations/rehabsos.validation'
export interface ElderlyCashSocialAssistanceQuery {
  page?: number
  kecamatan?: string
  kelurahan?: string
  q?: string
  year?: string
}

export interface NeedForSocialWelfareServicesQuery {
  page?: number
  kecamatan?: string
  kelurahan?: string
  q?: string
  year?: string
}

export interface DisabilitySocialAssistanceQuery {
  page?: number
  kecamatan?: string
  kelurahan?: string
  q?: string
  year?: string
}

export interface FinancialAssistanceForNonOrpahangesQuery {
  page?: number
  kecamatan?: string
  kelurahan?: string
  q?: string
  year?: string
}

export interface OperationLicenseOfSocialInstitutionQuery {
  page?: number
  kecamatan?: string
  kelurahan?: string
  q?: string
  year?: string
}

// BST Lansia //
export const getElderlyCashSocialAssistanceFn = async ({
  page,
  kecamatan,
  kelurahan,
  q,
  year
}: ElderlyCashSocialAssistanceQuery): Promise<IElderlyCashSocialAssistance> => {
  const response = await api.get(
    `/getElderly?page=${page}&kecamatan=${kecamatan}&kelurahan=${kelurahan}&nik=${q}tahun=${year}`
  )
  return response.data
}

export const storeElderlyCashSocialAssistanceFn = async (data: elderlyCashSocialAssistanceFields) => {
  await api.post('/lansia', data)
}

export const getElderlyAssistanceByIdFn = async (id: string): Promise<IElderlyCashSocialAssistanceDetail> => {
  const response = await api.get(`/getElderlybyID/${id}`)
  return response.data?.data
}
export const getWelfaresByIdFn = async (id: string): Promise<INeedForSocialWelfareServicesDetail> => {
  const response = await api.get(`/getPPKSbyID/${id}`)
  return response.data?.data
}
export const deleteElderlyCashSocialAssistanceFn = async (id: string) => {
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

// BST Disabilitas //
export const getDisabilitySocialAssistanceFn = async ({
  page,
  kecamatan,
  kelurahan,
  year,
  q
}: DisabilitySocialAssistanceQuery): Promise<IDisabilitySocialAssistance> => {
  const response = await api.get(
    `getDisability/?page=${page}&kecamatan=${kecamatan}&kelurahan=${kelurahan}&tahun=${year}&nik=${q}`
  )
  return response.data
}

export const storeDisabilitySocialAssistanceFn = async (data: elderlyCashSocialAssistanceFields) => {
  await api.post('/lansia', data)
}

export const showDetailDisabilitySocialAssistanceFn = async (
  id: string
): Promise<IDisabilitySocialAssistanceDetail> => {
  const response = await api.get(`/lansia/${id}`)
  return response.data?.data
}

export const deleteDisabilitySocialAssistanceFn = async (id: string) => {
  await api.delete(`/lansia/${id}`)
}
interface IDisabilitySocialAssistanceUpdate {
  id: string
  fields: elderlyCashSocialAssistanceFields
}

export const updateDisabilitySocialAssistanceFn = async ({ id, fields }: IDisabilitySocialAssistanceUpdate) => {
  await api.put(`/lansia/${id}`, fields)
}

export const exportDisabilitySocialAssistanceFn = async (
  type: 'xlsx' | 'csv',
  { page, kecamatan, kelurahan, q, year }: DisabilitySocialAssistanceQuery
) => {
  const response = await api.get(
    `/lansia/export/${type}?page=${page}&area_level_3=${kecamatan}&area_level_4=${kelurahan}&q=${q}&budget_year=${year}`
  )
  return response.data
}

// BST Anak di Luar Panti //
export const getFinancialAssistanceForNonOrpahangesFn = async ({
  page,
  kecamatan,
  kelurahan,
  year,
  q
}: DisabilitySocialAssistanceQuery): Promise<IFinancialAssistanceForNonOrpahanges> => {
  const response = await api.get(
    `getElderly/?page=${page}&kecamatan=${kecamatan}&kelurahan=${kelurahan}&tahun=${year}&nik=${q}`
  )
  return response.data
}

export const storeFinancialAssistanceForNonOrpahangesFn = async (data: elderlyCashSocialAssistanceFields) => {
  await api.post('/lansia', data)
}

export const showDetailFinancialAssistanceForNonOrpahangesFn = async (
  id: string
): Promise<IFinancialAssistanceForNonOrpahangesDetail> => {
  const response = await api.get(`/lansia/${id}`)
  return response.data?.data
}

export const deleteFinancialAssistanceForNonOrpahangesFn = async (id: string) => {
  await api.delete(`/lansia/${id}`)
}
interface IFinancialAssistanceForNonOrpahangesUpdate {
  id: string
  fields: elderlyCashSocialAssistanceFields
}

export const updateFinancialAssistanceForNonOrpahangesFn = async ({
  id,
  fields
}: IFinancialAssistanceForNonOrpahangesUpdate) => {
  await api.put(`/lansia/${id}`, fields)
}

export const exportFinancialAssistanceForNonOrpahangesFn = async (
  type: 'xlsx' | 'csv',
  { page, kecamatan, kelurahan, q, year }: FinancialAssistanceForNonOrpahangesQuery
) => {
  const response = await api.get(
    `/lansia/export/${type}?page=${page}&area_level_3=${kecamatan}&area_level_4=${kelurahan}&q=${q}&budget_year=${year}`
  )
  return response.data
}

// LKS //
export const getOperationLicenseOfSocialInstitutionFn = async ({
  page,
  kecamatan,
  kelurahan,
  year,
  q
}: OperationLicenseOfSocialInstitutionQuery): Promise<IOperationLicenseOfSocialInstitution> => {
  const response = await api.get(
    `getElderly/?page=${page}&kecamatan=${kecamatan}&kelurahan=${kelurahan}&tahun=${year}&nik=${q}`
  )
  return response.data
}

export const storeOperationLicenseOfSocialInstitutionFn = async (data: elderlyCashSocialAssistanceFields) => {
  await api.post('/lansia', data)
}

export const showDetailOperationLicenseOfSocialInstitutionFn = async (
  id: string
): Promise<IOperationLicenseOfSocialInstitutionDetail> => {
  const response = await api.get(`/lansia/${id}`)
  return response.data?.data
}

export const deleteOperationLicenseOfSocialInstitutionFn = async (id: string) => {
  await api.delete(`/lansia/${id}`)
}
interface IOperationLicenseOfSocialInstitutionUpdate {
  id: string
  fields: elderlyCashSocialAssistanceFields
}

export const updateOperationLicenseOfSocialInstitutionFn = async ({
  id,
  fields
}: IOperationLicenseOfSocialInstitutionUpdate) => {
  await api.put(`/lansia/${id}`, fields)
}

export const exportOperationLicenseOfSocialInstitutionFn = async (
  type: 'xlsx' | 'csv',
  { page, kecamatan, kelurahan, q, year }: OperationLicenseOfSocialInstitutionQuery
) => {
  const response = await api.get(
    `/lansia/export/${type}?page=${page}&area_level_3=${kecamatan}&area_level_4=${kelurahan}&q=${q}&budget_year=${year}`
  )
  return response.data
}

// PPKS //

export const getNeedForSocialWelfareServicesFn = async ({
  page,
  kecamatan,
  kelurahan,
  year,
  q
}: NeedForSocialWelfareServicesQuery): Promise<INeedForSocialWelfareServices> => {
  const response = await api.get(
    `getPPKS/?page=${page}&kecamatan=${kecamatan}&tahun=${year}&nik=${q}`
  )
  return response.data
}

export const showDetailNeedForSocialWelfareServicesFn = async (
  id: string
): Promise<INeedForSocialWelfareServicesDetail> => {
  const response = await api.get(`/lansia/${id}`)
  return response.data?.data
}

export const deleteNeedForSocialWelfareServicesFn = async (id: string) => {
  await api.delete(`/lansia/${id}`)
}
interface INeedForSocialWelfareServicesUpdate {
  id: string
  fields: elderlyCashSocialAssistanceFields
} //need to change

export const updateNeedForSocialWelfareServicesFn = async ({ id, fields }: INeedForSocialWelfareServicesUpdate) => {
  await api.put(`/lansia/${id}`, fields)
}

export const exportNeedForSocialWelfareServicesFn = async (
  type: 'xlsx' | 'csv',
  { page, kecamatan, kelurahan, q, year }: NeedForSocialWelfareServicesQuery
) => {
  const response = await api.get(
    `/lansia/export/${type}?page=${page}&area_level_3=${kecamatan}&area_level_4=${kelurahan}&q=${q}&budget_year=${year}`
  )
  return response.data
}
