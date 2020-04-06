import { ApiModelProperty } from '@nestjs/swagger'

export class ConocimientoNormalizadoReqPost {
  @ApiModelProperty({ required: true })
  calificadorId: number
  @ApiModelProperty({ required: true })
  conocimientoEspecificoId: number
  @ApiModelProperty({ required: true })
  grupoId: number
  @ApiModelProperty({ required: true })
  nivelCalificadorId: number
  @ApiModelProperty({ required: true })
  tipoId: number
}

export class ConocimientoNormalizadoReqPut {
  @ApiModelProperty({ required: true })
  conocimientoId: number
  @ApiModelProperty({ required: true })
  calificadorId: number
  @ApiModelProperty({ required: true })
  conocimientoEspecificoId: number
  @ApiModelProperty({ required: true })
  grupoId: number
  @ApiModelProperty({ required: true })
  nivelCalificadorId: number
  @ApiModelProperty({ required: true })
  tipoId: number
}

export class ConocimientoNormalizadoReqPostArray {
  @ApiModelProperty({ type: [ConocimientoNormalizadoReqPost] })
  conocimientos: ConocimientoNormalizadoReqPost[]
}

export class ConocimientoNormalizadoReqDelete {
  @ApiModelProperty({ required: true })
  conocimientos: number[]
}

export class ConocimientoNormalizadoReqPutArray {
  @ApiModelProperty({ type: [ConocimientoNormalizadoReqPut] })
  conocimientos: ConocimientoNormalizadoReqPut[]
}
