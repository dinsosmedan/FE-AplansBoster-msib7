import { type IType, type IEvents, type IEvent } from '@/lib/types/event.type'
import { type eventFields } from '@/lib/validations/event.validation'
import api from './axiosInstance'

export const getEventFn = async (status?: string, year?: string, page?: string): Promise<IEvents> => {
  const response = await api.get(`/event?year=${year ?? ''}&status=${status ?? ''}&page=${page ?? ''}`)
  return response.data
}

export const getEventTuitionAssistanceFn = async (year: string, status: string): Promise<IEvents> => {
  const response = await api.get(`/event/tuition-assistance?year=${year}&status=${status}`)
  return response.data
}

export const showEventFn = async (id: string): Promise<IEvent> => {
  const response = await api.get(`/event/${id}`)
  return response.data?.data
}

export const getEventTypeFn = async (): Promise<IType[]> => {
  const response = await api.get('/event/type')
  return response.data?.data
}

export const storeEventFn = async (fields: eventFields) => {
  const formData = new FormData()

  formData.append('eventType', fields.eventType)
  formData.append('eventDescription', fields.eventDescription as string)
  formData.append('startDate', fields.startDate as string)
  formData.append('endDate', fields.endDate as string)
  formData.append('isActive', fields.isActive ? '1' : '0')
  formData.append('batch', fields.batch)
  formData.append('quota', fields.quota as unknown as string)

  if (
    Array.isArray(fields.scholarshipAnnouncementLetter) &&
    fields.scholarshipAnnouncementLetter.length > 0 &&
    fields.scholarshipAnnouncementLetter[0] instanceof File
  ) {
    formData.append('scholarshipAnnouncementLetter', fields.scholarshipAnnouncementLetter[0])
  }

  if (
    Array.isArray(fields.scholarshipApplicationLetter) &&
    fields.scholarshipApplicationLetter.length > 0 &&
    fields.scholarshipApplicationLetter[0] instanceof File
  ) {
    formData.append('scholarshipApplicationLetter', fields.scholarshipApplicationLetter[0])
  }

  if (Array.isArray(fields.biodata) && fields.biodata.length > 0 && fields.biodata[0] instanceof File) {
    formData.append('biodata', fields.biodata[0])
  }

  if (
    Array.isArray(fields.nonReceiptOfScholarshipLetter) &&
    fields.nonReceiptOfScholarshipLetter.length > 0 &&
    fields.nonReceiptOfScholarshipLetter[0] instanceof File
  ) {
    formData.append('nonReceiptOfScholarshipLetter', fields.nonReceiptOfScholarshipLetter[0])
  }

  if (
    Array.isArray(fields.nonGovernmentEmployeeLetter) &&
    fields.nonGovernmentEmployeeLetter.length > 0 &&
    fields.nonGovernmentEmployeeLetter[0] instanceof File
  ) {
    formData.append('nonGovernmentEmployeeLetter', fields.nonGovernmentEmployeeLetter[0])
  }

  await api.post('/event', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const deleteEventFn = async (id: string) => {
  await api.delete(`/event/${id}`)
}

interface IUpdateEvent {
  id: string
  fields: eventFields
}

export const updateEventFn = async ({ id, fields }: IUpdateEvent) => {
  const formData = new FormData()

  formData.append('eventType', fields.eventType)
  formData.append('eventDescription', fields.eventDescription as string)
  formData.append('startDate', fields.startDate as string)
  formData.append('endDate', fields.endDate as string)
  formData.append('isActive', fields.isActive ? '1' : '0')
  formData.append('batch', fields.batch)
  formData.append('quota', fields.quota as unknown as string)
  formData.append('_method', 'PUT')

  if (
    Array.isArray(fields.scholarshipAnnouncementLetter) &&
    fields.scholarshipAnnouncementLetter.length > 0 &&
    fields.scholarshipAnnouncementLetter[0] instanceof File
  ) {
    formData.append('scholarshipAnnouncementLetter', fields.scholarshipAnnouncementLetter[0])
  }

  if (
    Array.isArray(fields.scholarshipApplicationLetter) &&
    fields.scholarshipApplicationLetter.length > 0 &&
    fields.scholarshipApplicationLetter[0] instanceof File
  ) {
    formData.append('scholarshipApplicationLetter', fields.scholarshipApplicationLetter[0])
  }

  if (Array.isArray(fields.biodata) && fields.biodata.length > 0 && fields.biodata[0] instanceof File) {
    formData.append('biodata', fields.biodata[0])
  }

  if (
    Array.isArray(fields.nonReceiptOfScholarshipLetter) &&
    fields.nonReceiptOfScholarshipLetter.length > 0 &&
    fields.nonReceiptOfScholarshipLetter[0] instanceof File
  ) {
    formData.append('nonReceiptOfScholarshipLetter', fields.nonReceiptOfScholarshipLetter[0])
  }

  if (
    Array.isArray(fields.nonGovernmentEmployeeLetter) &&
    fields.nonGovernmentEmployeeLetter.length > 0 &&
    fields.nonGovernmentEmployeeLetter[0] instanceof File
  ) {
    formData.append('nonGovernmentEmployeeLetter', fields.nonGovernmentEmployeeLetter[0])
  }

  await api.post(`/event/${id}`, formData)
}
