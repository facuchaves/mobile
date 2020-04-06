import { idNombre, Pais } from './curriculum-res-core.dto'

export class ExperienciaLaboral {
  id?: number
  areaId?: number
  area?: idNombre
  cantidadPersonasACargo?: number
  detalle?: string
  empresa?: string
  fechaFin?: string
  fechaInicio?: string
  industria?: idNombre
  manejaPresupuesto?: boolean
  nivelPuesto?: idNombre
  pais?: Pais
  puesto?: string
  subArea?: idNombre
}
