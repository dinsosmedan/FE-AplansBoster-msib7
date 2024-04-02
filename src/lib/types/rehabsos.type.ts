import { type IMeta } from './dayasos.type'

export interface IElderlyCashSocialAssistanceDetail {
  no: string
  id: string
  nokk: string
  nik: string
  tmpt_lahir: string
  product_id: string
  tgl_lahir: string
  nama: string
  alamat: string
  kecamatan: string
  kelurahan: string
  tahun: string
  created_at: string
  updated_at: string
}

export interface IElderlyCashSocialAssistance {
  success: boolean
  message: string
  data: IElderlyCashSocialAssistanceDetail[]
  meta: IMeta
}

export interface IDisabilitySocialAssistanceDetail {
  no: string
  id: string
  nama: string
  nik: string
  product_id: string
  tmpt_tgl_lahir: string
  alamatkk: string
  alamatdomisili: string
  kecamatan: string
  ppks_type: string
  tahun: string
  created_at: string
  updated_at: string
}

export interface IDisabilitySocialAssistance {
  success: boolean
  message: string
  data: IDisabilitySocialAssistanceDetail[]
  meta: IMeta
}

export interface IFinancialAssistanceForNonOrpahangesDetail {
  no: string
  id: string
  nama: string
  nik: string
  product_id: string
  tmpt_tgl_lahir: string
  alamatkk: string
  alamatdomisili: string
  kecamatan: string
  ppks_type: string
  tahun: string
  created_at: string
  updated_at: string
}

export interface IFinancialAssistanceForNonOrpahanges {
  success: boolean
  message: string
  data: IFinancialAssistanceForNonOrpahangesDetail[]
  meta: IMeta
}

export interface IOperationLicenseOfSocialInstitutionDetail {
  no: string
  id: string
  nama: string
  nik: string
  product_id: string
  tmpt_tgl_lahir: string
  alamatkk: string
  alamatdomisili: string
  kecamatan: string
  ppks_type: string
  tahun: string
  created_at: string
  updated_at: string
}

export interface IOperationLicenseOfSocialInstitution {
  success: boolean
  message: string
  data: IOperationLicenseOfSocialInstitutionDetail[]
  meta: IMeta
}

export interface INeedForSocialWelfareServicesDetail {
  no: string
  id: string
  nama: string
  nik: string
  product_id: string
  tmpt_tgl_lahir: string
  alamatkk: string
  alamatdomisili: string
  kecamatan: string
  ppks_type: string
  tahun: string
  created_at: string
  updated_at: string
}

export interface INeedForSocialWelfareServices {
  success: boolean
  message: string
  data: INeedForSocialWelfareServicesDetail[]
  meta: IMeta
}
