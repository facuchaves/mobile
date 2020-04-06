import { ApiModelProperty } from '@nestjs/swagger'
import { GeneroEnum } from './genero.dto'
import { Residencia } from '../curriculum/dto/residencia-req-post-core.dto'

export class DatosPostulanteReqDto {
  @ApiModelProperty({ required: true, description: 'apellido' })
  apellido: string

  @ApiModelProperty({ required: true, description: 'email' })
  email: string

  @ApiModelProperty({ required: true, description: 'nombre' })
  nombre: string

  @ApiModelProperty({ required: true, description: 'paisNacimientoId' })
  paisNacimientoId: number

  @ApiModelProperty({ required: false, description: 'celularNumero' })
  celularNumero?: string

  @ApiModelProperty({ required: false, description: 'celularPrefijo' })
  celularPrefijo?: string

  @ApiModelProperty({ required: false, description: 'discapacidadDetalle' })
  discapacidadDetalle?: string

  @ApiModelProperty({ required: false, description: 'documento' })
  documento?: string

  @ApiModelProperty({ required: false, description: 'estadoCivilId' })
  estadoCivilId?: number

  @ApiModelProperty({ required: false, description: 'fechaNacimiento' })
  fechaNacimiento?: Date | string

  @ApiModelProperty({ required: false, description: 'genero' })
  genero?: GeneroEnum | string //TODO Ver bien esto

  @ApiModelProperty({ required: false, description: 'telefonoFijoNumero' })
  telefonoFijoNumero?: string

  @ApiModelProperty({ required: false, description: 'telefonoFijoPrefijo' })
  telefonoFijoPrefijo?: string

  @ApiModelProperty({ required: false, description: 'tieneLicenciaConducir' })
  tieneLicenciaConducir?: boolean

  @ApiModelProperty({ required: false, description: 'tieneMovilidadPropia' })
  tieneMovilidadPropia?: boolean

  @ApiModelProperty({ required: false, description: 'tipoDocumentoId' })
  tipoDocumentoId?: number

  //geoLocalizacion
  @ApiModelProperty({ required: false, description: 'geoLocalization' })
  geoLocalization: Residencia
}
