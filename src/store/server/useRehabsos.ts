import {
  type ElderlyCashSocialAssistanceQuery,
  getElderlyCashSocialAssistanceFn,
  storeElderlyCashSocialAssistanceFn,
  updateElderlyCashSocialAssistanceFn,
  showDetailElderlyCashSocialAssistanceFn,
  deleteBstLansiaFn,
  getElderlyAssistanceByIdFn
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
      void queryClient.invalidateQueries('lansia')
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

export const useGetDetailElderlyCashSocialAssistance = (id: string) => {
  return useQuery(['elderly', id], async () => await showDetailElderlyCashSocialAssistanceFn(id), {
    enabled: !!id
  })
}

export const useUpdateElderlyCashSocialAssistance = () => {
  const queryClient = useQueryClient()
  return useMutation(updateElderlyCashSocialAssistanceFn, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('elderly')
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

  return useMutation(deleteBstLansiaFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('elderly')
      toast({
        variant: 'default',
        duration: 1500,
        title: 'Proses Berhasil',
        description: 'Data BST Lansia Berhasil Dihapus'
      })
    }
  })
}
export const useGetElderlyAssistanceID = (id?: string) => {
  return useQuery(['elderly', id], async () => await getElderlyAssistanceByIdFn(id as string), {
    enabled: !!id
  })
}