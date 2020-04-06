import { Injectable, NestMiddleware } from '@nestjs/common'
import SiteService from '../site/site.service'
import { isEmpty } from 'lodash'

@Injectable()
export class SiteMiddleware implements NestMiddleware {
  constructor(private readonly siteService: SiteService) {}

  async use(req: any, res: any, next: () => void) {
    const logger = req.context.logger
    req.context = req.context || {}

    try {
      const siteId = req.headers['x-site-id']
      const site = await this.siteService.getSiteBySiteId(siteId)

      if (isEmpty(site)) {
        logger.warn(`No se encontro site para el x-site-id : ${siteId}`)
      } else {
        logger.debug(`Configuración encontrada para el x-site-id: ${siteId}\n${JSON.stringify(site, null, 2)}`)
      }

      req.context.site = site
    } catch (error) {
      logger.error(error, error)
    }

    next()
  }
}
