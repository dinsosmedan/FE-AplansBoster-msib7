import { type IUnregister, type IVulnerableGroupHandling } from '@/lib/types/linjamsos.type'
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
