import { FiltroAreaFactory } from './filtro.area.factory'
import { FiltroSubareaFactory } from './filtro.subarea.factory'
import { FiltroLocalizacionFactory } from './filtro.localizacion.factory'
import { Injectable } from '@nestjs/common'
import { _, map, filter, isEmpty } from 'lodash'

@Injectable()
export class FiltrosServices {
  constructor(
    private readonly filtroAreaFactory: FiltroAreaFactory,
    private readonly filtroSubareaFactory: FiltroSubareaFactory,
    private readonly filtroLocalizacionFactory: FiltroLocalizacionFactory
  ) {}

  async getPathFiltros(context, filtrosAviso) {
    let factories = []
    let filtros = []

    factories.push(this.filtroAreaFactory)
    factories.push(this.filtroSubareaFactory)
    factories.push(this.filtroLocalizacionFactory)

    filtros = factories.map(factory => factory.crearFiltro())

    let sb = `/empleos` //TODO: ver donde poner "/empleos es un feature"

    for (const filtro of filtros) {
      sb = await filtro.filtroAPath(context, filtrosAviso, sb)
    }

    return `${sb}.html`
  }
}
