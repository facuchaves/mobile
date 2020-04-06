import { Controller, Get, Param } from '@nestjs/common'
import { ApiUseTags, ApiResponse, ApiImplicitHeader } from '@nestjs/swagger'
import { StaticEntitiesService } from './static-entities.service'
import { Context } from '../decorators/request-context.decorator'
import { RequestContext } from '../models/request-context'
import { ProvinciasDto } from '../dto/provincias.dto'
import { LocalidadDto } from '../dto/localidades.dto'
import CacheService from '../cache/cache-mem/cache-service'
import { IdiomaResDto } from '../dto/idioma-res.dto'
import { NivelIdiomaResDto } from '../dto/nivel-idioma-res.dto'

@ApiUseTags('application-comunes')
@ApiResponse({
  status: 201,
  description: 'The record has been successfully created.',
})
@ApiResponse({ status: 403, description: 'Forbidden.' })
@Controller()
export class StaticEntitiesController {
  constructor(private readonly staticEntitiesService: StaticEntitiesService) {}

  @Get('/paises')
  async paises(@Context() context: RequestContext): Promise<{ PaisesDto }> {
    return await CacheService.getValue('Paises', async () => this.staticEntitiesService.paises(context))
    //return this.staticEntitiesService.paises(context)
  }

  @Get('/provincias/:idPais')
  async provincias(
    @Param('idPais') idPais: number,
    @Context() context: RequestContext
  ): Promise<{ ProvinciasDto: ProvinciasDto }> {
    return await CacheService.getValue(`provincias_${idPais}`, async () =>
      this.staticEntitiesService.provincias(context, idPais)
    )
  }

  @Get('/localidadesPorProvincia/:idProvincia')
  async localidadesPorProvincia(
    @Param('idProvincia') idProvincia: number,
    @Context() context: RequestContext
  ): Promise<{ LocalidadDto: LocalidadDto }> {
    return CacheService.getValue(`localidades_${idProvincia}`, async () =>
      this.staticEntitiesService.localidades(context, idProvincia)
    )
  }

  @ApiImplicitHeader({ name: 'x-site-id', required: true })
  @Get('/areas/:idPais')
  async areas(@Param('idPais') idPais: number, @Context() context: RequestContext): Promise<{}> {
    return CacheService.getValue(`areas_${idPais}`, async () => this.staticEntitiesService.areas(context, idPais))
  }

  @ApiImplicitHeader({ name: 'x-site-id', required: true })
  @Get('/subAreas/:idArea')
  async subAreas(@Param('idArea') idArea: number, @Context() context: RequestContext): Promise<{}> {
    return CacheService.getValue(`subAreas_${context.site.idPais}_${idArea}`, async () =>
      this.staticEntitiesService.subareas(context, idArea)
    )
  }

  @ApiImplicitHeader({ name: 'x-site-id', required: true })
  @Get('/institucionesEducativas/:idPais')
  async institucionesEducativas(@Param('idPais') idPais: number, @Context() context: RequestContext): Promise<{}> {
    return CacheService.getValue(`institucionesEducativas_${idPais}`, async () =>
      this.staticEntitiesService.institucionesEducativas(context, idPais)
    )
  }

  @ApiImplicitHeader({ name: 'x-site-id', required: true })
  @Get('/industrias')
  async industrias(@Context() context: RequestContext): Promise<{}> {
    return CacheService.getValue(`industrias`, async () => this.staticEntitiesService.industrias(context))
  }

  @ApiResponse({
    status: 200,
    type: IdiomaResDto,
    description: 'IdiomaResDto',
  })
  @Get('/idiomas')
  async idiomas(@Context() context: RequestContext): Promise<Array<IdiomaResDto>> {
    return this.staticEntitiesService.idiomas(context)
  }

  @ApiResponse({
    status: 200,
    type: NivelIdiomaResDto,
    description: 'NivelIdiomaResDto',
  })
  @Get('/nivelesIdioma')
  async nivelesIdioma(@Context() context: RequestContext): Promise<Array<NivelIdiomaResDto>> {
    return this.staticEntitiesService.nivelesIdioma(context)
  }

  @Get('/tiposDocumento/:paisId')
  async tiposDocumento(@Context() context: RequestContext, @Param('paisId') paisId: number): Promise<{}> {
    return CacheService.getValue(`tiposDocumento_${paisId}`, async () =>
      this.staticEntitiesService.tiposDocumento(context, paisId)
    )
  }

  @Get('/estadosCiviles')
  async estadosCiviles(@Context() context: RequestContext): Promise<{}> {
    return CacheService.getValue(`estadosCiviles`, async () => this.staticEntitiesService.estadosCiviles(context))
  }

  @Get('/tiposEstudio/:paisId')
  async tiposEstudio(@Context() context: RequestContext, @Param('paisId') paisId?: number): Promise<{}> {
    return CacheService.getValue(`tiposEstudio_${paisId}`, async () =>
      this.staticEntitiesService.tiposEstudio(context, paisId)
    )
  }

  @Get('/estadosEstudio')
  async estadosEstudio(@Context() context: RequestContext): Promise<{}> {
    return CacheService.getValue(`estadosEstudio`, async () => this.staticEntitiesService.estadosEstudio(context))
  }

  @Get('/nivelesEducativos')
  async nivelesEducativos(@Context() context: RequestContext): Promise<{}> {
    return CacheService.getValue(`nivelesEducativos`, async () => this.staticEntitiesService.nivelesEducativos(context))
  }

  @Get('/areasEstudio')
  async areasEstudio(@Context() context: RequestContext): Promise<{}> {
    return CacheService.getValue(`areasEstudio`, async () => this.staticEntitiesService.areasEstudio(context))
  }

  @Get('/nivelesLaborales')
  async nivelesLaborales(@Context() context: RequestContext): Promise<{}> {
    return CacheService.getValue(`nivelesLaborales`, async () => this.staticEntitiesService.nivelesLaborales(context))
  }

  @Get('/nivelesPuesto')
  async nivelesPuesto(@Context() context: RequestContext): Promise<{}> {
    return CacheService.getValue(`nivelesPuesto`, async () => this.staticEntitiesService.nivelesPuesto(context))
  }

  @Get('/rangosPromedio')
  async rangosPromedio(@Context() context: RequestContext): Promise<{}> {
    return CacheService.getValue(`rangosPromedio`, async () => this.staticEntitiesService.rangosPromedio(context))
  }

  @Get('/gruposConocimientos')
  async gruposConocimientos(@Context() context: RequestContext): Promise<{}> {
    return CacheService.getValue(`gruposConocimientos`, async () =>
      this.staticEntitiesService.gruposConocimientos(context)
    )
  }

  @Get('/gruposConocimientos/:grupoConocimientoId/tiposConocimientos')
  async tiposConocimientos(
    @Context() context: RequestContext,
    @Param('grupoConocimientoId') grupoConocimientoId?: number
  ): Promise<{}> {
    return CacheService.getValue(`tiposConocimientos_${grupoConocimientoId}`, async () =>
      this.staticEntitiesService.tiposConocimientos(context, grupoConocimientoId)
    )
  }

  @Get('/tiposConocimientos/:tipoConocimientoId/conocimientosEspecificos')
  async conocimientosEspecificos(
    @Context() context: RequestContext,
    @Param('tipoConocimientoId') tipoConocimientoId?: number
  ): Promise<{}> {
    return CacheService.getValue(`conocimientosEspecificos_${tipoConocimientoId}`, async () =>
      this.staticEntitiesService.conocimientosEspecificos(context, tipoConocimientoId)
    )
  }

  @Get('/tiposTrabajo')
  async tiposTrabajo(@Context() context: RequestContext): Promise<{}> {
    return CacheService.getValue(`tiposTrabajo_${context.site.idPais}`, async () =>
      this.staticEntitiesService.tiposTrabajo(context)
    )
  }
}
