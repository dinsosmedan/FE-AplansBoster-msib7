import { getKecamatanFn, getKelurahanFn } from '@/api/area.api'
import { useQuery } from 'react-query'

export const useGetKecamatan = () => {
  return useQuery('kecamatan', getKecamatanFn)
}

export const useGetKelurahan = (idKecamatan: string) => {
  return useQuery(['kelurahan', idKecamatan], async () => await getKelurahanFn(idKecamatan), {
    enabled: !(idKecamatan === '')
  })
}
