import { Injectable } from '@nestjs/common'
import { RequestContext } from '../../models/request-context'
import { CandidatesCoreApiService } from '../candidates-core-api/candidates-core-api.service'
import { Estudio } from './dto/estudio-res-core.dto'
import { EstudioPut } from './dto/estudio-req-put.dto'

@Injectable()
export class EstudiosService {
  constructor(private readonly candidatesCoreApiService: CandidatesCoreApiService) {}

  async getEstudio(context: RequestContext, estudioId: number): Promise<Estudio> {
    return this.candidatesCoreApiService.get<Estudio>(context, `/v0/postulantes/curriculum/estudios/${estudioId}`)
  }

  async delEstudio(context: RequestContext, estudioId: number) {
    return this.candidatesCoreApiService.delete<any>(context, `/v0/postulantes/curriculum/estudios/${estudioId}`)
  }

  async putEstudio(context: RequestContext, estudioId: number, bodyData: EstudioPut) {
    return this.candidatesCoreApiService.put<any>(context, `/v0/postulantes/curriculum/estudios/${estudioId}`, bodyData)
  }
}
