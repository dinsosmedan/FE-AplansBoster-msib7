import { loginFn } from '@/api/auth.api'
import { type AxiosError } from 'axios'
import { useMutation } from 'react-query'

export const useLogin = () => {
  return useMutation(loginFn, {
    onSuccess: () => {
      //
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 401) {
        window.alert('Email or password is incorrect')
      }
    }
  })
}
