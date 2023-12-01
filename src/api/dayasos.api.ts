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
  type IVeteran,
  type IFuelCashAssistance,
  type ICommunityGroups,
  type IBusinessGroup,
  type INonCashFoodAssistanceBeneficiary,
  type IServiceFund,
  type ICommunityGroup,
  type IOrganizationGrantAssistances,
  type IVeteranDetail,
  type IWorshipPlaceDetail,
  type IBusinessGroupDetail
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
  type?: string
  q?: string
}
export interface ServiceFundQuery {
  page?: number
  idKecamatan?: string
  idKelurahan?: string
  name?: string
  type: string
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
export interface CommunityGroupQuery {
  page?: number
  q?: string
  idKecamatan?: string
  idKelurahan?: string
  status?: string
  communityActivityCode?: string
  applicationYear?: string
}
export interface BusinessGroupQuery {
  page?: number
  q?: string
  idKecamatan?: string
  idKelurahan?: string
  year?: string
}
export interface FuelCashQuery {
  page?: number
  q?: string
}

export const getWorshipPlacesFn = async ({
  page,
  idKecamatan,
  idKelurahan,
  q,
  type
}: WorshipPlaceQuery): Promise<IWorshipPlace> => {
  const response = await api.get(
    `/worship-place?page=${page}&area_level_3=${idKecamatan}&area_level_4=${idKelurahan}&q=${q}&type=${type}&limit=10`
  )
  return response.data
}

export interface NonCashFoodAssistanceBeneficiaryQuery {
  page?: number
}

export const storeVeteranFn = async (fields: veteranFields) => {
  await api.post('veteran', fields)
}

export const getServiceFundsFn = async ({
  page,
  idKecamatan,
  idKelurahan,
  name,
  type
}: ServiceFundQuery): Promise<IServiceFunds> => {
  const response = await api.get(
    `/service-fund?page=${page}&area_level_3=${idKecamatan}&area_level_4=${idKelurahan}&q=${name}&type=${type}&limit=10`
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
export const getCommunityGroupsFn = async ({
  page,
  q,
  idKecamatan,
  idKelurahan,
  communityActivityCode,
  status,
  applicationYear
}: CommunityGroupQuery): Promise<ICommunityGroups> => {
  const response = await api.get(
    `/community-group/?q=${q}&area_level_3=${idKecamatan}&area_level_4=${idKelurahan}&application_year=${applicationYear}&status=${status}&community_activity_code=${communityActivityCode}&page=${page}&limit=10`
  )
  return response.data
}

export const getBusinessGroupFn = async ({
  page,
  q,
  idKecamatan,
  idKelurahan,
  year
}: BusinessGroupQuery): Promise<IBusinessGroup> => {
  const response = await api.get(
    `/joint-business-group/?q=${q}&area_level_3=${idKecamatan}&area_level_4=${idKelurahan}&budget_year=${year}&page=${page}&limit=10`
  )
  return response.data
}
export const getFuelCashAssistanceFn = async ({ page, q }: FuelCashQuery): Promise<IFuelCashAssistance> => {
  const response = await api.get(`/fuel-cash-assistance?q=${q}&page=${page}&limit=30`)
  return response.data
}

export const getNonCashFoodAssistanceBeneficiary = async ({
  page
}: NonCashFoodAssistanceBeneficiaryQuery): Promise<INonCashFoodAssistanceBeneficiary> => {
  const response = await api.get(`/non-cash-food-assistance?page=${page}&limit=30`)
  return response.data
}

export const showServiceFundFn = async (id: string): Promise<IServiceFund> => {
  const response = await api.get(`/service-fund/${id}`)
  return response.data?.data
}

interface UpdateServiceFundParams {
  id: string
  fields: djpmFields
}
interface UpdateKubeParams {
  id: string
  fields: kubeFields
}

export const updateKubeFn = async ({ id, fields }: UpdateKubeParams) => {
  await api.put(`/joint-business-group/${id}`, fields)
}

export const updateServiceFundFn = async ({ id, fields }: UpdateServiceFundParams) => {
  await api.put(`/service-fund/${id}`, fields)
}
export const deleteServiceFundFn = async (id: string) => {
  await api.delete(`/service-fund/${id}`)
}
export const deleteOrganizationGrantAssistanceFn = async (id: string) => {
  await api.delete(`/organization-grant-assistance/${id}`)
}
export const deleteWorshipPlaceFn = async (id: string) => {
  await api.delete(`/worship-place/${id}`)
}
export const deleteBusinessGroupFn = async (id: string) => {
  await api.delete(`/joint-business-group/${id}`)
}
export const deleteCommunityGroupsFn = async (id: string) => {
  await api.delete(`/community-group/${id}`)
}
export const deleteVeteranFn = async (id: string) => {
  await api.delete(`/veteran/${id}`)
}
export const deleteFuelCashAssistanceFn = async (id: string) => {
  await api.delete(`/fuel-cash-assistance/${id}`)
}

interface UpdateFuelCashAssistanceParams {
  id: string
  fields: pokmasFields
}

export const updateCommunityGroupFn = async ({ id, fields }: UpdateFuelCashAssistanceParams) => {
  await api.put(`/community-group/${id}`, fields)
}

export const getCommunityGroupFn = async (id: string): Promise<ICommunityGroup> => {
  const response = await api.get(`/community-group/${id}`)
  return response.data?.data
}

interface UpdateOrganizationGrantAssistanceParams {
  id: string
  fields: hibahFields
}

export const updateOrganizationGrantAssistanceFn = async ({ id, fields }: UpdateOrganizationGrantAssistanceParams) => {
  await api.put(`/organization-grant-assistance/${id}`, fields)
}

export const getOrganizationGrantAssistanceFn = async (id: string): Promise<IOrganizationGrantAssistances> => {
  const response = await api.get(`/organization-grant-assistance/${id}`)
  return response.data?.data
}

interface UpdateWorshipPlaceParams {
  id: string
  fields: worshipPlaceFields
}

export const updateWorshipPlaceFn = async ({ id, fields }: UpdateWorshipPlaceParams) => {
  await api.put(`/worship-place/${id}`, fields)
}

export const getWorshipPlaceFn = async (id: string): Promise<IWorshipPlaceDetail> => {
  const response = await api.get(`/worship-place/${id}`)
  return response.data?.data
}

interface UpdateVeteranParams {
  id: string
  fields: veteranFields
}

export const updateVeteranFn = async ({ id, fields }: UpdateVeteranParams) => {
  await api.put(`/veteran/${id}`, fields)
}

export const getDetailVeteranFn = async (id: string): Promise<IVeteranDetail> => {
  const response = await api.get(`/veteran/${id}`)
  return response.data?.data
}

interface updateBusinessGroupParams {
  id: string
  fields: kubeFields
}

export const updateBusinessGroupFn = async ({ id, fields }: updateBusinessGroupParams) => {
  await api.put(`/joint-business-group/${id}`, fields)
}

export const getDetailBusinessGroupFn = async (id: string): Promise<IBusinessGroupDetail> => {
  const response = await api.get(`/joint-business-group/${id}`)
  return response.data?.data
}
