import { Injectable } from '@nestjs/common'
import { RequestContext } from '../../models/request-context'
import { CandidatesCoreApiService } from '../candidates-core-api/candidates-core-api.service'
import { PostulacionesReqDto } from '../../dto/postulacion-req.dto'
import { PostulacionesResCoreDto } from '../../dto/postulaciones-res-core.dto'
import * as querystring from 'query-string'
import { isEmpty } from 'lodash'

@Injectable()
export class PostulacionesService {
  constructor(private readonly candidatesCoreApiService: CandidatesCoreApiService) {}

  /**
   * Devuelve listado de postulaciones para el postulante logeado.
   *
   * @param context
   */
  async getPostulaciones(
    context: RequestContext,
    postulacionesReqDto: PostulacionesReqDto
  ): Promise<PostulacionesResCoreDto> {
    let url = `/v0/postulantes/postulaciones`

    let queryParams = querystring.stringify(postulacionesReqDto)

    if (!isEmpty(queryParams)) {
      url += `?${queryParams}`
    }

    return this.candidatesCoreApiService.get(context, url)
  }
}
