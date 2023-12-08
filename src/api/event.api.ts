import ENV from '@/lib/environment'
import { type IEvent } from '@/lib/types/event.type'
import axios from 'axios'

const apiPublic = axios.create({
  baseURL: ENV.apiUrl,
  headers: { Accept: 'application/json' }
})

apiPublic.defaults.headers.post['Content-Type'] = 'application/json'

export const getEventFn = async (): Promise<IEvent[]> => {
  const response = await apiPublic.get('/event')
  return response.data?.data
}
