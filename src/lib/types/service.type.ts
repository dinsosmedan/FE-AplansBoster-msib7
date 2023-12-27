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
  bank: {
    id: string
    name: string
  }
  bankAccNumber: string | null
  tuitionAssistance: {
    assistanceAmount: null | number
    budgetYear: null | number
  } | null
  bankAccName: null | string
  application_status: string | null
  certificateDestination: string | null
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
  indigencyCertificate: {
    id: string
    issuedCertificate: {
      storage: string
      originalName: string
      originalPath: string
    } | null
    issueDate: string
    issueYear: string
    createdAt: string
    updatedAt: string
  } | null
  createdAt: string
  updatedAt: string
}

export interface IIndigencyCertificates {
  data: IIndigencyCertificate[]
  meta: IMeta
}

export interface IDTKSApplication {
  id: string
  beneficiary: IBeneficary
  question1: boolean
  question2: boolean
  question3: boolean
  question4: boolean
  question5: boolean
  question6: boolean
  question7: boolean
  question8: boolean
  question9: boolean
  question10: boolean
  assistanceProgram: string
  disabilityStatus: string
  pregnantDate: string
  remoteIndigenousStatus: boolean
  housePath: null | IPath
  indentityPath: null | IPath
  tribeName: string
  isApproved: boolean
  createdAt: string
  updatedAt: string
}

export interface IDTKSApplications {
  data: IDTKSApplication[]
  meta: IMeta
}
