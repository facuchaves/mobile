import { ApiModelProperty } from '@nestjs/swagger'

/**
 * Solicitud de referencia de estudio de un postulante
 */
export class PostulanteReferenciaEstudioRequestDto {
  /**
   * Apellido de la referencia
   */
  @ApiModelProperty()
  apellido: string
  /**
   * Email de la referencia
   */
  @ApiModelProperty()
  email: string
  /**
   * Identificador de la experiencia laboral
   */
  @ApiModelProperty()
  estudioId: number
  /**
   * Nombre de la referencia
   */
  @ApiModelProperty()
  nombre: string
  /**
   * Tipo de relacion del postulante con la referencia
   */
  @ApiModelProperty()
  relacion: string //PostulanteReferenciaLaboralRequest.RelacionEnum
  /**
   * Numero de telefono de la referencia
   */
  @ApiModelProperty()
  telefonoNumero: string
  /**
   * Prefijo del telefono de la referencia
   */
  @ApiModelProperty()
  telefonoPrefijo: string
}
