import { Injectable, HttpException } from '@nestjs/common'
import { CandidatesCoreApiService } from '../candidates-core-api/candidates-core-api.service'
import { RequestContext } from '../../models/request-context'
import { AlertaResCore, AlertaPostCore } from './dto/alertas-dto'
import { PasswordChange } from './dto/password-change-dto'
import { Cuenta, CuentaDelete } from './dto/cuenta-dto'
import { Confidencialidad } from './dto/confidencialidad-dto'
import { RedisService } from '../../cache/cache-redis/redis.service'
import { SuscripcionItem } from './dto/suscripcion-dto'
import { ApplicationCoreApiService } from '../../application-core-api/application-core-api.service'

@Injectable()
export class AjustesService {
  constructor(
    private readonly candidatesCoreApiService: CandidatesCoreApiService,
    private readonly applicationCoreApiService: ApplicationCoreApiService,
    private readonly redisService: RedisService
  ) {}
  deleteUserCache(context: RequestContext) {
    if (!(context && context.oauthPostulante && context.oauthPostulante['user_id'])) {
      return
    }
    this.redisService.del(`*${context.oauthPostulante['user_id']}*`)
  }

  /**
   * Carga la foto del postulante logeado.
   *
   * @param context
   * @param file
   */
  async getAlertas(context: RequestContext): Promise<AlertaResCore[]> {
    const url = `/v0/postulantes/alertas`
    return this.candidatesCoreApiService.get(context, url)
  }

  async postAlertas(context: RequestContext, alerta: AlertaPostCore): Promise<AlertaResCore[]> {
    const url = `/v0/postulantes/alertas`
    return this.candidatesCoreApiService.post(context, url, alerta)
  }

  async changePassword(context: RequestContext, passwords: PasswordChange) {
    const url = `/v0/postulantes/changePassword`
    return this.candidatesCoreApiService.put(context, url, passwords)
  }

  async getCuenta(context: RequestContext): Promise<Cuenta> {
    const url = `/v0/postulantes/cuenta`
    return this.candidatesCoreApiService.get(context, url)
  }

  async delCuenta(context: RequestContext, deleteData: CuentaDelete) {
    const url = `/v0/postulantes/cuenta`
    let toReturn
    try {
      toReturn = await this.candidatesCoreApiService.delete(context, url, { data: deleteData })
    } catch (e) {
      //validar la cuenta
      try {
        await this.candidatesCoreApiService.get(context, url)
      } catch (e) {
        if (e && e.status && e.status === 401) {
          this.deleteUserCache(context)
          return
        }
      }
      if (e && e.coreError) {
        throw new HttpException(
          {
            status: e.status,
            error: e.coreError.message,
          },
          e.status
        )
      } else {
        throw e
      }
    }
    this.deleteUserCache(context)
    return toReturn
  }

  async getConfidencialidad(context: RequestContext): Promise<Confidencialidad> {
    const url = `/v0/postulantes/confidencialidad`
    return this.candidatesCoreApiService.get(context, url)
  }

  async putConfidencialidad(context: RequestContext, confidencialidadData: Confidencialidad) {
    const url = `/v0/postulantes/confidencialidad`
    return this.candidatesCoreApiService.put(context, url, confidencialidadData)
  }

  async delAlertas(context: RequestContext, alertaId: number) {
    const url = `/v0/postulantes/alertas/${alertaId}`
    return this.candidatesCoreApiService.delete(context, url)
  }

  async getSuscripciones(context: RequestContext): Promise<SuscripcionItem[]> {
    const url = `/v0/postulantes/suscripciones`
    return this.candidatesCoreApiService.get(context, url)
  }

  async delSuscripciones(context: RequestContext, suscripcionId: number): Promise<any> {
    const url = `/v0/postulantes/suscripciones/${suscripcionId}`
    return this.candidatesCoreApiService.delete(context, url)
  }

  async putSuscripciones(context: RequestContext, suscripcionId: number): Promise<any> {
    const url = `/v0/postulantes/suscripciones/${suscripcionId}`
    return this.candidatesCoreApiService.put(context, url)
  }

  async emailValidate(context: RequestContext, email: string): Promise<any> {
    const url = `/v0/application/postulantes/idPostulante?email=${email}`
    try {
      await this.applicationCoreApiService.get(context, url)
      return { inUse: true }
    } catch (e) {
      return { inUse: false }
    }
  }
}
