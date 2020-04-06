import { ApiModelPropertyOptional } from '@nestjs/swagger'

/**
 * Idioma
 */
export class NivelIdiomaResDto {
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
