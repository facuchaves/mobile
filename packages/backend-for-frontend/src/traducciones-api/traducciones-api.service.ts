import { Injectable, HttpService, HttpException, InternalServerErrorException } from '@nestjs/common'
import { ConfigService } from '../config/config.service'

@Injectable()
export class TraduccionesApiService {
  TIPO_TRADUCCION_AREA = 'area'
  TIPO_TRADUCCION_SUBAREA = 'subarea'
  TIPO_TRADUCCION_TIPO_TRABAJO = 'jobType'
  TIPO_TRADUCCION_CATEGORIA = 'category'

  constructor(private http: HttpService, private readonly configService: ConfigService) {}
  async obtenerTraduccionPorTipo(nombrePortal: string, idPais: number, type: string) {
    const BASE_URL = this.configService.get('REST_API_TRADUCCIONES_URL')
    const method = `${BASE_URL}/v1/translations/${idPais}/${nombrePortal}/${type}`
    const resp = await this.http
      .get(method)
      .toPromise()
      .then(({ data }) => data)

    return resp
  }
}
