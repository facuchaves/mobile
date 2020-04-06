import { FiltroFactoryInterface } from './filtro.factory.interface'
import { FiltroLocalizacionFactoryImpl } from './filtro.localizacion.factory.impl'
import { FiltroInterface } from './filtro.interface'
import { Injectable } from '@nestjs/common'

@Injectable()
export class FiltroLocalizacionFactory implements FiltroFactoryInterface {
  constructor(private readonly filtroLocalizacion: FiltroLocalizacionFactoryImpl) {}

  public crearFiltro(): FiltroInterface {
    return this.filtroLocalizacion
  }

  public estaPresente(path: String): boolean {
    return path.indexOf('-provincias-') > -1
  }
}
