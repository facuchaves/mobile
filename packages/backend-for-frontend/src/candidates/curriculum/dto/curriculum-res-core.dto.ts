import { Estudio } from '../../estudios/dto/estudio-res-core.dto'
import { ExperienciaLaboral } from './experiencia-laboral-res-core-dto'

export class CurriculumResCore {
  id?: number
  salarioPreferencia?: number
  conocimientosDesnormalizados?: ConocimientoDesnormalizado[]
  conocimientosNormalizados?: ConocimientoNormalizado[]
  idiomas: { [key: string]: { ['Oral']: ConocimientoNormalizado; ['Escrito']: ConocimientoNormalizado } }
  descripcion?: string
  estudios?: Estudio[]
  experienciasLaborales?: ExperienciaLaboral[]
  referencias?: Referencia[]
}

class ConocimientoDesnormalizado {
  descripcion?: string
  id?: number
  titulo?: string
}

class ConocimientoNormalizado {
  id?: number
  calificador?: idNombre
  conocimientoEspecifico?: idNombre
  grupo?: idNombre
  nivel?: idNombre
  tipo?: idNombre
}

export class idNombre {
  id: number
  nombre: string
}

export class Pais {
  id: number
  nombre: string
  isoCode: string
}

class Referencia {
  apellido?: string
  detalle?: string
  email?: string
  estado?: string
  id?: number
  nombre?: string
  puesto?: string
  referenciaId?: number
  relacion?: string
  telefono?: {
    numero?: string
    prefijo?: string
  }
  tipo?: string
}
