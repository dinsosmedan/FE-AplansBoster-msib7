import ENV from '@/lib/environment'
import { type IType, type IEvents, type IEvent } from '@/lib/types/event.type'
import { type eventFields } from '@/lib/validations/event.validation'
import axios from 'axios'

const apiPublic = axios.create({
  baseURL: ENV.apiUrl,
  headers: { Accept: 'application/json' }
})

apiPublic.defaults.headers.post['Content-Type'] = 'application/json'

export const getEventFn = async (): Promise<IEvents> => {
  const response = await apiPublic.get('/event')
  return response.data
}

export const getEventTuitionAssistanceFn = async (year: string, status: string): Promise<IEvents> => {
  const response = await apiPublic.get(`/event/tuition-assistance?year=${year}&status=${status}`)
  return response.data
}

export const showEventFn = async (id: string): Promise<IEvent> => {
  const response = await apiPublic.get(`/event/${id}`)
  return response.data?.data
}

export const getEventTypeFn = async (): Promise<IType[]> => {
  const response = await apiPublic.get('/event/type')
  return response.data?.data
}

export const storeEventFn = async (fields: eventFields) => {
  const formData = new FormData()

  formData.append('eventType', fields.eventType)
  formData.append('eventDescription', fields.eventDescription as string)
  formData.append('startDate', fields.startDate as string)
  formData.append('endDate', fields.endDate as string)
  formData.append('isActive', fields.isActive as unknown as string)
  formData.append('batch', fields.batch)
  formData.append('quota', fields.quota as unknown as string)
  formData.append('scholarshipAnnouncementLetter', fields.scholarshipAnnouncementLetter as File)
  formData.append('biodata', fields.biodata as File)
  formData.append('scholarshipApplicationLetter', fields.scholarshipApplicationLetter as File)
  formData.append('nonReceiptOfScholarshipLetter', fields.nonReceiptOfScholarshipLetter as File)
  formData.append('nonGovernmentEmployeeLetter', fields.nonGovernmentEmployeeLetter as File)

  await apiPublic.post('/event', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const deleteEventFn = async (id: string) => {
  await apiPublic.delete(`/event/${id}`)
}
