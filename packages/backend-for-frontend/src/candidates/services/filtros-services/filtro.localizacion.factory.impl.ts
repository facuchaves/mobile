import FiltroAvisosDto from './filtros.avisos.dto'
import { FiltroInterface } from './filtro.interface'
import { StaticEntitiesService } from './../../../static-entities/static-entities.service'
import { Injectable } from '@nestjs/common'
import { map, filter, isEmpty } from 'lodash'
import { StringHelper } from './../../../utils/string-helper'

@Injectable()
export class FiltroLocalizacionFactoryImpl implements FiltroInterface {
  constructor(private readonly staticEntitiesService: StaticEntitiesService) {}

  async filtroAPath(context, filtros: FiltroAvisosDto, sb: String): Promise<String> {
    const provinciaId = !isEmpty(filtros.provinciasId) ? filtros.provinciasId[0] : -1
    const localidadId = filtros.localidadesId ? filtros.localidadesId[0] : -1
    let loc, prov

    if (provinciaId > 0) {
      let provincias = await this.staticEntitiesService.provincias(context, context.domain.idPais)
      prov = map(filter(provincias, { id: provinciaId }), 'nombre')
    }

    if (!isEmpty(prov) && localidadId > 0) {
      let localidades = await this.staticEntitiesService.localidades(context, provinciaId)
      loc = map(filter(localidades, { id: provinciaId }), 'nombre')
    }

    return !isEmpty(prov) && !isEmpty(loc)
      ? `/${StringHelper.removeDiacritics(loc.nombre.toString())}-${StringHelper.removeDiacritics(
          prov.toString()
        )}${sb}`
      : !isEmpty(prov)
      ? `/${StringHelper.removeDiacritics(prov.toString())}${sb}`
      : sb
  }
}
