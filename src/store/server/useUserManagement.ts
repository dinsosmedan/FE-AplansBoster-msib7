import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  deleteAdminFn,
  deleteUserFn,
  getAdminDetailFn,
  getAdminFn,
  getPermissionFn,
  getRoleFn,
  getUserDetailFn,
  getUsersFn,
  storeAdminFn,
  storeRolePermissionFn,
  updateAdminFn,
  updateUserFn
} from '@/api/user.api'
import { toast, useToast } from '@/components/ui/use-toast'
import { type IErrorResponse } from '@/lib/types/user.type'
import { type AxiosError } from 'axios'

export const useGetAdmin = () => {
  return useQuery('admin-management', async () => await getAdminFn(), {
    enabled: true
  })
}

export const useCreateAdmin = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  return useMutation(storeAdminFn, {
    onSuccess: () => {
      void queryClient.invalidateQueries('Admin')
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
      await queryClient.invalidateQueries('management-admin')
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
      void queryClient.invalidateQueries('management-admin')
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

export const useGetAdminById = (id?: string) => {
  return useQuery(['admin-management', id], async () => await getAdminDetailFn(id as string), {
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

export const useGetUsers = () => {
  return useQuery('user-management', async () => await getUsersFn(), {
    enabled: true
  })
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()

  return useMutation(deleteUserFn, {
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
    onSuccess: () => {
      void queryClient.invalidateQueries('management-admin')
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

export const useGetUserById = (id?: string) => {
  return useQuery(['admin-management', id], async () => await getUserDetailFn(id as string), {
    enabled: !!id
  })
}
