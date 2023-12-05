import { type pokmasFields } from './validations/dayasos.validation'

export const POKMAS_DEFAULT_VALUES: pokmasFields = {
  executionDate: '',
  applicantPhoneNumber: '',
  communityName: '',
  communityAddress: '',
  communityActivityCode: '',
  communityActivityTypeDescription: '',
  communityAssistanceType: '',
  areaLevel3: '',
  areaLevel4: '',
  requestedRabAmount: '',
  requestedBansosAmount: '',
  approvedFundAmount: '',
  applicationYear: '',
  bankName: '',
  bankAccName: '',
  bankAccNumber: '',
  bankAccAddress: '',
  statusDisimbursement: '',
  note: '',
  executionPlace: '',
  members: [
    {
      nik: '',
      position: '',
      beneficiary: ''
    }
  ]
}

export const DTKS_DEFAULT_VALUES = {
  kecamatan: '',
  kelurahan: '',
  nama: '',
  nik: '',
  kk: '',
  bpnt: '',
  blt: '',
  pbi: '',
  pkh: ''
}
