import FiltroAvisosDto from './filtros.avisos.dto'
import { FiltroInterface } from './filtro.interface'
import { StaticEntitiesService } from '../../../static-entities/static-entities.service'
import { Injectable } from '@nestjs/common'
import { StringHelper } from './../../../utils/string-helper'
import { map, filter, isEmpty } from 'lodash'

@Injectable()
export class FiltroAreaFactoryImpl implements FiltroInterface {
  constructor(private readonly staticEntitiesService: StaticEntitiesService) {}

  async filtroAPath(context, filtros: FiltroAvisosDto, sb: String): Promise<String> {
    let areaId = filtros.areasId ? filtros.areasId[0] : -1
    if (areaId && isEmpty(filtros.subAreasId)) {
      let areas = await this.staticEntitiesService.areas(context, context.domain.idPais)

      areas = map(filter(areas, { id: areaId }), 'nombre')

      if (!isEmpty(areas)) {
        return `${sb}-area-${StringHelper.removeDiacritics(areas.toString())}`
      }
    }

    return sb
  }
}
