import {
  getServiceFundsFn,
  getServiceTypesFn,
  getWorshipPlacesFn,
  storeKubeFn,
  storeOrganizationGrantAssistanceFn,
  storePokmasFn,
  storeServiceFundFn,
  getOrganizationGrantAssistance,
  getVeteranFn,
  storeVeteranFn,
  storeWorshipPlaceFn,
  getCommunityGroupsFn,
  getBusinessGroupFn,
  type BusinessGroupQuery,
  getFuelCashAssistanceFn,
  type FuelCashQuery,
  type OrganizationGrantAssistanceQuery,
  type VeteranQuery,
  type WorshipPlaceQuery,
  type CommunityGroupQuery,
  type NonCashFoodAssistanceBeneficiaryQuery,
  getNonCashFoodAssistanceBeneficiary,
  showServiceFundFn,
  updateServiceFundFn,
  storeDjpm
} from '@/api/dayasos.api'
import { useToast } from '@/components/ui/use-toast'
import { type IErrorResponse } from '@/lib/types/user.type'
import { type AxiosError } from 'axios'
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
    onSuccess: (data: any) => {
      console.log({ worship: data })
      void queryClient.invalidateQueries('worship-places')
    },
    onError: (error: AxiosError) => {
      console.log(error)
    }
  })
}

export const useGetServiceTypes = () => {
  return useQuery('service-types', async () => await getServiceTypesFn())
}

export const useGetServiceFunds = ({ page, idKecamatan, idKelurahan, name }: WorshipPlaceQuery) => {
  return useQuery(
    ['service-funds', page, idKecamatan, idKelurahan, name],
    async () => await getServiceFundsFn({ page, idKecamatan, idKelurahan, name }),
    {
      keepPreviousData: true,
      staleTime: 5000
    }
  )
}

export const useCreateServiceFund = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  return useMutation(storeServiceFundFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('service-funds')
      toast({
        title: 'Berhasil',
        description: 'Data DJPM berhasil ditambahkan'
      })
    },
    onError: (error: AxiosError) => {
      const errorResponse = error.response?.data as IErrorResponse

      if (errorResponse !== undefined) {
        toast({
          variant: 'destructive',
          title: errorResponse.message ?? 'Gagal',
          description: 'Terjadi masalah dengan permintaan Anda.'
        })
      }
    }
  })
}

export const useCreateHibah = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation(storeOrganizationGrantAssistanceFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('hibah')
      toast({
        title: 'Berhasil',
        description: 'Data Hibah berhasil ditambahkan'
      })
    },
    onError: (error: AxiosError) => {
      const errorResponse = error.response?.data as IErrorResponse

      if (errorResponse !== undefined) {
        toast({
          variant: 'destructive',
          title: errorResponse.message ?? 'Gagal',
          description: 'Terjadi masalah dengan permintaan Anda.'
        })
      }
    }
  })
}

export const useGetOrganizationGrantAssistance = ({ page, budgetYear, name }: OrganizationGrantAssistanceQuery) => {
  return useQuery(
    ['hibah', page, budgetYear, name],
    async () => await getOrganizationGrantAssistance({ page, budgetYear, name }),
    {
      keepPreviousData: true,
      staleTime: 5000
    }
  )
}

export const useCreateKube = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation(storeKubeFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('kube')
      toast({
        title: 'Proses Berhasil!!',
        description: 'Data Kube Berhasil Ditambahkan'
      })
    },
    onError: (error: AxiosError) => {
      const errorResponse = error.response?.data as IErrorResponse

      if (errorResponse !== undefined) {
        toast({
          variant: 'destructive',
          title: errorResponse.message ?? 'Gagal',
          description: 'Terjadi masalah dengan permintaan Anda.'
        })
      }
    }
  })
}

export const useGetBusinessGroup = ({ page, q, idKecamatan, idKelurahan, year }: BusinessGroupQuery) => {
  return useQuery(
    ['kube', page, q, idKecamatan, idKelurahan, year],
    async () => await getBusinessGroupFn({ page, q, idKecamatan, idKelurahan, year }),
    {
      keepPreviousData: true,
      staleTime: 5000
    }
  )
}

export const useCreatePokmas = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation(storePokmasFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('pokmas')
      toast({
        title: 'Proses Berhasil',
        description: 'Data Pokmas Berhasil Ditambahkan'
      })
    },
    onError: (error: AxiosError) => {
      const errorResponse = error.response?.data as IErrorResponse

      if (errorResponse !== undefined) {
        toast({
          variant: 'destructive',
          title: errorResponse.message ?? 'Gagal',
          description: 'Terjadi masalah dengan permintaan Anda.'
        })
      }
    }
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
    ['pokmas', page, q, idKecamatan, idKelurahan, code, status, year],
    async () => await getCommunityGroupsFn({ page, q, idKecamatan, idKelurahan, code, status, year }),
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

export const useCreateVeteran = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  return useMutation(storeVeteranFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('veterans')
      toast({
        title: 'Berhasil',
        description: 'Data Veteran berhasil ditambahkan'
      })
    },
    onError: (error: AxiosError) => {
      const errorResponse = error.response?.data as IErrorResponse
      if (errorResponse !== undefined) {
        toast({
          variant: 'destructive',
          title: errorResponse.message ?? 'Gagal',
          description: 'Terjadi masalah dengan permintaan Anda.'
        })
      }
    }
  })
}

export const useGetFuelCashAssistance = ({ page, q }: FuelCashQuery) => {
  return useQuery(['fuel-cash-assistances', page, q], async () => await getFuelCashAssistanceFn({ page, q }), {
    keepPreviousData: true,
    staleTime: 5000
  })
}

export const useGetNonCashFoodAssistanceBeneficiary = ({ page }: NonCashFoodAssistanceBeneficiaryQuery) => {
  return useQuery(['non-cash', page], async () => await getNonCashFoodAssistanceBeneficiary({ page }), {
    keepPreviousData: true,
    staleTime: 5000
  })
}

export const useGetServiceFund = (id?: string) => {
  return useQuery(['service-fund', id], async () => await showServiceFundFn(id as string), {
    enabled: !!id
  })
}

export const useUpdateServiceFund = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation(updateServiceFundFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('service-funds')
      toast({
        title: 'Proses Berhasil',
        description: 'Data Pokmas Berhasil Ditambahkan'
      })
    },
    onError: (error: AxiosError) => {
      const errorResponse = error.response?.data as IErrorResponse
      if (errorResponse !== undefined) {
        toast({
          variant: 'destructive',
          title: errorResponse.message ?? 'Gagal',
          description: 'Terjadi masalah dengan permintaan Anda.'
        })
      }
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
