import { ApiModelProperty } from '@nestjs/swagger'
import { idNombre, Pais } from './estudio-res-core.dto'

export class EstudioPut {
  @ApiModelProperty({ required: false })
  titulo?: string

  @ApiModelProperty({ required: false })
  areaEstudio?: idNombre

  @ApiModelProperty({ required: false })
  cantidadMateriasAprobadas?: number

  @ApiModelProperty({ required: false })
  cantidadMateriasTotal?: number

  @ApiModelProperty({ required: false })
  estadoEstudio?: idNombre

  @ApiModelProperty({ required: false })
  fechaFin?: string

  @ApiModelProperty({ required: false })
  fechaInicio?: string

  @ApiModelProperty({ required: false })
  institucionEducativa?: idNombre & { alias: string[] }

  @ApiModelProperty({ required: false })
  pais?: Pais

  @ApiModelProperty({ required: false })
  promedio?: string

  @ApiModelProperty({ required: false })
  rangoPromedio?: idNombre

  @ApiModelProperty({ required: false })
  tipoEstudio?: idNombre
}
