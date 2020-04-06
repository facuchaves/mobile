import { ApiModelPropertyOptional } from '@nestjs/swagger'

export class PostulacionesReqDto {
  @ApiModelPropertyOptional()
  pageSize?: number
  @ApiModelPropertyOptional()
  page?: number
  @ApiModelPropertyOptional()
  fechaDesde?: string
  @ApiModelPropertyOptional()
  fechaHasta?: string
  @ApiModelPropertyOptional()
  estados?: string
  @ApiModelPropertyOptional()
  sort?: string
}
