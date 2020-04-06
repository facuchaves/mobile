import EstadoCivilResCoreDto from './estado-civil-res-core.dto'
import PaisResCoreDto from './pais-res-core.dto'
import TelefonoResCoreDto from './telefono-res-core.dto'
import TipoDocumentoResCoreDto from './tipo-documento-res-core.dto'

export default class DatosPostulanteResCoreDto {
  id: Long
  nombre: String
  apellido: String
  email: String
  codigoPostal: String
  direccion: String
  discapacidad: String
  estadoCivil: EstadoCivilResCoreDto
  fechaNacimiento: String
  fotoURL: String
  genero: String
  numeroDocumento: String
  paisNacimiento: PaisResCoreDto
  paisResidencia: PaisResCoreDto
  paisRegistro: PaisResCoreDto
  telefonoCelular: TelefonoResCoreDto
  telefonoFijo: TelefonoResCoreDto
  tipoDocumento: TipoDocumentoResCoreDto
  cvAdjuntoURL: String //url de storage apiUploader
  tieneMovilidadPropia: Boolean
  tieneLicenciaConducir: Boolean
  disabilityCertificateURL: String // url del certificado de discapacidad
}
