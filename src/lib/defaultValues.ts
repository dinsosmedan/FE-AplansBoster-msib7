import { type pokmasFields } from './validations/dayasos.validation'

export const POKMAS_DEFAULT_VALUES: pokmasFields = {
  applicantPhoneNumber: '',
  communityName: '',
  communityAddress: '',
  communityActivityCode: '',
  communityActivityTypeDescription: '',
  communityAssistanceType: '',
  areaLevel3: '',
  areaLevel4: '',
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
