import {
  forgetPasswordFn,
  forgetPasswordUserFn,
  getMeFn,
  getMePublicFn,
  loginFn,
  loginUserFn,
  logoutFn,
  logoutUserFn,
  registerUserFn,
  resetPasswordFn,
  resetPasswordUserFn
} from '@/api/auth.api'
import { type AxiosError } from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useToken, useUserInfo, useUserPublicToken } from '../client'
import { toast } from '@/components/ui/use-toast'
import { type IUser, type IErrorResponse } from '@/lib/types/user.type'

export const useLogin = () => {
  const navigate = useNavigate()
  const storeToken = useToken((state) => state.storeToken)

  return useMutation(loginFn, {
    onSuccess: (data) => {
      storeToken(data.data.accessToken)
      navigate('/dashboard')
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 401) {
        // window.alert('Email or password is incorrect')
      }
    }
  })
}
export const useForgetPassword = () => {
  return useMutation(forgetPasswordFn, {
    onError: (error: AxiosError) => {
      const errorResponse = error.response?.data as IErrorResponse

      if (errorResponse !== undefined) {
        toast({
          variant: 'destructive',
          title: errorResponse.message,
          description: 'Terjadi masalah dengan permintaan Anda.'
        })
      }
    }
  })
}
export const useResetPassword = () => {
  const navigate = useNavigate()
  return useMutation(resetPasswordFn, {
    onSuccess: async () => {
      toast({
        title: 'Reset Password Berhasil',
        description: 'Berhasil ganti password, Silahkan login ulang kembali.'
      })
      navigate('/login')
    },
    onError: (error: AxiosError) => {
      const errorResponse = error.response?.data as IErrorResponse
      if (errorResponse !== undefined) {
        toast({
          variant: 'destructive',
          title: errorResponse.message,
          description: 'Terjadi masalah dengan permintaan Anda.'
        })
      }
    }
  })
}
export const useLogout = () => {
  const navigate = useNavigate()
  return useMutation(logoutFn, {
    onSuccess: () => {
      useToken.getState().removeToken()
      toast({
        title: 'Berhasil keluar dengan sukses',
        description: 'Anda telah berhasil keluar.'
      })
      navigate('/')
    }
  })
}

export const useGetMe = () => {
  return useQuery('user', async () => await getMeFn(), {
    onSuccess: (data) => {
      useUserInfo.getState().storeUserInfo(data)
    }
  })
}

export const useGetMePublic = () => {
  return useQuery('user-public', async () => await getMePublicFn())
}

export const useLoginPublic = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation(loginUserFn, {
    onSuccess: async (data) => {
      await queryClient.invalidateQueries('user-public')
      useUserPublicToken.getState().storeToken(data.data.accessToken)
      useUserPublicToken.getState().storeUser(data.data.user)
      toast({
        title: 'Akun berhasil masuk',
        description: 'Akun Anda telah berhasil masuk.'
      })
      navigate('/')
    },
    onError: (error: AxiosError) => {
      const errorResponse = error.response?.data as IErrorResponse

      if (errorResponse !== undefined) {
        toast({
          variant: 'destructive',
          title: errorResponse.message,
          description: 'Terjadi masalah dengan permintaan Anda.'
        })
      }
    }
  })
}

export const useLogoutPublic = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation(logoutUserFn, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('user-public')
      useUserPublicToken.getState().removeToken()
      useUserPublicToken.getState().storeUser({} as IUser['data'])
      toast({
        title: 'Berhasil keluar',
        description: 'Anda telah berhasil keluar.'
      })
      navigate('/')
    }
  })
}

export const useRegisterPublic = () => {
  const navigate = useNavigate()

  return useMutation(registerUserFn, {
    onSuccess: async () => {
      toast({
        title: 'Akun berhasil didaftarkan',
        description: 'Anda telah berhasil melakukan pendaftaran.'
      })
      navigate('/user/successful')
    },
    onError: (error: AxiosError) => {
      const errorResponse = error.response?.data as IErrorResponse

      if (errorResponse !== undefined) {
        toast({
          variant: 'destructive',
          title: errorResponse.message,
          description: 'Terjadi masalah dengan permintaan Anda.'
        })
      }
    }
  })
}
export const useForgetPasswordUser = () => {
  return useMutation(forgetPasswordUserFn, {
    onError: (error: AxiosError) => {
      const errorResponse = error.response?.data as IErrorResponse

      if (errorResponse !== undefined) {
        toast({
          variant: 'destructive',
          title: errorResponse.message,
          description: 'Terjadi masalah dengan permintaan Anda.'
        })
      }
    }
  })
}
export const useResetPasswordUser = () => {
  const navigate = useNavigate()
  return useMutation(resetPasswordUserFn, {
    onSuccess: async () => {
      toast({
        title: 'Reset Password Berhasil',
        description: 'Berhasil ganti password, Silahkan login ulang kembali.'
      })
      navigate('/user/login')
    },
    onError: (error: AxiosError) => {
      const errorResponse = error.response?.data as IErrorResponse
      if (errorResponse !== undefined) {
        toast({
          variant: 'destructive',
          title: errorResponse.message,
          description: 'Terjadi masalah dengan permintaan Anda.'
        })
      }
    }
  })
}
