import { ApiModelProperty } from '@nestjs/swagger'

export class LoadFotoResponseCore {
  email?: string
  nombre?: string
  apellido?: string
  fotoURL?: string
  cvAdjuntoURL?: string
  disabilityCertificateURL?: string
  tipoDocumento?: idNombre
  numeroDocumento?: string
  fechaNacimiento?: string
  genero?: string
  paisResidencia?: Pais
  codigoPostal?: string
  direccion?: string
  paisNacimiento?: Pais
  paisRegistro?: Pais
  telefonoCelular?: Telefono
  telefonoFijo?: Telefono
  estadoCivil?: idNombre
  discapacidad?: string
  tieneMovilidadPropia?: boolean
  tieneLicenciaConducir?: boolean
  id?: number
}

export class idNombre {
  @ApiModelProperty({ required: false })
  id: number

  @ApiModelProperty({ required: false })
  nombre: string
}

export class Telefono {
  @ApiModelProperty({ required: false })
  prefijo: string

  @ApiModelProperty({ required: false })
  numero: string
}

export class Pais {
  @ApiModelProperty({ required: false })
  id: number

  @ApiModelProperty({ required: false })
  nombre: string

  @ApiModelProperty({ required: false })
  isoCode: string
}
