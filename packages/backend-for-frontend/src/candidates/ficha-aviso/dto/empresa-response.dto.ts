import { ApiModelProperty } from '@nestjs/swagger'

export class EmpresaResponseDto {
  @ApiModelProperty({ required: false, description: 'denominacion' })
  denominacion?: string

  @ApiModelProperty({ required: false, description: 'logoURL' })
  logoURL?: string

  @ApiModelProperty({ required: false, description: 'confidencial' })
  confidencial?: boolean

  @ApiModelProperty({ required: false, description: 'id' })
  id?: number
}
