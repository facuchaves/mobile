import cacheService from '../cache/cache-mem/cache-service'
import { ConfigService } from '../config/config.service'
import { Injectable } from '@nestjs/common'
import { Domain } from '../interface/domain.interface'

@Injectable()
export default class DomainService {
  dominioKey = 'Dominio'

  constructor(private readonly configService: ConfigService) {}

  /**
   * Devuelve los datos del dominio
   */
  async getDomain(serverName): Promise<Domain> {
    const dominioCacheKey = `${this.dominioKey}_${serverName}`
    const dominio = await cacheService.getValue(dominioCacheKey, async () => this.configService.get(serverName))
    return { idPais: dominio.id_pais, portal: dominio.configuracion_pais.site, cdnSemana: dominio.cdnSemana }
  }
}
