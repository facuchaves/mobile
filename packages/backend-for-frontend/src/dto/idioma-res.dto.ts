import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger'

/**
 * Idioma
 */
export class IdiomaResDto {
  /**
   * Identificador del idioma
   */
  @ApiModelPropertyOptional()
  id?: number
  /**
   * Nombre del idioma
   */
  @ApiModelPropertyOptional()
  nombre?: string
}
