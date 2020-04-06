import { Injectable } from '@nestjs/common'
import { ApplicationCoreApiService } from '../../application-core-api/application-core-api.service'
import { ConfigService } from '../../config/config.service'
import { RequestContext } from '../../models/request-context'
import AutentificacionResDto from './dto/autentificacion-res.dto'
import { Encrypter } from '../../encrypter/encrypter'
import SignUp from './dto/sign-up-req.dto'
@Injectable()
export class AutentificacionService {
  constructor(
    private readonly applicationCoreApiService: ApplicationCoreApiService,
    private readonly configService: ConfigService,
    private readonly encryptService: Encrypter
  ) {}

  async login(
    context: RequestContext,
    username: string,
    password: string
  ): Promise<{ AutentificacionResDto: AutentificacionResDto }> {
    const clientId = this.configService.get('USER_CLIENT_ID')
    const clientSecret = this.configService.get('USER_SECRET')
    const url = `/v0/postulantes/login?grant_type=password&username=${username}&password=${password}&client_id=${clientId}&client_secret=${clientSecret}`

    return this.applicationCoreApiService.post(context, url)
  }

  async logout(context: RequestContext, token: string) {
    const clientId = this.configService.get('USER_CLIENT_ID')
    const clientSecret = this.configService.get('USER_SECRET')

    const url = `/v0/postulantes/logout?token=${token}&client_id=${clientId}&client_secret=${clientSecret}`

    return this.applicationCoreApiService.post(context, url)
  }

  encrypt(loginData) {
    const { access_token, expires_in, refresh_token, token_type } = loginData
    return {
      access_token: `bm${this.encryptService.encrypt(access_token)}`,
      expires_in: `${Date.now() + expires_in * 1000}`,
      refresh_token: this.encryptService.encrypt(refresh_token),
      token_type,
    }
  }

  async signUp(context: RequestContext, signUpData: SignUp) {
    const paisId = context.site.idPais
    const dataToPost = { ...signUpData, paisId, paisNacimientoId: paisId, paisResidenciaId: paisId }
    const url = `/v0/application/postulantes`
    return this.applicationCoreApiService.post(context, url, dataToPost)
  }
}
