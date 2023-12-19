export interface IPermission {
  id: string
  name: string
  slugName: string
  isPermitted: boolean
}

export interface IRole {
  id: string
  name: string
  permissions: IPermission[]
}

export interface IUser {
  data: {
    id: string
    employeeIdentityNumber: string
    name: string
    phoneNumber: null | string
    isActive: boolean
    email: string
    role: IRole
  }
}
export interface IUserPublic {
  data: {
    id: string
    identityNumber: string
    name: string
    phoneNumber: null | string
    isActive: boolean
    email: string
    role: IRole
  }
}
export interface IAuthResponse {
  message: string
  data: IAuth
}

export interface IErrorResponse {
  message: string
  errors: Record<string, string[]>
}
export interface IResetPassword {
  password: string
  token: string
}
export interface IChangePassword {
  password: string
}
export interface IChangeProfile {
  name: string
  email: string
  phoneNumber: string
}

export interface IAuth {
  accessToken: string
  user: IUser['data']
}
