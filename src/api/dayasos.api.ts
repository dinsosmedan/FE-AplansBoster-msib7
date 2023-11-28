import { type worshipPlaceFields } from '@/lib/validations/dayasos.validation'
import api from './axiosInstance'

export const storeWorshipPlaceFn = async (fields: worshipPlaceFields) => {
  await api.post('/worship-place', fields)
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

export const getWorshipPlacesFn = async ({ page, idKecamatan, idKelurahan, name }: WorshipPlaceQuery) => {
  const response = await api.get(
    `/worship-place?page=${page}&area_level_3=${idKecamatan}&area_level_4=${idKelurahan}&q=${name}`
  )
  return response.data
}
