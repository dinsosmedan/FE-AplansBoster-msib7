import * as Yup from 'yup'

export const loginValidation = Yup.object({
  identifier: Yup.string().required('Nip atau email harus diisi'),
  password: Yup.string().required('Password harus diisi')
})

export type LoginInput = Yup.InferType<typeof loginValidation>
