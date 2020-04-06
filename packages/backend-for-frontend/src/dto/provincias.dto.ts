import { ApiModelProperty } from '@nestjs/swagger'

export class ProvinciasDto {
  @ApiModelProperty({ required: true, description: 'id' })
  id: number

  @ApiModelProperty({ required: true, description: 'nombre' })
  nombre: string
}
