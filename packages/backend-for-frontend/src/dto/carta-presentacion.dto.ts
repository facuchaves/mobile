import { ApiModelProperty } from '@nestjs/swagger'

export class cartaDePresentacionDto {
  @ApiModelProperty({ required: true })
  cartaDePresentacion?: string
}
