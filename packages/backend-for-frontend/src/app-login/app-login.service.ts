import { Injectable } from '@nestjs/common'
import { CoreApiService } from '../core-api/core-api.service'
import { ConfigService } from '../config/config.service'
import { Logger } from '../logger/logger.service'
import { RequestContext } from '../models/request-context'
@Injectable()
export class AppLoginService {
  constructor(private readonly coreApiService: CoreApiService, private readonly configService: ConfigService) {}

  loginApp(req: any, scope = null) {
    const clientId = this.configService.get('USER_CLIENT_ID')
    const clientSecret = this.configService.get('USER_SECRET')
    const logger = new Logger({ hostname: `${req.hostname}` })
    const requestContext = new RequestContext()
    requestContext.logger = logger

    //TODO ver si hay scope
    return this.coreApiService.post(
      requestContext,
      `/v0/application/oauth2/login?grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`
    )
  }
  refreshTokenPostulante(req: any, refreshToken, scope = null) {
    const clientId = this.configService.get('USER_CLIENT_ID')
    const clientSecret = this.configService.get('USER_SECRET')
    //TODO ver si hay scope
    return this.coreApiService.post(
      req.context,
      `/v0/postulantes/refreshToken?grant_type=refresh_token&client_id=${clientId}&client_secret=${clientSecret}&refresh_token=${refreshToken}`
    )
  }

  //   public OAuth loginApp(String scope = null) {

  //       def params = ["grant_type": "client_credentials", "client_id": CLIENT_ID, "client_secret": CLIENT_SECRET, "scope": scope]

  //       return post(LOGIN_APP_METHOD, params) { resp ->
  //           new OAuth(resp)
  //       }
  //   }

  //   public synchronized String getAppToken(String scope = null) {

  //       if(appOauth == null || appOauth.expirationDate < Calendar.instance.time) {
  //           appOauth = loginApp(scope)
  //       }

  //       return appOauth.accessToken
  //   }

  //   public synchronized void forceRefreshToken(String scope = null) {

  //       appOauth = loginApp(scope)
  //   }
}
