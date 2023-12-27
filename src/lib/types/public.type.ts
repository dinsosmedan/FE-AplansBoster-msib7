import { type IBeneficary, type IAssistanceHistory } from './beneficary.type'
import { type IAddress } from './dayasos.type'
import { type IEvent } from './event.type'
import { type IPath } from './service.type'

export interface IAssistanceCheck {
  id: string
  identityNumber: string
  name: string
  address: IAddress
  isDtks: boolean
  assistances: IAssistanceHistory[]
  createdAt: string
  updatedAt: string
}

export interface IUniversity {
  id: string
  name: string
  code: string
}

export interface IBank {
  id: string
  name: string
  bankPassword: string
  principle: string
  ownership: string
  establishedAt: string
  createdAt: string
  updatedAt: string
}

export interface IPublicEventTuition {
  id: string
  eventDescription: string
  startDate: string
  endDate: string
  isActive: boolean
  status: string
  batch: string
  quota: number
  filledQuota: number
  requiredDocuments: {
    biodata: IPath | null
    nonGovernmentEmployeeLetter: IPath | null
    scholarshipApplicationLetter: IPath | null
    nonReceiptOfScholarshipLetter: IPath | null
    scholarshipAnnouncementLetter: IPath | null
  } | null
}

export interface ITuitionApplicationPublic {
  id: string
  beneficiary: IBeneficary
  event: IEvent
  email: string
  phoneNumber: string
  university: {
    id: string
    name: string
  }
  studyProgram: {
    id: string
    name: string
  }
  semester: number
  gpa: string
  tuitionFee: number
  bank: IBank
  bankAccNumber: string
  bankAccName: string
  application_status: string
  message: string
  dtksStatus: string
  documents: {
    applicationLetter: null | IPath
    photo: null | IPath
    familyCard: null | IPath
    identityCard: null | IPath
    studentCard: null | IPath
    activeStudentCertificate: null | IPath
    noScholarshipStatement: null | IPath
    noGovernmentEmployeeStatement: null | IPath
    biodata: null | IPath
    dtksPrintout: null | IPath
    passBook: null | IPath
    tuitionReceipt: null | IPath
    gradeTranscript: null | IPath
    createdAt: string
    updatedAt: string
  }
  createdAt: string
  updatedAt: string
}
