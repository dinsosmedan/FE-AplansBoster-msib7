import { type IMeta } from './dayasos.type'
import { type IPath } from './service.type'

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
  isActive: boolean
  filledQuota: number
  requiredDocuments: {
    biodata: IPath | null
    nonGovernmentEmployeeLetter: IPath | null
    scholarshipApplicationLetter: IPath | null
    nonReceiptOfScholarshipLetter: IPath | null
    scholarshipAnnouncementLetter: IPath | null
  } | null
  createdAt: string
  updatedAt: string
}

export interface IEvents {
  data: IEvent[]
  meta: IMeta
}
