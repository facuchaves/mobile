import {
  Controller,
  Get,
  Patch,
  Param,
  UseInterceptors,
  CacheInterceptor,
  Body,
  Post,
  Put,
  Delete,
} from '@nestjs/common'
import { ApiUseTags, ApiResponse } from '@nestjs/swagger'
import { Context } from '../../decorators/request-context.decorator'
import { RequestContext } from '../../models/request-context'
import { CandidatesService } from './candidates.service'
import DatosPostulanteResDto from '../dto/datos-postulante-res.dto'
import { DatosPostulanteReqDto } from '../dto/datos-postulante-req.dto'
import { PostulanteReferenciaResponseDto } from '../dto/postulante-referencial-res.dto'
import { PostulanteReferenciaLaboralRequestDto } from '../dto/postulante-referencia-laboral-req.dto'
import { PostulanteReferenciaEstudioRequestDto } from '../dto/postulante-referencia-estudio-req.dto'
import DatosPostulanteResumidoResDto from '../dto/datos-postulante-resumido-res.dto'
import PutResidencia from '../dto/residencia-put.dto'
import { RedisService } from '../../cache/cache-redis/redis.service'

@ApiUseTags('candidates')
@Controller('candidates')
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}
  @ApiResponse({
    status: 200,
    type: DatosPostulanteResDto,
    description:
      'Representa los datos personales del candidato logueado( tanto datos personales como datos de contacto).',
  })
  @Get('/datosPostulante')
  async datosPostulante(@Context() context: RequestContext): Promise<DatosPostulanteResDto> {
    return this.candidatesService.getDatosDePostulante(context)
  }

  @ApiResponse({
    status: 200,
    type: DatosPostulanteResumidoResDto,
    description: 'Devuelve datos personales resumido del candidato logueado',
  })
  @Get('/datosPostulanteResumido')
  async datosPostulanteResumido(@Context() context: RequestContext): Promise<DatosPostulanteResumidoResDto> {
    let resDto = await this.candidatesService.getDatosDePostulante(context)

    const { id, nombre, apellido, email, fotoURL } = resDto
    return { id, nombre, apellido, email, fotoURL }
  }

  @ApiResponse({
    status: 200,
    type: DatosPostulanteReqDto,
    description:
      'Representa los datos personales del candidato logueado( tanto datos personales como datos de contacto).',
  })
  @Patch('/datosPersonales')
  async modificarDatosPostulante(
    @Body() datosPostulanteReqDto: DatosPostulanteReqDto,
    @Context() context: RequestContext
  ) {
    await this.candidatesService.modificarDatosDePostulante(context, datosPostulanteReqDto)
  }

  @Put('/residencia')
  async putResidencia(@Context() context: RequestContext, @Body() residenciaData: PutResidencia) {
    await this.candidatesService.putResidencia(context, residenciaData)
  }
}
