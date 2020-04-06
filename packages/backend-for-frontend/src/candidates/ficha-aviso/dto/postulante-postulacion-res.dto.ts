import { ApiModelProperty } from '@nestjs/swagger'

export class PostulantePostulacionResponse {
  @ApiModelProperty({ required: false, description: 'erroresFiltros' })
  erroresFiltros?: Array<string>

  /**
   * Estado de la postulacion
   */
  @ApiModelProperty({ required: false, description: 'estado. Puede ser : realizada o espera' })
  estado?: PostulantePostulacionResponse.EstadoEnum

  @ApiModelProperty({ required: false, description: 'id' })
  id?: number
}

export namespace PostulantePostulacionResponse {
  export enum EstadoEnum {
    Realizada = <any>'realizada',
    Espera = <any>'espera',
  }
}
