import { ApiModelProperty } from '@nestjs/swagger'

export class PuestoResponseDto {
  @ApiModelProperty({ required: false, description: 'puestoId' })
  puestoId?: number

  @ApiModelProperty({ required: false, description: 'nombre' })
  nombre?: string

  @ApiModelProperty({ required: false, description: 'tieneEstadisticas' })
  tieneEstadisticas?: boolean
}
