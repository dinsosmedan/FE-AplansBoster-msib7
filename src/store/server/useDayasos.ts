import {
  getServiceFunds,
  getWorshipPlacesFn,
  storeDjpm,
  storeVeteranFn,
  storeWorshipPlaceFn,
  type WorshipPlaceQuery
} from '@/api/dayasos.api'
import { useMutation, useQuery, useQueryClient } from 'react-query'

export const useGetWorshipPlaces = ({ page, idKecamatan, idKelurahan, name }: WorshipPlaceQuery) => {
  return useQuery(
    ['worship-places', page, idKecamatan, idKelurahan, name],
    async () => await getWorshipPlacesFn({ page, idKecamatan, idKelurahan, name }),
    {
      keepPreviousData: true,
      staleTime: 5000
    }
  )
}

export const useCreateWorshipPlace = () => {
  const queryClient = useQueryClient()
  return useMutation(storeWorshipPlaceFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('worship-places')
    }
  })
}
export const useCreateDjpm = () => {
  const queryClient = useQueryClient()
  return useMutation(storeDjpm, {
    onSuccess: () => {
      void queryClient.invalidateQueries('create-djpm')
    }
  })
}
export const useCreateVeteran = () => {
  const queryClient = useQueryClient()
  return useMutation(storeVeteranFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('veterans')
    }
  })
}

export const useGetServiceFunds = ({ page, idKecamatan, idKelurahan, name }: WorshipPlaceQuery) => {
  return useQuery(
    ['service-funds', page, idKecamatan, idKelurahan, name],
    async () => await getServiceFunds({ page, idKecamatan, idKelurahan, name }),
    {
      keepPreviousData: true,
      staleTime: 5000
    }
  )
}
