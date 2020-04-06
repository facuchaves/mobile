export default class Oauth {
  accessToken: string
  tokenType: string
  expiresIn: number
  scope: [string]
  fechaExpiracion: Date

  constructor(oauthJson) {
    this.accessToken = oauthJson.access_token
    this.tokenType = oauthJson.token_type
    this.expiresIn = oauthJson.expires_in
    this.scope = oauthJson.scope
    this.fechaExpiracion = new Date(Date.now() + this.expiresIn * 1000) //TODO Checkear esto.
  }

  isExpired() {
    return this.fechaExpiracion < new Date()
  }

  toString() {
    return `AccessToken : ${this.accessToken} \n 
            TokenType : ${this.tokenType} \n 
            ExpiresIn : ${this.expiresIn} \n 
            Scope : ${this.scope}  \n 
            FechaExpiracion : ${this.fechaExpiracion} \n 
            Esta expirado : ${this.isExpired()} \n`
  }
}
