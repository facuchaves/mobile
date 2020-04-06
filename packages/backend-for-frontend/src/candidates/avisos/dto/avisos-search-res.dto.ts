import { PostulanteAvisoSearchResCore as Postulante } from './avisos-postulante-res-core.dto'
import { FilterResCore } from './filter-res-core.dto'

export class AvisoSearchRes {
  number: number
  size: number
  total: number
  content: Postulante[]
  filters: FilterResCore[]
}
