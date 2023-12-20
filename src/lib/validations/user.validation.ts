import * as Yup from 'yup'

export const userValidation = Yup.object({
  employeeIdentityNumber: Yup.string().matches(/^[0-9]+$/, 'NIP harus berupa angka'),
  email: Yup.string().email('Format email tidak valid'),
  name: Yup.string(),
  phoneNumber: Yup.string().matches(/^[0-9]+$/, 'No. HP harus berupa angka'),
  password: Yup.string(),
  role: Yup.string(),
  isActive: Yup.string()
})

export type userFields = Yup.InferType<typeof userValidation>
