import {
  type hibahFields,
  type djpmFields,
  type veteranFields,
  type worshipPlaceFields,
  type kubeFields,
  type pokmasFields
} from '@/lib/validations/dayasos.validation'
import api from './axiosInstance'
import {
  type IOrganizationGrantAssistance,
  type IServiceType,
  type IServiceFunds,
  type IWorshipPlace,
  type IVeteran
} from '@/lib/types/dayasos.type'

export const storeWorshipPlaceFn = async (fields: worshipPlaceFields) => {
  const response = await api.post('/worship-place', fields)
  return response.data
}
export const storeDjpm = async (fields: any) => {
  await api.post('/service-fund', fields)
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

export interface VeteranQuery {
  page?: number
  q?: string
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

export const getServiceFundsFn = async ({
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

export const getServiceTypesFn = async (): Promise<IServiceType[]> => {
  const response = await api.get('/service-fund/types')
  return response.data?.data
}

export const storeServiceFundFn = async (fields: djpmFields) => {
  await api.post('/service-fund', fields)
}

export const storeOrganizationGrantAssistanceFn = async (fields: hibahFields) => {
  await api.post('/organization-grant-assistance', fields)
}

export const storeKubeFn = async (fields: kubeFields) => {
  await api.post('/joint-business-group', fields)
}

export const storePokmasFn = async (fields: pokmasFields) => {
  await api.post('community-group', fields)
}

export const getOrganizationGrantAssistance = async ({
  page,
  name,
  budgetYear
}: OrganizationGrantAssistanceQuery): Promise<IOrganizationGrantAssistance> => {
  const response = await api.get(`/organization-grant-assistance/?page=${page}&q=${name}&budget_year=${budgetYear}`)
  return response.data
}

export const getVeteranFn = async ({ page, q }: VeteranQuery): Promise<IVeteran> => {
  const response = await api.get(`/veteran/?page=${page}&q=${q}&limit=10`)
  return response.data
}
