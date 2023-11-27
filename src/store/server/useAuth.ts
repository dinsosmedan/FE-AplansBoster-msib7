import { loginFn } from '@/api/auth.api'
import { type AxiosError } from 'axios'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'

export const useLogin = () => {
  const navigate = useNavigate()
  return useMutation(loginFn, {
    onSuccess: () => {
      //
      navigate('/')

    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 401) {
        // window.alert('Email or password is incorrect')
      }
    }
  })
}
