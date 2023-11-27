import * as Yup from 'yup'

export const loginValidation = Yup.object({
  email: Yup.string().required('Email is required').email('Email is not valid'),
  password: Yup.string().required('Password is required')
})

export type LoginInput = Yup.InferType<typeof loginValidation>
