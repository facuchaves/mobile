import { PreguntaPostulacionDto } from './pregunta-postulacion.dto'
import { ApiModelProperty } from '@nestjs/swagger'

export class PostularAvisoDto {
  @ApiModelProperty({ required: false, description: 'salarioPretendido' })
  salarioPretendido: number

  @ApiModelProperty({ required: false, description: 'respuestas' })
  respuestas: [PreguntaPostulacionDto]

  @ApiModelProperty({ required: true, description: 'actualizarSalario' })
  actualizarSalario: boolean

  @ApiModelProperty({ required: false, description: 'origenId' })
  origenId: number
}
