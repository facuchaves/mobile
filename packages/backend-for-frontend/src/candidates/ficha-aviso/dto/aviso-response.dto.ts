import { ApiModelProperty } from '@nestjs/swagger'
import { EmpresaResponseDto } from './empresa-response.dto'
import { LocalizacionResponseDto } from './localizacion-response.dto'
import { AreaResponseDto } from './area-response.dto'
import { SubAreaResponseDto } from './subarea-response.dto'
import { TipoTrabajoResponseDto } from './tipo-trabajo-response.dto'
import { PlanPublicacionResponseDto } from './plan-publicacion-response.dto'
import { NivelLaboralResponseDto } from './nivel-laboral-response.dto'
import { PuestoResponseDto } from './puesto-response.dto'
import { PreguntaResponseDto } from './pregunta-response.dto'

export class AvisoResponseDto {
  @ApiModelProperty({ required: false, description: 'aptoDiscapacitados' })
  aptoDiscapacitados?: boolean

  @ApiModelProperty({ required: false, description: 'area' })
  area?: AreaResponseDto

  @ApiModelProperty({ required: false, description: 'cantidadVacantes' })
  cantidadVacantes?: number

  @ApiModelProperty({ required: false, description: 'descripcion' })
  descripcion?: string

  @ApiModelProperty({ required: false, description: 'empresa' })
  empresa?: EmpresaResponseDto

  @ApiModelProperty({ required: false, description: 'estado' })
  estado?: string

  @ApiModelProperty({ required: false, description: 'fechaFinalizacion' })
  fechaFinalizacion?: Date

  @ApiModelProperty({ required: false, description: 'fechaPublicacion' })
  fechaPublicacion?: Date

  @ApiModelProperty({ required: false, description: 'id' })
  id?: number

  @ApiModelProperty({ required: false, description: 'localizacion' })
  localizacion?: LocalizacionResponseDto

  @ApiModelProperty({ required: false, description: 'nivelLaboral' })
  nivelLaboral?: NivelLaboralResponseDto

  @ApiModelProperty({ required: false, description: 'origenAviso' })
  origenAviso?: string

  @ApiModelProperty({ required: false, description: 'planPublicacion' })
  planPublicacion?: PlanPublicacionResponseDto

  @ApiModelProperty({ required: false, description: 'preguntas' })
  preguntas?: Array<PreguntaResponseDto>

  @ApiModelProperty({ required: false, description: 'puesto' })
  puesto?: PuestoResponseDto

  @ApiModelProperty({ required: false, description: 'redireccionURL' })
  redireccionURL?: string

  @ApiModelProperty({ required: false, description: 'subArea' })
  subArea?: SubAreaResponseDto

  @ApiModelProperty({ required: false, description: 'tipoTrabajo' })
  tipoTrabajo?: TipoTrabajoResponseDto

  @ApiModelProperty({ required: false, description: 'titulo' })
  titulo?: string

  @ApiModelProperty({ required: false, description: 'videoUrl' })
  videoUrl?: string

  @ApiModelProperty({ required: false, description: 'seoFriendlyUrl' })
  seoFriendlyUrl?: string

  @ApiModelProperty({ required: false, description: 'salarioMedio' })
  salarioMedio?: string

  @ApiModelProperty({ required: false, description: 'avisosArea' })
  avisosArea?: string

  @ApiModelProperty({ required: false, description: 'avisosSubarea' })
  avisosSubarea?: string

  @ApiModelProperty({ required: false, description: 'avisosLugarTrabajo' })
  avisosLugarTrabajo?: string

  @ApiModelProperty({ required: false, description: 'seoTituloProvincia' })
  seoTituloProvincia?: string

  @ApiModelProperty({ required: false, description: 'seoLinkProvincia' })
  seoLinkProvincia?: string

  @ApiModelProperty({ required: false, description: 'seoTituloLocalidad' })
  seoTituloLocalidad?: string

  @ApiModelProperty({ required: false, description: 'seoLinkLocalidad' })
  seoLinkLocalidad?: string

  @ApiModelProperty({ required: false, description: 'seoLinkArea' })
  seoLinkArea?: string

  @ApiModelProperty({ required: false, description: 'seoLinkSubArea' })
  seoLinkSubArea?: string

  // @ApiModelProperty({ required: false, description: 'cargarAvisosSugeridos' }) TODO
  // cargarAvisosSugeridos?: string

  // @ApiModelProperty({ required: false, description: 'getPuestosMasBuscados' }) TODO
  // getPuestosMasBuscados?: string

  // @ApiModelProperty({ required: false, description: 'agregarNavegacionEntreAvisos' }) TODO
  // agregarNavegacionEntreAvisos?: string

  @ApiModelProperty({ required: false, description: 'urlListadoDefault' })
  urlListadoDefault?: string

  @ApiModelProperty({ required: false, description: 'tieneAdsGoogle' })
  tieneAdsGoogle?: string
}
