import {
  getOrganizationGrantAssistance,
  getServiceFunds,
  getVeteranFn,
  getWorshipPlacesFn,
  type OrganizationGrantAssistanceQuery,
  storeDjpm,
  storeVeteranFn,
  storeWorshipPlaceFn,
  type VeteranQuery,
  type WorshipPlaceQuery,
  CommunityGroupQuery,
  getCommunityGroupsFn,
  getBusinessGroupFn,
  BusinessGroupQuery,
  getFuelCashAssistanceFn,
  FuelCashQuery
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

export const useGetOrganizationGrantAssistance = ({ page, budgetYear, name }: OrganizationGrantAssistanceQuery) => {
  return useQuery(
    ['service-funds', page, budgetYear, name],
    async () => await getOrganizationGrantAssistance({ page, budgetYear, name }),
    {
      keepPreviousData: true,
      staleTime: 5000
    }
  )
}

export const useGetVeteran = ({ page, q }: VeteranQuery) => {
  return useQuery(['veterans', page, q], async () => await getVeteranFn({ page, q }), {
    keepPreviousData: true,
    staleTime: 5000
  })
}

export const useGetCommunityGroups = ({
  page,
  q,
  idKecamatan,
  idKelurahan,
  code,
  status,
  year
}: CommunityGroupQuery) => {
  return useQuery(
    ['community-groups', page, q, idKecamatan, idKelurahan, code, status, year],
    async () => await getCommunityGroupsFn({ page, q, idKecamatan, idKelurahan, code, status, year }),
    {
      keepPreviousData: true,
      staleTime: 5000
    }
  )
}
export const useGetBusinessGroup = ({ page, q, idKecamatan, idKelurahan, year }: BusinessGroupQuery) => {
  return useQuery(
    ['business-groups', page, q, idKecamatan, idKelurahan, year],
    async () => await getBusinessGroupFn({ page, q, idKecamatan, idKelurahan, year }),
    {
      keepPreviousData: true,
      staleTime: 5000
    }
  )
}
export const useGetFuelCashAssistance = ({ page, q }: FuelCashQuery) => {
  return useQuery(['fuel-cash-assistances', page, q], async () => await getFuelCashAssistanceFn({ page, q }), {
    keepPreviousData: true,
    staleTime: 5000
  })
}
