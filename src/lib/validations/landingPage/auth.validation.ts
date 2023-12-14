import * as Yup from 'yup'

export const loginUserValidation = Yup.object({
  identifier: Yup.string().required('Email atau nik harus diisi'),
  password: Yup.string().required('Password harus diisi')
})

export type LoginUserFields = Yup.InferType<typeof loginUserValidation>

export const registerUserValidation = Yup.object({
  name: Yup.string().required('Nama harus diisi'),
  email: Yup.string().required('Email harus diisi').email('Format email salah'),
  identityNumber: Yup.string().required('NIK harus diisi'),
  phoneNumber: Yup.string().required('No. Telp harus diisi'),
  password: Yup.string()
    .required('Password harus diisi')
    .min(8, 'Password harus lebih dari 8 karakter')
    .matches(/[a-z]/g, 'Password harus mengandung huruf kecil')
    .matches(/[A-Z]/g, 'Password harus mengandung huruf besar')
    .matches(/[0-9]/g, 'Password harus mengandung angka')
    .matches(/^\S*$/g, 'Password tidak boleh mengandung spasi')
    .matches(/[^a-zA-Z0-9]/g, 'Passwords harus mengandung karakter spesial'),
  identityCard: Yup.mixed().required('Foto KTP harus diupload'),
  selfie: Yup.mixed().required('Foto selfi dengan KTP harus diupload')
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
    .matches(/[0-9]/g, 'Password harus mengandung angka')
    .matches(/^\S*$/g, 'Password tidak boleh mengandung spasi'),
  ConfPassword: Yup.string()
    .required('Password harus diisi')
    .min(8, 'Password harus lebih dari 8 karakter')
    .oneOf([Yup.ref('password'), ''], 'Password tidak cocok')
    .matches(/[0-9]/g, 'Password harus mengandung angka')
    .matches(/^\S*$/g, 'Password tidak boleh mengandung spasi')
})

export type ResetPasswordUserFields = Yup.InferType<typeof resetPasswordValidation>
