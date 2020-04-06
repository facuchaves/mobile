import { ApiModelProperty } from '@nestjs/swagger'

class InstitucionEducativa {
  @ApiModelProperty({ required: false })
  institucionId: number
  @ApiModelProperty({ required: false })
  nombre: string
}

class Promedio {
  @ApiModelProperty({ required: false })
  rangoPromedioId: number
  @ApiModelProperty({ required: false })
  valor: string
}

class Titulo {
  @ApiModelProperty({ required: false })
  nombre: string
  @ApiModelProperty({ required: false })
  tituloId: number
}

export class Estudio {
  @ApiModelProperty({ required: true })
  areaEstudioId: number
  @ApiModelProperty({ required: false })
  cantidadMateriasAprobadas: number
  @ApiModelProperty({ required: false })
  cantidadMateriasTotal: number
  @ApiModelProperty({ required: false })
  estadoEstudioId: number
  @ApiModelProperty({ required: false })
  fechaFin: Date
  @ApiModelProperty({ required: false })
  fechaInicio: Date
  @ApiModelProperty({ required: false })
  institucionEducativa: InstitucionEducativa
  @ApiModelProperty({ required: false })
  paisId: number
  @ApiModelProperty({ required: false })
  promedio: Promedio
  @ApiModelProperty({ required: false })
  tipoEstudioId: number
  @ApiModelProperty({ required: false })
  titulo: Titulo
}
