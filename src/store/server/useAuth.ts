import {
  changePasswordUserFn,
  changeProfileUserFn,
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
import { useAuth } from '../client'
import { toast } from '@/components/ui/use-toast'
import { type IErrorResponse } from '@/lib/types/user.type'

export const useLogin = () => {
  const navigate = useNavigate()
  // const storeToken = useToken((state) => state.storeToken)

  return useMutation(loginFn, {
    onSuccess: (data) => {
      // storeToken(data.data.accessToken)
      useAuth.getState().storeToken(data.data.accessToken)
      useAuth.getState().storeUser(data.data.user)
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
  const queryClient = useQueryClient()
  return useMutation(logoutFn, {
    onSuccess: async () => {
      // useToken.getState().removeToken()
      await queryClient.invalidateQueries('user')
      useAuth.getState().removeToken()
      toast({
        title: 'Berhasil keluar dengan sukses',
        description: 'Anda telah berhasil keluar.'
      })
      navigate('/login')
    }
  })
}

export const useGetMe = () => {
  return useQuery('user', async () => await getMeFn(), {
    onSuccess: (data) => {
      // useUserInfo.getState().storeUserInfo(data)
      useAuth.getState().storeUser(data.data)
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
      useAuth.getState().storeToken(data.data.accessToken)
      useAuth.getState().storeUser(data.data.user)
      // useUserPublicToken.getState().storeToken(data.data.accessToken)
      // useUserPublicToken.getState().storeUser(data.data.user)
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
      // useUserPublicToken.getState().removeToken()
      // useUserPublicToken.getState().storeUser({} as IUser['data'])
      useAuth.getState().removeToken()
      toast({
        title: 'Berhasil keluar',
        description: 'Anda telah berhasil keluar.'
      })
      navigate('/')
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 500) {
        useAuth.getState().removeToken()
        window.location.href = '/user/login'
      }
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
export const useChangePasswordUser = () => {
  const navigate = useNavigate()
  return useMutation(changePasswordUserFn, {
    onSuccess: async () => {
      toast({
        title: 'Ganti Password Berhasil',
        description: 'Yay!! Berhasil ganti password!'
      })
      navigate('/user/profile')
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
export const useChangeProfileUser = () => {
  const navigate = useNavigate()
  return useMutation(changeProfileUserFn, {
    onSuccess: async () => {
      toast({
        title: 'Ganti Profile Berhasil',
        description: 'Yay!! Berhasil ganti profile!'
      })
      navigate('/user/profile')
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
