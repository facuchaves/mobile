import { ApiModelProperty } from '@nestjs/swagger'

export default class EstadoCivilResDto {
  @ApiModelProperty({ required: true, description: 'id' })
  id: number

  @ApiModelProperty({ required: true, description: 'nombre' })
  nombre: string
}
