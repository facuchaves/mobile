import { Injectable } from '@nestjs/common'
import { CandidatesCoreApiService } from '../../candidates-core-api/candidates-core-api.service'
import { RequestContext } from '../../../models/request-context'
import { LoadFotoResponseCore } from './dto/foto-res-core.dto'
import FormData from 'form-data'

@Injectable()
export class LoadFotoService {
  constructor(private readonly candidatesCoreApiService: CandidatesCoreApiService) {}
  /**
   * Carga la foto del postulante logeado.
   *
   * @param context
   * @param file
   */
  async uploadFoto(context: RequestContext, file): Promise<LoadFotoResponseCore> {
    const url = `/v0/postulantes/upload/loadFoto`
    let toreturn
    const formData = new FormData()
    formData.append('file', file, {
      contentType: 'image/jpeg',
      filename: 'file',
    })
    toreturn = await this.candidatesCoreApiService.post(context, url, formData, {
      headers: formData.getHeaders(),
    })

    return toreturn
  }
}
