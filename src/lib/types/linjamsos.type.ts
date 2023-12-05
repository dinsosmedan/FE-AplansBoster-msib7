import { type IBeneficary } from './beneficary.type'
import { type IMeta } from './dayasos.type'

export interface IVulnerableGroupHandling {
  success: boolean
  message: string
  data: Array<{
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
  }>
  meta: IMeta
}
export interface IUnregister {
  success: boolean
  message: string
  data: Array<{
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
  }>
  meta: IMeta
}
