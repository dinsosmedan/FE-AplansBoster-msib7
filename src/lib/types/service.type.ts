import { type IBeneficary } from './beneficary.type'
import { type IMeta } from './dayasos.type'
import { type IDocument, type IUniversity } from './linjamsos.type'

export interface ITuitionAssistanceEvent {
  id: string
  beneficiary: IBeneficary
  email: null
  phoneNumber: null | string
  university: IUniversity
  studyProgram: IUniversity
  semester: null | number
  gpa: null | number
  tuitionFee: null | number
  bankAccNumber: string | null
  bankAccName: null | string
  application_status: string
  message: null | string
  dtksStatus: null | string
  documents: IDocument
  createdAt: string
  updatedAt: string
}

export interface ITuitionAssistanceEvents {
  data: ITuitionAssistanceEvent[]
  meta: IMeta
}
