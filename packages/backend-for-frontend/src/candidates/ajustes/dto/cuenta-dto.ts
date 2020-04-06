import { ApiModelProperty } from '@nestjs/swagger'

export class Cuenta {
  postulable: boolean
  mailValidado: boolean
  bloqueada: boolean
  fechaAlta: string
  fechaUltimoAcceso: string
  fechaAltaCurriculum: string
  cuentasAosciadasDeTerceros: string[]
}

export class CuentaDelete {
  @ApiModelProperty({ required: true })
  motivo: string
  @ApiModelProperty({ required: true })
  password: string
}
