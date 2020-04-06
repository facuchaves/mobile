import { ApiModelProperty } from '@nestjs/swagger'

export class Estudio {
  id?: number
  titulo?: string
  areaEstudio?: idNombre
  cantidadMateriasAprobadas?: number
  cantidadMateriasTotal?: number
  estadoEstudio?: idNombre
  fechaFin?: string
  fechaInicio?: string
  institucionEducativa?: InstitucionEducativa
  pais?: Pais
  promedio?: string
  rangoPromedio?: idNombre
  tipoEstudio?: idNombre
}

export class idNombre {
  @ApiModelProperty({ required: false })
  id: number

  @ApiModelProperty({ required: false })
  nombre: string
}

class InstitucionEducativa {
  @ApiModelProperty({ required: false })
  alias: string[]

  @ApiModelProperty({ required: false })
  id: number

  @ApiModelProperty({ required: false })
  nombre: string
}

export class Pais {
  @ApiModelProperty({ required: false })
  id: number

  @ApiModelProperty({ required: false })
  nombre: string

  @ApiModelProperty({ required: false })
  isoCode: string
}

export const estudioMock = {
  titulo: 'Ingeniero en Informatica',
  fechaInicio: '01-01-2002',
  fechaFin: '01-05-2003',
  promedio: null,
  cantidadMateriasTotal: 40,
  cantidadMateriasAprobadas: 4,
  institucionEducativa: {
    id: 203,
    nombre: 'Universidad de Buenos Aires',
    alias: null,
  },
  rangoPromedio: null,
  id: 75668500,
  pais: {
    id: 1,
    nombre: 'Argentina',
    isoCode: 'ar',
  },
  areaEstudio: {
    id: 30,
    nombre: 'Ing. Informática',
  },
  estadoEstudio: {
    id: 3,
    nombre: 'Abandonado',
  },
  tipoEstudio: {
    id: 3,
    nombre: 'Universitario',
  },
}
