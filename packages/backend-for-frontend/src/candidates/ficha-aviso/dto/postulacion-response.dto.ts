import { ApiModelProperty } from '@nestjs/swagger'

export class PostulacionResponseDto {
  @ApiModelProperty({ required: true, description: 'fecha' })
  fecha: Date

  @ApiModelProperty({ required: true, description: 'estado' })
  estado: String
}
