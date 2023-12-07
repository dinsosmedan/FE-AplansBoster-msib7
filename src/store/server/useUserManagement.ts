import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getRoleFn, getUsersFn, storeUserFn } from '@/api/user.api'
import { useToast } from '@/components/ui/use-toast'
import { type IErrorResponse } from '@/lib/types/user.type'
import { type AxiosError } from 'axios'

export const useGetUser = () => {
  return useQuery('user-management', async () => await getUsersFn(), {
    enabled: true
  })
}

export const useCreateUser = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  return useMutation(storeUserFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('user')
      toast({
        title: 'Berhasil',
        description: 'Data User berhasil ditambahkan'
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

export const useGetRole = () => {
  return useQuery('role', async () => await getRoleFn(), {
    enabled: true
  })
}
