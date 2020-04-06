import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger'

export class avisosSeachParamsReq {
  @ApiModelProperty()
  page: number
  @ApiModelPropertyOptional()
  pageSize?: number
  @ApiModelPropertyOptional()
  sort?: string
}
