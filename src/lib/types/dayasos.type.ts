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
