import {
  type VulnerableGroupHandlingQuery,
  getVulnerableGroupHandlingFn,
  getUnregisterFn,
  type UnregisterQuery,
  getIndigencyCertificateFn,
  type IndigencyCertificateQuery
} from '@/api/linjamsos.api'
import { useQuery } from 'react-query'

// Penanganan Kelompok Rentan//
export const useVulnerableGroupHandlings = ({
  page,
  idKecamatan,
  idKelurahan,
  q,
  year
}: VulnerableGroupHandlingQuery) => {
  return useQuery(
    ['vulnerable', page, idKecamatan, idKelurahan, q, year],
    async () => await getVulnerableGroupHandlingFn({ page, idKecamatan, idKelurahan, q, year }),
    {
      keepPreviousData: true,
      staleTime: 5000
    }
  )
}
// Unregister //
export const useUnregisters = ({ page, date, letterNumber, q, year }: UnregisterQuery) => {
  return useQuery(
    ['unregisters', page, date, letterNumber, q, year],
    async () => await getUnregisterFn({ page, date, letterNumber, q, year }),
    {
      keepPreviousData: true,
      staleTime: 5000
    }
  )
}
// SKTM //
export const useGetIndigencyCertificateFn = ({
  page,
  idKecamatan,
  idKelurahan,
  q,
  year,
  status
}: IndigencyCertificateQuery) => {
  return useQuery(
    ['indigency-certificates', page, idKecamatan, idKelurahan, q, year, status],
    async () =>
      await getIndigencyCertificateFn({
        page,
        idKecamatan,
        idKelurahan,
        q,
        year,
        status
      }),
    {
      keepPreviousData: true,
      staleTime: 5000
    }
  )
}