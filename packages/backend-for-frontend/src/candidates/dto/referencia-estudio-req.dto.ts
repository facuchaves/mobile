/**
 * Solicitud de referencia academica de un postulante
 */
export class PostulanteReferenciaEstudioReqDto {
  /**
   * Apellido de la referencia
   */
  apellido: string
  /**
   * Email de la referencia
   */
  email: string
  /**
   * Identificador del estudio
   */
  estudioId: number
  /**
   * Nombre de la referencia
   */
  nombre: string
  /**
   * Tipo de relacion del postulante con la referencia
   */
  relacion: string //PostulanteReferenciaEstudioRequest.RelacionEnum;
  /**
   * Numero de telefono de la referencia
   */
  telefonoNumero: string
  /**
   * Prefijo del telefono de la referencia
   */
  telefonoPrefijo: string
}
