import { ApiModelProperty } from '@nestjs/swagger'

export class AvisoSugeridoResponseDto {
  @ApiModelProperty({ required: false, description: 'titulo' })
  titulo?: string

  @ApiModelProperty({ required: false, description: 'empresa' })
  empresa?: string

  @ApiModelProperty({ required: false, description: 'localizacion' })
  localizacion?: string

  @ApiModelProperty({ required: false, description: 'link' })
  link?: string
}
