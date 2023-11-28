import { getMeFn, loginFn, logoutFn } from '@/api/auth.api'
import { type AxiosError } from 'axios'
import { useMutation, useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useToken } from '../client'
import { toast } from '@/components/ui/use-toast'
import { useUserInfo } from './useUserInfo'

export const useLogin = () => {
  const navigate = useNavigate()
  const storeToken = useToken((state) => state.storeToken)

  return useMutation(loginFn, {
    onSuccess: (data) => {
      storeToken(data.data.accessToken)
      navigate('/')
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 401) {
        // window.alert('Email or password is incorrect')
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
        title: 'Successfully logged out'
      })
      navigate('/login')
    }
  })
}
export const useGetMe = () => {
  return useQuery('user', getMeFn, {
    onSuccess: (data) => {
      useUserInfo.getState().storeUserInfo(data)
    }
  })
}
