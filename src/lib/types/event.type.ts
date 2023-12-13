import { type IMeta } from './dayasos.type'

export interface IType {
  id: string
  name: string
  code: string
  createdAt: string
  updatedAt: string
}
export interface IEvent {
  id: string
  type: IType
  eventDescription: string
  startDate: string
  endDate: string
  status: string
  batch: string
  quota: number
  filledQuota: number
  requiredDocuments: null | string
  createdAt: string
  updatedAt: string
}

export interface IEvents {
  data: IEvent[]
  meta: IMeta
}
