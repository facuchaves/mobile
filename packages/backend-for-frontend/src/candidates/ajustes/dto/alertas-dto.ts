import { ApiModelProperty } from '@nestjs/swagger'

class FrecuenciaNotificacion {
  id: number
  nombre: string
}
class AlertaLocalizacion {
  @ApiModelProperty({ required: false })
  localizacionesId?: string[]
  @ApiModelProperty({ required: false })
  tipo?: string[]
}
class Pais {
  id?: number
  isoCode?: string
  nombre?: string
}
class SubArea {
  id: number
  nombre: string
}
class TipoTrabajo {
  id: number
  nombre: string
}

export class AlertaResCore {
  ciudad?: string
  criterios?: string[]
  frecuenciaNotificacion?: FrecuenciaNotificacion
  id?: number
  localizacion: AlertaLocalizacion
  pais?: Pais
  query?: string
  salarioMinimo?: number
  subAreas?: SubArea[]
  tipoTrabajo?: TipoTrabajo
}

export class AlertaPostCore {
  @ApiModelProperty({ required: true })
  areaId: number
  @ApiModelProperty({ required: false })
  ciudad?: string
  @ApiModelProperty({ required: false })
  frecuenciaNotificacionId?: number
  @ApiModelProperty({ required: false })
  localizacion: AlertaLocalizacion
  @ApiModelProperty({ required: true })
  paisId?: number
  @ApiModelProperty({ required: false })
  query?: string
  @ApiModelProperty({ required: false })
  salarioMinimo?: number
  @ApiModelProperty({ required: true })
  subAreasId?: number
  @ApiModelProperty({ required: true })
  tipoTrabajoId?: number
}
