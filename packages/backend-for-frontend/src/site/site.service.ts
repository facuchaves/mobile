import { Injectable } from '@nestjs/common'
import { find } from 'lodash'
import { Site } from '../interface/site.interface'
import sitesConfig from '../sites-config.json'

@Injectable()
export default class SiteService {
  /**
   * Devuelve los datos de site
   */
  async getSiteBySiteId(siteId: string): Promise<Site> {
    return find(sitesConfig, { siteId })
  }
}
