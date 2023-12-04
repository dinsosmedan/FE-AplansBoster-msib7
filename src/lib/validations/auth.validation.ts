import * as Yup from 'yup'

export const loginValidation = Yup.object({
  identifier: Yup.string().required('Nip is required'),
  password: Yup.string().required('Password is required')
})

export type LoginInput = Yup.InferType<typeof loginValidation>
