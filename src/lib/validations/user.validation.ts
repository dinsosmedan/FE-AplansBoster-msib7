import * as Yup from 'yup'

export const userValidation = Yup.object({
  employeeIdentityNumber: Yup.string()
    .required()
    .matches(/^[0-9]+$/, 'NIP harus berupa angka'),
  email: Yup.string().required().email('Format email tidak valid'),
  name: Yup.string().required(),
  phoneNumber: Yup.string()
    .required()
    .matches(/^[0-9]+$/, 'No. HP harus berupa angka'),
  password: Yup.string().required(),
  role: Yup.string().required(),
  isActive: Yup.string().required()
})

export const userUpdateValidation = Yup.object({
  employeeIdentityNumber: Yup.string().matches(/^[0-9]+$/, 'NIP harus berupa angka'),
  email: Yup.string().email('Format email tidak valid'),
  name: Yup.string(),
  phoneNumber: Yup.string().matches(/^[0-9]+$/, 'No. HP harus berupa angka'),
  role: Yup.string(),
  isActive: Yup.string()
})

export type userFields = Yup.InferType<typeof userValidation>
export type userUpdateFields = Yup.InferType<typeof userUpdateValidation>
