import { Injectable, NestMiddleware } from '@nestjs/common'
import { Logger } from '../logger/logger.service'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {
    req.context = req.context || {}

    try {
      req.context.logger = new Logger({ hostname: `${req.hostname}` })
    } catch (error) {
      console.error(error) //TODO Revisar este caso
    }

    next()
  }
}
