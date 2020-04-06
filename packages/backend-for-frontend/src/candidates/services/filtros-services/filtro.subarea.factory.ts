import { FiltroFactoryInterface } from './filtro.factory.interface'
import { FiltroSubareaFactoryImpl } from './filtro.subarea.factory.impl'
import { FiltroInterface } from './filtro.interface'
import { Injectable } from '@nestjs/common'

@Injectable()
export class FiltroSubareaFactory implements FiltroFactoryInterface {
  constructor(private readonly filtroSubarea: FiltroSubareaFactoryImpl) {}

  public crearFiltro(): FiltroInterface {
    return this.filtroSubarea
  }

  public estaPresente(path: String): boolean {
    return path.indexOf('-areas-') > -1
  }
}
