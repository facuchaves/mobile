import { ApiModelProperty } from '@nestjs/swagger'

export class PreguntaResponseDto {
  @ApiModelProperty({ required: false, description: 'id' })
  id?: number

  @ApiModelProperty({ required: false, description: 'texto' })
  texto?: string
}
