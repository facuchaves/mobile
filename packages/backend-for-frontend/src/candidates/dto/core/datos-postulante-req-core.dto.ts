import { GeneroEnum } from '../genero.dto'

export class DatosPostulanteReqCoreDto {
  apellido: string
  email: string
  nombre: string
  paisNacimientoId: number
  celularNumero?: string
  celularPrefijo?: string
  discapacidadDetalle?: string
  documento?: string
  estadoCivilId?: number
  fechaNacimiento?: Date | string
  genero?: string | GeneroEnum
  telefonoFijoNumero?: string
  telefonoFijoPrefijo?: string
  tieneLicenciaConducir?: boolean
  tieneMovilidadPropia?: boolean
  tipoDocumentoId?: number
}
