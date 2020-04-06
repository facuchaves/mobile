import { ApiModelPropertyOptional } from '@nestjs/swagger'

/**
 * Referencia de un postulante
 */
export class PostulanteReferenciaResponseDto {
  /**
   * Apellido de la referencia del postulante
   */
  @ApiModelPropertyOptional()
  apellido?: string
  /**
   * Detalle de la referencia del postulante
   */
  @ApiModelPropertyOptional()
  detalle?: string
  /**
   * Email de la referencia del postulante
   */
  @ApiModelPropertyOptional()
  email?: string
  /**
   * Estado de la referencia con el postulante
   */
  @ApiModelPropertyOptional()
  estado?: string //PostulanteReferenciaResponse.EstadoEnum;
  @ApiModelPropertyOptional()
  id?: number
  /**
   * Nombre de la referencia del postulante
   */
  @ApiModelPropertyOptional()
  nombre?: string
  /**
   * Puesto de la referencia laboral. En caso que sea de estudio no aparece
   */
  @ApiModelPropertyOptional()
  puesto?: string
  /**
   * Identificador de la referencia del postulante
   */
  @ApiModelPropertyOptional()
  referenciaId?: number
  /**
   * Tipo de relacion de la referencia con el postulante
   */
  @ApiModelPropertyOptional()
  relacion?: string //PostulanteReferenciaResponse.RelacionEnum;
  @ApiModelPropertyOptional()
  telefono?: string //TelefonoResponse;
  /**
   * Tipo de relacion de la referencia con el postulante
   */
  @ApiModelPropertyOptional()
  tipo?: string //PostulanteReferenciaResponse.TipoEnum;
}
