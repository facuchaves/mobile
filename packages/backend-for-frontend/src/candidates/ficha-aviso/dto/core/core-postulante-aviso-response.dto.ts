import { CoreAvisoResponseDto } from './core-aviso-response.dto'

export class CorePostulanteAvisoResponseDto {
  aviso?: CoreAvisoResponseDto
  estadoPostulacion?: string
  fechaPostulacion?: Date
}
