import { ApiModelProperty } from '@nestjs/swagger'

export class AreaResponseDto {
  @ApiModelProperty({ required: false, description: 'id' })
  id?: number

  @ApiModelProperty({ required: false, description: 'nombre' })
  nombre?: string
}
