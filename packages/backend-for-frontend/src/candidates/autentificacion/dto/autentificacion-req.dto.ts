import { ApiModelProperty } from '@nestjs/swagger'

export default class AutentificacionReqDto {
  @ApiModelProperty({ required: false, description: 'username' })
  username: string
  @ApiModelProperty({ required: false, description: 'password' })
  password: string
}
