import { ApiModelProperty } from '@nestjs/swagger'

export default class TelefonoResDto {
  @ApiModelProperty({ required: true, description: 'numero' })
  numero: string

  @ApiModelProperty({ required: true, description: 'prefijo' })
  prefijo: string
}
