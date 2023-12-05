import * as Yup from 'yup'

export const loginUserValidation = Yup.object({
  email: Yup.string().required('Email harus diisi').email('Format email salah'),
  password: Yup.string().required('Password harus diisi')
})

export type LoginUserFields = Yup.InferType<typeof loginUserValidation>

export const registerUserValidation = Yup.object({
  name: Yup.string().required('Nama harus diisi'),
  email: Yup.string().required('Email harus diisi').email('Format email salah'),
  nik: Yup.string().required('NIK harus diisi'),
  noTelp: Yup.string().required('No. Telp harus diisi'),
  password: Yup.string()
    .required('Password harus diisi')
    .min(8, 'Password harus lebih dari 8 karakter')
    .matches(/[a-z]/g, 'Password harus mengandung huruf kecil')
    .matches(/[A-Z]/g, 'Password harus mengandung huruf besar')
    .matches(/[0-9]/g, 'Password harus mengandung angka')
    .matches(/^\S*$/g, 'Password tidak boleh mengandung spasi')
    .matches(/[^a-zA-Z0-9]/g, 'Passwords harus mengandung karakter spesial')
})

export type RegisterUserFields = Yup.InferType<typeof registerUserValidation>

export const forgotPasswordValidation = Yup.object({
  email: Yup.string().required('Email harus diisi').email('Format email salah')
})

export type ForgotPasswordUserFields = Yup.InferType<typeof forgotPasswordValidation>

export const resetPasswordValidation = Yup.object({
  password: Yup.string()
    .required('Password harus diisi')
    .min(8, 'Password harus lebih dari 8 karakter')
    .matches(/[a-z]/g, 'Password harus mengandung huruf kecil')
    .matches(/[A-Z]/g, 'Password harus mengandung huruf besar')
    .matches(/[0-9]/g, 'Password harus mengandung angka')
    .matches(/^\S*$/g, 'Password tidak boleh mengandung spasi')
    .matches(/[^a-zA-Z0-9]/g, 'Passwords harus mengandung karakter spesial')
})

export type ResetPasswordUserFields = Yup.InferType<typeof resetPasswordValidation>
