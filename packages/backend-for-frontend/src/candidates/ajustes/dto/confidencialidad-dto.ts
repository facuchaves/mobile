import { ApiModelProperty } from '@nestjs/swagger'

export class Confidencialidad {
  @ApiModelProperty({ required: false })
  tipo: string
}
