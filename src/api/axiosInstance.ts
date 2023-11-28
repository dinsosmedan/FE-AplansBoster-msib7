import axios from 'axios'
import { useToken } from '@/store/client'
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
    const token = useToken.getState().token

    if (token !== '') {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  async (error) => await Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      useToken.getState().removeToken()
      window.location.href = '/'
    }
    return await Promise.reject(error)
  }
)

export default api
