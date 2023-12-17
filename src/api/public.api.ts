import ENV from '@/lib/environment'
import { type IUniversity } from '@/lib/types/linjamsos.type'
import { type IBank, type IAssistanceCheck, type IPublicEventTuition } from '@/lib/types/public.type'
import { type publicEventTuitionFields } from '@/lib/validations/landingPage/public.validation'
import axios from 'axios'
import axiosPublic from './axiosPublicInstance'

const apiPublic = axios.create({
  baseURL: ENV.apiUrl,
  headers: { Accept: 'application/json' }
})

apiPublic.defaults.headers.post['Content-Type'] = 'application/json'

export const showAssistanceCheckFn = async (nik: string): Promise<IAssistanceCheck> => {
  const response = await apiPublic.get(`/public/assistance-check/${nik}`)
  return response.data?.data
}

export const getUniversitiesFn = async (): Promise<IUniversity[]> => {
  const response = await apiPublic.get('/public/university')
  return response.data?.data
}

export const getStudyProgramsFn = async (universityId: string): Promise<IUniversity[]> => {
  const response = await apiPublic.get(`/public/university/${universityId}/study-program`)
  return response.data?.data
}

export const getBankListFn = async (): Promise<IBank[]> => {
  const response = await apiPublic.get('/bank')
  return response.data?.data
}

export const getPublicEventTuitionFn = async (): Promise<IPublicEventTuition[]> => {
  const response = await apiPublic.get('/public/event/tuition-assistance')
  return response.data?.data
}

interface IStorePublicEventTuition extends publicEventTuitionFields {
  event: string
}

export const storePublicEventTuitionFn = async (data: IStorePublicEventTuition) => {
  const formdata = new FormData()
  formdata.append('identityNumber', data.identityNumber)
  formdata.append('event', data.event)
  formdata.append('name', data.name)
  formdata.append('birthPlace', data.birthPlace)
  formdata.append('birthDate', data.birthDate as string)
  formdata.append('address', data.address)
  formdata.append('areaLevel3', data.areaLevel3)
  formdata.append('areaLevel4', data.areaLevel4)
  formdata.append('gender', data.gender)
  formdata.append('phoneNumber', data.phoneNumber)
  formdata.append('email', data.email)
  formdata.append('universityId', data.universityId)
  formdata.append('universityName', data.universityName)
  formdata.append('studyProgramId', data.studyProgramId)
  formdata.append('studyProgramName', data.studyProgramName)
  formdata.append('semester', data.semester as unknown as string)
  formdata.append('gpa', data.gpa as unknown as string)
  formdata.append('tuitionFee', data.tuitionFee as unknown as string)
  formdata.append('bankAccountNumber', data.bankAccountNumber)
  formdata.append('bankAccountName', data.bankAccountName)
  formdata.append('bank', data.bank)

  if (Array.isArray(data.photo) && data.photo.length > 0) {
    formdata.append('photo', data.photo[0] as File)
  }
  if (Array.isArray(data.applicationLetter) && data.applicationLetter.length > 0) {
    formdata.append('applicationLetter', data.applicationLetter[0] as File)
  }
  if (Array.isArray(data.familyCard) && data.familyCard.length > 0) {
    formdata.append('familyCard', data.familyCard[0] as File)
  }
  if (Array.isArray(data.identityCard) && data.identityCard.length > 0) {
    formdata.append('identityCard', data.identityCard[0] as File)
  }
  if (Array.isArray(data.studentCard) && data.studentCard.length > 0) {
    formdata.append('studentCard', data.studentCard[0] as File)
  }
  if (Array.isArray(data.tuitionReceipt) && data.tuitionReceipt.length > 0) {
    formdata.append('tuitionReceipt', data.tuitionReceipt[0] as File)
  }
  if (Array.isArray(data.activeStudentCertificate) && data.activeStudentCertificate.length > 0) {
    formdata.append('activeStudentCertificate', data.activeStudentCertificate[0] as File)
  }
  if (Array.isArray(data.noScholarshipStatement) && data.noScholarshipStatement.length > 0) {
    formdata.append('noScholarshipStatement', data.noScholarshipStatement[0] as File)
  }
  if (Array.isArray(data.noGovernmentEmployeeStatement) && data.noGovernmentEmployeeStatement.length > 0) {
    formdata.append('noGovernmentEmployeeStatement', data.noGovernmentEmployeeStatement[0] as File)
  }
  if (Array.isArray(data.dtksPrintout) && data.dtksPrintout.length > 0) {
    formdata.append('dtksPrintout', data.dtksPrintout[0] as File)
  }
  if (Array.isArray(data.passBook) && data.passBook.length > 0) {
    formdata.append('passBook', data.passBook[0] as File)
  }
  // if (Array.isArray(data.biodata) && data.biodata.length > 0) {
  //   formdata.append('biodata', data.biodata[0] as File)
  // }
  if (Array.isArray(data.gradeTranscript) && data.gradeTranscript.length > 0) {
    formdata.append('gradeTranscript', data.gradeTranscript[0] as File)
  }

  await axiosPublic.post('/public/application/tuition-assistance', data)
}
