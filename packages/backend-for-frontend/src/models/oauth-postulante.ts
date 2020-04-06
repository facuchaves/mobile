export default class OauthPostulante {
  accessToken: string
  tokenType: string
  expiresIn: number
  expirationDate: Date
  refreshToken: string

  constructor(oauthJson) {
    this.accessToken = oauthJson.access_token
    this.tokenType = oauthJson.token_type
    this.expiresIn = oauthJson.expires_in
    this.expirationDate = oauthJson.expire_date
    this.refreshToken = oauthJson.refresh_token
  }

  toString() {
    return `AccessToken : ${this.accessToken} \n 
                TokenType : ${this.tokenType} \n 
                ExpiresIn : ${this.expiresIn} \n 
                refreshToken : ${this.refreshToken} \n
                expirationDate : ${this.expirationDate} \n `
  }
}
