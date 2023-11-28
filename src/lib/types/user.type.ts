export interface IRole {
  name: string
}

export interface IUser {
  data:{
    id: string
    name: string
    email: string
    role: IRole
  }
}
export interface IAuthResponse {
  message: string
  data: {
    accessToken: string
    tokenType: string
    expiresIn: number
  }
}

export interface IErrorResponse {
  message: string
  errors: Record<string, string[]>
}