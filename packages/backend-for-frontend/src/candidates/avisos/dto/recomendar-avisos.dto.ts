import { ApiModelProperty } from '@nestjs/swagger'

export class RecomendarAvisosDto {
  @ApiModelProperty({ required: true, description: 'usuarioId' })
  usuarioId: number

  @ApiModelProperty({ required: true, description: 'avisoId' })
  avisoId: number

  @ApiModelProperty({ required: true, description: 'limit' })
  limit: number

  @ApiModelProperty({ required: true, description: 'modulo' })
  modulo: string
}
