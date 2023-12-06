import { type IAssistanceHistory } from './beneficary.type'
import { type IAddress } from './dayasos.type'

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
