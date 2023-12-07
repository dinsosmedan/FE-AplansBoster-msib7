import { type IBeneficary } from './beneficary.type'
import { type IAddress, type IMeta } from './dayasos.type'

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
  deseaseDiagnosis: string
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

export interface IIndigencyCertificate {
  success: boolean
  message: string
  data: Array<{
    id: string
    applicant: IApplicant
    peopleConcerned: IPeopleConcerned
    certificateDestination: string
    issueDate: string
    issueYear: string
    isDtks: boolean
    createdAt: string
    updatedAt: string
  }>
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
