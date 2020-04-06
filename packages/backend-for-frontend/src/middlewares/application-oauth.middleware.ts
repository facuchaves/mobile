import { Injectable, NestMiddleware } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Response } from 'express'

import { AppLoginService } from '../app-login/app-login.service'
import { RedisService } from '../cache/cache-redis/redis.service'
import { JwtPayload } from '../interface/jwt-payload.interface'
import Oauth from '../models/oauth'

@Injectable()
export class ApplicationOAuthMiddleware implements NestMiddleware {
  constructor(
    private readonly appLoginService: AppLoginService,
    private readonly redisService: RedisService,
    private readonly jwtService: JwtService
  ) {}

  async use(req: any, res: Response, next: () => void) {
    req.context = req.context || {}
    const logger = req.context.logger

    try {
      const sessionJwt = req.headers['x-session-jwt']
      const { sessionId } = this.jwtService.decode(sessionJwt) as JwtPayload
      let oauth = await this.redisService.getCoreOAuthData(sessionId)

      // TODO: hacer un chequeo más preciso por si la data se guardó mal en Redis
      // Inclusive deberíamos invalidar la cache si lo que está en Redis no sirve
      if (!oauth || !oauth.access_token) {
        oauth = await this.appLoginService.loginApp(req)
        // TODO: set redis TTL en base a oauth expiresIn
        await this.redisService.setCoreOAuthData(sessionId, oauth)
      }

      req.context.oauth = new Oauth(oauth)
    } catch (error) {
      logger.error(error, error)
    }

    next()
  }
}
