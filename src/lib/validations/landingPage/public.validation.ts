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
  gpa: yup.number().required('IPK harus diisi'),
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
