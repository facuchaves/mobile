import { idNombre, Pais } from './curriculum-res-core.dto'
import { ApiModelProperty } from '@nestjs/swagger'
import { Empresa, Puesto} from './experiencia-laboral-put-req-dto'

export class ExperienciaLaboralPost {
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


