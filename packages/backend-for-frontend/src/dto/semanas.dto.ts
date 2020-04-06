import { AvisoSemanas } from '../interface/aviso-semanas.interface'

export class SemanasDto {
  number: number
  size: number
  total: number
  content: [AvisoSemanas]
}
