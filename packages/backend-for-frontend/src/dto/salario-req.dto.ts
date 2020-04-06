import { ApiModelProperty } from '@nestjs/swagger'

export class SalarioReqDto {
  @ApiModelProperty({ required: true })
  salario: number
}
