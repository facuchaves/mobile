import { ApiModelProperty } from '@nestjs/swagger'

export default class CuentaPostulanteDto {
  @ApiModelProperty({ required: false, description: 'bloqueada' })
  bloqueada: Boolean

  @ApiModelProperty({ required: false, description: 'fechaAlta' })
  fechaAlta: String

  @ApiModelProperty({ required: false, description: 'fechaUltimoAcceso' })
  fechaUltimoAcceso: String

  @ApiModelProperty({ required: false, description: 'mailValidado' })
  mailValidado: Boolean

  @ApiModelProperty({ required: false, description: 'postulable' })
  postulable: Boolean

  @ApiModelProperty({ required: false, description: 'cuentasAosciadasDeTerceros' })
  cuentasAosciadasDeTerceros: [String] // Esto es una lista de String
}
