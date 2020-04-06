import { ApiModelProperty } from '@nestjs/swagger'

export class PasswordChange {
  @ApiModelProperty({ required: true })
  passwordActual: string
  @ApiModelProperty({ required: true })
  passwordNueva: string
}
