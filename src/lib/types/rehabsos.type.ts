import { type IArea } from '@/api/area.api'
import { type IBeneficary } from './beneficary.type'

export interface IWorshipPlaceDetail {
  id: string
  name: string
  type: string
  address: string
  areaLevel3: IArea | null
  areaLevel4: IArea | null
  picName: string
  picPhone: string
  status: string
  note: string
  year: string
  createdAt: string
  updatedAt: string
}
export interface IWorshipPlace {
  success: boolean
  message: string
  data: IWorshipPlaceDetail[]
  meta: IMeta
}

export interface IServiceType {
  id: string
  name: string
  code: string
}

export interface IAddress {
  fullAddress: string
  areaLevel3: IArea | null
  areaLevel4: IArea | null
}

export interface IServiceFund {
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
}

export interface IServiceFunds {
  success: boolean
  message: string
  data: IServiceFund[]
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

export interface IOrganizationGrantAssistances {
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
}

export interface IOrganizationGrantAssistance {
  success: boolean
  message: string
  data: IOrganizationGrantAssistances[]
  meta: IMeta
}

export interface IVeteranDetail {
  id: string
  beneficiary: IBeneficary
  veteranIdentityNumber: string
  veteranUnit: string
  uniformSize: null | string
  isActive: string
  createdAt: string
  updatedAt: string
}

export interface IVeteran {
  success: boolean
  message: string
  data: IVeteranDetail[]
  meta: IMeta
}
export interface IBusinessAddress {
  fullAddress: string
  areaLevel3: IArea | null
  areaLevel4: IArea | null
}

export interface ICommunityGroup {
  id: string
  productId: string
  address: IAddress
  communityName: string
  communityActivityCode: string
  communityAddress: string | null
  communityActivityTypeDescription: string
  communityAssistanceType: string
  applicantPhoneNumber: string | null
  requestedRabAmount: number
  requestedBansosAmount: number
  approvedFundAmount: number
  executionDate: string | null
  executionPlace: string | null
  applicationYear: string
  membersCount: number
  bankName: string
  bankAccNumber: string
  bankAccName: null | string
  bankAccAddress: string | null
  members: Array<{
    id: string
    beneficiary: IBeneficary
    position: string
  }>
  statusDisimbursement: string | null
  note: string
  createdAt: string
  updatedAt: string
}

export interface ICommunityGroups {
  success: boolean
  message: string
  data: ICommunityGroup[]
  meta: IMeta
}

export interface IBusinessGroupDetail {
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
  members: Array<{
    id: string
    identityNumber: string
    position: string
  }> | null
}
export interface IBusinessGroup {
  success: boolean
  message: string
  data: IBusinessGroupDetail[]
  meta: IMeta
}

export interface IFuelCashAssistances {
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
export interface IFuelCashAssistance {
  success: boolean
  message: string
  id: string
  beneficiary: IBeneficary
  type: string
  createdAt: string
  updatedAt: string
  meta: IMeta
}
export interface INonCashFoodAssistanceBeneficiarys {
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
export interface INonCashFoodAssistanceBeneficiary {
  success: boolean
  message: string
  id: string
  beneficiary: IBeneficary
  type: string
  createdAt: string
  updatedAt: string
  meta: IMeta
}
