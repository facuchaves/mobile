import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors, CacheInterceptor } from '@nestjs/common'
import { EstudiosService } from './estudios.service'
import { ApiUseTags, ApiResponse } from '@nestjs/swagger'
import { Context } from '../../decorators/request-context.decorator'
import { RequestContext } from '../../models/request-context'
import { EstudioPut } from './dto/estudio-req-put.dto'

@ApiUseTags('postulante-estudios - candidate-estudios')
@Controller('estudios')
export class EstudiosController {
  constructor(private readonly service: EstudiosService) {}

  @Get('/:estudioId')
  async getEstudios(@Context() context: RequestContext, @Param('estudioId') estudioId: number): Promise<any> {
    return this.service.getEstudio(context, estudioId)
  }

  @Put('/:estudioId')
  async PutEstudios(
    @Context() context: RequestContext,
    @Param('estudioId') estudioId: number,
    @Body() estudioData?: EstudioPut
  ): Promise<any> {
    return this.service.putEstudio(context, estudioId, estudioData)
  }

  @Delete('/:estudioId')
  async delEstudios(@Context() context: RequestContext, @Param('estudioId') estudioId: number): Promise<any> {
    return this.service.delEstudio(context, estudioId)
  }
}
