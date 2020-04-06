import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors, CacheInterceptor } from '@nestjs/common'
import { CurriculumService } from './curriculum.service'
import { ApiUseTags, ApiResponse } from '@nestjs/swagger'
import { Context } from '../../decorators/request-context.decorator'
import { RequestContext } from '../../models/request-context'
import { ExperienciaLaboralPut } from './dto/experiencia-laboral-put-req-dto'
import { Objetivo } from './dto/objetivo-put-req-dto'
import { ExperienciaLaboralPost } from './dto/experiencia-laboral-post-req-dto'
import { Estudio } from './dto/estudio-req-dto'
import {
  ConocimientoNormalizadoReqPostArray,
  ConocimientoNormalizadoReqDelete,
  ConocimientoNormalizadoReqPutArray
} from './dto/conocimiento-normalizado-core-dto'

import { SalarioReqDto } from '../../dto/salario-req.dto'
import { PostulanteReferenciaResponseDto } from '../dto/postulante-referencial-res.dto'
import { PostulanteReferenciaLaboralRequestDto } from '../dto/postulante-referencia-laboral-req.dto'
import { PostulanteReferenciaEstudioRequestDto } from '../dto/postulante-referencia-estudio-req.dto'

@ApiUseTags('postulante-curriculum - candidate-curriculum')
@Controller('curriculum')
export class CurriculumController {
  constructor(private readonly service: CurriculumService) {}

  @Get('/me/')
  async curriculum(@Context() context: RequestContext): Promise<any> {
    return this.service.curriculum(context)
  }

  @Get('/pda')
  async getPDA(@Context() context: RequestContext): Promise<any> {
    return this.service.getPDA(context)
  }

  @Get('/experienciasLaborales/:experienciaLaboralId')
  async getExperienciaLaboral(
    @Context() context: RequestContext,
    @Param('experienciaLaboralId') experienciaLaboralId: number
  ): Promise<any> {
    return this.service.getExperienciaLaboral(context, experienciaLaboralId)
  }

  @Post('/experienciasLaborales/')
  async postExperienciaLaboral(
    @Context() context: RequestContext,
    @Body() experienciaLaboralData?: ExperienciaLaboralPost
  ): Promise<any> {
    return this.service.postExperienciaLaboral(context, experienciaLaboralData)
  }

  @Put('/experienciasLaborales/:experienciaLaboralId')
  async putExperienciaLaboral(
    @Context() context: RequestContext,
    @Param('experienciaLaboralId') experienciaLaboralId: number,
    @Body() experienciaLaboralData?: ExperienciaLaboralPut
  ): Promise<any> {
    return this.service.putExperienciaLaboral(context, experienciaLaboralId, experienciaLaboralData)
  }

  @Delete('/experienciasLaborales/:experienciaLaboralId')
  async deleteExperienciaLaboral(
    @Context() context: RequestContext,
    @Param('experienciaLaboralId') experienciaLaboralId: number
  ): Promise<any> {
    return this.service.deleteExperienciaLaboral(context, experienciaLaboralId)
  }

  @Put('/objetivo')
  async putObjetivos(@Context() context: RequestContext, @Body() objetivosData?: Objetivo): Promise<any> {
    return this.service.putObjetivo(context, objetivosData)
  }

  @Delete('/objetivo')
  async delObjetivos(@Context() context: RequestContext): Promise<any> {
    return this.service.deleteObjetivo(context)
  }

  @Get('/estudios/:estudioId')
  async getEstudio(@Context() context: RequestContext, @Param('estudioId') estudioId: number): Promise<any> {
    return this.service.getEstudio(context, estudioId)
  }

  @Post('/estudios/')
  async postEstudio(@Context() context: RequestContext, @Body() estudioData?: Estudio): Promise<any> {
    return this.service.postEstudio(context, estudioData)
  }

  @Put('/estudios/:estudioId')
  async putEstudio(
    @Context() context: RequestContext,
    @Param('estudioId') estudioId: number,
    @Body() estudioData?: Estudio
  ): Promise<any> {
    return this.service.putEstudio(context, estudioId, estudioData)
  }

  @Delete('/estudios/:estudioId')
  async delEstudio(@Context() context: RequestContext, @Param('estudioId') estudioId: number): Promise<any> {
    return this.service.deleteEstudio(context, estudioId)
  }

  @Get('/referencia-laboral')
  async getReferenciaLaboral(@Context() context: RequestContext): Promise<any[]> {
    return this.service.getReferenciaLaboral(context)
  }
  
  @Put('/salario/')
  async preferenciaSalarial(@Context() context: RequestContext, @Body() salarioReq: SalarioReqDto): Promise<any> {
    return this.service.updateSalario(context, salarioReq.salario)
  }

  @ApiResponse({
    status: 200,
    type: PostulanteReferenciaResponseDto,
    description: 'Representa una referencia laboral.',
  })
  @Get('/referenciaLaboral/:referenciaLaboralId')
  async getReferenciaLaboralId(
    @Context() context: RequestContext,
    @Param('referenciaLaboralId') referenciaLaboralId: number
  ): Promise<PostulanteReferenciaResponseDto> {
    return await this.service.getReferenciaLaboralId(context, referenciaLaboralId)
  }

  @Post('/referenciaLaboral')
  async crearReferenciaLaboral(
    @Body() postulanteReferenciaLaboralRequestDto: PostulanteReferenciaLaboralRequestDto,
    @Context() context: RequestContext
  ) {
    //TODO para el puesto buscar la experiencia laboral asociada
    await this.service.crearReferenciaLaboral(context, postulanteReferenciaLaboralRequestDto)
  }

  @Put('/referenciaLaboral/:referenciaLaboralId')
  async modificarReferenciaLaboral(
    @Context() context: RequestContext,
    @Param('referenciaLaboralId') referenciaLaboralId: number,
    @Body() postulanteReferenciaLaboralRequestDto: PostulanteReferenciaLaboralRequestDto
  ) {
    //TODO para el puesto buscar la experiencia laboral asociada
    await this.service.modificarReferenciaLaboral(
      context,
      referenciaLaboralId,
      postulanteReferenciaLaboralRequestDto
    )
  }

  @Delete('/referenciaLaboral/:referenciaLaboralId')
  async eliminarReferenciaLaboral(
    @Param('referenciaLaboralId') referenciaLaboralId: number,
    @Context() context: RequestContext
  ) {
    await this.service.eliminarReferenciaLaboral(context, referenciaLaboralId)
  }

  @Post('/conocimientosNormalizados/')
  async postConocimientosNormalizados(
    @Context() context: RequestContext,
    @Body() data?: ConocimientoNormalizadoReqPostArray
  ): Promise<any> {
    return this.service.postConocimientoNormalizado(context, data)
  }

  @Put('/conocimientosNormalizados/')
  async putConocimientoNormalizado(
    @Context() context: RequestContext,
    @Body() conocimientos?: ConocimientoNormalizadoReqPutArray
  ): Promise<any> {
    return this.service.putConocimientoNormalizado(context, conocimientos)
  }

  @Delete('/conocimientosNormalizados/:ids')
  async delConocimientoNormalizado(
    @Context() context: RequestContext,
    @Param('ids') ids: string
  ): Promise<any> {
    const conocimientoIds = JSON.parse(ids)
    return this.service.deleteConocimientoNormalizado(context, conocimientoIds)
  }
  @Get('/referencias-estudio')
  async getReferenciasEstudio(@Context() context: RequestContext): Promise<any[]> {
    return this.service.getReferenciasEstudio(context)
  }

  @ApiResponse({
    status: 200,
    type: PostulanteReferenciaResponseDto,
    description: 'Representa una referencia laboral.',
  })

  @Get('/referenciaEstudio/:referenciaEstudioId')
  async getReferenciaEstudio(
    @Context() context: RequestContext,
    @Param('referenciaEstudioId') referenciaEstudioId: number
  ): Promise<PostulanteReferenciaResponseDto> {
    return this.service.getReferenciaEstudioById(context, referenciaEstudioId)
  }

  @Post('/referenciaEstudio')
  async crearReferenciaEstudio(
    @Body() postulanteReferenciaEstudioRequestDto: PostulanteReferenciaEstudioRequestDto,
    @Context() context: RequestContext
  ) {
    //TODO para el puesto buscar la experiencia laboral asociada
    await this.service.crearReferenciaEstudio(context, postulanteReferenciaEstudioRequestDto)
  }

  @Put('/referenciaEstudio/:referenciaEstudioId')
  async modificarReferenciaEstudio(
    @Context() context: RequestContext,
    @Param('referenciaEstudioId') referenciaEstudioId: number,
    @Body() postulanteReferenciaEstudioRequestDto: PostulanteReferenciaEstudioRequestDto
  ) {
    //TODO para el puesto buscar la experiencia laboral asociada
    await this.service.modificarReferenciaEstudio(
      context,
      referenciaEstudioId,
      postulanteReferenciaEstudioRequestDto
    )
  }

  @Delete('/referenciaEstudio/:referenciaEstudioId')
  async eliminarReferenciaEstudio(
    @Param('referenciaEstudioId') referenciaEstudioId: number,
    @Context() context: RequestContext
  ) {
    await this.service.eliminarReferenciaEstudio(context, referenciaEstudioId)
  }

}
