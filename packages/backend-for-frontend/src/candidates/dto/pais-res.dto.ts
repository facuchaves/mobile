import { ApiModelProperty } from '@nestjs/swagger'

export default class PaisResDto {
  @ApiModelProperty({ required: true, description: 'id' })
  id: number

  @ApiModelProperty({ required: true, description: 'nombre' })
  nombre: string

  @ApiModelProperty({ required: true, description: 'isoCode' })
  isoCode: string
}
