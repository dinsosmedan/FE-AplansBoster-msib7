import * as Yup from 'yup'

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const vulnerableGroupHandlingValidation = Yup.object({
  beneficiary: Yup.string().required('NIK harus diisi'),
  incidentDate: Yup.mixed().test('incidentDate', 'Tanggal kejadian wajib diisi', function (value) {
    return (
      value instanceof Date || // Check if it's a Date object
      (typeof value === 'string' && !isNaN(Date.parse(value))) // Check if it's a parseable string
    )
  }),
  incidentAddress: Yup.string().required('Alamat kejadian wajib diisi'),
  bankAccountNumber: Yup.string().required('Nomor rekening wajib diisi'),
  bankName: Yup.string().required('Nama bank wajib diisi'),
  assistanceAmount: Yup.number().required('Jumlah bantuan wajib diisi'),
  budgetYear: Yup.string().matches(/^\d{4}$/, 'Format tahun tidak valid. Harap masukkan tahun dengan format YYYY')
})

export type vulnerableGroupHandlingFields = Yup.InferType<typeof vulnerableGroupHandlingValidation>

export const unregisterValidation = Yup.object({
  name: Yup.string().required('Nama harus diisi'),
  age: Yup.string().max(30, 'Maksimal 30 karakter').required('Umur harus diisi'),
  gender: Yup.string().required('Jenis kelamin harus diisi'),
  dinsosLetterNumber: Yup.string().required('Nomor surat keterangan wajib diisi').max(255, 'Maksimal 255 karakter'),
  dinsosLetterDate: Yup.mixed().test('dinsosLetterDate', 'Tanggal surat harus diisi', function (value) {
    return (
      value instanceof Date || // Check if it's a Date object
      (typeof value === 'string' && !isNaN(Date.parse(value))) // Check if it's a parseable string
    )
  }),
  diseaseDiagnosis: Yup.string().required('Diagnosa penyakit harus diisi').max(255, 'Maksimal 255 karakter'),
  hospitalEntryDate: Yup.mixed().test('hospitalEntryDate', 'Tanggal masuk rumah sakit harus diisi', function (value) {
    return (
      value instanceof Date || // Check if it's a Date object
      (typeof value === 'string' && !isNaN(Date.parse(value))) // Check if it's a parseable string
    )
  }),
  hospitalLetterNumber: Yup.string().required('Nomor surat keterangan wajib diisi').max(255, 'Maksimal 255 karakter'),
  hospitalLetterDate: Yup.mixed().test('hospitalLetterDate', 'Tanggal surat rumah sakit harus diisi', function (value) {
    return (
      value instanceof Date || // Check if it's a Date object
      (typeof value === 'string' && !isNaN(Date.parse(value))) // Check if it's a parseable string
    )
  })
})

export type unregisterFields = Yup.InferType<typeof unregisterValidation>

export const tuitionAssistanceValidation = Yup.object({
  beneficiary: Yup.string().required('NIK harus diisi'),
  event: Yup.string().required('Nama kegiatan wajib diisi'),
  phoneNumber: Yup.string()
    .matches(phoneRegExp, 'Nomor telepon tidak valid')
    .min(7, 'Nomor telepon minimal 7 karakter')
    .max(20, 'Nomor telepon maksimal 20 karakter')
    .required('Nomor Telepon wajib diisi'),
  email: Yup.string().email('Email tidak valid').required('Email wajib diisi'),
  universityId: Yup.string().required('Nama universitas wajib diisi'),
  universityName: Yup.string().required('Nama universitas wajib diisi'),
  studyProgramId: Yup.string().required('Nama program studi wajib diisi'),
  studyProgramName: Yup.string().required('Nama program studi wajib diisi'),
  semester: Yup.number().required('Semester wajib diisi'),
  gpa: Yup.number().required('IPK wajib diisi'),
  tuitionFee: Yup.number().required('Biaya kuliah wajib diisi'),
  bankAccountNumber: Yup.string().required('Nomor rekening wajib diisi'),
  bankAccountName: Yup.string().required('Nama pemilik rekening wajib diisi'),
  bank: Yup.string().required('Nama bank wajib diisi')
})

export type tuitionAssistanceFields = Yup.InferType<typeof tuitionAssistanceValidation>

export const updateTuitionAssistanceValidation = Yup.object({
  event: Yup.string(),
  phoneNumber: Yup.string()
    .matches(phoneRegExp, 'Nomor telepon tidak valid')
    .min(7, 'Nomor telepon minimal 7 karakter')
    .max(20, 'Nomor telepon maksimal 20 karakter'),
  email: Yup.string().email('Email tidak valid'),
  universityId: Yup.string(),
  universityName: Yup.string(),
  studyProgramId: Yup.string(),
  studyProgramName: Yup.string(),
  semester: Yup.number(),
  gpa: Yup.number(),
  tuitionFee: Yup.number(),
  bankAccountNumber: Yup.string(),
  bankAccountName: Yup.string(),
  bank: Yup.string()
})

export type updateTuitionAssistanceFields = Yup.InferType<typeof updateTuitionAssistanceValidation>

export const indigencyCertificateValidation = Yup.object({
  applicant: Yup.string().required('NIK harus diisi'),
  peopleConcerned: Yup.string().required('Nama yang bersangkutan harus diisi'),
  certificateDestination: Yup.string().required('Tujuan surat keterangan harus diisi'),
  statusDtks: Yup.string().required('Status DTKS harus diisi'),
  categoryApplication: Yup.string().required('Kategori permohonan harus diisi')
})

export type indigencyCertificateFields = Yup.InferType<typeof indigencyCertificateValidation>

export const updateTuitionAssistanceServiceValidation = Yup.object({
  applicationStatus: Yup.string().required('Status wajib diisi'),
  message: Yup.string()
})

export type updateTuitionAssistanceServiceFields = Yup.InferType<typeof updateTuitionAssistanceServiceValidation>

export const updateIndigencyCertificateServiceValidation = Yup.object({
  applicantPhoneNumber: Yup.string()
    .matches(phoneRegExp, 'Nomor telepon tidak valid')
    .min(7, 'Nomor telepon minimal 7 karakter')
    .max(20, 'Nomor telepon maksimal 20 karakter'),
  certificateDestination: Yup.string(),
  categoryApplication: Yup.string()
})

export type updateIndigencyCertificateServiceFields = Yup.InferType<typeof updateIndigencyCertificateServiceValidation>
