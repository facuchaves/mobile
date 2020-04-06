import { ApiModelProperty } from '@nestjs/swagger'

export class PreguntaPostulacionDto {
  @ApiModelProperty({ required: true, description: 'preguntaId' })
  preguntaId: number

  @ApiModelProperty({ required: true, description: 'respuesta' })
  respuesta: string
}
