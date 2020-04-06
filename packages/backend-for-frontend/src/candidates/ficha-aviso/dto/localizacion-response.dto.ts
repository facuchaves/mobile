import { ApiModelProperty } from '@nestjs/swagger'

export class LocalizacionResponseDto {
  @ApiModelProperty({ required: false, description: 'paisId' })
  paisId?: number

  @ApiModelProperty({ required: false, description: 'zonaId' })
  zonaId?: number

  @ApiModelProperty({ required: false, description: 'provinciaId' })
  provinciaId?: number

  @ApiModelProperty({ required: false, description: 'localidadId' })
  localidadId?: number

  @ApiModelProperty({ required: false, description: 'direccion' })
  direccion?: string

  @ApiModelProperty({ required: false, description: 'detalle' })
  detalle?: string

  @ApiModelProperty({ required: false, description: 'id' })
  id?: number
}
