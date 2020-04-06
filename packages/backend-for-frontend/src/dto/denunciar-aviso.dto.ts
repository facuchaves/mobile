import { ApiModelProperty } from '@nestjs/swagger'

export class DenunciarAvisoDto {
  @ApiModelProperty({ required: true, description: 'motivo de la denuncia' })
  motivo: string

  @ApiModelProperty({ required: false, description: 'descripcion de la denuncia' })
  descripcion?: string

}
