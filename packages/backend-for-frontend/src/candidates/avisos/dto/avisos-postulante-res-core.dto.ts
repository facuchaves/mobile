import { PlanPublicacionResCore as PlanPublicacion } from '../../dto/core/plan-publication-res-core.dto'
import { LinkResCore as Link } from '../../dto/core/link-res-core.dto'

export class PostulanteAvisoSearchResCore {
  aptoDiscapacitado?: boolean
  confidencial?: boolean
  detalle?: string
  empresa?: string
  fechaHoraPublicacion?: Date
  fechaPublicacion?: Date
  id?: number
  idEmpresa?: number
  links?: Array<Link>
  localizacion?: string
  logoURL?: string
  oportunidad?: boolean
  planPublicacion?: PlanPublicacion
  portal?: string
  salarioMaximo?: number
  salarioMinimo?: number
  tipoTrabajo?: string
  titulo?: string
}
