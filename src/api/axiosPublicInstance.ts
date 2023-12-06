import axios from 'axios'
import { useUserPublicToken } from '@/store/client'
import ENV from '@/lib/environment'

const axiosPublic = axios.create({
  baseURL: ENV.apiUrl,
  headers: {
    Accept: 'application/json'
  }
})

axiosPublic.defaults.headers.post['Content-Type'] = 'application/json'

axiosPublic.interceptors.request.use(
  (config) => {
    const token = useUserPublicToken.getState().token

    if (token !== '') {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  async (error) => await Promise.reject(error)
)

axiosPublic.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      useUserPublicToken.getState().removeToken()
      window.location.href = '/user/login'
    }
    return await Promise.reject(error)
  }
)

export default axiosPublic
