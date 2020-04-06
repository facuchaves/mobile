import { post } from '@navent-jobs/utils'

export class AuthenticationService {
  // private static instance: AuthenticationService
  // private constructor() {}
  // public static getInstance(): AuthenticationService {
  //   if (!AuthenticationService.instance) {
  //     AuthenticationService.instance = new AuthenticationService()
  //   }
  //   return AuthenticationService.instance
  // }

  public static loginPost = async (username, password): Promise<LoginDataType | null> => {
    try {
      const response = await post('/api/autentificacion/login-encrypted/', {
        username,
        password,
      })
      return response
    } catch (e) {
      return null
    }
  }
}

export interface LoginDataType {
  access_token: string
  refresh_token: string
  expires_in: string
  token_type: string
}
