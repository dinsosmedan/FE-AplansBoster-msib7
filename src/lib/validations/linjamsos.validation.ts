import * as Yup from 'yup'

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
  deseaseDiagnosis: Yup.string().required('Diagnosa penyakit harus diisi').max(255, 'Maksimal 255 karakter'),
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
