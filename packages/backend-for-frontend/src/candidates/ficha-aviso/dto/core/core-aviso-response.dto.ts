import { CoreAreaResponseDto } from './core-area-response.dto'
import { CoreEmpresaResponseDto } from './core-empresa-response.dto'
import { CoreLocalizacionResponseDto } from './core-localizacion-response.dto'
import { CoreNivelLaboralResponseDto } from './core-nivel-laboral-response.dto'
import { CoreSubAreaResponseDto } from './core-sub-area-response.dto'
import { CorePlanPublicacionResponseDto } from './core-plan-publicacion-response.dto'
import { CoreTipoTrabajoResponseDto } from './core-tipo-trabajo-response.dto'
import { CoreAvisoPuestoNormalizadoResponseDto } from './core-aviso-puesto-normalizado-response.dto'
import { CoreRequisitosResponseDto } from './core-requisitos-response.dto'
import { CorePreguntaResponseDto } from './core-pregunta-response.dto'

export class CoreAvisoResponseDto {
  aptoDiscapacitados?: boolean
  area?: CoreAreaResponseDto
  cantidadVacantes?: number
  descripcion?: string
  empresa?: CoreEmpresaResponseDto
  estado?: string
  fechaFinalizacion?: Date
  fechaPublicacion?: Date
  id?: number
  localizacion?: CoreLocalizacionResponseDto
  nivelLaboral?: CoreNivelLaboralResponseDto
  /**
   * Origen del aviso
   */
  origenAviso?: string
  planPublicacion?: CorePlanPublicacionResponseDto
  preguntas?: Array<CorePreguntaResponseDto>
  puesto?: CoreAvisoPuestoNormalizadoResponseDto
  redireccionURL?: string
  requisitos?: CoreRequisitosResponseDto
  subArea?: CoreSubAreaResponseDto
  tipoTrabajo?: CoreTipoTrabajoResponseDto
  titulo?: string
  videoUrl?: string
}
