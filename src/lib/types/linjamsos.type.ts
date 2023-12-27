import { type IBeneficary } from './beneficary.type'
import { type IAddress, type IMeta } from './dayasos.type'
import { type IPath } from './service.type'

export interface IVulnerableGroupHandlingDetail {
  id: string
  beneficiary: IBeneficary
  incidentDate: string
  incidentAddress: string
  bankAccountNumber: string
  bankName: string
  assistanceAmount: number
  budgetYear: string
  createdAt: string
  updatedAt: string
}

export interface IVulnerableGroupHandling {
  success: boolean
  message: string
  data: IVulnerableGroupHandlingDetail[]
  meta: IMeta
}

export interface IUnregisterDetail {
  id: string
  name: string
  age: string
  gender: string
  dinsosLetterNumber: string
  dinsosLetterDate: string
  diseaseDiagnosis: string
  hospitalEntryDate: string
  hospitalLetterNumber: string
  hospitalLetterDate: string
  createdAt: string
  updatedAt: string
}
export interface IUnregister {
  success: boolean
  message: string
  data: IUnregisterDetail[]
  meta: IMeta
}
export interface IApplicant {
  id: string
  identityNumber: string
  familyCardNumber: string
  name: string
  address: IAddress
  birthDate: string
  age: string
  birthPlace: string
  gender: string
  lastEducation: string
  occupation: string
  maritalStatus: string
  citizenship: string
  familyRelationship: string
  bloodType: string
  fatherName: string
  motherName: string
  isDtks: boolean
  createdAt: string
  updatedAt: string
}
export interface IPeopleConcerned {
  id: string
  identityNumber: string
  familyCardNumber: string
  name: string
  address: IAddress
  birthDate: string
  age: string
  birthPlace: string
  gender: string
  lastEducation: string
  occupation: string
  maritalStatus: string
  citizenship: string
  familyRelationship: string
  bloodType: string
  fatherName: string
  motherName: string
  isDtks: boolean
  createdAt: string
  updatedAt: string
}

export interface IIndigencyCertificateDetail {
  id: string
  application: {
    id: string
    applicant: {
      id: string
      name: string
    }
    applicantPhoneNumber: null | string
    peopleConcerned: IPeopleConcerned
    certificateDestination: string
    applicationCategory: null | string
    dtksStatus: string
    applicationStatus: string
    petitionLetterPath: null | IPath
    domicileLetterPath: null | IPath
    familyCardPath: null | IPath
    idCardPath: null | IPath
    educationLevel: null | string
    schoolLetterPath: null | IPath
    salarySlipPath: null | IPath
    localsApprovalLetterPath: null | IPath
    lowIncomeLetterPath: null | IPath
    frontViewHousePath: null | IPath
    sittingViewPath: null | IPath
    chamberViewHousePath: null | IPath
    kitchenViewHousePath: null | IPath
    isApplicationOnline: boolean
    note: null | string
    createdAt: string
    updatedAt: string
  }
  issuedCertificate: null
  issueDate: string
  issueYear: string
  createdAt: string
  updatedAt: string
}

export interface IIndigencyCertificate {
  success: boolean
  message: string
  data: IIndigencyCertificateDetail[]
  meta: IMeta
}
export interface IIndigencyCertificateByID {
  success: boolean
  message: string
  id: string
  applicant: IApplicant
  peopleConcerned: IPeopleConcerned
  application: string
  certificateDestination: string
  issueDate: string
  issueYear: string
  statusDtks: string
  isApplicationOnline: string
  createdAt: string
  updatedAt: string
  meta: IMeta
}
export interface IPremiumAssistanceBenefit {
  success: boolean
  message: string
  data: Array<{
    id: string
    beneficiary: IBeneficary
    type: string
    createdAt: string
    updatedAt: string
  }>
  meta: IMeta
}
export interface IPremiumAssistanceBenefitById {
  success: boolean
  message: string
  id: string
  beneficiary: IBeneficary
  type: string
  createdAt: string
  updatedAt: string
  meta: IMeta
}
export interface IFamilyHope {
  success: boolean
  message: string
  data: Array<{
    id: string
    beneficiary: IBeneficary
    type: string
    createdAt: string
    updatedAt: string
  }>
  meta: IMeta
}
export interface IFamilyHopeId {
  success: boolean
  message: string
  id: string
  beneficiary: IBeneficary
  type: string
  createdAt: string
  updatedAt: string
  meta: IMeta
}
interface IType {
  id: string
  name: string
  code: string
  createdAt: string
  updatedAt: string
}
interface IEvent {
  id: string
  type: IType
  eventDescription: string
  startDate: string
  endDate: string
  isActive: boolean
  batch: string
  quota: string
  createdAt: string
  updatedAt: string
}
export interface IUniversity {
  id: string
  code: string
  name: string
}
export interface IStudyProgram {
  id: string
  name: string
}
export interface IDocument {
  applicationLetter: IPath | null
  photo: IPath | null
  familyCard: IPath | null
  identityCard: IPath | null
  studentCard: IPath | null
  activeStudentCertificate: IPath | null
  noScholarshipStatement: IPath | null
  noGovernmentEmployeeStatement: IPath | null
  biodata: IPath | null
  dtksPrintout: IPath | null
  passBook: IPath | null
  tuitionReceipt: IPath | null
  createdAt: string
  gradeTranscript: IPath | null
  updatedAt: string
}
export interface IApplication {
  id: string
  beneficiary: IBeneficary
  event: IEvent
  email: string
  phoneNumber: string
  university: IUniversity
  studyProgram: IStudyProgram
  semester: number
  gpa: number
  tuitionFee: number | null
  bankAccNumber: string
  bankAccName: string
  application_status: string
  message: string
  dtksStatus: string
  documents: IDocument
  createdAt: string
  updatedAt: string
}
export interface ITuitionAssistance {
  success: boolean
  message: string
  data: Array<{
    id: string
    application: IApplication
    assistanceAmount: number
    disbursementStatus: string
    budgetYear: string
    createdAt: string
    updatedAt: string
  }>
  meta: IMeta
}
export interface ITuitionAssistanceID {
  id: string
  application: IApplication
  assistanceAmount: number
  disbursementStatus: string
  budgetYear: string
  createdAt: string
  updatedAt: string
}
