import api from './axiosInstance'

export interface IArea {
  id: string
  name: string
}

export const getKecamatanFn = async (): Promise<IArea[]> => {
  const response = await api.get('/area/level-3')
  return response.data
}

export const getKelurahanFn = async (idKecamatan: string): Promise<IArea[]> => {
  const response = await api.get(`/area/level-4?parent_id=${idKecamatan}`)
  return response.data
}
