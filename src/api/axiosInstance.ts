import axios from 'axios'
import { useAuth } from '@/store/client'
import ENV from '@/lib/environment'

const api = axios.create({
  baseURL: ENV.apiUrl,
  headers: {
    Accept: 'application/json'
  }
})

api.defaults.headers.post['Content-Type'] = 'application/json'

api.interceptors.request.use(
  (config) => {
    // const token = useToken.getState().token
    const auth = useAuth.getState()

    if (auth?.token && auth.user?.role !== null) {
      config.headers.Authorization = `Bearer ${auth.token}`
    }
    return config
  },
  async (error) => await Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      // useToken.getState().removeToken()
      useAuth.getState().removeToken()
      window.location.href = '/login'
    }

    if (error.response.status === 403) {
      window.location.href = '/permission-denied'
    }

    return await Promise.reject(error)
  }
)

export default api
