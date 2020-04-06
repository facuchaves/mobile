import { Injectable, HttpService } from '@nestjs/common'
import { AvisoSearchRes } from './dto/avisos-search-res.dto'
import { AvisoSearchResCore } from './dto/avisos-search-res-core.dto'
import { RequestContext } from '../../models/request-context'
import { AvisosSearchBodyReqCore } from './dto/avisos-search-body-req-core.dto'
import { ApplicationCoreApiService } from '../../application-core-api/application-core-api.service'
import { ConfigService } from '../../config/config.service'
import axios from 'axios'
import { RecomendarAvisosDto } from './dto/recomendar-avisos.dto'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AvisosService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly applicationCoreApiService: ApplicationCoreApiService,
    private http: HttpService,
    private readonly configService: ConfigService
  ) {}

  async search(
    context: RequestContext,
    {
      pageSize = 20,
      page = 0,
      filterData = {},
      sort = 'DESC',
    }: { pageSize?: number; page?: number; filterData?: AvisosSearchBodyReqCore; sort?: string } = {}
  ): Promise<AvisoSearchRes> {
    const { idPais } = context.site
    const data = await this.applicationCoreApiService.post<AvisoSearchResCore>(
      context,
      `/v0/application/avisos/search?paisId=${idPais}&pageSize=${pageSize}&page=${page}&sort=${sort}`,
      filterData
    )
    const { number, size, total, content, filters } = data
    return { number, size, total, content, filters } as AvisoSearchRes
  }

  /**
   * Devuelve listado de ids de avisos recomendados (llama a API de Labs).
   * Si hay un usuario postulante logueado, entonces se utiliza idPostulante y idAviso para el
   * llamado a la API. 
   * Si no hay postulante logueado, se utiliza solamente idAviso para el llamado
   *
   * @param context
   */
  async recomendar(context: RequestContext, { avisoId, limit, modulo }: RecomendarAvisosDto) {
    let respuesta
    let estrategia

    let usuarioId = null

    if (context.oauthPostulante) {
      const accessToken = this.jwtService.decode(context.oauthPostulante.accessToken) as {
        [key: string]: any
      }
      usuarioId = accessToken ? accessToken.user_id : null
    }

    let headers = {} as any
    headers.ApplicationName = 'BUM-frontend'
    if (modulo) {
      headers.Module = modulo
    }
    let pais = context.site.sufijoPais

    const BASE_URL = this.configService.get('REST_API_RECOMMENDER_URL')
    const NOMBRE_PORTAL = this.configService.get('REST_API_RECOMMENDER_NOMBRE_PORTAL')
    const method = 
      usuarioId ? `${BASE_URL}/recommender/${NOMBRE_PORTAL}/${pais}?user=${usuarioId}&item=${avisoId}&limit=${limit}` :
      `${BASE_URL}/recommender/${NOMBRE_PORTAL}/${pais}?item=${avisoId}&limit=${limit}`

    respuesta = await axios.get(method).then(e => {
      estrategia = e.headers.strategy
      console.log(e.headers)
      return e.data
    })
  
    return [respuesta, estrategia]
  }

}
