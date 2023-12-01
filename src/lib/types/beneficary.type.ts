import { type IArea } from '@/api/area.api'

interface IAddress {
  fullAddress: string
  areaLevel3: IArea | null
  areaLevel4: IArea | null
}

interface IFamilyMember {
  id: string
  identityNumber: string
  familyCardNumber: string
  name: string
  birthDate: string
  age: number
  birthPlace: string
  gender: string
  lastEducation: null | string
  religion: string
  occupation: string
  maritalStatus: null | string
  citizenship: null | string
  familyRelationship: string
  bloodType: null | string
  fatherName: null | string
  motherName: string
  isDtks: boolean
  createdAt: string
  updatedAt: string
}

export interface IBeneficary {
  id: string
  identityNumber: string
  familyCardNumber: string
  name: string
  address: IAddress
  birthDate: string
  age: number
  birthPlace: string
  gender: string
  lastEducation: null | string
  religion: string
  occupation: string
  maritalStatus: null | string
  citizenship: null | string
  familyRelationship: string
  bloodType: null | string
  fatherName: null | string
  motherName: string
  familyMembers: IFamilyMember[]
  isDtks: boolean
  createdAt: string
  updatedAt: string
}

interface IAssistanceProduct {
  id: string
  name: string
  code: string
  createdAt: string
  updatedAt: string
}

interface IAssistanceDetail {
  id: string
  type: string
  createdAt: string
  updatedAt: string
}
export interface IAssistanceHistory {
  id: string
  product: IAssistanceProduct
  year: string
  status: string
  detail: IAssistanceDetail
  createdAt: string
  updatedAt: string
}
