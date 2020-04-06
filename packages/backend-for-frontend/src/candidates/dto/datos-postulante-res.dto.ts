import EstadoCivilResDto from './estado-civil-res.dto'
import PaisResDto from './pais-res.dto'
import TelefonoResDto from './telefono-res.dto'
import TipoDocumentoResDto from './tipo-documento-res.dto'
import { ApiModelProperty } from '@nestjs/swagger'

class IdName{
  id: number
  nombre: string
}
class Direccion {
  pais: PaisResDto
  provincia: IdName
  localidad: IdName
  direccion: string
}

export default class DatosPostulanteResDto {
  @ApiModelProperty({ required: true, description: 'id' })
  id: number

  @ApiModelProperty({ required: true, description: 'nombre' })
  nombre: string

  @ApiModelProperty({ required: true, description: 'apellido' })
  apellido: string

  @ApiModelProperty({ required: true, description: 'email' })
  email: string

  @ApiModelProperty({ required: true, description: 'codigoPostal' })
  codigoPostal: string

  @ApiModelProperty({ required: true, description: 'direccion' })
  domicilio: Direccion

  @ApiModelProperty({ required: true, description: 'discapacidad' })
  discapacidad: string

  @ApiModelProperty({ required: true, description: 'estadoCivil' })
  estadoCivil: EstadoCivilResDto

  @ApiModelProperty({ required: true, description: 'fechaNacimiento' })
  fechaNacimiento: string

  @ApiModelProperty({ required: true, description: 'fotoURL' })
  fotoURL: string

  @ApiModelProperty({ required: true, description: 'genero' })
  genero: string

  @ApiModelProperty({ required: true, description: 'numeroDocumento' })
  numeroDocumento: string

  @ApiModelProperty({ required: true, description: 'paisNacimiento' })
  paisNacimiento: PaisResDto

  @ApiModelProperty({ required: true, description: 'paisResidencia' })
  paisResidencia: PaisResDto

  @ApiModelProperty({ required: true, description: 'paisRegistro' })
  paisRegistro: PaisResDto

  @ApiModelProperty({ required: true, description: 'telefonoCelular' })
  telefonoCelular: TelefonoResDto

  @ApiModelProperty({ required: true, description: 'telefonoFijo' })
  telefonoFijo: TelefonoResDto

  @ApiModelProperty({ required: true, description: 'tipoDocumento' })
  tipoDocumento: TipoDocumentoResDto

  @ApiModelProperty({ required: true, description: 'cvAdjuntoURL' })
  cvAdjuntoURL: string //url de storage apiUploader

  @ApiModelProperty({ required: true, description: 'tieneMovilidadPropia' })
  tieneMovilidadPropia: boolean

  @ApiModelProperty({ required: true, description: 'tieneLicenciaConducir' })
  tieneLicenciaConducir: boolean

  @ApiModelProperty({ required: true, description: 'disabilityCertificateURL' })
  disabilityCertificateURL: string // url del certificado de discapacidad
}
