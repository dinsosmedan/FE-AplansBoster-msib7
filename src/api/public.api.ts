import ENV from '@/lib/environment'
import { type IApplication, type IUniversity } from '@/lib/types/linjamsos.type'
import {
  type IBank,
  type IAssistanceCheck,
  type IPublicEventTuition,
  type ITuitionApplicationPublic
} from '@/lib/types/public.type'
import {
  type DtksSchoolFields,
  type DtksCourtsFields,
  type publicEventTuitionFields,
  type PublicDTKSFields,
  type NonDtksCourtsFields,
  type NonDtksSchoolFields
} from '@/lib/validations/landingPage/public.validation'
import axios from 'axios'
import axiosPublic from './axiosPublicInstance'
import { type IDTKSApplication, type IIndigencyCertificate } from '@/lib/types/service.type'

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
export const storePublicEventDtksFn = async (fields: PublicDTKSFields) => {
  const formData = new FormData()
  formData.append('identityNumber', fields.identityNumber)
  formData.append('familyCardNumber', fields.identityNumber)
  formData.append('name', fields.name)
  formData.append('birthPlace', fields.birthPlace)
  formData.append('birthDate', fields.birthDate as unknown as string)
  formData.append('motherName', fields.motherName)
  formData.append('gender', fields.gender)
  formData.append('occupation', fields.occupation)
  formData.append('maritalStatus', fields.maritalStatus)
  formData.append('areaLevel3', fields.areaLevel3)
  formData.append('areaLevel4', fields.areaLevel4)
  formData.append('address', fields.address)
  formData.append('question1', fields.question1.toString())
  formData.append('question2', fields.question2.toString())
  formData.append('question3', fields.question3.toString())
  formData.append('question4', fields.question4.toString())
  formData.append('question5', fields.question5.toString())
  formData.append('question6', fields.question6.toString())
  formData.append('question7', fields.question7.toString())
  formData.append('question8', fields.question8.toString())
  formData.append('question9', fields.question9.toString())
  formData.append('question10', fields.question9.toString())
  formData.append('assistanceProgram', fields.assistanceProgram)
  formData.append('disabilityStatus', fields.disabilityStatus)
  formData.append('pregnantDate', fields.pregnantDate as unknown as string)
  formData.append('familyRelationship', fields.familyRelationship)
  formData.append('remoteIndigenousStatus', fields.remoteIndigenousStatus)
  formData.append('tribeName', fields.tribeName)

  if (Array.isArray(fields.indentityPath) && fields.indentityPath.length > 0) {
    formData.append('indentityPath', fields.indentityPath[0])
  }

  if (Array.isArray(fields.housePath) && fields.housePath.length > 0) {
    formData.append('housePath', fields.housePath[0])
  }

  await axiosPublic.post('/public/application/dtks', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
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
  if (Array.isArray(data.gradeTranscript) && data.gradeTranscript.length > 0) {
    formdata.append('gradeTranscript', data.gradeTranscript[0] as File)
  }
  if (Array.isArray(data.biodata) && data.biodata.length > 0) {
    formdata.append('biodata', data.biodata[0] as File)
  }

  await axiosPublic.post('/public/application/tuition-assistance', formdata, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const getTuitionApplicationPublicFn = async (): Promise<IApplication[]> => {
  const response = await axiosPublic.get('/public/application/tuition-assistance')
  return response.data?.data
}

export const storeDTKSCourtPublicFn = async (data: DtksCourtsFields) => {
  const formdata = new FormData()
  formdata.append('peopleConcernedIdentityNumber', data.peopleConcernedIdentityNumber)
  formdata.append('peopleConcernedName', data.peopleConcernedName)
  formdata.append('peopleConcernedAreaLevel3', data.peopleConcernedAreaLevel3)
  formdata.append('peopleConcernedAreaLevel4', data.peopleConcernedAreaLevel4)
  formdata.append('peopleConcernedAddress', data.peopleConcernedAddress)
  formdata.append('applicantPhoneNumber', data.applicantPhoneNumber)
  formdata.append('certificateDestination', data.certificateDestination)
  formdata.append('categoryApplication', 'dtks-courts')

  if (Array.isArray(data.petitionLetter) && data.petitionLetter.length > 0) {
    formdata.append('petitionLetter', data.petitionLetter[0] as File)
  }
  if (Array.isArray(data.domicileLetter) && data.domicileLetter.length > 0) {
    formdata.append('domicileLetter', data.domicileLetter[0] as File)
  }
  if (Array.isArray(data.familyCard) && data.familyCard.length > 0) {
    formdata.append('familyCard', data.familyCard[0] as File)
  }
  if (Array.isArray(data.idCard) && data.idCard.length > 0) {
    formdata.append('idCard', data.idCard[0] as File)
  }

  await axiosPublic.post('/public/application/indigency-certificate', formdata, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const storeDTKSSchoolFn = async (data: DtksSchoolFields) => {
  const formdata = new FormData()
  formdata.append('peopleConcernedIdentityNumber', data.peopleConcernedIdentityNumber)
  formdata.append('peopleConcernedName', data.peopleConcernedName)
  formdata.append('peopleConcernedAreaLevel3', data.peopleConcernedAreaLevel3)
  formdata.append('peopleConcernedAreaLevel4', data.peopleConcernedAreaLevel4)
  formdata.append('peopleConcernedAddress', data.peopleConcernedAddress)
  formdata.append('applicantPhoneNumber', data.applicantPhoneNumber)
  formdata.append('certificateDestination', data.certificateDestination)
  formdata.append('educationLevel', data.educationLevel)
  formdata.append('categoryApplication', 'dtks-schools')

  if (Array.isArray(data.petitionLetter) && data.petitionLetter.length > 0) {
    formdata.append('petitionLetter', data.petitionLetter[0] as File)
  }
  if (Array.isArray(data.familyCard) && data.familyCard.length > 0) {
    formdata.append('familyCard', data.familyCard[0] as File)
  }
  if (Array.isArray(data.idCard) && data.idCard.length > 0) {
    formdata.append('idCard', data.idCard[0] as File)
  }
  if (Array.isArray(data.domicileLetter) && data.domicileLetter.length > 0) {
    formdata.append('domicileLetter', data.domicileLetter[0] as File)
  }
  if (Array.isArray(data.schoolLetter) && data.schoolLetter.length > 0) {
    formdata.append('schoolLetter', data.schoolLetter[0] as File)
  }

  await axiosPublic.post('/public/application/indigency-certificate', formdata, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const getIndigencyCertificateApplicationPublicFn = async (): Promise<IIndigencyCertificate[]> => {
  const response = await axiosPublic.get('/public/application/indigency-certificate')
  return response.data?.data
}

export const storeNonDtksCourtsFn = async (data: NonDtksCourtsFields) => {
  const formdata = new FormData()
  formdata.append('peopleConcernedIdentityNumber', data.peopleConcernedIdentityNumber)
  formdata.append('peopleConcernedName', data.peopleConcernedName)
  formdata.append('peopleConcernedAreaLevel3', data.peopleConcernedAreaLevel3)
  formdata.append('peopleConcernedAreaLevel4', data.peopleConcernedAreaLevel4)
  formdata.append('peopleConcernedAddress', data.peopleConcernedAddress)
  formdata.append('applicantPhoneNumber', data.applicantPhoneNumber)
  formdata.append('certificateDestination', data.certificateDestination)
  formdata.append('categoryApplication', 'non-dtks-courts')

  if (Array.isArray(data.petitionLetter) && data.petitionLetter.length > 0) {
    formdata.append('petitionLetter', data.petitionLetter[0] as File)
  }
  if (Array.isArray(data.familyCard) && data.familyCard.length > 0) {
    formdata.append('familyCard', data.familyCard[0] as File)
  }
  if (Array.isArray(data.idCard) && data.idCard.length > 0) {
    formdata.append('idCard', data.idCard[0] as File)
  }
  if (Array.isArray(data.domicileLetter) && data.domicileLetter.length > 0) {
    formdata.append('domicileLetter', data.domicileLetter[0] as File)
  }
  if (Array.isArray(data.salarySlip) && data.salarySlip.length > 0) {
    formdata.append('salarySlip', data.salarySlip[0] as File)
  }
  if (Array.isArray(data.localsApprovalLetter) && data.localsApprovalLetter.length > 0) {
    formdata.append('localsApprovalLetter', data.localsApprovalLetter[0] as File)
  }
  if (Array.isArray(data.lowIncomeLetter) && data.lowIncomeLetter.length > 0) {
    formdata.append('lowIncomeLetter', data.lowIncomeLetter[0] as File)
  }
  if (Array.isArray(data.frontViewHouse) && data.frontViewHouse.length > 0) {
    formdata.append('frontViewHouse', data.frontViewHouse[0] as File)
  }
  if (Array.isArray(data.sittingViewHouse) && data.sittingViewHouse.length > 0) {
    formdata.append('sittingViewHouse', data.sittingViewHouse[0] as File)
  }
  if (Array.isArray(data.chamberViewHouse) && data.chamberViewHouse.length > 0) {
    formdata.append('chamberViewHouse', data.chamberViewHouse[0] as File)
  }
  if (Array.isArray(data.kitchenViewHouse) && data.kitchenViewHouse.length > 0) {
    formdata.append('kitchenViewHouse', data.kitchenViewHouse[0] as File)
  }

  await axiosPublic.post('/public/application/indigency-certificate', formdata, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const storeIndigencyCertificateApplicationNoDTKS = async (data: NonDtksSchoolFields) => {
  const formData = new FormData()
  formData.append('categoryApplication', 'non-dtks-schools')
  formData.append('peopleConcernedIdentityNumber', data.peopleConcernedIdentityNumber)
  formData.append('peopleConcernedName', data.peopleConcernedName)
  formData.append('peopleConcernedAreaLevel3', data.peopleConcernedAreaLevel3)
  formData.append('peopleConcernedAreaLevel4', data.peopleConcernedAreaLevel4)
  formData.append('peopleConcernedAddress', data.peopleConcernedAddress)
  formData.append('applicantPhoneNumber', data.publicPhoneNumber)
  formData.append('certificateDestination', data.certificateDestination)
  formData.append('educationLevel', data.educationLevel)

  if (Array.isArray(data.familyCard) && data.familyCard.length > 0) {
    formData.append('familyCard', data.familyCard[0] as File)
  }
  if (Array.isArray(data.petitionLetter) && data.petitionLetter.length > 0) {
    formData.append('petitionLetter', data.petitionLetter[0] as File)
  }
  if (Array.isArray(data.idCard) && data.idCard.length > 0) {
    formData.append('idCard', data.idCard[0] as File)
  }
  if (Array.isArray(data.domicileLetter) && data.domicileLetter.length > 0) {
    formData.append('domicileLetter', data.domicileLetter[0] as File)
  }
  if (Array.isArray(data.indigencyCertificateApplication) && data.indigencyCertificateApplication.length > 0) {
    formData.append('indigencyCertificateApplication', data.indigencyCertificateApplication[0] as File)
  }
  if (Array.isArray(data.salarySlip) && data.salarySlip.length > 0) {
    formData.append('salarySlip', data.salarySlip[0] as File)
  }
  if (Array.isArray(data.localsApprovalLetter) && data.localsApprovalLetter.length > 0) {
    formData.append('localsApprovalLetter', data.localsApprovalLetter[0] as File)
  }
  if (Array.isArray(data.lowIncomeLetter) && data.lowIncomeLetter.length > 0) {
    formData.append('lowIncomeLetter', data.lowIncomeLetter[0] as File)
  }
  if (Array.isArray(data.sittingViewHouse) && data.sittingViewHouse.length > 0) {
    formData.append('sittingViewHouse', data.sittingViewHouse[0] as File)
  }
  if (Array.isArray(data.chamberViewHouse) && data.chamberViewHouse.length > 0) {
    formData.append('chamberViewHouse', data.chamberViewHouse[0] as File)
  }
  if (Array.isArray(data.kitchenViewHouse) && data.kitchenViewHouse.length > 0) {
    formData.append('kitchenViewHouse', data.kitchenViewHouse[0] as File)
  }
  if (Array.isArray(data.schoolLetter) && data.schoolLetter.length > 0) {
    formData.append('schoolLetter', data.schoolLetter[0] as File)
  }

  await axiosPublic.post('/public/application/indigency-certificate', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const getDTKSApplicationPublicFn = async (): Promise<IDTKSApplication> => {
  const response = await axiosPublic.get('/public/application/dtks')
  return response.data?.data?.[0]
}

export const showTuitionApplicationPublicFn = async (id: string): Promise<ITuitionApplicationPublic> => {
  const response = await axiosPublic.get(`/public/application/tuition-assistance/${id}`)
  return response.data?.data
}

interface updatePublicEventTuitionParams {
  id: string
  fields: IStorePublicEventTuition
}

export const updatePublicEventTuitionFn = async ({ id, fields }: updatePublicEventTuitionParams) => {
  const formdata = new FormData()
  formdata.append('identityNumber', fields.identityNumber)
  formdata.append('event', fields.event)
  formdata.append('name', fields.name)
  formdata.append('birthPlace', fields.birthPlace)
  formdata.append('birthDate', fields.birthDate as string)
  formdata.append('address', fields.address)
  formdata.append('areaLevel3', fields.areaLevel3)
  formdata.append('areaLevel4', fields.areaLevel4)
  formdata.append('gender', fields.gender)
  formdata.append('phoneNumber', fields.phoneNumber)
  formdata.append('email', fields.email)
  formdata.append('universityId', fields.universityId)
  formdata.append('universityName', fields.universityName)
  formdata.append('studyProgramId', fields.studyProgramId)
  formdata.append('studyProgramName', fields.studyProgramName)
  formdata.append('semester', fields.semester as unknown as string)
  formdata.append('gpa', fields.gpa as unknown as string)
  formdata.append('tuitionFee', fields.tuitionFee as unknown as string)
  formdata.append('bankAccountNumber', fields.bankAccountNumber)
  formdata.append('bankAccountName', fields.bankAccountName)
  formdata.append('bank', fields.bank)
  formdata.append('_method', 'PUT')

  if (Array.isArray(fields.photo) && fields.photo.length > 0 && fields.photo[0] instanceof File) {
    formdata.append('photo', fields.photo[0])
  }
  if (
    Array.isArray(fields.applicationLetter) &&
    fields.applicationLetter.length > 0 &&
    fields.applicationLetter[0] instanceof File
  ) {
    formdata.append('applicationLetter', fields.applicationLetter[0])
  }
  if (Array.isArray(fields.familyCard) && fields.familyCard.length > 0 && fields.familyCard[0] instanceof File) {
    formdata.append('familyCard', fields.familyCard[0])
  }
  if (Array.isArray(fields.identityCard) && fields.identityCard.length > 0 && fields.identityCard[0] instanceof File) {
    formdata.append('identityCard', fields.identityCard[0])
  }
  if (Array.isArray(fields.studentCard) && fields.studentCard.length > 0 && fields.studentCard[0] instanceof File) {
    formdata.append('studentCard', fields.studentCard[0])
  }
  if (
    Array.isArray(fields.tuitionReceipt) &&
    fields.tuitionReceipt.length > 0 &&
    fields.tuitionReceipt[0] instanceof File
  ) {
    formdata.append('tuitionReceipt', fields.tuitionReceipt[0])
  }
  if (
    Array.isArray(fields.activeStudentCertificate) &&
    fields.activeStudentCertificate.length > 0 &&
    fields.activeStudentCertificate[0] instanceof File
  ) {
    formdata.append('activeStudentCertificate', fields.activeStudentCertificate[0])
  }
  if (
    Array.isArray(fields.noScholarshipStatement) &&
    fields.noScholarshipStatement.length > 0 &&
    fields.noScholarshipStatement[0] instanceof File
  ) {
    formdata.append('noScholarshipStatement', fields.noScholarshipStatement[0])
  }
  if (
    Array.isArray(fields.noGovernmentEmployeeStatement) &&
    fields.noGovernmentEmployeeStatement.length > 0 &&
    fields.noGovernmentEmployeeStatement[0] instanceof File
  ) {
    formdata.append('noGovernmentEmployeeStatement', fields.noGovernmentEmployeeStatement[0])
  }
  if (Array.isArray(fields.dtksPrintout) && fields.dtksPrintout.length > 0 && fields.dtksPrintout[0] instanceof File) {
    formdata.append('dtksPrintout', fields.dtksPrintout[0])
  }
  if (Array.isArray(fields.passBook) && fields.passBook.length > 0 && fields.passBook[0] instanceof File) {
    formdata.append('passBook', fields.passBook[0])
  }
  if (
    Array.isArray(fields.gradeTranscript) &&
    fields.gradeTranscript.length > 0 &&
    fields.gradeTranscript[0] instanceof File
  ) {
    formdata.append('gradeTranscript', fields.gradeTranscript[0])
  }
  if (Array.isArray(fields.biodata) && fields.biodata.length > 0 && fields.biodata[0] instanceof File) {
    formdata.append('biodata', fields.biodata[0])
  }

  await axiosPublic.post(`/public/application/tuition-assistance/${id}`, formdata, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
