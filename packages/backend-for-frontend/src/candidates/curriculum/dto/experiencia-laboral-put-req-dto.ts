import { idNombre, Pais } from './curriculum-res-core.dto'
import { ApiModelProperty } from '@nestjs/swagger'

export class Empresa {
  @ApiModelProperty({ required: false })
  empresaId: number
  @ApiModelProperty({ required: false })
  nombre: string
}
export class Puesto {
  @ApiModelProperty({ required: false })
  puestoId: number
  @ApiModelProperty({ required: false })
  nombre: string
}

export class ExperienciaLaboralPut {
  @ApiModelProperty({ required: false })
  areaId?: number
  @ApiModelProperty({ required: false })
  cantidadPersonasACargo?: number
  @ApiModelProperty({ required: false })
  detalle?: string
  @ApiModelProperty({ required: false })
  empresa?: Empresa
  @ApiModelProperty({ required: false })
  fechaFin?: string
  @ApiModelProperty({ required: false })
  fechaInicio?: string
  @ApiModelProperty({ required: false })
  industriaId?: number
  @ApiModelProperty({ required: false })
  manejaPresupuesto?: boolean
  @ApiModelProperty({ required: false })
  nivelPuestoId?: number
  @ApiModelProperty({ required: false })
  paisId?: number
  @ApiModelProperty({ required: false })
  puesto?: Puesto
  @ApiModelProperty({ required: false })
  subAreaId?: number
}


