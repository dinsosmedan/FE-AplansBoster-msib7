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

export interface IPath {
  storage: string
  url: string
  originalName: string
}

export interface IIndigencyCertificate {
  id: string
  user: {
    id: string
    name: string
  }
  applicant: {
    id: string
    name: string
  }
  applicantPhoneNumber: string
  peopleConcerned: IBeneficary
  certificateDestination: string
  applicationCategory: string
  dtksStatus: string
  applicationStatus: string
  petitionLetterPath: null | IPath
  domicileLetterPath: null | IPath
  familyCardPath: null | IPath
  idCardPath: null | IPath
  educationLevel: string
  schoolLetterPath: null | IPath
  salarySlipPath: null | IPath
  localsApprovalLetterPath: null | IPath
  lowIncomeLetterPath: null | IPath
  frontViewHousePath: null | IPath
  sittingViewPath: null | IPath
  chamberViewHousePath: null | IPath
  kitchenViewHousePath: null | IPath
  isApplicationOnline: boolean
  note: string
  createdAt: string
  updatedAt: string
}

export interface IIndigencyCertificates {
  data: IIndigencyCertificate[]
  meta: IMeta
}
