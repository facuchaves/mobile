import { ApiModelProperty } from '@nestjs/swagger'

export class LinkResponseDto {
  @ApiModelProperty({ required: false, description: 'href' })
  href?: string

  @ApiModelProperty({ required: false, description: 'rel' })
  rel?: string

  @ApiModelProperty({ required: false, description: 'templated' })
  templated?: boolean
}
