import {
  getServiceFundsFn,
  getServiceTypesFn,
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
  type ServiceFundQuery,
  getWorshipPlacesFn,
  type NonCashFoodAssistanceBeneficiaryQuery,
  getNonCashFoodAssistanceBeneficiary,
  showServiceFundFn,
  updateServiceFundFn,
  deleteServiceFundFn,
  deleteOrganizationGrantAssistanceFn,
  deleteWorshipPlaceFn,
  deleteBusinessGroupFn,
  deleteCommunityGroupsFn,
  deleteVeteranFn,
  deleteFuelCashAssistanceFn,
  updateCommunityGroupFn,
  updateOrganizationGrantAssistanceFn,
  updateWorshipPlaceFn,
  updateVeteranFn,
  updateBusinessGroupFn,
  getCommunityGroupFn,
  getOrganizationGrantAssistanceFn,
  getWorshipPlaceFn,
  getDetailVeteranFn,
  getDetailBusinessGroupFn
} from '@/api/dayasos.api'
import { toast, useToast } from '@/components/ui/use-toast'
import { type IErrorResponse } from '@/lib/types/user.type'
import { type AxiosError } from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'

/* RUMAH IBADAH */
export const useGetWorshipPlaces = ({ page, idKecamatan, idKelurahan, type, q }: WorshipPlaceQuery) => {
  return useQuery(
    ['worship-places', page, idKecamatan, idKelurahan, type, q],
    async () => await getWorshipPlacesFn({ page, idKecamatan, idKelurahan, type, q }),
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
export const useDeleteWorshipPlace = () => {
  const queryClient = useQueryClient()

  return useMutation(deleteWorshipPlaceFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('worship-places')
      toast({
        variant: 'default',
        duration: 1500,
        title: 'Proses Berhasil',
        description: 'Data Rumah Ibadah Berhasil Dihapus'
      })
    }
  })
}

export const useUpdateWorshipPlace = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation(updateWorshipPlaceFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('worship-places')
      toast({
        title: 'Proses Berhasil',
        description: 'Data Rumah Ibadah Berhasil Diubah'
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

export const useGetWorshipPlace = (id?: string) => {
  return useQuery(['worship-place', id], async () => await getWorshipPlaceFn(id as string), {
    enabled: !!id
  })
}

/* DJPM */
export const useGetServiceTypes = () => {
  return useQuery('service-types', async () => await getServiceTypesFn())
}

export const useGetServiceFunds = ({ page, idKecamatan, idKelurahan, name }: ServiceFundQuery) => {
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
        description: 'Data DJPM Berhasil Diubah'
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

export const useDeleteServiceFund = () => {
  const queryClient = useQueryClient()

  return useMutation(deleteServiceFundFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('service-funds')
      toast({
        variant: 'default',
        duration: 1500,
        title: 'Proses Berhasil',
        description: 'Data DJPM Berhasil Dihapus'
      })
    }
  })
}

/* BANSOS HIBAH */
export const useCreateOrganizationGrantAssistance = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation(storeOrganizationGrantAssistanceFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('organization-grant-assistance')
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
    ['organization-grant-assistance', page, budgetYear, name],
    async () => await getOrganizationGrantAssistance({ page, budgetYear, name }),
    {
      keepPreviousData: true,
      staleTime: 5000
    }
  )
}

export const useDeleteOrganizationGrantAssistance = () => {
  const queryClient = useQueryClient()

  return useMutation(deleteOrganizationGrantAssistanceFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('organization-grant-assistance')
      toast({
        variant: 'default',
        duration: 1500,
        title: 'Proses Berhasil',
        description: 'Data Hibah Berhasil Dihapus'
      })
    }
  })
}

export const useUpdateOrganizationGrantAssistance = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation(updateOrganizationGrantAssistanceFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('organization-grant-assistance')
      toast({
        title: 'Proses Berhasil',
        description: 'Data Hibah Berhasil Diubah'
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

export const useGetOrganizationGrantAssistanceById = (id?: string) => {
  return useQuery(
    ['organization-grant-assistance', id],
    async () => await getOrganizationGrantAssistanceFn(id as string),
    {
      enabled: !!id
    }
  )
}

/* KUBE */
export const useCreateBusinessGroup = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation(storeKubeFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('business-group')
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
export const useDeleteBusinessGroup = () => {
  const queryClient = useQueryClient()

  return useMutation(deleteBusinessGroupFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('business-group')
      toast({
        variant: 'default',
        duration: 1500,
        title: 'Proses Berhasil',
        description: 'Data Kube Berhasil Dihapus'
      })
    }
  })
}
export const useGetBusinessGroup = ({ page, q, idKecamatan, idKelurahan, year }: BusinessGroupQuery) => {
  return useQuery(
    ['business-group', page, q, idKecamatan, idKelurahan, year],
    async () => await getBusinessGroupFn({ page, q, idKecamatan, idKelurahan, year }),
    {
      keepPreviousData: true,
      staleTime: 5000
    }
  )
}

export const useUpdateBusinessGroup = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation(updateBusinessGroupFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('business-group')
      toast({
        title: 'Proses Berhasil',
        description: 'Data Kube Berhasil Diubah'
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

export const useGetBusinessGroupById = (id?: string) => {
  return useQuery(['business-group', id], async () => await getDetailBusinessGroupFn(id as string), {
    enabled: !!id
  })
}

/* POKMAS */
export const useCreateCommunityGroups = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation(storePokmasFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('community-groups')
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
  communityActivityCode,
  status,
  applicationYear
}: CommunityGroupQuery) => {
  return useQuery(
    ['community-groups', page, q, idKecamatan, idKelurahan, communityActivityCode, status, applicationYear],
    async () =>
      await getCommunityGroupsFn({
        page,
        q,
        idKecamatan,
        idKelurahan,
        communityActivityCode,
        status,
        applicationYear
      }),
    {
      keepPreviousData: true,
      staleTime: 5000
    }
  )
}
export const useDeleteCommunityGroups = () => {
  const queryClient = useQueryClient()

  return useMutation(deleteCommunityGroupsFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('community-groups')
      toast({
        variant: 'default',
        duration: 1500,
        title: 'Proses Berhasil',
        description: 'Data Pokmas Berhasil Dihapus'
      })
    }
  })
}

export const useUpdateCommunityGroups = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation(updateCommunityGroupFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('community-groups')
      toast({
        title: 'Proses Berhasil',
        description: 'Data Pokmas Berhasil Diubah'
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

export const useGetCommunityGroup = (id?: string) => {
  return useQuery(['community-group', id], async () => await getCommunityGroupFn(id as string), {
    enabled: !!id
  })
}

/* VETERAN */
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
export const useDeleteVeteran = () => {
  const queryClient = useQueryClient()

  return useMutation(deleteVeteranFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('veterans')
      toast({
        variant: 'default',
        duration: 1500,
        title: 'Proses Berhasil',
        description: 'Data Veteran Berhasil Dihapus'
      })
    }
  })
}

export const useUpdateVeteran = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation(updateVeteranFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('veterans')
      toast({
        title: 'Proses Berhasil',
        description: 'Data Veteran Berhasil Diubah'
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

export const useGetVeteranById = (id?: string) => {
  return useQuery(['veteran', id], async () => await getDetailVeteranFn(id as string), {
    enabled: !!id
  })
}

/* BANSOS BANTUAN BBM */
export const useGetFuelCashAssistance = ({ page, q }: FuelCashQuery) => {
  return useQuery(['fuel-cash-assistances', page, q], async () => await getFuelCashAssistanceFn({ page, q }), {
    keepPreviousData: true,
    staleTime: 5000
  })
}
export const useDeleteFuelCashAssistance = () => {
  const queryClient = useQueryClient()

  return useMutation(deleteFuelCashAssistanceFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('fuel-cash-assistances')
      toast({
        variant: 'default',
        duration: 1500,
        title: 'Proses Berhasil',
        description: 'Data BLTBBM Berhasil Dihapus'
      })
    }
  })
}

/* BANSOS BANTUAN NON TUNAI */
export const useGetNonCashFoodAssistanceBeneficiary = ({ page }: NonCashFoodAssistanceBeneficiaryQuery) => {
  return useQuery(['non-cash', page], async () => await getNonCashFoodAssistanceBeneficiary({ page }), {
    keepPreviousData: true,
    staleTime: 5000
  })
}
