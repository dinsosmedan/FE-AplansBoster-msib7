import { useMutation, useQuery, useQueryClient } from 'react-query'
import { deleteUsersFn, getPermissionFn, getRoleFn, getUserDetailFn, getUsersFn, storeRolePermissionFn, storeUserFn, updateUserFn } from '@/api/user.api'
import { toast, useToast } from '@/components/ui/use-toast'
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

export const useDeleteUser = () => {
  const queryClient = useQueryClient()

  return useMutation(deleteUsersFn, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('management-user')
      toast({
        variant: 'default',
        duration: 1500,
        title: 'Proses Berhasil',
        description: 'User Berhasil Dihapus'
      })
    }
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation(updateUserFn, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('management-user')
      toast({
        title: 'Proses Berhasil.',
        description: 'Data User Berhasil Diubah.'
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

export const useGetUserById = (id?: string) => {
  return useQuery(['user-management', id], async () => await getUserDetailFn(id as string), {
    enabled: !!id
  })
}

export const useGetRole = () => {
  return useQuery('role', async () => await getRoleFn(), {
    enabled: true
  })
}

export const useGetPermission = () => {
  return useQuery('permission', async () => await getPermissionFn(), {
    enabled: true
  })
}

export const useCreateRolePermission = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  return useMutation(storeRolePermissionFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('role-permission')
      toast({
        title: 'Berhasil',
        description: 'Data Role Permission berhasil ditambahkan'
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
