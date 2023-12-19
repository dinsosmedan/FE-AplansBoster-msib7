import * as Yup from 'yup'
export const beneficaryValidation = Yup.object({
  identityNumber: Yup.string().required('NIK harus diisi'),
  familyCardNumber: Yup.string().required('Nomor KK harus diisi'),
  name: Yup.string().required('Nama harus diisi'),
  address: Yup.string().required('Alamat harus diisi'),
  areaLevel3: Yup.string().required('Kecamatan harus diisi'),
  areaLevel4: Yup.string().required('Kelurahan harus diisi'),
  birthPlace: Yup.string().required('Tempat lahir harus diisi'),
  birthDate: Yup.mixed().test('birthDate', 'Tanggal lahir harus diisi', function (value) {
    return (
      value instanceof Date || // Check if it's a Date object
      (typeof value === 'string' && !isNaN(Date.parse(value))) // Check if it's a parseable string
    )
  }),
  gender: Yup.string().required('Jenis kelamin harus diisi'),
  lastEducation: Yup.string().required('Pendidikan terakhir harus diisi'),
  religion: Yup.string().required('Agama harus diisi'),
  occupation: Yup.string().required('Pekerjaan harus diisi'),
  martialStatus: Yup.string().required('Status pernikahan harus diisi'),
  citizenship: Yup.string().required('Kewarganegaraan harus diisi'),
  familyRelationship: Yup.string().required('Hubungan keluarga harus diisi'),
  bloodType: Yup.string().required('Golongan darah harus diisi'),
  fatherName: Yup.string().required('Nama ayah harus diisi'),
  motherName: Yup.string().required('Nama ibu harus diisi'),
  isDtks: Yup.mixed().test('isDtks', 'Status DTKS harus diisi', function (value) {
    return (
      value instanceof Boolean || // Check if it's a Boolean object
      typeof value === 'string' // Check if it's a string
    )
  })
})

export type beneficaryFields = Yup.InferType<typeof beneficaryValidation>
