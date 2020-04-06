import { Injectable, NestMiddleware } from '@nestjs/common'
import moment from 'moment'
import { RedisService } from '../cache/cache-redis/redis.service'
import { ConfigService } from '../config/config.service'
import { CoreApiService } from '../core-api/core-api.service'
import { AppLoginService } from '../app-login/app-login.service'
import OauthPostulante from '../models/oauth-postulante'
import jwt from 'jsonwebtoken'

@Injectable()
export class CandidatesMobileOauthMiddleware implements NestMiddleware {
  constructor(
    private readonly redisService: RedisService,
    private readonly coreApiService: CoreApiService,
    private readonly configService: ConfigService,
    private readonly appLoginService: AppLoginService
  ) {}
  async use(req: any, res: any, next: () => void) {
    req.context = req.context || {}
    req.context.logger.debug(`CandidatesOauthMiddleware`)
    //DATOS DE FECHA PARA VALIDAR EXPIRATION COOKIE TOKEN
    let todayDate = moment()
    let expireDate = moment()
      .add(1, 'days')
      .valueOf()

    //VALIDAR EXPIRATION DATE
    const expireMobile = req.headers['token_expiration_auth_postulante_milis']
    if (expireMobile) {
      //CHEQUEAMOS LOS DIAS RESTANTES
      const expirationDate = moment(parseInt(expireMobile))
      const minutesToExpire = expirationDate.diff(todayDate, 'minutes')

      const mobileRefreshToken = req.headers['refresh_token_auth_postulante']
      const refreshToken = mobileRefreshToken ? mobileRefreshToken : false
      if (minutesToExpire < 1 && mobileRefreshToken) {
        //EXPIRO EL TOKEN
        let responseCore
        try {
          req.context.logger.debug(`Solicitud del token : ${req.headers['refresh_token_auth_postulante']}`)

          responseCore = await this.appLoginService.refreshTokenPostulante(req, refreshToken)

          const encriptTokenAuth = await responseCore.access_token
          //SETEAMOS CONTEXT
          req = await this.setContextOauthPostulante(
            req,
            responseCore.access_token,
            minutesToExpire,
            refreshToken,
            expireDate,
            this.configService.getJwtSecret()
          )

          //SETEAMOS RESPONSE PARA MOBILE
          const duration = moment(expireDate) //fecha de expiracion pasamos a segundos
          await this.setResponseParaMobile(
            res,
            req,
            'bm' + encriptTokenAuth,
            duration.diff(todayDate, 'seconds'), //formateamos 1 dia en segundos para guardarlo en redis
            refreshToken,
            expireDate,
            responseCore.access_token
          )
        } catch (error) {
          req.context.logger.error(`Error en la solicitar del token : ${req.headers['refresh_token_auth_postulante']}`)
          return false
        }
      } else {
        req.context.logger.debug(`req.headers['token_auth_postulante'] ${req.headers['token_auth_postulante']}`)
        //VALIDAMOS SESSION ANTES DE METER EN EL CONTEXT
        if (req.headers['token_auth_postulante']) {
          await this.setContextOauthPostulante(
            req,
            req.headers['token_auth_postulante'],
            minutesToExpire,
            refreshToken,
            expireDate,
            this.configService.getJwtSecret()
          )
        }
      }
    }
    next()
  }

  setResponseParaMobile = async (res, req, auth, expireIn, refreshToken, expireDate, authCore) => {
    const oauth = await this.getOauthPostulante(
      authCore,
      expireIn,
      refreshToken,
      moment(expireDate).format('MMM D, YYYY HH:mm:ss A')
    )

    res['token_auth_postulante'] = auth //Agregamos 2 caracteres para igual el guardado en grails sobre la cookie
    res['refresh_token_auth_postulante'] = oauth.refreshToken
    res['token_expiration_auth_postulante_milis'] = expireDate
    res['accessToken'] = oauth.accessToken
    res['tokenType'] = oauth.tokenType
    res['expiresIn'] = oauth.expiresIn
    res['expirationDate'] = oauth.expirationDate
  }

  setContextOauthPostulante = async (req, accessToken, expireIn, refreshToken, expireDate, jwtKey) => {
    req.context.logger.debug(`seteando cookie en contexto`)
    if (req.headers['token_auth_postulante']) {
      req.context.oauthPostulante = await this.getOauthPostulante(
        accessToken,
        expireIn,
        refreshToken,
        moment(expireDate)
      )

      // Decode token data
      try {
        const decodedData = jwt.decode(accessToken, jwtKey)
        req.context.oauthPostulante = { ...req.context.oauthPostulante, ...(decodedData as object) }
      } catch (e) {
        console.warn('error decodificando jwt de postulante', e)
      }
    }
    return req
  }

  getOauthPostulante = (accessToken, expireIn, refreshToken, expireDate) => {
    const oauthPostulante = {
      access_token: accessToken,
      token_type: 'bearer',
      expires_in: expireIn,
      refresh_token: refreshToken,
      expire_date: expireDate,
    }
    const oauth = new OauthPostulante(oauthPostulante)
    return oauth
  }
}
