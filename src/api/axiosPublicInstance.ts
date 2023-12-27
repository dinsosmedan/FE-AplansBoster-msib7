import axios from 'axios'
// import { useUserPublicToken } from '@/store/client'
import ENV from '@/lib/environment'
import { useAuth } from '@/store/client'

const axiosPublic = axios.create({
  baseURL: ENV.apiUrl,
  headers: {
    Accept: 'application/json'
  }
})

axiosPublic.defaults.headers.post['Content-Type'] = 'application/json'

axiosPublic.interceptors.request.use(
  (config) => {
    // const token = useUserPublicToken.getState().token
    const auth = useAuth.getState()

    if (auth?.token && auth.user?.role === null) {
      config.headers.Authorization = `Bearer ${auth.token}`
    }
    return config
  },
  async (error) => await Promise.reject(error)
)

axiosPublic.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      // useUserPublicToken.getState().removeToken()
      useAuth.getState().removeToken()
      window.location.href = '/user/login'
    }

    if (error.response.status === 403) {
      window.location.href = '/permission-denied'
    }
    return await Promise.reject(error)
  }
)

export default axiosPublic
