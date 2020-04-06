import { ApiModelProperty } from '@nestjs/swagger'

export default class SignUpReq {
//  contextoDeLoginDeTerceros: string
  @ApiModelProperty({ required: false })
  email: string
//  loginDeTerceros: string
  paisId: number
  paisNacimientoId: number
  paisResidenciaId: number
  @ApiModelProperty({ required: true })
  password: string
}
