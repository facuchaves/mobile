import { Injectable, NestMiddleware } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
const uuidV1 = require('uuid/v1')
const util = require('util')

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: any, res: any, next: () => void) {
    req.context = req.context || {}

    const logger = req.context.logger
    try {
      let sessionJwt = req.headers['x-session-jwt']

      if (!sessionJwt) {
        sessionJwt = this.jwtService.sign({ sessionId: uuidV1() })
      }

      let sessionValid = false
      try {
        this.jwtService.verify(sessionJwt)
        sessionValid = true // Si no tira excepcion el jwtService.verify, es porue paso la verificacion.
      } catch (error) {
        logger.error(error)
      }

      if (!sessionValid) {
        sessionJwt = this.jwtService.sign({ sessionId: uuidV1() })
      }

      req.headers['x-session-jwt'] = sessionJwt
      res.setHeader('x-session-jwt', sessionJwt)
    } catch (error) {
      logger.error(error, error)
    }

    next()
  }
}
