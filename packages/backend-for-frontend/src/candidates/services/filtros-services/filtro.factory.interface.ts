import { FiltroInterface } from './filtro.interface'

export interface FiltroFactoryInterface {
  crearFiltro(): FiltroInterface
  estaPresente(path: String): boolean
}
