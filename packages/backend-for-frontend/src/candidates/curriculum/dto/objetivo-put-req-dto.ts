import { ApiModelProperty } from '@nestjs/swagger'

export class Objetivo {
    @ApiModelProperty({ required: false })
    presentacion?: string
  }
  