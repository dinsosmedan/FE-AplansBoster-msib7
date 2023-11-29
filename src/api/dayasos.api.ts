import { type veteranFields, type worshipPlaceFields } from '@/lib/validations/dayasos.validation'
import api from './axiosInstance'
import { type IOrganizationGrantAssistance, type IServiceFunds, type IWorshipPlace } from '@/lib/types/dayasos.type'

export const storeWorshipPlaceFn = async (fields: worshipPlaceFields) => {
  await api.post('/worship-place', fields)
}

export interface WorshipPlaceQuery {
  page?: number
  idKecamatan?: string
  idKelurahan?: string
  name?: string
}

export interface OrganizationGrantAssistanceQuery {
  page?: number
  budgetYear?: string
  name?: string
}

export const getWorshipPlacesFn = async ({
  page,
  idKecamatan,
  idKelurahan,
  name
}: WorshipPlaceQuery): Promise<IWorshipPlace[]> => {
  const response = await api.get(
    `/worship-place?page=${page}&area_level_3=${idKecamatan}&area_level_4=${idKelurahan}&q=${name}`
  )
  return response.data?.data
}

export const storeVeteranFn = async (fields: veteranFields) => {
  await api.post('veteran', fields)
}

export const getServiceFunds = async ({
  page,
  idKecamatan,
  idKelurahan,
  name
}: WorshipPlaceQuery): Promise<IServiceFunds> => {
  const response = await api.get(
    `/service-fund/?page=${page}&area_level_3=${idKecamatan}&area_level_4=${idKelurahan}&q=${name}`
  )
  return response.data
}

export const getOrganizationGrantAssistance = async ({
  page,
  name,
  budgetYear
}: OrganizationGrantAssistanceQuery): Promise<IOrganizationGrantAssistance> => {
  const response = await api.get(
    `/organization-grant-assistance/?page=${page}&q=${name}&budget_year=${budgetYear}`
  )
  return response.data
}
