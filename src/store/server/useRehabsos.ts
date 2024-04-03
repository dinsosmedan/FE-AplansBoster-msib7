import {
  type ElderlyCashSocialAssistanceQuery,
  getElderlyCashSocialAssistanceFn,
  storeElderlyCashSocialAssistanceFn,
  updateElderlyCashSocialAssistanceFn,
  deleteElderlyCashSocialAssistanceFn,
  NeedForSocialWelfareServicesQuery,
  showDetailNeedForSocialWelfareServicesFn,
  deleteNeedForSocialWelfareServicesFn,
  getNeedForSocialWelfareServicesFn,
  DisabilitySocialAssistanceQuery,
  getDisabilitySocialAssistanceFn,
  storeDisabilitySocialAssistanceFn,
  showDetailDisabilitySocialAssistanceFn,
  updateDisabilitySocialAssistanceFn,
  deleteDisabilitySocialAssistanceFn,
  FinancialAssistanceForNonOrpahangesQuery,
  getFinancialAssistanceForNonOrpahangesFn,
  storeFinancialAssistanceForNonOrpahangesFn,
  showDetailFinancialAssistanceForNonOrpahangesFn,
  updateFinancialAssistanceForNonOrpahangesFn,
  deleteFinancialAssistanceForNonOrpahangesFn,
  OperationLicenseOfSocialInstitutionQuery,
  getOperationLicenseOfSocialInstitutionFn,
  storeOperationLicenseOfSocialInstitutionFn,
  showDetailOperationLicenseOfSocialInstitutionFn,
  updateOperationLicenseOfSocialInstitutionFn,
  deleteOperationLicenseOfSocialInstitutionFn,
  getElderlyAssistanceByIdFn,
  getWelfaresByIdFn
} from '@/api/rehabsos.api'
import { toast } from '@/components/ui/use-toast'
import { type IErrorResponse } from '@/lib/types/user.type'
import { type AxiosError } from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getPremiumAssistanceBenefitByIdFn } from '../../api/linjamsos.api'
import { handleMessage } from '@/lib/services/handleMessage'
import { handleOnError } from '@/lib/utils'

// BST Lansia//
export const useElderlyCashSocialAssistance = ({
  page,
  kecamatan,
  kelurahan,
  q,
  year
}: ElderlyCashSocialAssistanceQuery) => {
  return useQuery(
    ['elderly', page, kecamatan, kelurahan, q, year],
    async () =>
      await getElderlyCashSocialAssistanceFn({
        page,
        kecamatan,
        kelurahan,
        q,
        year
      }),
    {
      keepPreviousData: true,
      staleTime: 10 * 60 * 1000
    }
  )
}

export const useCreateElderlyCashSocialAssistance = () => {
  const queryClient = useQueryClient()
  return useMutation(storeElderlyCashSocialAssistanceFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('getElderlybyID')
      toast({
        title: 'Proses Berhasil',
        description: 'Data BST Lansia berhasil ditambahkan'
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

export const useGetElderlyAssistanceID = (id?: string) => {
  return useQuery(['elderly', id], async () => await getElderlyAssistanceByIdFn(id as string), {
    enabled: !!id
  })
}
export const useGetWelfaresID = (id?: string) => {
  return useQuery(['elderly', id], async () => await getWelfaresByIdFn(id as string), {
    enabled: !!id
  })
}
export const useUpdateElderlyCashSocialAssistance = () => {
  const queryClient = useQueryClient()
  return useMutation(updateElderlyCashSocialAssistanceFn, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('getElderlybyID')
      toast({
        title: 'Proses Berhasil',
        description: 'Data BST Lansia berhasil diubah'
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
export const useDeleteBstLansia = () => {
  const queryClient = useQueryClient()

  return useMutation(deleteElderlyCashSocialAssistanceFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('getElderlybyID')
      toast({
        variant: 'default',
        duration: 1500,
        title: 'Proses Berhasil',
        description: 'Data BST Lansia Berhasil Dihapus'
      })
    }
  })
}

// BST Disabilitas//
export const useDisabilitySocialAssistance = ({
  page,
  kecamatan,
  kelurahan,
  q,
  year
}: DisabilitySocialAssistanceQuery) => {
  return useQuery(
    ['getElderly', page, kecamatan, kelurahan, q, year],
    async () =>
      await getDisabilitySocialAssistanceFn({
        page,
        kecamatan,
        kelurahan,
        q,
        year
      }),
    {
      keepPreviousData: true,
      staleTime: 10 * 60 * 1000
    }
  )
}


export const useCreateDisabilitySocialAssistance = () => {
  const queryClient = useQueryClient()
  return useMutation(storeDisabilitySocialAssistanceFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('lansia')
      toast({
        title: 'Proses Berhasil',
        description: 'Data BST Disabilitas berhasil ditambahkan'
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

export const useGetDetailDisabilitySocialAssistance = (id: string) => {
  return useQuery(['getElderly', id], async () => await showDetailDisabilitySocialAssistanceFn(id), {
    enabled: !!id
  })
}

export const useUpdateDisabilitySocialAssistance = () => {
  const queryClient = useQueryClient()
  return useMutation(updateDisabilitySocialAssistanceFn, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('lansia')
      toast({
        title: 'Proses Berhasil',
        description: 'Data BST Disabilitas berhasil diubah'
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
export const useDeleteDisabilitySocialAssistance = () => {
  const queryClient = useQueryClient()

  return useMutation(deleteDisabilitySocialAssistanceFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('getElderly')
      toast({
        variant: 'default',
        duration: 1500,
        title: 'Proses Berhasil',
        description: 'Data BST Disabilitas Berhasil Dihapus'
      })
    }
  })
}

// BST Anak di Luar Panti //
export const useFinancialAssistanceForNonOrpahanges = ({
  page,
  kecamatan,
  kelurahan,
  q,
  year
}: FinancialAssistanceForNonOrpahangesQuery) => {
  return useQuery(
    ['getElderly', page, kecamatan, kelurahan, q, year],
    async () =>
      await getFinancialAssistanceForNonOrpahangesFn({
        page,
        kecamatan,
        kelurahan,
        q,
        year
      }),
    {
      keepPreviousData: true,
      staleTime: 10 * 60 * 1000
    }
  )
}

export const useCreateFinancialAssistanceForNonOrpahanges = () => {
  const queryClient = useQueryClient()
  return useMutation(storeFinancialAssistanceForNonOrpahangesFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('lansia')
      toast({
        title: 'Proses Berhasil',
        description: 'Data BST Anak di Luar Panti berhasil ditambahkan'
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

export const useGetDetailFinancialAssistanceForNonOrpahanges = (id: string) => {
  return useQuery(['getElderly', id], async () => await showDetailFinancialAssistanceForNonOrpahangesFn(id), {
    enabled: !!id
  })
}

export const useUpdateFinancialAssistanceForNonOrpahanges = () => {
  const queryClient = useQueryClient()
  return useMutation(updateFinancialAssistanceForNonOrpahangesFn, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('lansia')
      toast({
        title: 'Proses Berhasil',
        description: 'Data BST Anak di Luar Panti berhasil diubah'
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
export const useDeleteFinancialAssistanceForNonOrpahanges = () => {
  const queryClient = useQueryClient()

  return useMutation(deleteFinancialAssistanceForNonOrpahangesFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('getElderly')
      toast({
        variant: 'default',
        duration: 1500,
        title: 'Proses Berhasil',
        description: 'Data BST Anak di Luar Panti Berhasil Dihapus'
      })
    }
  })
}

// LKS //
export const useOperationLicenseOfSocialInstitution = ({
  page,
  kecamatan,
  kelurahan,
  q,
  year
}: OperationLicenseOfSocialInstitutionQuery) => {
  return useQuery(
    ['getElderly', page, kecamatan, kelurahan, q, year],
    async () =>
      await getOperationLicenseOfSocialInstitutionFn({
        page,
        kecamatan,
        kelurahan,
        q,
        year
      }),
    {
      keepPreviousData: true,
      staleTime: 10 * 60 * 1000
    }
  )
}

export const useCreateOperationLicenseOfSocialInstitution = () => {
  const queryClient = useQueryClient()
  return useMutation(storeOperationLicenseOfSocialInstitutionFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('lansia')
      toast({
        title: 'Proses Berhasil',
        description: 'Data LKS berhasil ditambahkan'
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

export const useGetDetailOperationLicenseOfSocialInstitution = (id: string) => {
  return useQuery(['getElderly', id], async () => await showDetailOperationLicenseOfSocialInstitutionFn(id), {
    enabled: !!id
  })
}

export const useUpdateOperationLicenseOfSocialInstitution = () => {
  const queryClient = useQueryClient()
  return useMutation(updateOperationLicenseOfSocialInstitutionFn, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('lansia')
      toast({
        title: 'Proses Berhasil',
        description: 'Data LKS berhasil diubah'
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
export const useDeleteOperationLicenseOfSocialInstitution = () => {
  const queryClient = useQueryClient()

  return useMutation(deleteOperationLicenseOfSocialInstitutionFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('getElderly')
      toast({
        variant: 'default',
        duration: 1500,
        title: 'Proses Berhasil',
        description: 'Data LKS Berhasil Dihapus'
      })
    }
  })
}

// PPKS //
export const useNeedForSocialWelfareServices = ({
  page,
  kecamatan,
  kelurahan,
  q,
  year
}: NeedForSocialWelfareServicesQuery) => {
  return useQuery(
    ['elderly', page, kecamatan, kelurahan, q, year],
    async () =>
      await getNeedForSocialWelfareServicesFn({
        page,
        kecamatan,
        kelurahan,
        q,
        year
      }),
    {
      keepPreviousData: true,
      staleTime: 10 * 60 * 1000
    }
  )
}

export const useCreateNeedForSocialWelfareServices = () => {
  const queryClient = useQueryClient()
  return useMutation(storeElderlyCashSocialAssistanceFn, {
    //need to change
    onSuccess: () => {
      void queryClient.invalidateQueries('lansia')
      toast({
        title: 'Proses Berhasil',
        description: 'Data PPKS berhasil ditambahkan'
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

export const useGetDetailNeedForSocialWelfareServices = (id: string) => {
  return useQuery(['elderly', id], async () => await showDetailNeedForSocialWelfareServicesFn(id), {
    enabled: !!id
  })
}

export const useUpdateNeedForSocialWelfareServices = () => {
  const queryClient = useQueryClient()
  return useMutation(updateElderlyCashSocialAssistanceFn, {
    //need to update
    onSuccess: async () => {
      await queryClient.invalidateQueries('welfare')
      toast({
        title: 'Proses Berhasil',
        description: 'Data PPKS berhasil diubah'
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
export const useDeleteNeedForSocialWelfareServices = () => {
  const queryClient = useQueryClient()

  return useMutation(deleteNeedForSocialWelfareServicesFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('welfare')
      toast({
        variant: 'default',
        duration: 1500,
        title: 'Proses Berhasil',
        description: 'Data PPKS Berhasil Dihapus'
      })
    }
  })
}
