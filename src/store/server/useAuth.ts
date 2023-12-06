import { getMeFn, loginFn, loginUserFn, logoutFn } from '@/api/auth.api'
import { type AxiosError } from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useToken, useUserInfo, useUserPublicToken } from '../client'
import { toast } from '@/components/ui/use-toast'

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
  return useQuery('user', async () => await getMeFn(), {
    onSuccess: (data) => {
      useUserInfo.getState().storeUserInfo(data)
    }
  })
}

export const useGetMePublic = () => {
  return useQuery('user-public', async () => await getMeFn())
}

export const useLoginPublic = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation(loginUserFn, {
    onSuccess: async (data) => {
      await queryClient.invalidateQueries('user-public')
      useUserPublicToken.getState().storeToken(data.data.accessToken)
      toast({
        title: 'Login Success',
        description: 'You have successfully logged in.'
      })
      navigate('/')
    }
  })
}
