import { Injectable } from '@nestjs/common'
import { ApplicationCoreApiService } from '../application-core-api/application-core-api.service'
import { RequestContext } from '../models/request-context'
import { TraduccionesApiService } from '../traducciones-api/traducciones-api.service'
import cacheService from '../cache/cache-mem/cache-service'
import { NivelIdiomaResDto } from '../dto/nivel-idioma-res.dto'
import { IdiomaResDto } from '../dto/idioma-res.dto'

@Injectable()
export class StaticEntitiesService {
  constructor(
    private readonly applicationCoreApiService: ApplicationCoreApiService,
    private readonly traduccionesApiService: TraduccionesApiService
  ) {}

  async paises(context: RequestContext) {
    const url = `/v0/application/localizaciones/paises`
    context.logger.debug(`Consultando los paises `)
    const paises = await cacheService.getValue(`PAISES`, async () => {
      return this.applicationCoreApiService.get(context, url)
    })
    return paises
  }

  async provincias(context: RequestContext, paisId: number) {
    const url = `/v0/application/localizaciones/paises/${paisId}/provincias`
    context.logger.debug(`Consultando los provincias `)
    const provincias = await cacheService.getValue(`PROVINCIAS_${paisId}`, async () => {
      return this.applicationCoreApiService.get(context, url)
    })
    return provincias
  }

  async localidades(context: RequestContext, provinciaId: number) {
    const url = `/v0/application/localizaciones/provincias/${provinciaId}/localidades`
    context.logger.debug(`Consultando las localidades `)
    const localidades = await cacheService.getValue(`LOCALIDAD_${provinciaId}`, async () => {
      return this.applicationCoreApiService.get(context, url)
    })
    return localidades
  }

  async areas(context: RequestContext, paisId: number) {
    //: Promise<{ AreaDto: AreaDto }> {
    const url = `/v0/application/comunes/areas`
    context.logger.debug(`Consultando las areas `)

    const areas_final = await cacheService.getValue(`AREAS_${paisId}`, async () => {
      const areas = await this.applicationCoreApiService.get(context, url)
      /*   const traducciones = await this.traduccionesApiService.obtenerTraduccionPorTipo(
        context.site.portal,
        paisId,
        this.traduccionesApiService.TIPO_TRADUCCION_AREA
      )
      if (traducciones) {
        areas.map(area => {
          const match = traducciones.translations.find(
            traduccion => area.id === parseInt(traduccion.id) && traduccion.active
          )
          area.nombre = match ? match.translation : area.nombre
        })
      } */

      return areas
    })
    return areas_final
  }

  async subareas(context: RequestContext, idArea: number) {
    const url = `/v0/application/comunes/areas/${idArea}/subAreas`
    context.logger.debug(`Consultando las subareas `)

    const subareas_final = await cacheService.getValue(`SUBAREAS_${idArea}`, async () => {
      const subareas = await this.applicationCoreApiService.get(context, url)
      /*   const traducciones = await this.traduccionesApiService.obtenerTraduccionPorTipo(
        context.site.portal,
        context.site.idPais,
        this.traduccionesApiService.TIPO_TRADUCCION_SUBAREA
      )
      if (traducciones) {
        subareas.map(subareas => {
          const match = traducciones.translations.find(
            traduccion => subareas.id === parseInt(traduccion.id) && traduccion.active
          )

          subareas.nombre = match ? match.translation : subareas.nombre
        })
      } */

      return subareas
    })
    return subareas_final
  }

  async institucionesEducativas(context: RequestContext, paisId: number) {
    const url = `/v0/application/comunes/institucionesEducativas?paisId=${paisId}` //PASAR PARAMS IDPAIS
    context.logger.debug(`Consultando las institucionesEducativas `)
    const institucionesEducativas = cacheService.getValue(`INSTITUCIONES_${paisId}`, async () => {
      return this.applicationCoreApiService.get(context, url)
    })
    return institucionesEducativas
  }

  async industrias(context: RequestContext) {
    const url = `/v0/application/comunes/industrias`
    context.logger.debug(`Consultando las industrias `)
    const industrias = await cacheService.getValue(`INDUSTRIAS`, async () => {
      return this.applicationCoreApiService.get(context, url)
    })
    return industrias
  }

  async areasPorSubAreaId(context: RequestContext, paisId: number) {
    let result = []
    let subareas = []

    let areas = await this.areas(context, paisId)
    for (const area of areas) {
      subareas = await this.subareas(context, area['id'])
      for (const subarea of subareas) {
        result[subarea['id']] = area['id']
      }
    }
    return result
  }

  async idiomas(context: RequestContext): Promise<Array<IdiomaResDto>> {
    const url = `/v0/application/comunes/idiomas`
    const idiomas = await cacheService.getValue(`idiomas`, async () => {
      return this.applicationCoreApiService.get<Array<IdiomaResDto>>(context, url)
    })
    return idiomas
  }

  async nivelesIdioma(context: RequestContext): Promise<Array<NivelIdiomaResDto>> {
    const url = `/v0/application/comunes/nivelesIdiomas`
    const nivelesIdiomas = await cacheService.getValue(`nivelesIdiomas`, async () => {
      return this.applicationCoreApiService.get<Array<NivelIdiomaResDto>>(context, url)
    })
    return nivelesIdiomas
  }

  async tiposDocumento(context: RequestContext, paisId: number) {
    const url = `/v0/application/comunes/tiposDocumento?paisId=${paisId}`
    return this.applicationCoreApiService.get(context, url)
  }

  async estadosCiviles(context: RequestContext) {
    const url = `/v0/application/comunes/estadosCiviles`
    return this.applicationCoreApiService.get(context, url)
  }

  async tiposEstudio(context: RequestContext, paisId: number) {
    const url = `/v0/application/comunes/tiposEstudio?paisId=${paisId}`
    return this.applicationCoreApiService.get(context, url)
  }

  async estadosEstudio(context: RequestContext) {
    const url = `/v0/application/comunes/estadosEstudio`
    return this.applicationCoreApiService.get(context, url)
  }

  async nivelesEducativos(context: RequestContext) {
    const url = `/v0/application/comunes/nivelesEducativos`
    return this.applicationCoreApiService.get(context, url)
  }

  async areasEstudio(context: RequestContext) {
    const url = `/v0/application/comunes/areasEstudio`
    return this.applicationCoreApiService.get(context, url)
  }

  async nivelesLaborales(context: RequestContext) {
    const url = `/v0/application/comunes/nivelesLaborales`
    return this.applicationCoreApiService.get(context, url)
  }

  async nivelesPuesto(context: RequestContext) {
    const url = `/v0/application/comunes/nivelesPuesto`
    return this.applicationCoreApiService.get(context, url)
  }

  async rangosPromedio(context: RequestContext) {
    const url = `/v0/application/comunes/rangosPromedio`
    return this.applicationCoreApiService.get(context, url)
  }

  async gruposConocimientos(context: RequestContext) {
    const url = `/v0/application/comunes/gruposConocimientos`
    return this.applicationCoreApiService.get(context, url)
  }

  async tiposConocimientos(context: RequestContext, grupoConocimientoId: number) {
    const url = `/v0/application/comunes/gruposConocimientos/${grupoConocimientoId}/tiposConocimientos`
    return this.applicationCoreApiService.get(context, url)
  }

  async conocimientosEspecificos(context: RequestContext, tipoConocimientoId: number) {
    const url = `/v0/application/comunes/tiposConocimientos/${tipoConocimientoId}/conocimientosEspecificos`
    return this.applicationCoreApiService.get(context, url)
  }

  async tiposTrabajo(context: RequestContext) {
    const { idPais } = context.site
    const url = `/v0/application/comunes/tiposTrabajo`
    const tipos = await this.applicationCoreApiService.get(context, url)

    /*  const traducciones = await this.traduccionesApiService.obtenerTraduccionPorTipo(
      context.site.portal,
      idPais,
      this.traduccionesApiService.TIPO_TRADUCCION_TIPO_TRABAJO
    )
    tipos.map(tipo => {
      const match = traducciones.translations.find(
        traduccion => tipo.id === parseInt(traduccion.id) && traduccion.active
      )
      tipo.nombre = match ? match.translation : tipo.nombre
    }) */

    return tipos
  }
}
