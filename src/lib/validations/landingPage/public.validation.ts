import * as yup from 'yup'

export const publicEventTuition = yup.object({
  identityNumber: yup.string().required('NIK harus diisi'),
  name: yup.string().required('Nama harus diisi'),
  birthPlace: yup.string().required('Tempat lahir harus diisi'),
  birthDate: yup.mixed().test('birthDate', 'Tanggal lahir harus diisi', function (value) {
    return (
      value instanceof Date || // Check if it's a Date object
      (typeof value === 'string' && !isNaN(Date.parse(value))) // Check if it's a parseable string
    )
  }),
  gender: yup.string().required('Jenis kelamin harus diisi'),
  email: yup.string().email('Email tidak valid').required('Email harus diisi'),
  areaLevel3: yup.string().required('Kecamatan harus diisi'),
  areaLevel4: yup.string().required('Kelurahan harus diisi'),
  address: yup.string().required('Alamat harus diisi'),
  universityId: yup.string().required('Nama universitas harus diisi'),
  universityName: yup.string().required('Nama universitas harus diisi'),
  studyProgramId: yup.string().required('Nama program studi harus diisi'),
  studyProgramName: yup.string().required('Nama program studi harus diisi'),
  gpa: yup.number().required('IPK harus diisi'),
  semester: yup.number().required('Semester harus diisi'),
  tuitionFee: yup.number().required('Biaya kuliah harus diisi'),
  bankAccountNumber: yup.string().required('Nomor rekening harus diisi'),
  bankName: yup.string().required('Nama bank harus diisi'),
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
  biodata: yup.mixed().required('Biodata harus diupload')
})

export type publicEventTuitionFields = yup.InferType<typeof publicEventTuition>
export const publicEventDTKS = yup.object({
  identityNumber: yup.string().required('NIK harus diisi'),
  name: yup.string().required('Nama harus diisi'),
  birthPlace: yup.string().required('Tempat lahir harus diisi'),
  birthDate: yup
    .string()
    .required('Tanggal lahir harus diisi')
    .test('valid-date', 'Format tanggal salah', function (value) {
      return !isNaN(Date.parse(value))
    }),
  motherName: yup.string().required('Nama ibu harus diisi'),
  gender: yup.string().required('Jenis kelamin harus diisi'),
  occupation: yup.string().required('Pekerjaan harus diisi'),
  maritalStatus: yup.string().required('Status pernikahan harus diisi'),
  areaLevel3: yup.string().required('Kecamatan harus diisi'),
  areaLevel4: yup.string().required('Kelurahan harus diisi'),
  address: yup.string().required('Alamat harus diisi'),
  question1: yup.number().required('Pertanyaan 1 harus diisi'),
  question2: yup.number().required('Pertanyaan 2 harus diisi'),
  question3: yup.number().required('Pertanyaan 3 harus diisi'),
  question4: yup.number().required('Pertanyaan 4 harus diisi'),
  question5: yup.number().required('Pertanyaan 5 harus diisi'),
  question6: yup.number().required('Pertanyaan 6 harus diisi'),
  question7: yup.number().required('Pertanyaan 7 harus diisi'),
  question8: yup.number().required('Pertanyaan 8 harus diisi'),
  question9: yup.number().required('Pertanyaan 9 harus diisi'),
  question10: yup.number().required('Pertanyaan 10 harus diisi'),
  assistanceProgram: yup.string().required('Program bantuan harus diisi'),
  disabilityStatus: yup.string().required('Status disabilitas harus diisi'),
  pregnantDate: yup.string().required('Tanggal hamil harus diisi'),
  familyRelationship: yup.string().required('Hubungan keluarga harus diisi'),
  remoteIndigenousStatus: yup.string().required('Status suku harus diisi'),
  tribeName: yup.string().required('Nama suku harus diisi'),
  indentityPath: yup.mixed().required('KTP harus diupload'),
  housePath: yup.mixed().required('Foto rumah harus diupload')
})

export type PublicDTKSFields = yup.InferType<typeof publicEventDTKS>
