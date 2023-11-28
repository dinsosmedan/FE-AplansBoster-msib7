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
  errors: Record<string, string[]>
}
