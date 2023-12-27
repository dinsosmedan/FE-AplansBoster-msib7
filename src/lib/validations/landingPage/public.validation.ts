import * as yup from 'yup'

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const publicEventTuitionValidation = yup.object({
  identityNumber: yup.string().required('NIK harus diisi'),
  name: yup.string().required('Nama harus diisi'),
  birthPlace: yup.string().required('Tempat lahir harus diisi'),
  birthDate: yup.mixed().test('birthDate', 'Tanggal lahir harus diisi', function (value) {
    return (
      value instanceof Date || // Check if it's a Date object
      (typeof value === 'string' && !isNaN(Date.parse(value))) // Check if it's a parseable string
    )
  }),
  address: yup.string().required('Alamat harus diisi'),
  areaLevel3: yup.string().required('Kecamatan harus diisi'),
  areaLevel4: yup.string().required('Kelurahan harus diisi'),
  gender: yup.string().required('Jenis kelamin harus diisi'),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, 'Nomor telepon tidak valid')
    .min(7, 'Nomor telepon minimal 7 karakter')
    .max(20, 'Nomor telepon maksimal 20 karakter')
    .required('Nomor Telepon wajib diisi'),
  email: yup.string().email('Email tidak valid').required('Email harus diisi'),
  universityId: yup.string().required('Nama universitas harus diisi'),
  universityName: yup.string().required('Nama universitas harus diisi'),
  studyProgramId: yup.string().required('Nama program studi harus diisi'),
  studyProgramName: yup.string().required('Nama program studi harus diisi'),
  semester: yup.number().required('Semester harus diisi'),
  gpa: yup.string().required('IPK harus diisi'),
  tuitionFee: yup.number().required('Biaya kuliah harus diisi'),
  bankAccountNumber: yup.string().required('Nomor rekening harus diisi'),
  bankAccountName: yup.string().required('Nama pemilik rekening harus diisi'),
  bank: yup.string().required('Nama bank harus diisi'),
  photo: yup.mixed().required('Pasfoto harus diupload'),
  applicationLetter: yup.mixed().required('Surat permohonan harus diupload'),
  familyCard: yup.mixed().required('Kartu keluarga harus diupload'),
  identityCard: yup.mixed().required('KTP harus diupload'),
  studentCard: yup.mixed().required('Kartu pelajar harus diupload'),
  tuitionReceipt: yup.mixed().required('Bukti pembayaran biaya kuliah harus diupload'),
  activeStudentCertificate: yup.mixed().required('Surat keterangan mahasiswa aktif harus diupload'),
  noScholarshipStatement: yup.mixed().required('Surat pernyataan tidak menerima beasiswa harus diupload'),
  noGovernmentEmployeeStatement: yup.mixed().required('Surat pernyataan tidak menjadi PNS harus diupload'),
  dtksPrintout: yup.mixed().required('Printout DTKS harus diupload'),
  passBook: yup.mixed().required('Buku tabungan harus diupload'),
  biodata: yup.mixed().required('Biodata harus diupload'),
  gradeTranscript: yup.mixed().required('Transkrip nilai harus diupload')
})
export type publicEventTuitionFields = yup.InferType<typeof publicEventTuitionValidation>

export const publicEventDTKS = yup.object({
  identityNumber: yup.string().required('NIK harus diisi'),
  familyCardNumber: yup.string().required('NO.KK harus diisi'),
  name: yup.string().required('Nama harus diisi'),
  birthPlace: yup.string().required('Tempat lahir harus diisi'),
  birthDate: yup.mixed().test('birthDate', 'Tanggal lahir harus diisi', function (value) {
    return (
      value instanceof Date || // Check if it's a Date object
      (typeof value === 'string' && !isNaN(Date.parse(value))) // Check if it's a parseable string
    )
  }),
  motherName: yup.string().required('Nama ibu harus diisi'),
  gender: yup.string().required('Jenis kelamin harus diisi'),
  occupation: yup.string().required('Pekerjaan harus diisi'),
  maritalStatus: yup.string().required('Status pernikahan harus diisi'),
  areaLevel3: yup.string().required('Kecamatan harus diisi'),
  areaLevel4: yup.string().required('Kelurahan harus diisi'),
  address: yup.string().required('Alamat harus diisi'),
  question1: yup.string().required('Pertanyaan 1 harus diisi'),
  question2: yup.string().required('Pertanyaan 2 harus diisi'),
  question3: yup.string().required('Pertanyaan 3 harus diisi'),
  question4: yup.string().required('Pertanyaan 4 harus diisi'),
  question5: yup.string().required('Pertanyaan 5 harus diisi'),
  question6: yup.string().required('Pertanyaan 6 harus diisi'),
  question7: yup.string().required('Pertanyaan 7 harus diisi'),
  question8: yup.string().required('Pertanyaan 8 harus diisi'),
  question9: yup.string().required('Pertanyaan 9 harus diisi'),
  question10: yup.string().required('Pertanyaan 10 harus diisi'),
  assistanceProgram: yup.string().required('Program bantuan harus diisi'),
  disabilityStatus: yup.string().required('Status disabilitas harus diisi'),
  pregnantDate: yup.mixed().test('pregnantDate', function (value) {
    return (
      value instanceof Date || (typeof value === 'string' && !isNaN(Date.parse(value))) || typeof value === 'undefined'
    )
  }),
  familyRelationship: yup.string().required('Hubungan keluarga harus diisi'),
  remoteIndigenousStatus: yup.string().required('Status suku harus diisi'),
  tribeName: yup.string().required('Nama suku harus diisi'),
  indentityPath: yup.mixed().required('KTP harus diupload'),
  housePath: yup.mixed().required('Foto rumah harus diupload')
})
export type PublicDTKSFields = yup.InferType<typeof publicEventDTKS>

export const DtksSchoolValidation = yup.object({
  peopleConcernedIdentityNumber: yup.string().required('NIK harus diisi'),
  peopleConcernedName: yup.string().required('Nama harus diisi'),
  peopleConcernedAreaLevel3: yup.string().required('Kecamatan harus diisi'),
  peopleConcernedAreaLevel4: yup.string().required('Kelurahan harus diisi'),
  peopleConcernedAddress: yup.string().required('Alamat harus diisi'),
  applicantPhoneNumber: yup
    .string()
    .matches(phoneRegExp, 'Nomor telepon tidak valid')
    .min(7, 'Nomor telepon minimal 7 karakter')
    .max(20, 'Nomor telepon maksimal 20 karakter')
    .required('Nomor Telepon wajib diisi'),
  certificateDestination: yup.string().required('Pilih Universitas/Sekolah yang dituju'),
  educationLevel: yup.string().required('Pilih jenjang pendidikan'),
  petitionLetter: yup.mixed().required('Surat permohonan harus diupload'),
  familyCard: yup.mixed().required('Kartu keluarga harus diupload'),
  idCard: yup.mixed().required('KTP harus diupload'),
  domicileLetter: yup.mixed().required('Surat keterangan domisili harus diupload'),
  schoolLetter: yup
    .mixed()
    .required('Surat permohonan Surat Keterangan Dari Sekolah / Surat Pengumuman dari pihak Universitas harus diupload')
})

export type DtksSchoolFields = yup.InferType<typeof DtksSchoolValidation>

export const NonDtksSchoolValidation = yup.object({
  peopleConcernedIdentityNumber: yup.string().required('NIK harus diisi'),
  peopleConcernedName: yup.string().required('Nama harus diisi'),
  peopleConcernedAreaLevel3: yup.string().required('Kecamatan harus diisi'),
  peopleConcernedAreaLevel4: yup.string().required('Kelurahan harus diisi'),
  peopleConcernedAddress: yup.string().required('Alamat harus diisi'),
  publicPhoneNumber: yup
    .string()
    .matches(phoneRegExp, 'Nomor telepon tidak valid')
    .min(7, 'Nomor telepon minimal 7 karakter')
    .max(20, 'Nomor telepon maksimal 20 karakter')
    .required('Nomor Telepon wajib diisi'),
  certificateDestination: yup.string().required('Pilih Universitas/Sekolah yang dituju'),
  educationLevel: yup.string().required('Pilih jenjang pendidikan'),
  familyCard: yup.mixed().required('Kartu keluarga harus diupload'),
  petitionLetter: yup.mixed().required('Surat Permohonan harus diupload'),
  idCard: yup.mixed().required('KTP harus diupload'),
  domicileLetter: yup.mixed().required('Surat keterangan domisili harus diupload'),
  indigencyCertificateApplication: yup
    .mixed()
    .required(
      'Surat permohonan Surat Keterangan Dari Sekolah / Surat Pengumuman dari pihak Universitas harus diupload'
    ),
  salarySlip: yup.mixed().required('Slip gaji harus diupload'),
  localsApprovalLetter: yup
    .mixed()
    .required(
      'Scan Surat Keterangan Dari Kepling Apabila Tinggal Menumpang/Sewa ditandatangani pakai materai Rp.10.000 harus diupload'
    ),
  lowIncomeLetter: yup.mixed().required('Surat Keterangan Penghasilan Dari RT/RW harus diupload'),
  frontViewHouse: yup.mixed().required('Foto Depan Rumah harus diupload'),
  sittingViewHouse: yup.mixed().required('Foto Ruang Tamu harus diupload'),
  chamberViewHouse: yup.mixed().required('Foto Kamar Tidur harus diupload'),
  kitchenViewHouse: yup.mixed().required('Foto Dapur harus diupload'),
  schoolLetter: yup
    .mixed()
    .required('Surat permohonan Surat Keterangan Dari Sekolah / Surat Pengumuman dari pihak Universitas harus diupload')
})
export type NonDtksSchoolFields = yup.InferType<typeof NonDtksSchoolValidation>

export const DtksCourtsValidation = yup.object({
  peopleConcernedIdentityNumber: yup.string().required('NIK harus diisi'),
  peopleConcernedName: yup.string().required('Nama harus diisi'),
  peopleConcernedAreaLevel3: yup.string().required('Kecamatan harus diisi'),
  peopleConcernedAreaLevel4: yup.string().required('Kelurahan harus diisi'),
  peopleConcernedAddress: yup.string().required('Alamat harus diisi'),
  applicantPhoneNumber: yup
    .string()
    .matches(phoneRegExp, 'Nomor telepon tidak valid')
    .min(7, 'Nomor telepon minimal 7 karakter')
    .max(20, 'Nomor telepon maksimal 20 karakter')
    .required('Nomor Telepon wajib diisi'),
  petitionLetter: yup.mixed().required('Surat permohonan harus diupload'),
  familyCard: yup.mixed().required('Kartu keluarga harus diupload'),
  idCard: yup.mixed().required('KTP harus diupload'),
  domicileLetter: yup.mixed().required('Surat keterangan domisili harus diupload'),
  certificateDestination: yup.string().required('Tujuan Surat harus diisi')
})

export type DtksCourtsFields = yup.InferType<typeof DtksCourtsValidation>

export const NonDtksCourtsValidation = yup.object({
  peopleConcernedIdentityNumber: yup.string().required('NIK harus diisi'),
  peopleConcernedName: yup.string().required('Nama harus diisi'),
  peopleConcernedAreaLevel3: yup.string().required('Kecamatan harus diisi'),
  peopleConcernedAreaLevel4: yup.string().required('Kelurahan harus diisi'),
  peopleConcernedAddress: yup.string().required('Alamat harus diisi'),
  applicantPhoneNumber: yup
    .string()
    .matches(phoneRegExp, 'Nomor telepon tidak valid')
    .min(7, 'Nomor telepon minimal 7 karakter')
    .max(20, 'Nomor telepon maksimal 20 karakter')
    .required('Nomor Telepon wajib diisi'),
  certificateDestination: yup.string().required('Pilih Universitas/Sekolah yang dituju'),
  petitionLetter: yup.mixed().required('Surat permohonan harus diupload'),
  familyCard: yup.mixed().required('Kartu keluarga harus diupload'),
  idCard: yup.mixed().required('KTP harus diupload'),
  domicileLetter: yup.mixed().required('Surat keterangan domisili harus diupload'),
  salarySlip: yup.mixed().required('Slip gaji harus diupload'),
  localsApprovalLetter: yup
    .mixed()
    .required(
      'Scan Surat Keterangan Dari Kepling Apabila Tinggal Menumpang/Sewa ditandatangani pakai materai Rp.10.000 harus diupload'
    ),
  lowIncomeLetter: yup.mixed().required('Surat Keterangan Penghasilan Dari RT/RW harus diupload'),
  frontViewHouse: yup.mixed().required('Foto Depan Rumah harus diupload'),
  sittingViewHouse: yup.mixed().required('Foto Ruang Tamu harus diupload'),
  chamberViewHouse: yup.mixed().required('Foto Kamar Tidur harus diupload'),
  kitchenViewHouse: yup.mixed().required('Foto Dapur harus diupload')
})

export type NonDtksCourtsFields = yup.InferType<typeof NonDtksCourtsValidation>
