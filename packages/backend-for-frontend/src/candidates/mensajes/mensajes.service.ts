import { Injectable, HttpException } from '@nestjs/common'
import { CandidatesCoreApiService } from '../candidates-core-api/candidates-core-api.service'
import { RequestContext } from '../../models/request-context'
import { RedisService } from '../../cache/cache-redis/redis.service'
import { MensajesCoreResponse, MensajeDirecto, MensajeDirectoPost } from './dto/mensajes-dto'
@Injectable()
export class MensajesService {
  constructor(
    private readonly candidatesCoreApiService: CandidatesCoreApiService,
    private readonly redisService: RedisService
  ) {}

  async getMensajes(context: RequestContext): Promise<MensajesCoreResponse> {
    const url = `/v0/postulantes/mensajes`
    const toReturn = await this.candidatesCoreApiService.get(context, url)

    toReturn.content = toReturn.content.map(e => {
      try {
        const postulacionId =
          e.links.length && e.links[0].href && e.links[0].href.split('/mensajes')[0].split('/postulaciones/')[1]
        return { ...e, postulacionId }
      } catch (error) {
        return e
      }
    })
    return toReturn
  }

  async marcarLeido(context: RequestContext, mensajeId: number): Promise<any> {
    const url = `/v0/postulantes/mensajes/${mensajeId}/leido`
    return this.candidatesCoreApiService.post(context, url, null)
  }

  async getMensajesDirectos(context: RequestContext, mensajeId: number): Promise<MensajeDirecto> {
    const url = `/v0/postulantes/mensajesDirectos/${mensajeId}`
    return this.candidatesCoreApiService.get(context, url)
  }

  async getMensajesPostulaciones(context: RequestContext, mensajeId: number): Promise<MensajeDirecto> {
    const url = `/v0/postulantes/postulaciones/${mensajeId}/mensajes`
    const toReturn =  await this.candidatesCoreApiService.get(context, url)
    return toReturn && toReturn[0]
  }

  async postMensajePostulaciones(
    context: RequestContext,
    mensajeId: number,
    data: MensajeDirectoPost
  ): Promise<MensajeDirecto> {
    const url = `/v0/postulantes/postulaciones/${mensajeId}/mensajes`
    return this.candidatesCoreApiService.post(context, url, data)
  }

  async postMensajeDirecto(
    context: RequestContext,
    mensajeId: number,
    data: MensajeDirectoPost
  ): Promise<MensajeDirecto> {
    const url = `/v0/postulantes/mensajesDirectos/${mensajeId}`
    return this.candidatesCoreApiService.post(context, url, data)
  }

  async getNotificaciones(context: RequestContext): Promise<any> {
    const url = `/v0/postulantes/notificaciones`
    return this.candidatesCoreApiService.get(context, url)
  }

  // TODO remplace with the correct method
  async getUnreadMessages(context: RequestContext): Promise<any> {
    // const url = `/v0/postulantes/notificaciones`
    const notificaciones = await this.getNotificaciones(context)
    return notificaciones.reduce((acc, mensaje) => {
      if (
        !mensaje.leida &&
        mensaje.linkPerfilEmisor &&
        mensaje.linkPerfilEmisor.includes('/postulantes/postulacion_mensajes')
      ) {
        acc = acc + 1
      }
      return acc
    }, 0)
  }
}
