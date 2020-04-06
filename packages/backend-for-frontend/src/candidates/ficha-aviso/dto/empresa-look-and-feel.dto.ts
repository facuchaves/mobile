import { ApiModelProperty } from '@nestjs/swagger'

export class EmpresaLookAndFeelDto {
  @ApiModelProperty({ required: false, description: 'nombre' })
  nombre?: string

  @ApiModelProperty({ required: false, description: 'industria' })
  industria?: string

  @ApiModelProperty({ required: false, description: 'descripcion' })
  descripcion?: string
}
