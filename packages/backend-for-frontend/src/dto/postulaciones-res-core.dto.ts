import { PostulacionResCoreDto } from './postulacion-res-core.dto'
import { FilterResCoreDto } from './filter-res-core.dto'

export class PostulacionesResCoreDto {
  number: number
  size: number
  total: number
  content: PostulacionResCoreDto[]
  filters: FilterResCoreDto[]
}
