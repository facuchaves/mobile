import { Injectable, NestMiddleware } from '@nestjs/common'
import moment from 'moment'
import { Encrypter } from '../encrypter/encrypter'
import { RedisService } from '../cache/cache-redis/redis.service'
import { ConfigService } from '../config/config.service'
import { CoreApiService } from '../core-api/core-api.service'
import { AppLoginService } from '../app-login/app-login.service'
import OauthPostulante from '../models/oauth-postulante'
import jwt from 'jsonwebtoken'

@Injectable()
export class CandidatesOauthMiddleware implements NestMiddleware {
  constructor(
    private readonly encryptService: Encrypter,
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
    const expireCookie = req.cookies.token_expiration_auth_postulante_milis
    if (expireCookie) {
      //CHEQUEAMOS LOS DIAS RESTANTES
      const expirationDate = moment(parseInt(expireCookie))
      const minutesToExpire = expirationDate.diff(todayDate, 'minutes')

      const cookieRefreshToken = req.cookies.refresh_token_auth_postulante
      const refreshToken = cookieRefreshToken ? this.encryptService.decrypt(cookieRefreshToken) : false

      if (minutesToExpire < 1 && cookieRefreshToken) {
        //EXPIRO EL TOKEN
        let responseCore
        try {
          req.context.logger.debug(`Solicitud del token [user_id] : ${req.cookies.user_session_id}`)

          responseCore = await this.appLoginService.refreshTokenPostulante(req, refreshToken)

          const encriptTokenAuth = await this.encryptService.encrypt(responseCore.access_token)
          //SETEAMOS CONTEXT
          req = await this.setContextOauthPostulante(
            req,
            responseCore.access_token,
            refreshToken,
            expireDate,
            minutesToExpire,
            this.configService.getJwtSecret()
          )

          //SETEAMOS COOKIES
          const duration = moment(expireDate) //fecha de expiracion pasamos a segundos
          await this.setCookiesAndRedis(
            res,
            req,
            'bm' + encriptTokenAuth,
            duration.diff(todayDate, 'seconds'), //formateamos 1 dia en segundos para guardarlo en redis
            refreshToken,
            expireDate,
            responseCore.access_token
          )
        } catch (error) {
          req.context.logger.error(`Error en la solicitar del token [user_session_id] : ${req.cookies.user_session_id}`)
          return false
        }
      } else {
        req.context.logger.debug(`req.cookies.token_auth_postulante ${req.cookies.token_auth_postulante}`)
        //VALIDAMOS SESSION ANTES DE METER EN EL CONTEXT
        if (req.cookies.token_auth_postulante) {
          await this.setContextOauthPostulante(
            req,
            this.encryptService.decrypt(req.cookies.token_auth_postulante.substring(2)),
            refreshToken,
            expireDate,
            minutesToExpire,
            this.configService.getJwtSecret()
          )
        }
      }
    }
    next()
  }

  setCookiesAndRedis = async (res, req, auth, expireIn, refreshToken, expireDate, authCore) => {
    //AUTH COOKIE
    //AUTHCORE REDIS
    res.cookie('token_auth_postulante', auth) //Agregamos 2 caracteres para igual el guardado en grails sobre la cookie
    res.cookie('token_expiration_auth_postulante_milis', expireDate)

    const oauth = await this.getOauthPostulante(
      authCore,
      expireIn,
      refreshToken,
      moment(expireDate).format('MMM D, YYYY HH:mm:ss A')
    )

    await this.redisService.hset(req.cookies.user_session_id, 'oauth', JSON.stringify(oauth))
  }

  setContextOauthPostulante = async (req, accessToken, expireIn, refreshToken, expireDate, jwtKey) => {
    req.context.logger.debug(`seteando cookie en contexto`)
    if (req.cookies.token_auth_postulante) {
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
