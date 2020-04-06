import FiltroAvisosDto from './filtros.avisos.dto'
import { FiltroInterface } from './filtro.interface'
import { RequestContext } from './../../../models/request-context'
import { StaticEntitiesService } from './../../../static-entities/static-entities.service'
import { Injectable } from '@nestjs/common'
import { StringHelper } from './../../../utils/string-helper'
import { map, filter, isEmpty } from 'lodash'

@Injectable()
export class FiltroSubareaFactoryImpl implements FiltroInterface {
  constructor(private readonly staticEntitiesService: StaticEntitiesService) {}

  async filtroAPath(context, filtros: FiltroAvisosDto, sb: String): Promise<String> {
    if (!filtros.subAreasId) {
      return sb
    }

    let subareadId = filtros.subAreasId ? filtros.subAreasId[0] : -1
    let areas = await this.staticEntitiesService.areasPorSubAreaId(context, context.domain.idPais)
    let subareas = await this.staticEntitiesService.subareas(context, areas[subareadId])

    let subarea = map(filter(subareas, { id: subareadId }), 'nombre')

    return `${sb}-subareas-${StringHelper.removeDiacritics(subarea.toString())}`
  }
}
