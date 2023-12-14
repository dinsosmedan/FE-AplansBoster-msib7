export interface IRole {
  name: string
}

export interface IUser {
  data: {
    id: string
    name: string
    email: string
    role: IRole
    identityNumber: string
    phoneNumber: string
    isActive: boolean
  }
}
export interface IAuthResponse {
  message: string
  data: {
    accessToken: string
    tokenType: string
    expiresIn: number
    user: IUser['data']
  }
}

export interface IErrorResponse {
  message: string
  errors: Record<string, string[]>
}
export interface IResetPassword {
  password: string
  token: string
}
