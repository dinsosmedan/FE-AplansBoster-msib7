import { type IArea } from '@/api/area.api'
import { type IBeneficary } from './beneficary.type'

export interface IWorshipPlace {
  id: string
  name: string
  type: string
  address: string
  areaLevel3: IArea | null
  areaLevel4: IArea | null
  picName: string
  picPhone: string
  status: null | string
  note: null | string
  createdAt: string
  updatedAt: string
}

export interface IServiceType {
  id: string
  name: string
  code: string
}

interface IAddress {
  fullAddress: string
  areaLevel3: IArea | null
  areaLevel4: IArea | null
}
export interface IServiceFunds {
  success: boolean
  message: string
  data: Array<{
    id: string
    beneficiary: IBeneficary
    serviceType: IServiceType
    dutyPlace: string
    dutyAddress: string
    bankName: string
    bankAccountNumber: string
    bankAccountName: string
    bankBranchName: string
    status: null | string
    phoneNumber: string
    budgetYear: string
    assistanceAmount: null | number
    createdAt: string
    updatedAt: string
  }>
  meta: IMeta
}

export interface IMeta {
  total: number
  perPage: number
  currentPage: number
  lastPage: number
  hasNext: boolean
  hasPrevious: boolean
}

export interface IOrganizationGrantAssistance {
  success: boolean
  message: string
  data: Array<{
    id: string
    name: string
    address: IAddress
    chairmanName: string
    chairmanIdentityNumber: string
    secretaryName: string
    secretaryIdentityNumber: string
    treasurerName: string
    treasurerIdentityNumber: string
    contactNumber: string
    bankAccountNumber: string
    bankName: string
    bankAccountName: string
    bankAccountAddress: string
    requestedAmount: number
    aprrovedAmount: number
    firstDisbursementAmount: number
    secondDisbursementAmount: number
    budgetYear: string
    note: string
    createdAt: string
    updatedAt: string
  }>
  meta: IMeta
}

export interface IVeteran {
  success: boolean
  message: string
  data: Array<{
    id: string
    beneficiary: IBeneficary
    veteranIdentityNumber: string
    veteranUnit: string
    uniformSize: null | string
    isActive: string
    createdAt: string
    updatedAt: string
  }>
  meta: IMeta
}
export interface IBusinessAddress {
  fullAddress: string
  areaLevel3: IArea | null
  areaLevel4: IArea | null
}
export interface ICommunityGroups {
  success: boolean
  message: string
  data: Array<{
    id: string
    productId: string
    address: IAddress
    communityName: string
    communityActivityCode: string
    communityActivityTypeDescription: string
    communityAssistanceType: string
    requestedRabAmount: number
    requestedBansosAmount: number
    approvedFundAmount: number
    executionDate: string | null
    executionPlace: string | null
    applicationYear: string
    membersCount: number
    members: Array<{
      id: string
      beneficiaryId: string
      position: string
    }>
    statusDisimbursement: string | null
    note: string
    createdAt: string
    updatedAt: string
  }>
  meta: IMeta
}
export interface IBusinessGroup {
  success: boolean
  message: string
  data: Array<{
    id: string
    businessName: string
    businessType: string
    businessAddress: IBusinessAddress
    membersCount: number
    assistanceAmount: number
    budgetYear: string
    status: string
    note: string
    createdAt: string
    updatedAt: string
  }>
  meta: IMeta
}
