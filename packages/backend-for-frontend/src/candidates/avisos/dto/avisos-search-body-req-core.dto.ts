import { ApiModelProperty } from '@nestjs/swagger'

export class AvisosSearchBodyReqCore {
  @ApiModelProperty({ required: false })
  aptoDiscapacitados?: boolean

  @ApiModelProperty({ required: false })
  areaPublicacionId?: number

  @ApiModelProperty({ required: false })
  areasId?: number[]

  @ApiModelProperty({ required: false })
  busquedaExtendida?: boolean

  @ApiModelProperty({ required: false })
  ciudad?: string

  @ApiModelProperty({ required: false })
  diasFechaPublicacion?: number

  @ApiModelProperty({ required: false })
  empresaId?: number

  @ApiModelProperty({ required: false })
  empresasExcluidasId?: number[]

  @ApiModelProperty({ required: false })
  fechaPresentacionEspontanea?: string

  @ApiModelProperty({ required: false })
  filtros?: { id: string; value: string }[]

  @ApiModelProperty({ required: false })
  localidadCercanaId?: number

  @ApiModelProperty({ required: false })
  localidadesId?: number[]

  @ApiModelProperty({ required: false })
  muestraEnPortalCorporativo?: boolean

  @ApiModelProperty({ required: false })
  provinciasId?: number[]

  @ApiModelProperty({ required: false })
  puestosNormalizados?: number[]

  @ApiModelProperty({ required: false })
  query?: string

  @ApiModelProperty({ required: false })
  replicacionId?: number

  @ApiModelProperty({ required: false })
  salarioMaximo?: number

  @ApiModelProperty({ required: false })
  salarioMinimo?: number

  @ApiModelProperty({ required: false })
  subAreasId?: number[]

  @ApiModelProperty({ required: false })
  tieneMedios?: boolean

  @ApiModelProperty({ required: false })
  tipoDetalle?: string

  @ApiModelProperty({ required: false })
  tipoTrabajoId?: number

  @ApiModelProperty({ required: false })
  tiposPublicacionId?: number[]
}
