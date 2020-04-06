import { Context } from '../decorators/request-context.decorator'
import { RequestContext } from '../models/request-context'
import { ApplicationCoreApiService } from '../application-core-api/application-core-api.service'
import { Injectable, UseInterceptors, CacheInterceptor } from '@nestjs/common'
import { RedisService } from '../cache/cache-redis/redis.service'
import { CoreProductoLookAndFeelResponseDto } from '../candidates/ficha-aviso/dto/core/core-producto-look-and-feel-response.dto'
import { isEmpty } from 'lodash'
import { PostulanteAvisoSearchResCore } from '../candidates/avisos/dto/avisos-postulante-res-core.dto'
import * as querystring from 'query-string'
import moment from 'moment'

@Injectable()
export class ApplicationAvisosService {
  constructor(
    private readonly applicationCoreApiService: ApplicationCoreApiService,
    private readonly redisService: RedisService
  ) {}

  /**
   * Devuelve el aviso con id pasado por parametro.
   *
   * @param context
   */
  async avisoLookAndFeel(
    @Context() context: RequestContext,
    idAviso: number
  ): Promise<CoreProductoLookAndFeelResponseDto> {
    const url = `/v0/application/avisos/${idAviso}/lookandfeel`

    const avisoLookAndFeel = await this.redisService.getValue(`LOOK_AND_FEEL_AVISO_${idAviso}`, async () => {
      return this.applicationCoreApiService.get<CoreProductoLookAndFeelResponseDto>(context, url)
    })
    return avisoLookAndFeel
  }

  /**
   * Devuelve el aviso con id pasado por parametro.
   *
   * @param context
   */
  async list(
    @Context() context: RequestContext,
    avisosIds: Array<number>,
    tipoDetalle: string
  ): Promise<PostulanteAvisoSearchResCore[]> {
    let url = `/v0/application/avisos/list`
    let queryParams = querystring.stringify({ ids: avisosIds.join(','), tipoDetalle: tipoDetalle })
    if (!isEmpty(queryParams)) {
      url += `?${queryParams}`
    }

    return (await this.applicationCoreApiService.get<PostulanteAvisoSearchResCore[]>(context, url)).map(
      ({ logoURL, empresa, localizacion, fechaPublicacion, ...rest }) => {
        return {
          ...rest,
          logo: logoURL,
          nombreEmpresa: empresa,
          ubicacion: localizacion,
          diasPublicacion: moment().diff(moment(fechaPublicacion, 'DD-MM-YYYY'), 'days'),
        }
      }
    )
  }
}
