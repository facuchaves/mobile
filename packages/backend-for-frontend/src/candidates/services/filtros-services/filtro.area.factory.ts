import { FiltroFactoryInterface } from './filtro.factory.interface'
import { FiltroAreaFactoryImpl } from './filtro.area.factory.impl'
import { FiltroInterface } from './filtro.interface'
import { Injectable } from '@nestjs/common'

@Injectable()
export class FiltroAreaFactory implements FiltroFactoryInterface {
  constructor(private readonly filtroArea: FiltroAreaFactoryImpl) {}

  public crearFiltro(): FiltroInterface {
    return this.filtroArea
  }

  public estaPresente(path: String): boolean {
    return path.indexOf('-area-') > -1
  }
}
