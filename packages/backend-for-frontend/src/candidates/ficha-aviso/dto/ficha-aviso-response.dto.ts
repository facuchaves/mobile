import { AvisoResponseDto } from './aviso-response.dto'
import { PostulacionResponseDto } from './postulacion-response.dto'
import { ApiModelProperty } from '@nestjs/swagger'
import { CorePostulanteAvisoResponseDto } from './core/core-postulante-aviso-response.dto'
import { CoreAvisoResponseDto } from './core/core-aviso-response.dto'
import { ProductoLookAndFeelResponseDto } from './producto-look-and-feel-response.dto'
import { AvisoSimilarResponseDto } from './aviso-similar-response.dto'
import { AvisoSugeridoResponseDto } from './aviso-sugerido-response.dto'

export class FichaAvisoResponseDto {
  static getFromFichaAvisoPostulantesDto(
    fichaAvisoPostulantesDto: CorePostulanteAvisoResponseDto
  ): FichaAvisoResponseDto {
    let solicitarCandidato = false
    const { requisitos } = fichaAvisoPostulantesDto.aviso
    if (requisitos) {
      const { salario } = fichaAvisoPostulantesDto.aviso.requisitos
      if (salario) {
        solicitarCandidato = salario && salario.solicitarCandidato
      }
    }
    fichaAvisoPostulantesDto.aviso.requisitos = { salario: !!solicitarCandidato }

    return ({
      postulacion: {
        fecha: fichaAvisoPostulantesDto.fechaPostulacion,
        estado: fichaAvisoPostulantesDto.estadoPostulacion,
      },
      aviso: fichaAvisoPostulantesDto.aviso,
    } as unknown) as FichaAvisoResponseDto
  }

  static getFromFichaAvisoApplicationDto(fichaAvisoApplicationDto: CoreAvisoResponseDto): FichaAvisoResponseDto {
    delete fichaAvisoApplicationDto.requisitos
    return { aviso: fichaAvisoApplicationDto } as FichaAvisoResponseDto
  }

  @ApiModelProperty({ required: false, description: 'postulacion' })
  postulacion: PostulacionResponseDto

  @ApiModelProperty({ required: true, description: 'aviso' })
  aviso: AvisoResponseDto

  @ApiModelProperty({ required: false, description: 'productoLookAndFeel' })
  productoLookAndFeel?: ProductoLookAndFeelResponseDto

  @ApiModelProperty({ required: true, description: 'avisosSimilares' })
  avisosSimilares: Array<AvisoSimilarResponseDto>

  @ApiModelProperty({ required: false, description: 'linkSeoSalario' })
  linkSeoSalario?: string

  @ApiModelProperty({ required: false, description: 'direccion' })
  direccion?: string

  @ApiModelProperty({ required: false, description: 'avisosSugeridos' })
  avisosSugeridos?: Array<AvisoSugeridoResponseDto>

  @ApiModelProperty({ required: false, description: 'Busquedas Relacionadas' })
  busquedasRelacionadas?: BusquedaRelacionada[]
}

class BusquedaRelacionada {
  titulo: string
  link: string
}
