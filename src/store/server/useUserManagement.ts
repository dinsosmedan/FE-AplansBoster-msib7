import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  deleteAdminFn,
  deleteRolePermissionFn,
  deleteUserFn,
  getAdminDetailFn,
  getAdminFn,
  getPermissionFn,
  getRoleFn,
  getRolePermissionDetailFn,
  getUserDetailFn,
  getUsersFn,
  storeAdminFn,
  storeRolePermissionFn,
  storeUserFn,
  updateAdminFn,
  updateRolePermissionFn,
  updateUserFn
} from '@/api/user.api'
import { toast, useToast } from '@/components/ui/use-toast'
import { type IErrorResponse } from '@/lib/types/user.type'
import { type AxiosError } from 'axios'
import { handleMessage } from '@/lib/services/handleMessage'
import { handleOnError } from '@/lib/utils'

export const useGetAdmin = (page?: string, q?: string) => {
  return useQuery(['admin-management', page, q], async () => await getAdminFn(page, q), {
    enabled: true
  })
}

export const useCreateAdmin = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  return useMutation(storeAdminFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('admin-management')
      toast({
        title: 'Berhasil',
        description: 'Data Admin berhasil ditambahkan'
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

export const useDeleteAdmin = () => {
  const queryClient = useQueryClient()

  return useMutation(deleteAdminFn, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('admin-management')
      toast({
        variant: 'default',
        duration: 1500,
        title: 'Proses Berhasil',
        description: 'User Berhasil Dihapus'
      })
    }
  })
}

export const useUpdateAdmin = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation(updateAdminFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('admin-management')
      toast({
        title: 'Proses Berhasil.',
        description: 'Data Admin Berhasil Diubah.'
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

export const useGetAdminById = (id?: string, q?: string) => {
  return useQuery(['admin-management', id, q], async () => await getAdminDetailFn(id as string, q), {
    enabled: !!id
  })
}

export const useGetRole = (q?: string) => {
  return useQuery(['user-access', q], async () => await getRoleFn(q), {
    enabled: true
  })
}
export const useGetRoleById = (id?: string) => {
  return useQuery(['user-access', id], async () => await getRolePermissionDetailFn(id as string), {
    enabled: !!id
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
      void queryClient.invalidateQueries('user-access')
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
export const useUpdateRole = () => {
  const queryClient = useQueryClient()

  return useMutation(updateRolePermissionFn, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('user-access')
      handleMessage({ title: 'Data Role', variant: 'update' })
    },
    onError: (error: AxiosError) => handleOnError(error)
  })
}
export const useDeleteRolePermission = () => {
  const queryClient = useQueryClient()

  return useMutation(deleteRolePermissionFn, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('user-access')
      toast({
        variant: 'default',
        duration: 1500,
        title: 'Proses Berhasil',
        description: 'Role Permission Berhasil Dihapus'
      })
    }
  })
}

export const useGetUsers = (page?: string, q?: string) => {
  return useQuery(['user-management', page, q], async () => await getUsersFn(page, q), {
    enabled: true
  })
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()

  return useMutation(deleteUserFn, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('user-management')
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
    onSuccess: () => {
      void queryClient.invalidateQueries('user-management')
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

export const useCreateUser = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  return useMutation(storeUserFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('user-management')
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
