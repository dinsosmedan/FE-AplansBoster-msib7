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
