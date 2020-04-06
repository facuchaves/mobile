import { ApiModelProperty } from '@nestjs/swagger'
import { PlanPublicacionResponseDto } from './plan-publicacion-response.dto'
import { LinkResponseDto } from './link-response.dto'

export class AvisoSimilarResponseDto {
  @ApiModelProperty({ required: false, description: 'logoURL' })
  logoURL?: string

  @ApiModelProperty({ required: false, description: 'titulo' })
  titulo?: string

  @ApiModelProperty({ required: false, description: 'fecha de publicacion' })
  fechaPublicacion?: Date

  @ApiModelProperty({ required: false, description: 'empresa' })
  empresa?: string

  @ApiModelProperty({ required: false, description: 'localizacion' })
  localizacion?: string

  @ApiModelProperty({ required: false, description: 'seoFriendlyUrl' })
  link?: string
}
