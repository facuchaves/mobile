import { CorePlanPublicacionResponseDto } from './core-plan-publicacion-response.dto'
import { CoreLinkResponseDto } from './core-link-response.dto'

export class AvisoSearchResponseCore {
  aptoDiscapacitado?: boolean
  confidencial?: boolean
  detalle?: string
  empresa?: string
  fechaHoraPublicacion?: Date
  fechaPublicacion?: Date
  id?: number
  idEmpresa?: number
  links?: Array<CoreLinkResponseDto>
  localizacion?: string
  logoURL?: string
  oportunidad?: boolean
  planPublicacion?: CorePlanPublicacionResponseDto
  portal?: string
  salarioMaximo?: number
  salarioMinimo?: number
  tipoTrabajo?: string
  titulo?: string
}
