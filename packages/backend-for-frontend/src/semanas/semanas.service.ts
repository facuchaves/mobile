import { Injectable } from '@nestjs/common'
import { SemanasDto } from '../dto/semanas.dto'
import { Semanas } from '../interface/semanas.interface'
import { RequestContext } from '../models/request-context'
import { ApplicationCoreApiService } from '../application-core-api/application-core-api.service'
//import path from 'path'
var path = require('path')

@Injectable()
export class SemanasService {
  constructor(private readonly applicationCoreApiService: ApplicationCoreApiService) {}

  async consultarSemana(context: RequestContext, nombreSemana: string) {
    const { idPais, cdnUrl } = context.site

    const url = `/v0/application/semanas?idPais=${idPais}&nombre=${nombreSemana}`
    let semana = await this.applicationCoreApiService.get(context, url)
    semana.urlImagenHeader = `${cdnUrl}/postulantes/semana/${path.basename(semana.urlImagenHeader)}`

    return semana
  }

  /**
   * Devuelve los avisos de una semana por su hashtag
   */
  async consultarAvisosDeSemana(context: RequestContext, hashtag: string): Promise<SemanasDto> {
    const { idPais } = context.site

    const pageSize = 30
    let page = 0

    const url = `/v0/application/avisos/search?paisId=${idPais}&page=${page}&pageSize=${pageSize}`
    const avisosDeSemanaBody = {
      busquedaExtendida: true,
      query: hashtag,
      tipoDetalle: 320,
    }

    let avisos = await this.applicationCoreApiService.post(context, url, avisosDeSemanaBody)

    const cantidadDePaginas = Math.floor((avisos.total - 1) / pageSize)

    for (let i = 0; i < cantidadDePaginas; i++) {
      try {
        page++
        const url = `/v0/application/avisos/search?paisId=${idPais}&page=${page}&pageSize=${pageSize}`
        const avisosNuevaPagina = await this.applicationCoreApiService.post(context, url, avisosDeSemanaBody)
        avisos.content = avisos.content.concat(avisosNuevaPagina.content)
      } catch (error) {
        //Si falla trato de obtener los siguientes avisos y devolver lo que pueda.
        context.logger.error(`Fallo tratando de obtener avisos de semana con el hashtag ${hashtag} en la page ${page}.`)
      }
    }

    return avisos
  }
}
