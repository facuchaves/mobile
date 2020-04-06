import { Injectable, NestMiddleware } from '@nestjs/common'
import DomainService from '../domain/domain.service'

@Injectable()
export class DomainMiddleware implements NestMiddleware {
  constructor(private readonly domainService: DomainService) {}

  async use(req: any, res: any, next: () => void) {
    const logger = req.context.logger
    req.context = req.context || {}

    try {
      const { hostname } = req
      req.context.domain = await this.domainService.getDomain(hostname)
    } catch (error) {
      logger.error(error, error)
    }

    next()
  }
}
