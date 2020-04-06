import FiltroAvisosDto from './filtros.avisos.dto'

export interface FiltroInterface {
  filtroAPath(context, filtros: FiltroAvisosDto, sb: String): Promise<String>
}
