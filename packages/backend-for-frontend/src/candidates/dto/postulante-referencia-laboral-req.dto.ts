import { ApiModelProperty } from '@nestjs/swagger'

/**
 * Solicitud de referencia laboral de un postulante
 */
export class PostulanteReferenciaLaboralRequestDto {
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
  experienciaLaboralId: number
  /**
   * Nombre de la referencia
   */
  @ApiModelProperty()
  nombre: string
  /**
   * Puesto en la empresa de la referencia
   */
  @ApiModelProperty()
  puesto: string
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

// export namespace PostulanteReferenciaLaboralRequest {
//     export enum RelacionEnum {
//         Jefe = <any> 'jefe',
//         Subordinado = <any> 'subordinado',
//         Par = <any> 'par'
//     }
// }
