import * as Yup from 'yup'

export const userValidation = Yup.object({
  employeeIdentityNumber: Yup.string()
    .matches(/^[0-9]+$/, 'NIP harus berupa angka')
    .required('NIP wajib diisi'),
  email: Yup.string().email('Format email tidak valid').required('Email wajib diisi'),
  name: Yup.string().required('Nama wajib diisi'),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, 'No. HP harus berupa angka')
    .required('No. HP wajib diisi'),
  password: Yup.string().required('Password wajib diisi'),
  role: Yup.string().required('Role wajib diisi'),
  isActive: Yup.string().required('Status wajib diisi')
})

export type userFields = Yup.InferType<typeof userValidation>
