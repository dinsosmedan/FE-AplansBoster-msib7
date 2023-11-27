export interface IAuthResponse {
  message: string
  data: {
    access_token: string
    token_type: string
    expires_in: number
  }
}

export interface IErrorResponse {
  message: string
  errors: Record<string, string[]>
}
